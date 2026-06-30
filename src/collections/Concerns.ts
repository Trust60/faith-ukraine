import { createTaxonomyCollection } from "@/collections/createTaxonomyCollection";

/** Призначення / ефект: Зволоження, Анти-ейдж, Заспокоєння, Сяйво, Сонцезахист тощо. */
export const Concerns = createTaxonomyCollection({
  slug: "concerns",
  labels: { singular: "Призначення", plural: "Призначення" },
  description:
    "Ефект/проблема: «Зволоження», «Анти-ейдж», «Заспокоєння», «Сонцезахист».",
});
