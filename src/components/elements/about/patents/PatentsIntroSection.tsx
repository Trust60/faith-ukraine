import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { StoryParagraph } from "../StoryParagraph";
import {
  PATENTS_CERTIFICATES,
  PATENTS_INTRO_BLOCK,
} from "./content/patents-intro-content";

/** Секція «Міжнародні патенти»: заголовок і вступні абзаци та колаж сертифікатів. */
export function PatentsIntroSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <SectionHeading as="h1">{PATENTS_INTRO_BLOCK.heading}</SectionHeading>
            <div className="mt-5 space-y-5">
              {PATENTS_INTRO_BLOCK.paragraphs.map((paragraph) => (
                <StoryParagraph key={paragraph.slice(0, 32)} paragraph={paragraph} />
              ))}
            </div>
          </div>
          <Image
            src={PATENTS_CERTIFICATES.src}
            alt={PATENTS_CERTIFICATES.alt}
            width={PATENTS_CERTIFICATES.width}
            height={PATENTS_CERTIFICATES.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="h-auto w-full max-w-[560px] justify-self-center lg:justify-self-end"
          />
        </div>
      </Container>
    </section>
  );
}
