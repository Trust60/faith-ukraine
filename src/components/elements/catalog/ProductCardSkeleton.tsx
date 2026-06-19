import { cn } from "@/utils/cn";
import { Skeleton } from "@/ui/Skeleton";

type TProductCardSkeletonProps = {
  className?: string;
};

/**
 * Скелетон картки товару — та сама геометрія, що й ProductCard (aspect-[3/4] + рядок
 * назви), щоб не було зсуву макета (CLS). Фото й назва — окремі Skeleton-блоки з
 * shimmer-переливанням; за prefers-reduced-motion лишається статичне тло.
 */
export function ProductCardSkeleton({ className }: TProductCardSkeletonProps) {
  return (
    <div className={cn("flex flex-col", className)} aria-hidden="true">
      <Skeleton className="mb-4 aspect-[3/4] w-full" />
      <Skeleton className="mx-auto mt-1 h-4 w-2/3 rounded md:h-5" />
    </div>
  );
}
