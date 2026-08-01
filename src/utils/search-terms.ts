import { AXIS_PARAM, FILTER_AXES } from "@/utils/catalog-filter";
import type { TFilterAxisKey } from "@/utils/catalog-filter";
import type { TCatalogFacets } from "@/data/catalog";

/**
 * Термін таксономії як результат пошуку: запит «зволоження» веде не на товар,
 * а в каталог із уже застосованим фільтром.
 */
export type TSearchTerm = {
  name: string;
  slug: string;
  axis: TFilterAxisKey;
  /** Підпис осі поруч із назвою: «Лінійка», «Призначення», «Тип шкіри». */
  axisLabel: string;
};

// Слаги таксономій кирилічні (напр. «гель-крем») — обов'язково кодуємо.
export const termHref = (term: TSearchTerm): string =>
  `/catalog?${AXIS_PARAM[term.axis]}=${encodeURIComponent(term.slug)}`;

/** Усі опції фільтрів як плаский список результатів пошуку. */
export function buildTerms(facets: TCatalogFacets): TSearchTerm[] {
  return FILTER_AXES.flatMap((axis) =>
    facets[axis.key].map((option) => ({
      name: option.name,
      slug: option.slug,
      axis: axis.key,
      axisLabel: axis.label,
    })),
  );
}
