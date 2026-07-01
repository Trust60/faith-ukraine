"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { FilterOption } from "./FilterOption";
import type { TFacetOption } from "@/data/catalog";

type TFilterGroupProps = {
  title: string;
  options: TFacetOption[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
  defaultOpen?: boolean;
};

/**
 * Група фільтра (вісь) — розкривна секція: кнопка-заголовок (disclosure з aria-expanded/
 * aria-controls) керує списком чекбоксів. Порожню вісь (немає опцій) не рендеримо.
 * useId дає унікальні id → компонент можна безпечно рендерити двічі (сайдбар + мобільна шторка).
 */
export function FilterGroup({
  title,
  options,
  selectedSlugs,
  onToggle,
  defaultOpen = true,
}: TFilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  if (options.length === 0) return null;

  return (
    <div className="border-b border-line py-4">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-2 text-left font-serif text-lg font-medium text-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {title}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-5 shrink-0 text-nav transition-transform duration-200 motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>

      <div id={panelId} role="group" aria-labelledby={buttonId} hidden={!open}>
        <ul className="mt-1">
          {options.map((option) => (
            <FilterOption
              key={option.slug}
              option={option}
              checked={selectedSlugs.includes(option.slug)}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
