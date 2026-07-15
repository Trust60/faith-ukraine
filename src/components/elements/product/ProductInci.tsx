import { SectionHeading } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";

type TProductInciProps = {
  text: string;
  className?: string;
};

/** Повний склад (INCI) англійською — секція в одному стилі з «Опис» і «Спосіб застосування». */
export function ProductInci({ text, className }: TProductInciProps) {
  return (
    <section
      className={cn("animate-reveal motion-reduce:animate-none", className)}
    >
      <SectionHeading as="h2">Ingredients / INCI</SectionHeading>
      <p className="mt-6 font-serif leading-relaxed text-ink text-justify">
        {text}
      </p>
    </section>
  );
}
