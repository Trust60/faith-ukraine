import type { Field } from "payload";
import { formatSlug } from "@/utils/slug";

type TSlugFieldArgs = {
  /** Поле, з якого генерується slug, якщо його не задано вручну. */
  sourceField?: string;
};

/**
 * Переиспользуемое поле `slug`: унікальне, індексоване, в сайдбарі адмінки.
 * Хук `beforeValidate` нормалізує введене значення або генерує його з
 * `sourceField` (за замовчуванням — `title`).
 */
export const slugField = ({
  sourceField = "title",
}: TSlugFieldArgs = {}): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.length > 0) {
          return formatSlug(value);
        }
        const source = data?.[sourceField];
        return typeof source === "string" ? formatSlug(source) : value;
      },
    ],
  },
});
