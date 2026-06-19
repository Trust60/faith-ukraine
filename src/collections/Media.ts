import type { CollectionConfig } from "payload";

/**
 * Зображення товарів. Зараз — локальне сховище; пізніше перемкнемо на Supabase
 * Storage через плагін @payloadcms/storage-s3 (без змін у схемі).
 */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Альтернативний текст для доступності (a11y) та SEO.",
      },
    },
  ],
};
