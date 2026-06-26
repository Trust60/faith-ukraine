import { PartnerCardSkeleton } from "./PartnerCardSkeleton";

type TPartnersGridSkeletonProps = {
  count?: number;
};

/** Скелетон сітки партнерів — та сама сітка/геометрія, що й PartnersGrid (без CLS). */
export function PartnersGridSkeleton({
  count = 8,
}: TPartnersGridSkeletonProps) {
  return (
    <ul
      className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <PartnerCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
