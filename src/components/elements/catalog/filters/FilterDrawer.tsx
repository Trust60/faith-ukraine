"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/ui/IconButton";
import { OutlineButton } from "@/ui/OutlineButton";

type TFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  matchCount: number;
  children: ReactNode;
};

/**
 * Мобільна шторка фільтрів (до lg): напівпрозоре тло + висувна панель зліва.
 * Escape закриває, скрол сторінки блокується поки відкрита. Коли закрита — `inert`
 * прибирає її контент із tab-порядку/скрінрідера (панель лишається в DOM для анімації).
 * Знизу — кнопка «Показати товари (N)», що застосовує (закриває) поточний фільтр.
 */
export function FilterDrawer({ open, onClose, matchCount, children }: TFilterDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    // Блокуємо скрол фону поки шторка відкрита. На мобільному кореневий скролер — часто
    // <html>, тож замикаємо і його, і <body> (лише body іноді не спиняє прокрутку).
    const { documentElement, body } = document;
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      documentElement.style.overflow = "";
      body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className="lg:hidden">
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Фільтри каталогу"
        inert={!open}
        className={cn(
          // h-dvh (dynamic viewport height) замість inset-y-0 — 100vh на мобільному вищий за
          // видиму область (адресний рядок браузера), через що футер із кнопкою вилазив за екран.
          "fixed top-0 left-0 z-50 flex h-dvh w-11/12 max-w-sm flex-col bg-background shadow-xl transition-transform duration-300 will-change-transform motion-reduce:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-end border-b border-line px-4 py-3">
          <IconButton aria-label="Закрити фільтри" onClick={onClose}>
            <X className="size-6" strokeWidth={1.5} aria-hidden />
          </IconButton>
        </div>

        {/* min-h-0 дозволяє цій зоні стискатись і скролитись, а не виштовхувати футер за екран. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-2">{children}</div>

        {/* Нижній safe-area inset (домашній індикатор iPhone) — щоб кнопка не ховалась під ним. */}
        <div className="shrink-0 border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <OutlineButton onClick={onClose} className="w-full">
            Показати товари ({matchCount})
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}
