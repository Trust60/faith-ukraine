import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
} from "payload";
import { PARTNERS_CACHE_TAG } from "@/data/cache-tags";

/**
 * Інвалідує кеш партнерів (unstable_cache, тег PARTNERS_CACHE_TAG) після зміни/видалення
 * партнера — сторінка «Партнери» оновлюється майже одразу.
 * context.disableRevalidate вимикає ревалідацію поза реквест-контекстом (напр. seed).
 */
function revalidatePartners({ payload, context }: PayloadRequest) {
  if (context.disableRevalidate) return;
  payload.logger.info(`Ревалідація партнерів (тег: ${PARTNERS_CACHE_TAG})`);
  // "max" — stale-while-revalidate: відвідувач одразу бачить кеш, свіжі дані
  // підтягуються у фоні (рекомендований режим для контент-сторінок).
  revalidateTag(PARTNERS_CACHE_TAG, "max");
}

export const revalidatePartnersAfterChange: CollectionAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidatePartners(req);
  return doc;
};

export const revalidatePartnersAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  revalidatePartners(req);
  return doc;
};
