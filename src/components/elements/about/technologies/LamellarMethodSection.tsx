import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { StoryParagraph } from "../StoryParagraph";
import {
  LAMELLAR_DIAGRAM,
  LAMELLAR_HEADING,
  LAMELLAR_INTRO,
  LAMELLAR_SUMMARY,
  SKIN_COMPARISON,
} from "./content/lamellar-content";

/** Секція «Ламелярний метод краси»: діаграми ламелярної структури + опис корнеотерапії. */
export function LamellarMethodSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <SectionHeading as="h2">{LAMELLAR_HEADING}</SectionHeading>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="flex flex-col gap-6">
            <Image
              src={LAMELLAR_DIAGRAM.src}
              alt={LAMELLAR_DIAGRAM.alt}
              width={LAMELLAR_DIAGRAM.width}
              height={LAMELLAR_DIAGRAM.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-[8px]"
            />
            <StoryParagraph paragraph={LAMELLAR_INTRO} />
          </div>
          <Image
            src={SKIN_COMPARISON.src}
            alt={SKIN_COMPARISON.alt}
            width={SKIN_COMPARISON.width}
            height={SKIN_COMPARISON.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full max-w-[560px] justify-self-center rounded-[8px]"
          />
        </div>
        <div className="mt-8">
          <StoryParagraph paragraph={LAMELLAR_SUMMARY} />
        </div>
      </Container>
    </section>
  );
}
