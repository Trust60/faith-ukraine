import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";

/** Лінійки товарів (Lamellar Veil EX, Lamellar Mode …) — основа групування каталогу. */
export const ProductLines: CollectionConfig = {
  slug: "product-lines",
  labels: {
    singular: "Лінійка",
    plural: "Лінійки",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Назва",
      required: true,
    },
    slugField({ sourceField: "name" }),
    {
      name: "order",
      type: "number",
      label: "Порядок",
      defaultValue: 0,
      admin: {
        description: "Порядок лінійки в каталозі (менше число — вище).",
      },
    },
  ],
};
