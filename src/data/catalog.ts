import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/getPayload";
import { CATALOG_CACHE_TAG } from "@/data/cache-tags";
import { buildFacets } from "@/data/catalog-facets";
import type {
  Concern,
  Media,
  Product,
  ProductCategory,
  ProductLine,
  ProductType,
  SkinType,
} from "@/payload-types";

/** Одна опція фільтра (термін таксономії): slug для зіставлення + назва для показу. */
export type TFacetOption = { slug: string; name: string };

/** Списки опцій кожної осі фільтра — лише терміни, що реально є в каталозі. */
export type TCatalogFacets = {
  categories: TFacetOption[];
  lines: TFacetOption[];
  types: TFacetOption[];
  concerns: TFacetOption[];
  skinTypes: TFacetOption[];
};

export type TCatalogProduct = {
  id: number;
  title: string;
  // Слаг сторінки товару (/catalog/[slug]) — картка каталогу є посиланням.
  slug: string;
  lineName: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  // Осі фільтра — слаги для клієнтського зіставлення (див. utils/catalog-filter).
  categorySlug: string;
  lineSlug: string;
  typeSlug: string;
  concernSlugs: string[];
  skinTypeSlugs: string[];
  // Порядок типу продукту — для сортування «за кроком догляду».
  stepOrder: number;
};

export type TCatalogData = {
  products: TCatalogProduct[];
  facets: TCatalogFacets;
};

// Поля, які тягнемо з БД: картка (+slug для посилання) + осі таксономії для фільтрів.
// Повний контент (description/volume/…) не потрібен — його тягне сторінка товару (data/product).
type TCatalogDoc = Pick<
  Product,
  | "id"
  | "title"
  | "slug"
  | "order"
  | "line"
  | "image"
  | "category"
  | "type"
  | "concerns"
  | "skinTypes"
>;
type TPopulatedProduct = TCatalogDoc & {
  line: ProductLine;
  image: Media;
  category: ProductCategory;
  type: ProductType;
};

const orderOf = (value?: number | null) => value ?? 0;

// Перевірки підтягнутих зв'язків Payload (depth 1) — переиспользуются в data/product.
export const isObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null;

// Товар придатний для картки/фільтра лише якщо всі обов'язкові зв'язки підтягнуті (depth 1).
const isPopulated = (product: TCatalogDoc): product is TPopulatedProduct =>
  isObject(product.line) &&
  isObject(product.image) &&
  isObject(product.category) &&
  isObject(product.type);

// hasMany-зв'язки на depth 1 — масив об'єктів; лишаємо тільки підтягнуті (не голі id).
export const objectsOf = <T,>(list?: (number | T)[] | null): T[] =>
  (list ?? []).filter((item): item is T => isObject(item));

// Порядок каталогу: 1) порядок лінійки (line.order) → 2) id лінійки — щоб лінійки з
// однаковим order не перемішувались і товари однієї лінійки завжди йшли підряд →
// 3) порядок товару всередині лінійки → 4) назва (стабільний фолбек).
const byLineThenOrder = (a: TPopulatedProduct, b: TPopulatedProduct) =>
  orderOf(a.line.order) - orderOf(b.line.order) ||
  a.line.id - b.line.id ||
  orderOf(a.order) - orderOf(b.order) ||
  a.title.localeCompare(b.title);

function toCatalogProduct(product: TPopulatedProduct): TCatalogProduct {
  const { id, title, slug, line, image, category, type } = product;
  const card = image.sizes?.card;
  return {
    id,
    title,
    slug,
    lineName: line.name,
    image: {
      url: card?.url ?? image.url ?? "",
      alt: image.alt,
      width: card?.width ?? image.width ?? 768,
      height: card?.height ?? image.height ?? 1024,
    },
    categorySlug: category.slug,
    lineSlug: line.slug,
    typeSlug: type.slug,
    concernSlugs: objectsOf<Concern>(product.concerns).map((c) => c.slug),
    skinTypeSlugs: objectsOf<SkinType>(product.skinTypes).map((s) => s.slug),
    stepOrder: orderOf(type.order),
  };
}

async function loadCatalogData(): Promise<TCatalogData> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    depth: 1,
    limit: 100,
    where: { _status: { equals: "published" } },
    // Лише поля картки та осей фільтра — менше навантаження на БД і серіалізацію.
    select: {
      title: true,
      slug: true,
      line: true,
      image: true,
      order: true,
      category: true,
      type: true,
      concerns: true,
      skinTypes: true,
    },
  });

  const populated = docs.filter(isPopulated).sort(byLineThenOrder);

  return {
    products: populated.map(toCatalogProduct),
    facets: buildFacets(
      populated.map((p) => ({
        line: p.line,
        category: p.category,
        type: p.type,
        concerns: objectsOf<Concern>(p.concerns),
        skinTypes: objectsOf<SkinType>(p.skinTypes),
      })),
    ),
  };
}

/**
 * Товари каталогу (у порядку «лінійка → порядок товару») разом зі списками опцій
 * фільтрів. Кешуються (unstable_cache, тег CATALOG_CACHE_TAG): каталог віддається з
 * кешу (ISR), без запиту до БД на кожен перегляд; правки в адмінці інвалідовують кеш
 * через revalidateTag (хук revalidateCatalog). revalidate — страхувальний TTL.
 */
export const getCatalogData = unstable_cache(loadCatalogData, ["catalog-data"], {
  tags: [CATALOG_CACHE_TAG],
  revalidate: 3600,
});
