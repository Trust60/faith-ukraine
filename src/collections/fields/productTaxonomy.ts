import type { Field } from "payload";

/**
 * Поля класифікації товару — основа фільтрів каталогу. Категорія/зона й тип — по
 * одному значенню; призначення та тип шкіри — кілька (товар закриває кілька потреб і
 * підходить кільком типам шкіри). Усі — relationship на колекції-таксономії.
 * Порядок — як на сторінці товару: чипси «Призначення», тип шкіри, зона застосування
 * (тип продукту на сторінці не показується — тримаємо поруч із категорією).
 */
export const productTaxonomyFields: Field[] = [
  {
    name: "concerns",
    type: "relationship",
    relationTo: "concerns",
    label: "Призначення",
    hasMany: true,
  },
  {
    name: "skinTypes",
    type: "relationship",
    relationTo: "skin-types",
    label: "Тип шкіри",
    hasMany: true,
    admin: {
      description:
        "Для якого типу шкіри. Лишіть порожнім, якщо засіб універсальний (підходить будь-якій).",
    },
  },
  {
    name: "category",
    type: "relationship",
    relationTo: "product-categories",
    label: "Категорія / зона",
    required: true,
    admin: { description: "Зона догляду: обличчя, тіло, волосся, макіяж/база." },
  },
  {
    name: "type",
    type: "relationship",
    relationTo: "product-types",
    label: "Тип продукту",
    required: true,
  },
];
