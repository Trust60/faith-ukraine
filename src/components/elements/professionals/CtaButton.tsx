import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type TCtaButtonProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Кнопка заклику до співпраці. Поки візуальний плейсхолдер: форму заявки власник опише
 * окремо — тоді під'єднаємо обробник/перехід. Тач-таргет ≥44px, видимий фокус.
 */
export function CtaButton({ children, className }: TCtaButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 items-center justify-center border border-heading px-8 py-3 font-serif text-base md:text-lg font-bold tracking-[0.08em] text-heading transition-colors hover:bg-heading hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
    >
      {children}
    </button>
  );
}
