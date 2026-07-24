import Link from "next/link";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { DIRECTIONS, DIRECTIONS_SECTION } from "./content/directions-content";
import { DirectionRow } from "./DirectionRow";

/** Секція «Як FAITH допомагає досягти бездоганного вигляду»: 4 напрями дії + CTA. */
export function DirectionsSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <SectionHeading as="h2" align="center">
          {DIRECTIONS_SECTION.heading}
        </SectionHeading>
        <ul className="mt-10 flex flex-col gap-10 md:mt-14 md:gap-12">
          {DIRECTIONS.map((direction) => (
            <li key={direction.label}>
              <DirectionRow
                image={direction.image}
                label={direction.label}
                text={direction.text}
              />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center md:mt-16">
          <Link href={DIRECTIONS_SECTION.cta.href} className={OUTLINE_BUTTON_CLASS}>
            {DIRECTIONS_SECTION.cta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
