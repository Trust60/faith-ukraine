import type { Field } from "payload";

/**
 * Контентні поля товару. На картці каталогу показуємо лише дескриптор
 * (`shortDescription`); решта — наповнення повної сторінки товару. Об'єм лишаємо тут
 * як характеристику.
 */
export const productContentFields: Field[] = [
  {
    name: "volume",
    type: "text",
    label: "Об'єм",
    admin: { description: "Напр. «50 ml», «280 г»." },
  },
  {
    name: "shortDescription",
    type: "text",
    label: "Короткий опис (дескриптор)",
    admin: {
      description:
        "Один рядок суті під назвою (напр. «ламелярна есенція з колагеном»). Показується і на картці каталогу.",
    },
  },
  {
    name: "keyIngredients",
    type: "array",
    label: "Ключові інгредієнти",
    labels: { singular: "Інгредієнт", plural: "Інгредієнти" },
    fields: [
      { name: "name", type: "text", label: "Назва", required: true },
      { name: "benefit", type: "text", label: "Дія / користь" },
    ],
  },
  {
    name: "howToUse",
    type: "richText",
    label: "Спосіб застосування",
  },
  {
    name: "description",
    type: "richText",
    label: "Опис",
  },
];
