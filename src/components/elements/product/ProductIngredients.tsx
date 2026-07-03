import { SectionHeading } from "@/ui/SectionHeading";
import { cn } from "@/utils/cn";

type TIngredient = { name: string; benefit: string | null };

function IngredientItem({ name, benefit }: TIngredient) {
  return (
    <li className="border-l-2 border-brand pl-4 font-serif">
      <span className="font-bold text-ink-soft">{name}</span>
      {benefit && <span className="mt-0.5 block text-ink">{benefit}</span>}
    </li>
  );
}

type TProductIngredientsProps = {
  items: TIngredient[];
  className?: string;
};

/** «Активні компоненти» — ключові інгредієнти товару з їхньою дією. */
export function ProductIngredients({ items, className }: TProductIngredientsProps) {
  return (
    <section className={cn("animate-reveal motion-reduce:animate-none", className)}>
      <SectionHeading as="h2">Активні компоненти</SectionHeading>
      <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <IngredientItem key={item.name} {...item} />
        ))}
      </ul>
    </section>
  );
}
