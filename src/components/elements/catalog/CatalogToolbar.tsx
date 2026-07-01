"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/utils/cn";
import { SortSelect } from "./SortSelect";
import type { TSortValue } from "@/utils/catalog-filter";

type TCatalogToolbarProps = {
  matchCount: number;
  activeCount: number;
  sort: TSortValue;
  onSortChange: (value: TSortValue) => void;
  onOpenFilters: () => void;
  className?: string;
};

// Українське відмінювання «товар»: 1 → товар, 2–4 → товари, 5+ → товарів (з урахуванням 11–14).
const PRODUCT_FORMS = ["товар", "товари", "товарів"] as const;

function productCountLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const form =
    mod10 === 1 && mod100 !== 11
      ? 0
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 1
        : 2;
  return `${count} ${PRODUCT_FORMS[form]}`;
}

/**
 * Панель над сіткою: кнопка «Фільтри» (лише мобільний — відкриває шторку, з бейджем
 * активних осей), лічильник знайдених товарів (aria-live — озвучується при зміні
 * фільтра) та сортування.
 */
export function CatalogToolbar({
  matchCount,
  activeCount,
  sort,
  onSortChange,
  onOpenFilters,
  className,
}: TCatalogToolbarProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-base text-ink-soft transition-colors hover:border-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
        >
          <SlidersHorizontal aria-hidden className="size-4" />
          Фільтри
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-heading text-xs leading-none text-white">
              {activeCount}
            </span>
          )}
        </button>
        {/* На мобільному ховаємо візуально (лишається для скрінрідера — aria-live озвучує зміну
            кількості); показуємо з sm. Кількість також видно в шторці на кнопці «Показати товари». */}
        <p
          className="sr-only text-base text-nav sm:not-sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {productCountLabel(matchCount)}
        </p>
      </div>

      <SortSelect value={sort} onChange={onSortChange} />
    </div>
  );
}
