import type { TCatalogProduct } from "@/data/catalog";

/** Осі поточного товару, за якими рахуємо схожість (підмножина TProductDetail). */
export type TRelatedSource = {
  id: number;
  lineSlug: string;
  typeSlug: string;
  categorySlug: string;
  concernSlugs: string[];
};

// Ваги сигналів схожості: лінійка домінує (товари однієї лінійки — природні
// «супутники» догляду), далі тип продукту та спільні «Призначення» (з капом,
// щоб багато тегів не переважили лінійку), категорія/зона — слабкий сигнал.
const LINE_SCORE = 100;
const TYPE_SCORE = 20;
const CONCERN_SCORE = 10;
const CONCERN_SCORE_CAP = 30;
const CATEGORY_SCORE = 5;

const scoreSimilarity = (
  current: TRelatedSource,
  candidate: TCatalogProduct,
): number => {
  const sharedConcerns = candidate.concernSlugs.filter((slug) =>
    current.concernSlugs.includes(slug),
  ).length;

  return (
    (candidate.lineSlug === current.lineSlug ? LINE_SCORE : 0) +
    (candidate.typeSlug === current.typeSlug ? TYPE_SCORE : 0) +
    Math.min(sharedConcerns * CONCERN_SCORE, CONCERN_SCORE_CAP) +
    (candidate.categorySlug === current.categorySlug ? CATEGORY_SCORE : 0)
  );
};

/**
 * Топ-N схожих товарів для блоку «Товари, які вам також можуть сподобатись».
 * Тай-брейк — вихідний порядок каталогу (лінійка → порядок товару), тому результат
 * детермінований; якщо збігів менше за N, блок добирається товарами каталогу по порядку.
 */
export function pickRelatedProducts(
  current: TRelatedSource,
  all: TCatalogProduct[],
  count = 4,
): TCatalogProduct[] {
  return all
    .filter((product) => product.id !== current.id)
    .map((product, index) => ({
      product,
      index,
      score: scoreSimilarity(current, product),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map((entry) => entry.product);
}
