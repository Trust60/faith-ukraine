import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

/** Базові стилі контурної кнопки бренду (CTA): рамка + серіфний жирний текст, заливка на ховері. */
export const OUTLINE_BUTTON_CLASS =
  "inline-flex min-h-11 cursor-pointer items-center justify-center border border-heading px-8 py-3 font-serif text-base font-bold tracking-[0.08em] text-heading transition-colors hover:bg-heading hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:text-lg";

type TOutlineButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Контурна кнопка-заклик — як CTA наприкінці сторінки «Для професіоналів». Єдине
 * джерело правди для цього стилю; переиспользуем у CTA співпраці та «Показати ще»
 * в каталозі. Тач-таргет ≥44px (min-h-11), видимий фокус, курсор-pointer.
 */
export function OutlineButton({
  className,
  type = "button",
  ...props
}: TOutlineButtonProps) {
  return (
    <button
      type={type}
      className={cn(OUTLINE_BUTTON_CLASS, className)}
      {...props}
    />
  );
}
