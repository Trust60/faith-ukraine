/**
 * Теги кешу ISR-сторінок (unstable_cache). Інвалідуються з адмінки через revalidateTag
 * у хуках колекцій (revalidateCatalog / revalidatePartners).
 *
 * Винесені в окремий leaf-модуль без payload-імпортів навмисно: хуки колекцій тягнуть
 * лише тег-рядок, а не весь data-шар. Інакше виникає цикл імпортів
 * (payload.config → колекція → хук → @/data/* → getPayloadClient → @payload-config),
 * через який збірка падає з TDZ «Cannot access ... before initialization».
 */
export const CATALOG_CACHE_TAG = "catalog";
export const PARTNERS_CACHE_TAG = "partners";
