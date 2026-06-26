import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { TERMS } from "./content/intro-content";

/** Секція «Умови співпраці»: світло-блакитнувате тло (bg-surface), h1 + вступні абзаци. */
export function TermsSection() {
  return (
    <section className="bg-surface py-10 md:py-16">
      <Container>
        <SectionHeading as="h1" eyebrow>
          {TERMS.heading}
        </SectionHeading>
        <div className="mt-6 space-y-5">
          {TERMS.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="font-serif text-lg leading-relaxed text-ink md:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
