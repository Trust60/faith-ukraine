"use client";

import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useReveal } from "@/hooks/use-reveal";

type TRevealProps = {
  children: ReactNode;
  /** Тег обгортки — щоб не ламати grid/list-розкладку батька (`ul`, `figure`…). */
  as?: ElementType;
  /**
   * Анімувати не сам блок, а його прямих дітей — по черзі. Додай до `className`
   * утиліту `reveal-cascade` (див. globals.css).
   */
  cascade?: boolean;
  className?: string;
};

const HIDDEN_CLASS = "translate-y-6 opacity-0";
const SHOWN_CLASS =
  "translate-y-0 opacity-100 transition-[opacity,transform] duration-700 ease-out";

/** Плавна поява блока при скролі. Логіка — у хуку `useReveal`. */
export function Reveal({
  children,
  as,
  cascade = false,
  className,
}: TRevealProps) {
  const Tag: ElementType = as ?? "div";
  const { ref, state } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={cn(
        !cascade && state === "hidden" && HIDDEN_CLASS,
        !cascade && state === "shown" && SHOWN_CLASS,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
