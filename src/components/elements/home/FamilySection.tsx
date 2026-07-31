import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { FamilyList } from "./FamilyList";
import {
  FAMILY_IMAGES,
  FAMILY_LISTS,
  FAMILY_SECTION,
} from "./content/family-content";

const PHOTO_CLASS = "aspect-[3/4] w-full max-w-[26rem] rounded-[16px] lg:max-w-none";

/**
 * «Косметика для всієї родини»: два списки переваг між двома фото. На мобільному
 * лягає в одну колонку — фото, списки, фото (як у mobile-design-13…14).
 */
export function FamilySection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <Reveal>
          <SectionHeading as="h2" align="center">
            {FAMILY_SECTION.heading}
          </SectionHeading>
          <p className="mt-3 text-center font-serif text-base italic leading-relaxed text-ink md:text-lg">
            {FAMILY_SECTION.subheading}
          </p>
        </Reveal>

        <Reveal
          cascade
          className="reveal-cascade mt-10 grid items-center justify-items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)_minmax(0,1fr)] lg:gap-12"
        >
          <FramedImage
            src={FAMILY_IMAGES.left.src}
            alt={FAMILY_IMAGES.left.alt}
            sizes="(min-width: 1024px) 30vw, 100vw"
            className={PHOTO_CLASS}
          />

          <div className="flex w-full flex-col gap-8 md:gap-10">
            {FAMILY_LISTS.map((list) => (
              <FamilyList key={list.title} list={list} />
            ))}
          </div>

          <FramedImage
            src={FAMILY_IMAGES.right.src}
            alt={FAMILY_IMAGES.right.alt}
            sizes="(min-width: 1024px) 30vw, 100vw"
            className={PHOTO_CLASS}
          />
        </Reveal>
      </Container>
    </section>
  );
}
