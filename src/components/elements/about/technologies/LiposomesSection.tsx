import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { StoryBlock } from "../StoryBlock";
import { LIPOSOMES_BLOCK, LIPOSOMES_IMAGE } from "./content/liposomes-content";

/** Секція «Ліпосоми FAITH»: ілюстрація проникнення ліпосом + текстовий блок. */
export function LiposomesSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <FramedImage
            src={LIPOSOMES_IMAGE.src}
            alt={LIPOSOMES_IMAGE.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-square w-full rounded-[16px]"
          />
          <StoryBlock
            heading={LIPOSOMES_BLOCK.heading}
            paragraphs={LIPOSOMES_BLOCK.paragraphs}
          />
        </div>
      </Container>
    </section>
  );
}
