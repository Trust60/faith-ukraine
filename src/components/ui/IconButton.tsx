import { cloneElement, isValidElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

/** Базові стилі круглої іконочної кнопки (40×40, фокус-кільце бренду). */
export const ICON_BUTTON_CLASS =
  "grid size-10 place-items-center rounded-full text-nav transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type TIconButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Перенести стилі на єдиний дочірній елемент (напр. <Link>) замість <button>. */
  asChild?: boolean;
};

/**
 * Кругла іконочна кнопка — єдине джерело правди для іконок у хедері/меню.
 * За замовчуванням рендерить <button type="button">; з `asChild` додає стилі
 * до дочірнього елемента (інші пропси кладемо прямо на нього).
 */
export function IconButton({
  asChild,
  className,
  children,
  type = "button",
  ...props
}: TIconButtonProps) {
  const classes = cn(ICON_BUTTON_CLASS, className);

  if (asChild && isValidElement<{ className?: string }>(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
