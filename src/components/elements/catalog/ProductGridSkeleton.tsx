import { cn } from "@/utils/cn";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { CATALOG_GRID_CLASS } from "./grid";

type TProductGridSkeletonProps = {
  count?: number;
  className?: string;
};

/** Скелетон сітки каталогу — та сама сітка/геометрія, що й CatalogList (без CLS). */
export function ProductGridSkeleton({
  count = 8,
  className,
}: TProductGridSkeletonProps) {
  return (
    <ul
      className={cn(CATALOG_GRID_CLASS, className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
