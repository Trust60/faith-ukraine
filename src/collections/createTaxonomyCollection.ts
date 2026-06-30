import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import {
  revalidateCatalogAfterChange,
  revalidateCatalogAfterDelete,
} from "@/collections/hooks/revalidateCatalog";

type TTaxonomyConfig = {
  slug: string;
  labels: { singular: string; plural: string };
  /** Підказка під полем «Назва» в адмінці (приклади значень). */
  description?: string;
};

/**
 * Фабрика колекцій-таксономій каталогу (категорія, тип, призначення, тип шкіри).
 * Усі мають однакову форму — назва + slug + порядок — і інвалідовують кеш каталогу
 * при зміні (від них залежать фільтри та майбутні сторінки-категорії). Одна фабрика
 * замість чотирьох майже однакових файлів: без дублювання, low coupling.
 */
export const createTaxonomyCollection = ({
  slug,
  labels,
  description,
}: TTaxonomyConfig): CollectionConfig => ({
  slug,
  labels,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
    group: "Каталог",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateCatalogAfterChange],
    afterDelete: [revalidateCatalogAfterDelete],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Назва",
      required: true,
      ...(description ? { admin: { description } } : {}),
    },
    slugField({ sourceField: "name" }),
    {
      name: "order",
      type: "number",
      label: "Порядок",
      defaultValue: 0,
      admin: { description: "Порядок у списку фільтра (менше число — вище)." },
    },
  ],
});
