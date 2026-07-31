"use client";

import { cn } from "@/utils/cn";
import { HERO_LABELS } from "./content/hero-content";

type THeroDotsProps = {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

type THeroDotProps = {
  index: number;
  total: number;
  isActive: boolean;
  onSelect: (index: number) => void;
};

function HeroDot({ index, total, isActive, onSelect }: THeroDotProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-label={HERO_LABELS.dot(index, total)}
        aria-current={isActive ? "true" : undefined}
        className="grid size-11 cursor-pointer place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span
          className={cn(
            "size-2 rounded-full transition-colors",
            isActive ? "bg-ink-soft" : "bg-ink/35",
          )}
        />
      </button>
    </li>
  );
}

/** Точки-індикатори hero. Тач-таргет 44px, сама точка — 8px (як у макеті). */
export function HeroDots({ count, selectedIndex, onSelect }: THeroDotsProps) {
  return (
    <ul className="absolute inset-x-0 bottom-1 z-10 flex justify-center md:bottom-3">
      {Array.from({ length: count }, (_, index) => (
        <HeroDot
          key={index}
          index={index}
          total={count}
          isActive={index === selectedIndex}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
