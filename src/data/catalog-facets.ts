import type {
  Concern,
  ProductCategory,
  ProductLine,
  ProductType,
  SkinType,
} from "@/payload-types";
import type { TCatalogFacets, TFacetOption } from "@/data/catalog";

/** Спільна форма терміна таксономії (лінійка/категорія/тип/призначення/тип шкіри). */
type TTerm = { name: string; slug: string; order?: number | null };

const orderOf = (value?: number | null) => value ?? 0;

// Порядок опцій фільтра: спершу за полем `order` (кероване в адмінці), далі за назвою.
const byOrderThenName = (a: TTerm, b: TTerm) =>
  orderOf(a.order) - orderOf(b.order) || a.name.localeCompare(b.name, "uk");

/**
 * Збирає унікальні терміни осі (за slug) з усіх товарів і сортує їх для списку фільтра.
 * У фасет потрапляють лише терміни, що реально трапляються в каталозі — порожніх опцій
 * (без товарів) не буде.
 */
function collectFacet(termGroups: TTerm[][]): TFacetOption[] {
  const bySlug = new Map<string, TTerm>();
  for (const group of termGroups) {
    for (const term of group) {
      if (!bySlug.has(term.slug)) bySlug.set(term.slug, term);
    }
  }
  return [...bySlug.values()]
    .sort(byOrderThenName)
    .map(({ slug, name }) => ({ slug, name }));
}

type TPopulatedTaxonomy = {
  line: ProductLine;
  category: ProductCategory;
  type: ProductType;
  concerns: Concern[];
  skinTypes: SkinType[];
};

/**
 * Будує списки опцій для кожної осі фільтра з уже завантажених (populated) товарів —
 * без додаткових запитів до БД. Кожен масив уже відсортований у порядку показу.
 */
export function buildFacets(products: TPopulatedTaxonomy[]): TCatalogFacets {
  return {
    categories: collectFacet(products.map((p) => [p.category])),
    lines: collectFacet(products.map((p) => [p.line])),
    types: collectFacet(products.map((p) => [p.type])),
    concerns: collectFacet(products.map((p) => p.concerns)),
    skinTypes: collectFacet(products.map((p) => p.skinTypes)),
  };
}
