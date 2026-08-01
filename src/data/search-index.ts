import { getCatalogData } from "@/data/catalog";
import { toSearchables } from "@/utils/search";
import { buildTerms } from "@/utils/search-terms";
import type { TSearchable } from "@/utils/search";
import type { TSearchTerm } from "@/utils/search-terms";

/** Товар в індексі: корпус для зіставлення + мінімум для показу рядка результату. */
export type TSearchProduct = TSearchable & {
  slug: string;
  image: { url: string; alt: string; width: number; height: number };
};

export type TSearchIndex = {
  products: TSearchProduct[];
  terms: TSearchTerm[];
};

/**
 * Компактний індекс для пошукового діалогу. Джерело — той самий кешований
 * getCatalogData (тег "catalog"), тож окремого запиту до БД немає, а правки в
 * адмінці інвалідовують індекс наявним хуком revalidateCatalog.
 * Віддається статичним роутом /search-index.json і вантажиться браузером один раз.
 */
export async function getSearchIndex(): Promise<TSearchIndex> {
  const { products, facets } = await getCatalogData();
  const searchables = toSearchables(products, facets);

  return {
    products: products.map((product, index) => ({
      ...searchables[index],
      slug: product.slug,
      image: product.image,
    })),
    terms: buildTerms(facets),
  };
}
