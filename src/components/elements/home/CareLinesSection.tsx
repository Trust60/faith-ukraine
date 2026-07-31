import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { ConsultationDialog } from "@/components/elements/forms/ConsultationDialog";
import { CareLineCard } from "./CareLineCard";
import {
  CARE_LINES,
  CARE_LINES_SECTION,
  CARE_LINE_PLACEMENT,
} from "./content/care-lines-content";

/** «Оберіть свій догляд FAITH»: 7 карток ліній + CTA на анкету підбору догляду. */
export function CareLinesSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <Reveal>
          <SectionHeading as="h2" align="center">
            {CARE_LINES_SECTION.heading}
          </SectionHeading>
        </Reveal>

        <Reveal
          as="ul"
          cascade
          className="reveal-cascade mx-auto mt-10 grid max-w-[1400px] gap-10 md:mt-12 md:grid-cols-2 md:grid-rows-4 md:gap-x-8 md:gap-y-6"
        >
          {CARE_LINES.map((line, index) => (
            <CareLineCard
              key={line.title}
              line={line}
              className={CARE_LINE_PLACEMENT[index]}
            />
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center md:mt-16">
          <ConsultationDialog triggerLabel={CARE_LINES_SECTION.cta.label} />
        </Reveal>
      </Container>
    </section>
  );
}
