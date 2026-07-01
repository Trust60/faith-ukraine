"use client";

import type { TFacetOption } from "@/data/catalog";

type TFilterOptionProps = {
  option: TFacetOption;
  checked: boolean;
  onToggle: (slug: string) => void;
};

/**
 * Один рядок фільтра — чекбокс із підписом. Клікабельний весь рядок (label обгортає
 * input), тач-таргет по висоті рядка. Стан кольору чекбокса — accent-color бренду.
 */
export function FilterOption({ option, checked, onToggle }: TFilterOptionProps) {
  return (
    <li>
      <label className="flex cursor-pointer items-center gap-3 py-2.5 text-base text-ink transition-colors hover:text-ink-soft">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(option.slug)}
          className="size-5 shrink-0 cursor-pointer accent-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <span>{option.name}</span>
      </label>
    </li>
  );
}
