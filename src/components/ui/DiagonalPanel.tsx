import { cn } from "@/utils/cn";

type TDiagonalPanelProps = {
  /** Клас кольору фону панелі. */
  className?: string;
};

/**
 * Декоративна підложка секції з діагональним правим краєм — «зріз», як у макетах
 * головної. Координати полігону взяті з desktop-design-5: край іде від 56% ширини
 * зверху до 41% знизу. На мобільному діагоналі немає (панель займає всю смугу).
 */
export function DiagonalPanel({ className }: TDiagonalPanelProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 lg:[clip-path:polygon(0_0,56%_0,41%_100%,0_100%)]",
        className,
      )}
    />
  );
}
