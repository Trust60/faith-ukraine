/**
 * Публічний URL об'єкта в бакеті Supabase Storage (папка `prefix` + ім'я файлу).
 * Єдине джерело правди для побудови URL файлів медіа — використовується і в
 * `generateFileURL` плагіна s3 (оригінал + розміри), і в `adminThumbnail` Media.
 *
 * Повертає `null`, якщо S3 не налаштовано (немає `S3_PUBLIC_URL`, напр. dev на
 * локальному диску) або немає імені файлу — тоді Payload віддає файл власним
 * маршрутом замість CDN.
 */
export const buildStorageFileURL = (
  filename?: string | null,
  prefix?: string | null,
): string | null => {
  const base = process.env.S3_PUBLIC_URL;
  if (!base || !filename) return null;
  return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`;
};
