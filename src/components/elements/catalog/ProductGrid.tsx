import { cn } from "@/utils/cn";
import type { TCatalogProduct } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

type TProductGridProps = {
  products: TCatalogProduct[];
  className?: string;
};

// Картки першого екрана — їх фото вантажимо пріоритетно (LCP), решта lazy за замовчуванням.
const PRIORITY_COUNT = 8;

/** Адаптивна сітка карток товарів: 2 колонки на мобільному, 4 — на десктопі. */
export function ProductGrid({ products, className }: TProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < PRIORITY_COUNT} />
        </li>
      ))}
    </ul>
  );
}
