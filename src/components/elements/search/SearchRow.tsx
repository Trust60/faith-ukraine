"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type TSearchRowProps = {
  /** Наскрізний номер рядка — ним керує навігація стрілками. */
  index: number;
  active: boolean;
  href: string;
  optionId: (index: number) => string;
  onActivate: (index: number) => void;
  onSelect: () => void;
  children: ReactNode;
};

/**
 * Оболонка рядка результату: пункт listbox із посиланням усередині.
 * Фокус лишається в полі вводу (навігація через aria-activedescendant), тож
 * «обраність» показуємо тлом, а не фокус-кільцем. Наведення мишею синхронізує
 * обраний рядок із курсором — як в командних палітрах.
 */
export function SearchRow({
  index,
  active,
  href,
  optionId,
  onActivate,
  onSelect,
  children,
}: TSearchRowProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // "nearest" нічого не робить, якщо рядок уже видно — тому наведення мишею
    // список не смикає, а стрілки докручують його до наступного рядка.
    if (active) ref.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <li
      ref={ref}
      id={optionId(index)}
      role="option"
      aria-selected={active}
      onPointerMove={() => onActivate(index)}
    >
      <Link
        href={href}
        onClick={onSelect}
        tabIndex={-1}
        className={cn(
          "flex min-h-11 items-center gap-3 px-4 py-2.5 transition-colors md:px-5",
          active && "bg-muted",
        )}
      >
        {children}
      </Link>
    </li>
  );
}
