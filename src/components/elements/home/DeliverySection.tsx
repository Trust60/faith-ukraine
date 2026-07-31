import { Container } from "@/ui/Container";
import { LazyVideoEmbed } from "@/ui/LazyVideoEmbed";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { DELIVERY_SECTION } from "./content/video-content";

/** «Насичення шкіри колагеном»: заголовок з підзаголовком і фонове відео на всю ширину. */
export function DeliverySection() {
  return (
    <section className="pt-10 md:pt-12">
      <Container>
        <Reveal>
          <SectionHeading as="h2" align="center">
            {DELIVERY_SECTION.heading}
          </SectionHeading>
          <p className="mx-auto mt-3 max-w-3xl text-center font-serif text-base italic leading-relaxed text-ink md:text-lg">
            {DELIVERY_SECTION.subheading}
          </p>
        </Reveal>
      </Container>

      <LazyVideoEmbed
        src={DELIVERY_SECTION.video.src}
        title={DELIVERY_SECTION.video.title}
        className="mt-6 aspect-video md:mt-10"
        scaleClassName="scale-[1.15]"
      />
    </section>
  );
}
