import type { Field } from "payload";

/**
 * Поля шапки товару (права колонка сторінки): дескриптор під назвою та об'єм.
 * `shortDescription` показується і на картці каталогу.
 */
export const productSummaryFields: Field[] = [
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
    name: "volume",
    type: "text",
    label: "Об'єм",
    admin: { description: "Напр. «50 ml», «280 г»." },
  },
];

/**
 * Контентні секції сторінки товару — в порядку відображення на фронті:
 * «Опис» → «Активні компоненти» → «Спосіб застосування» → Ingredients (INCI).
 */
export const productContentFields: Field[] = [
  {
    name: "description",
    type: "richText",
    label: "Опис",
  },
  {
    name: "activeComponents",
    type: "textarea",
    label: "Активні компоненти",
    admin: {
      description:
        "По одному компоненту на рядок у форматі «Назва – дія». Маркери (•, -) не потрібні — список на сайті маркується автоматично.",
    },
  },
  {
    name: "howToUse",
    type: "richText",
    label: "Спосіб застосування",
  },
  {
    name: "ingredients",
    type: "richText",
    label: "Ingredients (INCI)",
    admin: {
      description:
        "Повний склад англійською — суцільним текстом через кому або окремими абзацами.",
    },
  },
];
