import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/getPayload";
import { CATALOG_CACHE_TAG } from "@/data/cache-tags";
import { isObject, objectsOf } from "@/data/catalog";
import type {
  Concern,
  Media,
  Product,
  ProductCategory,
  ProductLine,
  ProductType,
  SkinType,
} from "@/payload-types";

/** Варіант зображення товару: базовий (видиме фото) або повнорозмірний (шар зум-лінзи). */
export type TProductImageVariant = { url: string; width: number; height: number };

export type TProductDetail = {
  id: number;
  slug: string;
  title: string;
  lineName: string;
  shortDescription: string | null;
  volume: string | null;
  /** Назва категорії — рядок «Зона застосування» у дод. інформації. */
  categoryName: string;
  skinTypeNames: string[];
  /** «Призначення» — чипси на сторінці товару. */
  concerns: { name: string; slug: string }[];
  keyIngredients: { name: string; benefit: string | null }[];
  description: Product["description"];
  howToUse: Product["howToUse"];
  /** Повний склад (INCI) англійською — суцільний текст. */
  ingredients: string | null;
  image: {
    alt: string;
    base: TProductImageVariant;
    zoom: TProductImageVariant;
  };
  // Осі таксономії — вхід для підбору схожих товарів (utils/related-products).
  lineSlug: string;
  categorySlug: string;
  typeSlug: string;
  concernSlugs: string[];
};

type TPopulatedProduct = Product & {
  line: ProductLine;
  image: Media;
  category: ProductCategory;
  type: ProductType;
};

// Ті самі обов'язкові зв'язки, що й у каталозі (depth 1): без них сторінку не зібрати.
const isPopulated = (product: Product): product is TPopulatedProduct =>
  isObject(product.line) &&
  isObject(product.image) &&
  isObject(product.category) &&
  isObject(product.type);

const FALLBACK_WIDTH = 768;
const FALLBACK_HEIGHT = 1024;

// base — розмір «card» (768w) для видимого фото; zoom — оригінал для шару збільшення.
function toImageVariants(image: Media): TProductDetail["image"] {
  const card = image.sizes?.card;
  const original: TProductImageVariant = {
    url: image.url ?? "",
    width: image.width ?? FALLBACK_WIDTH,
    height: image.height ?? FALLBACK_HEIGHT,
  };
  const base: TProductImageVariant = card?.url
    ? {
        url: card.url,
        width: card.width ?? FALLBACK_WIDTH,
        height: card.height ?? FALLBACK_HEIGHT,
      }
    : original;

  return {
    alt: image.alt,
    base,
    zoom: original.url ? original : base,
  };
}

function toProductDetail(product: TPopulatedProduct): TProductDetail {
  const concerns = objectsOf<Concern>(product.concerns);

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    lineName: product.line.name,
    shortDescription: product.shortDescription ?? null,
    volume: product.volume ?? null,
    categoryName: product.category.name,
    skinTypeNames: objectsOf<SkinType>(product.skinTypes).map((s) => s.name),
    concerns: concerns.map((c) => ({ name: c.name, slug: c.slug })),
    keyIngredients: (product.keyIngredients ?? []).map((item) => ({
      name: item.name,
      benefit: item.benefit ?? null,
    })),
    description: product.description ?? null,
    howToUse: product.howToUse ?? null,
    ingredients: product.ingredients ?? null,
    image: toImageVariants(product.image),
    lineSlug: product.line.slug,
    categorySlug: product.category.slug,
    typeSlug: product.type.slug,
    concernSlugs: concerns.map((c) => c.slug),
  };
}

async function loadProductBySlug(slug: string): Promise<TProductDetail | null> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    depth: 1,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
  });

  const [doc] = docs;
  return doc && isPopulated(doc) ? toProductDetail(doc) : null;
}

/**
 * Товар за слагом для сторінки /catalog/[slug]. Аргументи unstable_cache входять у ключ
 * кешу — кожен слаг кешується окремо; повторний виклик у generateMetadata — влучання в
 * кеш. Тег спільний з каталогом: правки в адмінці інвалідовують обидва кеші через
 * revalidateTag (хук revalidateCatalog).
 */
export const getProductBySlug = unstable_cache(loadProductBySlug, ["product-by-slug"], {
  tags: [CATALOG_CACHE_TAG],
  revalidate: 3600,
});

/** Слаги опублікованих товарів — для generateStaticParams (SSG сторінок товару). */
export async function getProductSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    depth: 0,
    limit: 200,
    where: { _status: { equals: "published" } },
    select: { slug: true },
  });

  return docs.map((doc) => doc.slug).filter(Boolean);
}
