import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import {
  revalidatePartnersAfterChange,
  revalidatePartnersAfterDelete,
} from "@/collections/hooks/revalidatePartners";
import { buildStorageFileURL } from "@/utils/storage";

/**
 * Партнер магазину (СПА, клініка, салон краси…). Картку партнера видно на сторінці
 * «Партнери»: логотип + назва + адреса + телефон. Логотип — це сам файл запису
 * (upload-колекція, як Media), тож завантаження/видалення в Supabase Storage робить
 * плагін s3Storage автоматично. Усі логотипи кладемо в окрему папку бакета `partners/`.
 */
const setPartnerPrefix: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  req,
}) => {
  // Плагін cloud-storage бере поле `prefix` як папку для ключа об'єкта й для
  // видалення — тож при видаленні запису вся папка зникає, без порожніх «хвостів».
  const filename = data?.filename ?? originalDoc?.filename ?? req?.file?.name;
  if (typeof filename === "string" && filename.length > 0) {
    data.prefix = `partners/${filename.replace(/\.[^/.]+$/, "")}`;
  }
  return data;
};

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: {
    singular: "Партнер",
    plural: "Партнери",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "address", "phone"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [setPartnerPrefix],
    afterChange: [revalidatePartnersAfterChange],
    afterDelete: [revalidatePartnersAfterDelete],
  },
  upload: {
    mimeTypes: ["image/*"],
    // adminThumbnail — функцією (прямий публічний URL у Supabase), бо локальний
    // маршрут /api/media/file/... вимкнено через disablePayloadAccessControl. У dev
    // без S3 повертаємо null — Payload бере локальний шлях розміру сам. Як у Media.
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as
        | { card?: { filename?: string | null } }
        | undefined;
      return buildStorageFileURL(
        sizes?.card?.filename,
        doc.prefix as string | null | undefined,
      );
    },
    // Один розмір для логотипа: width без height — sharp зберігає пропорції (логотипи
    // різної форми, ріжемо тільки якщо задати і width, і height). Показуємо object-contain.
    imageSizes: [{ name: "card", width: 600, position: "centre" }],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Назва",
      required: true,
      admin: {
        description:
          "Назва партнера (напр. «TRYFONOVA M.D.»). Використовується і як alt логотипа.",
      },
    },
    {
      name: "address",
      type: "text",
      label: "Адреса",
      required: true,
      admin: {
        description: "Напр. «Київ, вулиця Набережно-Рибальська, 5».",
      },
    },
    {
      name: "phone",
      type: "text",
      label: "Телефон",
      admin: {
        description: "Напр. «+38 097 555 54 54».",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Порядок",
      defaultValue: 0,
      admin: {
        description: "Порядок у списку партнерів (менше число — вище).",
      },
    },
    {
      // Папка в бакеті (= partners/<базове ім'я файлу>). Заповнюється хуком, у UI прихована.
      name: "prefix",
      type: "text",
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};
