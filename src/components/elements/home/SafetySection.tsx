import Image from "next/image";
import { Container } from "@/ui/Container";
import { DiagonalPanel } from "@/ui/DiagonalPanel";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { CheckItem } from "./CheckItem";
import {
  SAFETY_AWARD,
  SAFETY_HEADING,
  SAFETY_ITEMS,
  SAFETY_STANDARD_LOGO,
} from "./content/safety-content";

/**
 * «Абсолютна безпека, гарантія якості»: список гарантій на світлій панелі з діагональним
 * зрізом ліворуч, нагорода — праворуч на білому. Нагорода лише з lg (як у макетах).
 */
export function SafetySection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-16 lg:min-h-[715px]">
      <DiagonalPanel className="bg-panel" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] lg:gap-8">
        <Reveal className="max-w-[620px] lg:pl-[6%]">
          <SectionHeading as="h2">{SAFETY_HEADING}</SectionHeading>
          <ul className="mt-8 flex flex-col gap-6 md:mt-10 md:gap-7">
            {SAFETY_ITEMS.map((item) => (
              <CheckItem key={item.title} item={item} />
            ))}
          </ul>
          <Image
            src={SAFETY_STANDARD_LOGO.src}
            alt={SAFETY_STANDARD_LOGO.alt}
            width={SAFETY_STANDARD_LOGO.width}
            height={SAFETY_STANDARD_LOGO.height}
            sizes="(min-width: 1024px) 160px, 144px"
            className="mx-auto mt-10 h-auto w-[9rem] md:mt-12 lg:w-[10rem]"
          />
        </Reveal>

        <Reveal as="figure" className="hidden flex-col items-center lg:flex">
          <Image
            src={SAFETY_AWARD.image.src}
            alt={SAFETY_AWARD.image.alt}
            width={SAFETY_AWARD.image.width}
            height={SAFETY_AWARD.image.height}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="h-auto w-[26.25rem] max-w-full"
          />
          <figcaption className="mt-6 max-w-[24rem] text-center font-serif text-base leading-relaxed text-ink">
            {SAFETY_AWARD.caption}
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
