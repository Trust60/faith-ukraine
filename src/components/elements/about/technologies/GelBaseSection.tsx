import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { StoryBlock } from "../StoryBlock";
import { GEL_BASE_BLOCK, GEL_BASE_IMAGE } from "./content/gel-base-content";

/** Секція «Високотехнологічна гелева основа засобів FAITH»: фото + текстовий блок. */
export function GelBaseSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <FramedImage
            src={GEL_BASE_IMAGE.src}
            alt={GEL_BASE_IMAGE.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-square w-full rounded-[16px]"
          />
          <StoryBlock
            heading={GEL_BASE_BLOCK.heading}
            paragraphs={GEL_BASE_BLOCK.paragraphs}
          />
        </div>
      </Container>
    </section>
  );
}
