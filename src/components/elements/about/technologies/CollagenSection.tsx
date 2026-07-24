import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { StoryBlock } from "../StoryBlock";
import { StoryParagraph } from "../StoryParagraph";
import {
  COLLAGEN_CONCLUSION,
  COLLAGEN_DNA,
  COLLAGEN_HEADING,
  COLLAGEN_INTRO,
  COLLAGEN_MOLECULE,
  COLLAGEN_TROPO,
} from "./content/collagen-content";

const IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";

/** Секція «Ліпосоми FAITH з колагеном»: сітка 2×2 з текстом і фото колагену. */
export function CollagenSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-10">
          <div className="lg:order-1">
            <StoryBlock heading={COLLAGEN_HEADING} paragraphs={[COLLAGEN_INTRO]} />
          </div>
          <FramedImage
            src={COLLAGEN_DNA.src}
            alt={COLLAGEN_DNA.alt}
            sizes={IMAGE_SIZES}
            className="aspect-[3/2] w-full rounded-[16px] lg:order-2"
          />
          {/* DOM: текст перед фото → на мобільному фото йде останнім (як у макеті);
              на десктопі lg:order повертає фото в нижній лівий комірку 2×2. */}
          <div className="space-y-5 lg:order-4">
            <StoryParagraph paragraph={COLLAGEN_TROPO} />
            <StoryParagraph paragraph={COLLAGEN_CONCLUSION} />
          </div>
          <FramedImage
            src={COLLAGEN_MOLECULE.src}
            alt={COLLAGEN_MOLECULE.alt}
            sizes={IMAGE_SIZES}
            className="aspect-[3/2] w-full rounded-[16px] lg:order-3"
          />
        </div>
      </Container>
    </section>
  );
}
