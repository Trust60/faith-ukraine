import { Container } from "@/ui/Container";
import { PILLARS } from "./content/pillars-content";
import { PillarCard } from "./PillarCard";

/** Секція трьох напрямів бренду: Технології / Патенти / Ексклюзивність. */
export function PillarsSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <ul className="mx-auto grid max-w-[1250px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 xl:gap-16">
          {PILLARS.map((pillar) => (
            <li key={pillar.button.label}>
              <PillarCard
                image={pillar.image}
                text={pillar.text}
                button={pillar.button}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
