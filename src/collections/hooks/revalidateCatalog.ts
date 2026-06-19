import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
} from "payload";
import { CATALOG_CACHE_TAG } from "@/data/catalog";

/**
 * Інвалідує кеш каталогу (unstable_cache, тег CATALOG_CACHE_TAG) після зміни/видалення
 * товару, лінійки або зображення — ISR-сторінка каталогу оновлюється майже одразу.
 * context.disableRevalidate вимикає ревалідацію поза реквест-контекстом (напр. seed).
 */
function revalidateCatalog({ payload, context }: PayloadRequest) {
  if (context.disableRevalidate) return;
  payload.logger.info(`Ревалідація каталогу (тег: ${CATALOG_CACHE_TAG})`);
  // "max" — stale-while-revalidate: відвідувач одразу бачить кеш, свіжі дані
  // підтягуються у фоні (рекомендований режим для контент-каталогу).
  revalidateTag(CATALOG_CACHE_TAG, "max");
}

export const revalidateCatalogAfterChange: CollectionAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidateCatalog(req);
  return doc;
};

export const revalidateCatalogAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  revalidateCatalog(req);
  return doc;
};
