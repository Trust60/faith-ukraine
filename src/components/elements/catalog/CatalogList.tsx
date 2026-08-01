"use client";

import { OutlineButton } from "@/ui/OutlineButton";
import { CatalogItem } from "./CatalogItem";
import { CATALOG_GRID_CLASS } from "./grid";
import type { TCatalogItem } from "@/utils/catalog-filter";

type TCatalogListProps = {
  items: TCatalogItem[];
  /** id товарів першого екрана — показуються миттєво (priority-фото, без reveal). */
  eagerIds: Set<number>;
  matchCount: number;
  visibleCount: number;
  hasMore: boolean;
  onShowMore: () => void;
  onClearAll: () => void;
};

/**
 * Сітка каталогу. Усі товари завжди в HTML (для SEO — краулер бачить усі посилання);
 * ті, що не проходять фільтр або поза поточною пачкою, приховані через CSS (display:none —
 * не займають клітинку, тож пропусків у сітці немає за будь-яких фільтрів/сортування).
 * Кнопка «Показати ще» лише збільшує пачку — без запиту до сервера. Коли нічого не
 * знайдено — показуємо порожній стан із можливістю скинути фільтри.
 */
export function CatalogList({
  items,
  eagerIds,
  matchCount,
  visibleCount,
  hasMore,
  onShowMore,
  onClearAll,
}: TCatalogListProps) {
  return (
    <div>
      {/* Без JS показуємо всі товари й ховаємо неробочі кнопки (прогресивне покращення). */}
      <noscript>
        <style>{`.catalog-collapsed{display:block!important}.catalog-show-more{display:none!important}`}</style>
      </noscript>

      {matchCount === 0 && (
        <div className="py-16 text-center">
          <p className="text-nav">За обраними фільтрами товарів не знайдено.</p>
          <button
            type="button"
            onClick={onClearAll}
            className="mt-3 text-base text-ink-soft underline underline-offset-4 transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Скинути фільтри
          </button>
        </div>
      )}

      <ul className={CATALOG_GRID_CLASS}>
        {items.map((item) => (
          <CatalogItem
            key={item.product.id}
            product={item.product}
            eager={eagerIds.has(item.product.id)}
            collapsed={!item.matches || item.matchIndex >= visibleCount}
          />
        ))}
      </ul>

      {hasMore && (
        <div className="catalog-show-more mt-12 flex justify-center md:mt-16">
          <OutlineButton onClick={onShowMore}>Показати ще</OutlineButton>
        </div>
      )}
    </div>
  );
}
