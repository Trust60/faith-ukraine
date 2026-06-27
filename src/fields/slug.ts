import type { Field, FieldHook } from "payload";
import { formatSlug } from "@/utils/slug";

/** Резолвер джерела slug — отримує аргументи хука (доступ до req.payload), може бути async. */
export type TSlugSourceResolver = (
  args: Parameters<FieldHook>[0],
) => string | undefined | Promise<string | undefined>;

type TSlugFieldArgs = {
  /** Поле, з якого генерується slug, якщо його не задано вручну. */
  sourceField?: string;
  /**
   * Кастомний резолвер джерела slug — має пріоритет над `sourceField`. Напр. товар:
   * «<лінійка> <назва>», бо назва товару без лінійки не унікальна (Cleansing у різних лінійках).
   */
  resolveSource?: TSlugSourceResolver;
  /** Опис поля в адмінці (підказка автогенерації). */
  description?: string;
};

/**
 * Переиспользуемое поле `slug`: унікальне, індексоване, в сайдбарі адмінки.
 * Хук `beforeValidate` нормалізує введене значення або генерує його з
 * `resolveSource` (якщо задано), інакше з `sourceField` (за замовчуванням — `title`).
 */
export const slugField = ({
  sourceField = "title",
  resolveSource,
  description = "Частина URL. Лишіть порожнім — заповниться автоматично з назви.",
}: TSlugFieldArgs = {}): Field => ({
  name: "slug",
  type: "text",
  label: "URL (slug)",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description,
  },
  hooks: {
    beforeValidate: [
      async (args) => {
        const { value, data } = args;
        if (typeof value === "string" && value.length > 0) {
          return formatSlug(value);
        }
        const source = resolveSource
          ? await resolveSource(args)
          : data?.[sourceField];
        return typeof source === "string" && source.length > 0
          ? formatSlug(source)
          : value;
      },
    ],
  },
});
