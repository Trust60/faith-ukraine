import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { PROBLEMS } from "./content/intro-content";
import { BulletItem } from "./BulletItem";

/** Секція «Які проблеми вирішує FAITH»: світло-блакитнувате тло (bg-surface), вступ + переліки. */
export function ProblemsSection() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <Container>
        <SectionHeading as="h2" eyebrow>
          {PROBLEMS.heading}
        </SectionHeading>

        <p className="mt-6 font-serif text-lg leading-relaxed text-ink md:text-xl">
          {PROBLEMS.intro}
        </p>

        <p className="mt-6 font-serif text-lg font-semibold text-ink-soft">
          {PROBLEMS.conditionsLead}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-brand">
          {PROBLEMS.conditions.map((condition) => (
            <BulletItem
              key={condition.term}
              term={condition.term}
              text={condition.text}
            />
          ))}
        </ul>

        <p className="mt-8 font-serif text-lg font-semibold text-ink-soft">
          {PROBLEMS.benefitsLead}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-brand">
          {PROBLEMS.benefits.map((benefit) => (
            <BulletItem key={benefit.slice(0, 32)} text={benefit} />
          ))}
        </ul>

        <p className="mt-8 font-serif text-lg leading-relaxed text-ink md:text-xl">
          {PROBLEMS.closing}
        </p>
      </Container>
    </section>
  );
}
