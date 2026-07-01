"use client";

import { ArrowDownUp, ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type TSortValue } from "@/utils/catalog-filter";

type TSortSelectProps = {
  value: TSortValue;
  onChange: (value: TSortValue) => void;
};

/**
 * Сортування каталогу — нативний <select> (доступний, з клавіатури й нативним пікером на
 * мобільному «з коробки»). Компактний: іконка сортування зліва + стрілка справа (нативну
 * прибираємо appearance-none). На мобільному ширина обмежена (max-w + truncate), щоб довгий
 * підпис не спричиняв горизонтальний скрол; призначення для скрінрідера — в aria-label.
 */
export function SortSelect({ value, onChange }: TSortSelectProps) {
  return (
    <div className="relative inline-flex min-w-0 items-center">
      <ArrowDownUp
        aria-hidden
        className="pointer-events-none absolute left-3 size-4 text-nav"
      />
      <select
        aria-label="Сортувати каталог"
        value={value}
        onChange={(event) => onChange(event.target.value as TSortValue)}
        className="min-h-11 min-w-0 max-w-[11.5rem] cursor-pointer appearance-none truncate border border-line bg-background py-2 pr-9 pl-9 text-sm text-ink-soft transition-colors hover:border-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:max-w-none sm:text-base"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 size-4 text-nav"
      />
    </div>
  );
}
