"use client";

import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { searchPageHref } from "@/hooks/use-search";
import { SearchProductRow } from "./SearchProductRow";
import { SearchRow } from "./SearchRow";
import { SearchTermRow } from "./SearchTermRow";
import {
  SearchError,
  SearchLines,
  SearchLoading,
  SearchNoResults,
} from "./SearchStates";
import type { TSearchState } from "@/hooks/use-search";
import type { TIndexStatus } from "@/hooks/use-search-index";
import type { TSearchTerm } from "@/utils/search-terms";

const GROUP_HEADING_CLASS =
  "px-4 pb-1 pt-4 text-xs uppercase tracking-[0.08em] text-nav md:px-5";

type TSearchResultsProps = {
  search: TSearchState;
  status: TIndexStatus;
  /** Лінійки для стартового екрана порожнього запиту. */
  lines: TSearchTerm[];
  listboxId: string;
  optionId: (index: number) => string;
  onSelect: () => void;
};

/**
 * Список результатів: група товарів, група термінів таксономій і рядок «показати
 * всі». Структура listbox → group → option, щоб скрінрідер озвучував і групу,
 * і позицію рядка.
 */
export function SearchResults({
  search,
  status,
  lines,
  listboxId,
  optionId,
  onSelect,
}: TSearchResultsProps) {
  const productsHeadingId = useId();
  const termsHeadingId = useId();

  const { query, products, terms, totalProducts, hasAllRow, activeIndex } =
    search;
  const rowProps = {
    query,
    optionId,
    onActivate: search.setActiveIndex,
    onSelect,
  };

  if (status === "error") return <SearchError />;
  if (status === "loading") return <SearchLoading />;
  if (!query.trim()) return <SearchLines lines={lines} onSelect={onSelect} />;
  if (products.length === 0 && terms.length === 0)
    return <SearchNoResults query={query.trim()} />;

  return (
    <>
      <ul id={listboxId} role="listbox" aria-label="Результати пошуку">
        {products.length > 0 && (
          <li role="presentation">
            <p id={productsHeadingId} className={GROUP_HEADING_CLASS}>
              Товари
            </p>
            <ul role="group" aria-labelledby={productsHeadingId}>
              {products.map((product, position) => (
                <SearchProductRow
                  key={product.slug}
                  product={product}
                  index={position}
                  active={activeIndex === position}
                  {...rowProps}
                />
              ))}
            </ul>
          </li>
        )}

        {terms.length > 0 && (
          <li role="presentation">
            <p id={termsHeadingId} className={GROUP_HEADING_CLASS}>
              Категорії та лінійки
            </p>
            <ul role="group" aria-labelledby={termsHeadingId}>
              {terms.map((term, position) => {
                const index = products.length + position;
                return (
                  <SearchTermRow
                    key={`${term.axis}:${term.slug}`}
                    term={term}
                    index={index}
                    active={activeIndex === index}
                    {...rowProps}
                  />
                );
              })}
            </ul>
          </li>
        )}

        {hasAllRow && (
          <SearchRow
            href={searchPageHref(query)}
            index={products.length + terms.length}
            active={activeIndex === products.length + terms.length}
            optionId={optionId}
            onActivate={search.setActiveIndex}
            onSelect={onSelect}
          >
            <span className="grid size-14 shrink-0 place-items-center text-nav">
              <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="text-sm text-ink-soft md:text-base">
              Показати всі результати ({totalProducts})
            </span>
          </SearchRow>
        )}
      </ul>

      <p aria-live="polite" className="sr-only">
        {`Знайдено товарів: ${totalProducts}`}
      </p>
    </>
  );
}
