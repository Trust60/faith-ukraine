import Image from "next/image";
import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { CheckItem } from "./CheckItem";
import {
  INNOVATIONS_HEADING,
  INNOVATIONS_IMAGE,
  INNOVATIONS_ITEMS,
} from "./content/innovations-content";

/**
 * «Інновації FAITH»: текстовий блок ліворуч, ілюстрація ліпосом праворуч.
 * Ілюстрація сама несе діагональний перехід кольору фону, тому лежить окремим
 * абсолютним шаром під контентом і показується лише з lg (у мобільних макетах її немає).
 */
export function InnovationsSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-16 lg:h-[650px] lg:py-0">
      <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
        <Image
          src={INNOVATIONS_IMAGE.src}
          alt={INNOVATIONS_IMAGE.alt}
          fill
          sizes="62vw"
          className="object-cover object-left"
        />
      </div>

      <Container className="relative flex h-full items-center">
        <Reveal className="max-w-[560px] lg:pl-[6%]">
          <SectionHeading as="h2" align="center">
            {INNOVATIONS_HEADING}
          </SectionHeading>
          <ul className="mt-8 flex flex-col gap-8 md:mt-10 md:gap-10">
            {INNOVATIONS_ITEMS.map((item) => (
              <CheckItem key={item.text} item={item} uppercase />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
