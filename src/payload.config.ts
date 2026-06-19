import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { uk } from "@payloadcms/translations/languages/uk";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { ProductLines } from "@/collections/ProductLines";
import { Products } from "@/collections/Products";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Адмінка лише українською: єдина підтримувана мова — uk, тож навіть стара
  // англійська вподобайка в куках/профілі відкотиться на українську.
  i18n: {
    supportedLanguages: { uk },
    fallbackLanguage: "uk",
  },
  collections: [Users, Media, ProductLines, Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Міграції тримаємо в src/ (увесь код проєкту — там). У dev адаптер за
    // замовчуванням пушить схему напряму (push), у production push вимкнено —
    // схему синхронізують саме ці міграції (build-команда `payload migrate`).
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    // Фото товарів у Supabase Storage (S3-сумісне API). Якщо S3_BUCKET не
    // заданий — плагін вимкнено й Media падає на локальний диск (зручно в dev).
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: {
          // Бакет публічний → віддаємо файли прямо з Supabase CDN, повз
          // access-control Payload, за публічним URL замість приватного S3-ендпоінта.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.S3_PUBLIC_URL}/${prefix ? `${prefix}/${filename}` : filename}`,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        // Обов'язково для S3-сумісних сервісів (Supabase, R2, MinIO):
        // адресація бакета через шлях, а не піддомен.
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
});
