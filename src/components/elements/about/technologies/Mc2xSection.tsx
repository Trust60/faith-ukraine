import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { StoryBlock } from "../StoryBlock";
import { StoryParagraph } from "../StoryParagraph";
import {
  MC2X_BODY,
  MC2X_DELIVERY,
  MC2X_HEADING,
  MC2X_INTRO,
  MC2X_NANOSOMA,
} from "./content/mc2x-content";

const IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";

/** Секція «Технологія доставки компонентів MC2X»: сітка 2×2 з текстом і фото. */
export function Mc2xSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-10">
          <div className="lg:order-1">
            <StoryBlock heading={MC2X_HEADING} paragraphs={[MC2X_INTRO]} />
          </div>
          <FramedImage
            src={MC2X_DELIVERY.src}
            alt={MC2X_DELIVERY.alt}
            sizes={IMAGE_SIZES}
            className="aspect-[16/9] w-full rounded-[16px] lg:order-2"
          />
          {/* DOM: текст перед фото → на мобільному фото йде останнім (як у макеті);
              на десктопі lg:order повертає фото в нижній лівий комірку 2×2. */}
          <div className="lg:order-4">
            <StoryParagraph paragraph={MC2X_BODY} />
          </div>
          <FramedImage
            src={MC2X_NANOSOMA.src}
            alt={MC2X_NANOSOMA.alt}
            sizes={IMAGE_SIZES}
            className="aspect-[16/10] w-full rounded-[16px] lg:order-3"
          />
        </div>
      </Container>
    </section>
  );
}
