"use client";

import { Search, X } from "lucide-react";
import type { KeyboardEvent, RefObject } from "react";
import { ICON_BUTTON_CLASS } from "@/ui/IconButton";

type TSearchInputProps = {
  ref: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** id списку результатів і активного рядка — зв'язок комбобокса зі списком. */
  listboxId: string;
  activeOptionId?: string;
  expanded: boolean;
};

/**
 * Поле пошуку в діалозі. Патерн WAI-ARIA combobox: фокус завжди лишається тут,
 * а «обраний» рядок списку позначається через aria-activedescendant — так набір
 * тексту не переривається навігацією стрілками.
 */
export function SearchInput({
  ref,
  value,
  onChange,
  onKeyDown,
  listboxId,
  activeOptionId,
  expanded,
}: TSearchInputProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 pl-4 md:pl-5">
      <Search className="size-5 shrink-0 text-nav" strokeWidth={1.5} aria-hidden />

      <input
        ref={ref}
        type="text"
        role="combobox"
        aria-label="Пошук по каталогу"
        aria-expanded={expanded}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
        placeholder="Пошук товарів і категорій"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        className="h-14 w-full min-w-0 bg-transparent text-base text-ink-soft outline-none placeholder:text-nav md:h-16 md:text-lg"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Очистити запит"
          className={ICON_BUTTON_CLASS}
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      )}
    </div>
  );
}
