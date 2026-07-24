import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { LiposomeTypeCard } from "./LiposomeTypeCard";
import {
  LEFT_LIPOSOME_TYPES,
  LIPOSOME_TYPES_CAPTION,
  LIPOSOME_TYPES_HEADING,
  LIPOSOME_TYPES_IMAGE,
  RIGHT_LIPOSOME_TYPES,
} from "./content/liposome-types-content";

/** Секція «Різновид ліпосом»: дві картки типів наносом з ілюстрацією між ними. */
export function LiposomeTypesSection() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <SectionHeading as="h2">{LIPOSOME_TYPES_HEADING}</SectionHeading>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10 [&_p]:text-justify">
          <LiposomeTypeCard types={LEFT_LIPOSOME_TYPES} />
          <Image
            src={LIPOSOME_TYPES_IMAGE.src}
            alt={LIPOSOME_TYPES_IMAGE.alt}
            width={LIPOSOME_TYPES_IMAGE.width}
            height={LIPOSOME_TYPES_IMAGE.height}
            sizes="240px"
            className="hidden h-auto w-full max-w-[240px] justify-self-center lg:block"
          />
          <LiposomeTypeCard types={RIGHT_LIPOSOME_TYPES} />
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center font-serif text-lg leading-relaxed text-ink md:mt-10">
          {LIPOSOME_TYPES_CAPTION}
        </p>
      </Container>
    </section>
  );
}
