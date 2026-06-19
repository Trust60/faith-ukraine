import { getPayloadClient } from "@/lib/getPayload";
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

type TPopulatedProduct = Product & { line: ProductLine; image: Media };

const orderOf = (value?: number | null) => value ?? 0;

const isPopulated = (product: Product): product is TPopulatedProduct =>
  typeof product.line === "object" && typeof product.image === "object";

const byLineThenOrder = (a: TPopulatedProduct, b: TPopulatedProduct) =>
  orderOf(a.line.order) - orderOf(b.line.order) ||
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

/**
 * Опубліковані товари каталогу, відсортовані за (порядок лінійки, порядок товару,
 * назва) — товари однієї лінійки йдуть підряд (групування без заголовків, по макету).
 */
export async function getCatalogProducts(): Promise<TCatalogProduct[]> {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    depth: 1,
    limit: 100,
    where: { _status: { equals: "published" } },
  });

  return docs.filter(isPopulated).sort(byLineThenOrder).map(toCatalogProduct);
}
