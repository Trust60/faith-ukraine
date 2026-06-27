"use client";

import { cn } from "@/utils/cn";
import { useReveal } from "@/hooks/use-reveal";
import { ProductCard } from "./ProductCard";
import type { TCatalogProduct } from "@/data/catalog";

type TCatalogItemProps = {
  product: TCatalogProduct;
  priority?: boolean;
  /** Поза першою пачкою — приховано через CSS (лишається в HTML для SEO). */
  collapsed?: boolean;
};

/**
 * Елемент сітки каталогу: <li> з reveal-анімацією (плавна поява при скролі) навколо
 * картки товару. Анімуємо лише opacity/transform (GPU), з повагою до prefers-reduced-motion.
 */
export function CatalogItem({ product, priority, collapsed }: TCatalogItemProps) {
  const { ref, isVisible } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        collapsed && "catalog-collapsed hidden",
      )}
    >
      <ProductCard product={product} priority={priority} />
    </li>
  );
}
