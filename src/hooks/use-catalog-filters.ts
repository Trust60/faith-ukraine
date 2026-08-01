"use client";

import { useMemo, useState } from "react";
import {
  annotateProducts,
  countActive,
  createEmptySelection,
  selectionKey,
  sortProducts,
  toggleSelection,
  type TFilterAxisKey,
  type TSelection,
  type TSortValue,
} from "@/utils/catalog-filter";
import type { TCatalogProduct } from "@/data/catalog";

// Перша пачка та крок «Показати ще». Кратно 4 — рівні ряди на десктопі (xl: 4 колонки).
const INITIAL_VISIBLE = 16;
const LOAD_STEP = 16;
// Скільки товарів першого екрана показувати миттєво (фото priority для LCP, без reveal).
const EAGER_COUNT = 8;

/**
 * Стан фільтрів каталогу: обрані осі, сортування та пагінація «Показати ще».
 * Фільтрація/сортування — клієнтські й миттєві (усі товари вже в пам'яті). Будь-яка
 * зміна фільтра чи сортування скидає пагінацію на першу пачку, щоб не лишалась
 * «діра» з попереднього набору.
 *
 * `urlSelection` (з query-параметрів) не лише стартова: якщо URL зміниться вже після
 * монтування — напр. з пошуку обрали категорію, коли ми ВЖЕ на /catalog — переносимо
 * нову вибірку в стан. Далі фільтри знову живуть у стані клієнта: ручні перемикання
 * URL не чіпають, тож і не скидаються.
 */
export function useCatalogFilters(
  products: TCatalogProduct[],
  urlSelection?: TSelection,
) {
  const [selection, setSelection] = useState<TSelection>(
    () => urlSelection ?? createEmptySelection(),
  );
  const [sort, setSort] = useState<TSortValue>("recommended");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Скидання стану на зміну пропса — прямо під час рендера (рекомендований React-спосіб):
  // без useEffect, тож зайвого кадру зі старим фільтром не буде.
  const urlKey = urlSelection ? selectionKey(urlSelection) : "";
  const [appliedUrlKey, setAppliedUrlKey] = useState(urlKey);
  if (urlKey !== appliedUrlKey) {
    setAppliedUrlKey(urlKey);
    setSelection(urlSelection ?? createEmptySelection());
    setVisibleCount(INITIAL_VISIBLE);
  }

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);
  const { items, matchCount } = useMemo(
    () => annotateProducts(sorted, selection),
    [sorted, selection],
  );

  // Стабільна (незалежна від сортування/фільтра) множина id перших товарів — щоб reveal
  // не перезапускався при перевпорядкуванні й не «мигав».
  const eagerIds = useMemo(
    () => new Set(products.slice(0, EAGER_COUNT).map((product) => product.id)),
    [products],
  );

  const resetVisible = () => setVisibleCount(INITIAL_VISIBLE);

  const toggle = (key: TFilterAxisKey, slug: string) => {
    setSelection((prev) => toggleSelection(prev, key, slug));
    resetVisible();
  };

  const clearAll = () => {
    setSelection(createEmptySelection());
    resetVisible();
  };

  const changeSort = (next: TSortValue) => {
    setSort(next);
    resetVisible();
  };

  const showMore = () => setVisibleCount((count) => count + LOAD_STEP);

  return {
    selection,
    sort,
    items,
    eagerIds,
    matchCount,
    visibleCount,
    activeCount: countActive(selection),
    hasMore: matchCount > visibleCount,
    toggle,
    clearAll,
    changeSort,
    showMore,
  };
}
