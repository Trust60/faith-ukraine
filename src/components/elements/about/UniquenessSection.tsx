import Image from "next/image";
import { Container } from "@/ui/Container";
import { UNIQUENESS_BLOCKS, UNIQUENESS_IMAGE } from "./content/uniqueness-content";
import { StoryBlock } from "./StoryBlock";

/** Секція «Унікальність / Особливості FAITH»: ілюстрація ламелярної структури + текст. */
export function UniquenessSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12 xl:gap-16">
          <Image
            src={UNIQUENESS_IMAGE.src}
            alt={UNIQUENESS_IMAGE.alt}
            width={UNIQUENESS_IMAGE.width}
            height={UNIQUENESS_IMAGE.height}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 420px, 100vw"
            className="h-auto w-full max-w-[420px] justify-self-center rounded-[8px] lg:max-w-[520px] lg:justify-self-start"
          />
          <div className="flex flex-col gap-8 md:gap-10">
            {UNIQUENESS_BLOCKS.map((block) => (
              <StoryBlock
                key={block.heading}
                heading={block.heading}
                paragraphs={block.paragraphs}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
