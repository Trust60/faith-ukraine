import { SectionHeading } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";

// Одна строка textarea = один компонент; зайві маркери (•, -, –, *) зі вставленого
// тексту прибираємо, порожні рядки відкидаємо.
function parseActiveComponents(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s•\-–*]+/, "").trim())
    .filter(Boolean);
}

type TActiveComponentItemProps = { text: string };

function ActiveComponentItem({ text }: TActiveComponentItemProps) {
  return <li className="mt-1.5 first:mt-0">{text}</li>;
}

type TProductActiveComponentsProps = {
  text: string;
  className?: string;
};

/** «Активні компоненти» — маркований список, по одному компоненту на рядок. */
export function ProductActiveComponents({ text, className }: TProductActiveComponentsProps) {
  const items = parseActiveComponents(text);
  if (items.length === 0) return null;

  return (
    <section className={cn("animate-reveal motion-reduce:animate-none", className)}>
      <SectionHeading as="h2">Активні компоненти</SectionHeading>
      <ul className="mt-6 list-disc pl-6 font-serif leading-relaxed text-ink">
        {items.map((item) => (
          <ActiveComponentItem key={item} text={item} />
        ))}
      </ul>
    </section>
  );
}
