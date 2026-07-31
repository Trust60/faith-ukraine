import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { SectionEyebrow } from "@/ui/SectionEyebrow";

type TSectionHeadingProps = {
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "default" | "invert";
  eyebrow?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Базовий стиль заголовків секцій: дисплейний шрифт Bebas, uppercase, 35px на десктопі.
 * Експортуємо окремо — щоб застосувати до чужого елемента (напр. Dialog.Title з Radix,
 * який сам рендерить заголовок і має отримати власні aria-звʼязки).
 */
export const SECTION_HEADING_CLASS =
  "font-display text-[28px]/[30px] uppercase tracking-[0.02em] md:text-[35px]";

/**
 * Заголовок секції сторінки «Для професіоналів»: дисплейний шрифт + опційний декоративний
 * «надзаголовок» (квадратики). tone="invert" — білий текст для тёмного фону; align керує
 * вирівнюванням заголовка й квадратиків.
 */
export function SectionHeading({
  as = "h2",
  align = "left",
  tone = "default",
  eyebrow = false,
  children,
  className,
}: TSectionHeadingProps) {
  const Heading = as;

  return (
    <div className={cn(align === "center" && "flex flex-col items-center")}>
      {eyebrow && <SectionEyebrow tone={tone} className="mb-4" />}
      <Heading
        className={cn(
          SECTION_HEADING_CLASS,
          tone === "invert" ? "text-white" : "text-heading",
          align === "center" && "text-center",
          className,
        )}
      >
        {children}
      </Heading>
    </div>
  );
}
