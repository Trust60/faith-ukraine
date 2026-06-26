import { cn } from "@/utils/cn";

type TSectionEyebrowProps = {
  tone?: "default" | "invert";
  className?: string;
};

const SQUARE_BASE = "size-1.5";

/**
 * Декоративний «надзаголовок» із чотирьох маленьких квадратиків над заголовком секції
 * (за макетом designs/for-professionals). Суто декоративний — aria-hidden, тож скрінрідер
 * його не озвучує. tone="invert" — світлі квадратики для тёмного фону.
 */
export function SectionEyebrow({
  tone = "default",
  className,
}: TSectionEyebrowProps) {
  const squareClass = cn(
    SQUARE_BASE,
    tone === "invert" ? "bg-white" : "bg-pro-dark",
  );

  return (
    <span aria-hidden="true" className={cn("flex gap-1.5", className)}>
      <span className={squareClass} />
      <span className={squareClass} />
      <span className={squareClass} />
      <span className={squareClass} />
    </span>
  );
}
