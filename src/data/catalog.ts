import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/getPayload";
import { CATALOG_CACHE_TAG } from "@/data/cache-tags";
import type { Media, Product, ProductLine } from "@/payload-types";

export type TCatalogProduct = {
  id: number;
  title: string;
  lineName: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

// Поля, які тягнемо з БД для картки каталогу (select). description/volume/slug не потрібні.
type TCatalogDoc = Pick<Product, "id" | "title" | "order" | "line" | "image">;
type TPopulatedProduct = TCatalogDoc & { line: ProductLine; image: Media };

const orderOf = (value?: number | null) => value ?? 0;

const isPopulated = (product: TCatalogDoc): product is TPopulatedProduct =>
  typeof product.line === "object" && typeof product.image === "object";

// Порядок каталогу: 1) порядок лінійки (line.order) → 2) id лінійки — щоб лінійки з
// однаковим order не перемішувались і товари однієї лінійки завжди йшли підряд →
// 3) порядок товару всередині лінійки → 4) назва (стабільний фолбек).
const byLineThenOrder = (a: TPopulatedProduct, b: TPopulatedProduct) =>
  orderOf(a.line.order) - orderOf(b.line.order) ||
  a.line.id - b.line.id ||
  orderOf(a.order) - orderOf(b.order) ||
  a.title.localeCompare(b.title);

function toCatalogProduct({
  id,
  title,
  line,
  image,
}: TPopulatedProduct): TCatalogProduct {
  const card = image.sizes?.card;
  return {
    id,
    title,
    lineName: line.name,
    image: {
      url: card?.url ?? image.url ?? "",
      alt: image.alt,
      width: card?.width ?? image.width ?? 768,
      height: card?.height ?? image.height ?? 1024,
    },
  };
}

async function loadCatalogProducts(): Promise<TCatalogProduct[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    depth: 1,
    limit: 100,
    where: { _status: { equals: "published" } },
    // Тягнемо лише поля картки — менше навантаження на БД і менший обсяг серіалізації.
    select: { title: true, line: true, image: true, order: true },
  });

  return docs.filter(isPopulated).sort(byLineThenOrder).map(toCatalogProduct);
}

/**
 * Опубліковані товари каталогу, відсортовані за (порядок лінійки, порядок товару, назва) —
 * товари однієї лінійки йдуть підряд (групування без заголовків, по макету).
 *
 * Кешуються (unstable_cache, тег CATALOG_CACHE_TAG): каталог віддається з кешу (ISR), без
 * запиту до БД на кожен перегляд; правки в адмінці інвалідовують кеш через revalidateTag
 * (хук revalidateCatalog). revalidate — страхувальний TTL, якщо інвалідація не спрацює.
 */
export const getCatalogProducts = unstable_cache(
  loadCatalogProducts,
  ["catalog-products"],
  { tags: [CATALOG_CACHE_TAG], revalidate: 3600 },
);
