import { Skeleton } from "@/ui/Skeleton";

/** Скелетон картки партнера — та сама геометрія, що й PartnerCard (без CLS). */
export function PartnerCardSkeleton() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <Skeleton className="h-[150px] w-[150px] rounded-[16px] lg:h-[235px] lg:w-[286px]" />
      <Skeleton className="mt-5 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-5/6" />
      <Skeleton className="mt-2 h-3 w-1/2" />
    </div>
  );
}
