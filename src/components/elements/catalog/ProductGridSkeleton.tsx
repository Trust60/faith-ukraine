import { cn } from "@/utils/cn";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

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
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12",
        className,
      )}
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
