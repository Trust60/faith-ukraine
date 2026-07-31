import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { ConceptCard } from "./ConceptCard";
import { CONCEPT_CARDS, CONCEPT_SECTION } from "./content/concept-content";

/** «Концепція глобальної краси»: чотири напрями бренду в один ряд на десктопі. */
export function BeautyConceptSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <Reveal>
          <SectionHeading as="h2" align="center">
            {CONCEPT_SECTION.heading}
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-4xl text-center font-serif text-base leading-relaxed text-ink md:text-lg">
            {CONCEPT_SECTION.subheading}
          </p>
        </Reveal>

        <Reveal
          as="ul"
          cascade
          className="reveal-cascade mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-10"
        >
          {CONCEPT_CARDS.map((card) => (
            <ConceptCard key={card.title} card={card} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
