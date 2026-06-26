import { Container } from "@/ui/Container";
import { SectionEyebrow } from "@/ui/SectionEyebrow";
import { SectionHeading } from "@/ui/SectionHeading";
import { LOYALTY } from "./content/intro-content";
import { LoyaltyCard } from "./LoyaltyCard";

/** Світлі картки за макетом стоять по діагоналі (позиції 0 і 3) у сітці 2×2. */
function getCardVariant(index: number): "light" | "dark" {
  return index % 3 === 0 ? "light" : "dark";
}

/** Секція «Програма лояльності»: тёмна повноширинна смуга, сітка 2×2 із карток переваг. */
export function LoyaltySection() {
  return (
    <section className="bg-pro-dark py-16 md:py-24">
      <Container>
        <SectionEyebrow tone="invert" />
        <SectionHeading as="h2" align="center" tone="invert" className="mt-10">
          {LOYALTY.heading}
        </SectionHeading>

        {/* Усі 4 плитки в одній спільній білій рамці: border-[3px] — товста зовнішня рамка,
            gap-px на тлі bg-white/90 — тонкі білі лінії-роздільники між плитками. */}
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-px border-[3px] border-white/90 bg-white/90 sm:grid-cols-2 md:mt-16">
          {LOYALTY.cards.map((card, index) => (
            <li key={card.title}>
              <LoyaltyCard
                icon={card.icon}
                title={card.title}
                text={card.text}
                variant={getCardVariant(index)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
