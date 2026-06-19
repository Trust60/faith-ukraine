import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import {
  revalidateCatalogAfterChange,
  revalidateCatalogAfterDelete,
} from "@/collections/hooks/revalidateCatalog";

/**
 * Зображення товарів у Supabase Storage. Кожне зображення (оригінал + розміри
 * thumbnail/card) кладемо в окрему папку бакета з назвою = базове ім'я файлу.
 */
const setPrefixFromFilename: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  req,
}) => {
  // Плагін cloud-storage бере поле `prefix` як папку для ключа об'єкта й для
  // видалення — тож при видаленні запису вся папка зникає, без порожніх «хвостів».
  const filename = data?.filename ?? originalDoc?.filename ?? req?.file?.name;
  if (typeof filename === "string" && filename.length > 0) {
    data.prefix = filename.replace(/\.[^/.]+$/, "");
  }
  return data;
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Зображення",
    plural: "Зображення",
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [setPrefixFromFilename],
    afterChange: [revalidateCatalogAfterChange],
    afterDelete: [revalidateCatalogAfterDelete],
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      // height не задаємо: sharp зберігає пропорції й рахує висоту сам. Якщо задати
      // і width, і height — sharp ріже фото по центру (fit: "cover"), і повний
      // флакон перетворюється на зум етикетки. Карти показуємо через object-contain.
      { name: "thumbnail", width: 400, position: "centre" },
      { name: "card", width: 768, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Альтернативний текст",
      required: true,
      admin: {
        description: "Альтернативний текст для доступності (a11y) та SEO.",
      },
    },
    {
      // Папка в бакеті (= базове ім'я файлу). Заповнюється хуком, у UI прихована.
      name: "prefix",
      type: "text",
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};
