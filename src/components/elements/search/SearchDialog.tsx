"use client";

import { Dialog } from "radix-ui";
import { Search } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ICON_BUTTON_CLASS } from "@/ui/IconButton";
import { useSearch } from "@/hooks/use-search";
import { prefetchSearchIndex, useSearchIndex } from "@/hooks/use-search-index";
import { SearchHints } from "./SearchHints";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

/**
 * Пошук по каталогу — командна палітра з хедера (іконка або Ctrl/⌘+K).
 * Radix Dialog бере на себе фокус-трап, Escape, блокування скролу й aria-звʼязки.
 * Індекс вантажиться лениво (перше відкриття) і прогрівається ще на наведенні
 * курсора — тож до кінця анімації дані вже на місці.
 * Мобільний — на весь екран, десктоп — панель зверху по центру.
 */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const optionId = useCallback(
    (index: number) => `${listboxId}-option-${index}`,
    [listboxId],
  );

  const close = useCallback(() => setOpen(false), []);
  const { index, status } = useSearchIndex(open);
  const search = useSearch(index, close);
  const { changeQuery } = search;

  // Наступне відкриття має починатися з чистого аркуша.
  useEffect(() => {
    if (!open) changeQuery("");
  }, [open, changeQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // code, а не key: на кириличній розкладці Ctrl+K дає «л».
      if (event.code !== "KeyK" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      prefetchSearchIndex();
      setOpen(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const lines = useMemo(
    () => index?.terms.filter((term) => term.axis === "lines") ?? [],
    [index],
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Пошук товарів"
        onPointerEnter={prefetchSearchIndex}
        onFocus={prefetchSearchIndex}
        className={ICON_BUTTON_CLASS}
      >
        <Search className="size-5" strokeWidth={1.5} aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50 data-[state=open]:animate-in data-[state=open]:fade-in motion-reduce:animate-none" />

        <Dialog.Content
          // Фокус одразу в поле, а не на першому фокусованому елементі вікна.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-background focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in motion-reduce:animate-none sm:inset-auto sm:left-1/2 sm:top-[10vh] sm:h-auto sm:max-h-[70dvh] sm:w-[calc(100vw-2rem)] sm:max-w-[40rem] sm:-translate-x-1/2 sm:shadow-card sm:data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">Пошук по сайту</Dialog.Title>
          <Dialog.Description className="sr-only">
            Введіть назву товару, лінійки або призначення. Результати оновлюються
            під час набору.
          </Dialog.Description>

          <div className="flex shrink-0 items-center border-b border-line">
            <SearchInput
              ref={inputRef}
              value={search.query}
              onChange={search.changeQuery}
              onKeyDown={search.onKeyDown}
              listboxId={listboxId}
              activeOptionId={
                search.activeIndex >= 0 ? optionId(search.activeIndex) : undefined
              }
              expanded={search.rowCount > 0}
            />
            {/* На мобільному вікно на весь екран — клікнути «повз» нікуди. */}
            <Dialog.Close className="min-h-11 shrink-0 px-4 text-sm text-nav transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:hidden">
              Скасувати
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <SearchResults
              search={search}
              status={status}
              lines={lines}
              listboxId={listboxId}
              optionId={optionId}
              onSelect={close}
            />
          </div>

          <SearchHints />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
