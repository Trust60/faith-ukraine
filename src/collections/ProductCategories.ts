import { createTaxonomyCollection } from "@/collections/createTaxonomyCollection";

/** Категорія / зона догляду: Обличчя, Тіло, Волосся, Макіяж/база. Верхній рівень фільтра. */
export const ProductCategories = createTaxonomyCollection({
  slug: "product-categories",
  labels: { singular: "Категорія", plural: "Категорії" },
  description: "Зона догляду: «Обличчя», «Тіло», «Волосся», «Макіяж/база».",
});
