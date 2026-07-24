import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { ExclusivityDocument } from "./ExclusivityDocument";
import {
  EXCLUSIVITY_DOCUMENTS,
  EXCLUSIVITY_HEADING,
} from "./content/exclusivity-content";

/** Секція «Ексклюзивність»: офіційні документи, що підтверджують права на бренд FAITH в Україні. */
export function ExclusivitySection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <SectionHeading as="h1" align="center">
          {EXCLUSIVITY_HEADING}
        </SectionHeading>
        <ul className="mx-auto mt-8 grid max-w-5xl gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {EXCLUSIVITY_DOCUMENTS.map((doc, index) => (
            <li key={doc.src}>
              <ExclusivityDocument {...doc} priority={index === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
