import type { CollectionConfig } from "payload";
import { slugField, type TSlugSourceResolver } from "@/fields/slug";
import {
  revalidateCatalogAfterChange,
  revalidateCatalogAfterDelete,
} from "@/collections/hooks/revalidateCatalog";
import { productTaxonomyFields } from "@/collections/fields/productTaxonomy";
import { productContentFields } from "@/collections/fields/productContent";

/**
 * Джерело slug товару — «<лінійка> <назва>» (напр. «lamellar-mode-cleansing»), щоб slug
 * був унікальним (назва без лінійки повторюється: Cleansing є в кількох лінійках) і
 * людиночитним для SEO. Лінійка — це relationship (id), тож підтягуємо її назву з БД.
 */
const resolveProductSlugSource: TSlugSourceResolver = async ({
  data,
  originalDoc,
  req,
}) => {
  const title = typeof data?.title === "string" ? data.title : "";
  const rawLine = data?.line ?? originalDoc?.line;
  const lineId = rawLine && typeof rawLine === "object" ? rawLine.id : rawLine;
  if (lineId == null) return title;

  const line = await req.payload
    .findByID({ collection: "product-lines", id: lineId, depth: 0 })
    .catch(() => null);
  const lineName = typeof line?.name === "string" ? line.name : "";
  return `${lineName} ${title}`.trim();
};

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
    group: "Каталог",
    // `image` — це upload-поле: у списку Payload рендерить мініатюру товару
    // (як в адмінці WordPress), щоб товар можна було впізнати не лише за текстом.
    // Ставимо її першою — перша колонка стає клікабельним посиланням на товар.
    defaultColumns: ["image", "title", "line", "type", "order", "_status"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCatalogAfterChange],
    afterDelete: [revalidateCatalogAfterDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Назва",
      required: true,
      admin: {
        description:
          "Тільки власна назва товару, без лінійки (напр. «Energizing Pack», а не «Lamellar Mode Energizing Pack»). Лінійка показується окремим рядком над назвою.",
      },
    },
    slugField({
      resolveSource: resolveProductSlugSource,
      description:
        "Частина URL товару. Лишіть порожнім — згенерується з лінійки + назви (напр. «lamellar-mode-cleansing»).",
    }),
    {
      name: "line",
      type: "relationship",
      relationTo: "product-lines",
      label: "Лінійка",
      required: true,
    },
    ...productTaxonomyFields,
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
    ...productContentFields,
  ],
};
