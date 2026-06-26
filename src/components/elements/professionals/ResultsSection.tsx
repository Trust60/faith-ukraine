import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { RESULTS } from "./content/care-content";
import { ResultCase } from "./ResultCase";

/** Секція «Результати»: сітка кейсів «до/після» (3 колонки на десктопі). */
export function ResultsSection() {
  return (
    <Container>
      <section>
        <SectionHeading as="h2" align="center" className="mt-10 md:mt-15">
          {RESULTS.heading}
        </SectionHeading>
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {RESULTS.cases.map((resultCase) => (
            <li key={resultCase.src}>
              <ResultCase
                src={resultCase.src}
                alt={resultCase.alt}
                caption={resultCase.caption}
              />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
