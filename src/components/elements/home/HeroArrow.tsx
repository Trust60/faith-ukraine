"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

type THeroArrowProps = {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
};

/**
 * Стрілка перемикання слайдів hero. Кольори — як у WP: на мобільному стрілки лежать
 * поверх кадру й потребують білого (text-white/80), з md фото ширше й світліше, тому
 * стрілка сіра (text-ink/70 ≈ #8c8d8e з макета).
 */
export function HeroArrow({ direction, label, onClick }: THeroArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:size-20 md:text-ink/70 md:hover:text-ink lg:size-28",
        direction === "prev" ? "left-0 md:left-2" : "right-0 md:right-2",
      )}
    >
      <Icon
        className="size-10 md:size-16 lg:size-24"
        strokeWidth={1}
        aria-hidden="true"
      />
    </button>
  );
}
