import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { STORY_BLOCKS, STORY_IMAGE } from "./content/story-content";
import { StoryBlock } from "./StoryBlock";

/** Секція «Історія / Філософія / Конкурентноспроможність»: текстові блоки + фото. */
export function StorySection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-8 md:gap-10">
            {STORY_BLOCKS.map((block) => (
              <StoryBlock
                key={block.heading}
                heading={block.heading}
                paragraphs={block.paragraphs}
              />
            ))}
          </div>
          <FramedImage
            src={STORY_IMAGE.src}
            alt={STORY_IMAGE.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-square w-full"
          />
        </div>
      </Container>
    </section>
  );
}
