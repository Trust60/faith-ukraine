"use client";

import { SlidersHorizontal } from "lucide-react";
import { HighlightedText } from "@/ui/HighlightedText";
import { termHref } from "@/utils/search-terms";
import { SearchRow } from "./SearchRow";
import type { TSearchTerm } from "@/utils/search-terms";

type TSearchTermRowProps = {
  term: TSearchTerm;
  query: string;
  index: number;
  active: boolean;
  optionId: (index: number) => string;
  onActivate: (index: number) => void;
  onSelect: () => void;
};

/** Рядок терміна таксономії: веде в каталог із уже застосованим фільтром. */
export function SearchTermRow({ term, query, ...row }: TSearchTermRowProps) {
  return (
    <SearchRow href={termHref(term)} {...row}>
      <span className="grid size-14 shrink-0 place-items-center text-nav">
        <SlidersHorizontal className="size-5" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm text-ink-soft md:text-base">
          <HighlightedText text={term.name} query={query} />
        </span>
        <span className="block truncate text-xs text-nav md:text-sm">
          {term.axisLabel}
        </span>
      </span>
    </SearchRow>
  );
}
