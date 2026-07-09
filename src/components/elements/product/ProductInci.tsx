import { cn } from "@/utils/cn";

type TProductInciProps = {
  text: string;
  className?: string;
};

/**
 * Повний склад (INCI) англійською — довідковий дрібний блок наприкінці опису товару.
 * Свідомо неакцентований: без дисплейного SectionHeading, приглушений сірий текст.
 */
export function ProductInci({ text, className }: TProductInciProps) {
  return (
    <section className={cn("animate-reveal motion-reduce:animate-none", className)}>
      <h2 className="font-serif text-xs font-semibold tracking-[0.12em] text-ink uppercase">
        Ingredients (INCI)
      </h2>
      <p className="mt-3 max-w-[70ch] font-serif text-sm leading-relaxed text-ink">
        {text}
      </p>
    </section>
  );
}
