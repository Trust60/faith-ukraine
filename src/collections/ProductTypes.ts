import { createTaxonomyCollection } from "@/collections/createTaxonomyCollection";

/** Тип продукту / етап догляду: Очищення, Тонік, Есенція, Гель/Крем, Маска тощо. */
export const ProductTypes = createTaxonomyCollection({
  slug: "product-types",
  labels: { singular: "Тип продукту", plural: "Типи продуктів" },
  description:
    "Формат: «Очищення», «Тонік/Лосьйон», «Есенція/Сироватка», «Гель/Крем», «Маска/Пак».",
});
