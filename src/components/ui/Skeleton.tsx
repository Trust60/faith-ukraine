import { cn } from "@/utils/cn";

type TSkeletonProps = {
  className?: string;
};

/**
 * Базовий скелетон-плейсхолдер з shimmer-переливанням. Тло — bg-muted, поверх нього
 * градієнтна смуга (псевдоелемент ::before), що рухається лише через transform
 * (translateX) — GPU-композит, без repaint/layout. За prefers-reduced-motion смуга
 * ховається, лишається статичне сіре тло.
 */
export function Skeleton({ className }: TSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:content-['']",
        "before:bg-linear-to-r before:from-transparent before:via-black/[0.06] before:to-transparent",
        "motion-reduce:before:hidden",
        className,
      )}
    />
  );
}
