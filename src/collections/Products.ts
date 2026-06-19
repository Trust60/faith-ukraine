import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";

/**
 * Товар каталогу. Базова схема картки: назва, лінійка, фото. Ціни/кошика немає
 * (на сайті немає оплати). `volume`/`description` — заділ під сторінку товару.
 */
export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Товар",
    plural: "Товари",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "line", "order", "_status"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Назва",
      required: true,
    },
    slugField(),
    {
      name: "line",
      type: "relationship",
      relationTo: "product-lines",
      label: "Лінійка",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Фото",
      required: true,
    },
    {
      name: "order",
      type: "number",
      label: "Порядок",
      defaultValue: 0,
      admin: {
        description: "Порядок усередині лінійки (менше число — вище).",
      },
    },
    {
      name: "volume",
      type: "text",
      label: "Об'єм",
      admin: {
        description: "Напр. «150 ml». На картці каталогу не показується.",
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Опис",
    },
  ],
};
