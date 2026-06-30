import { createTaxonomyCollection } from "@/collections/createTaxonomyCollection";

/** Тип шкіри для фільтра: Суха, Жирна, Комбінована, Чутлива, Зріла, Проблемна. */
export const SkinTypes = createTaxonomyCollection({
  slug: "skin-types",
  labels: { singular: "Тип шкіри", plural: "Типи шкіри" },
  description:
    "Для якого типу шкіри: «Суха», «Жирна», «Комбінована», «Чутлива», «Зріла», «Проблемна».",
});
