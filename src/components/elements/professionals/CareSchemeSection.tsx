import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { CARE_SCHEME } from "./content/care-content";
import { SchemeStep } from "./SchemeStep";

/** Секція «Схема професійного догляду»: нумеровані кроки ліворуч + фото засобів праворуч. */
export function CareSchemeSection() {
  return (
    <Container>
      <section>
        <SectionHeading as="h2" className="mt-10 md:mt-15">
          {CARE_SCHEME.heading}
        </SectionHeading>
        {/* items-stretch (за замовч.): фото-колонка тягнеться рівно до висоти списку кроків
            поряд. На мобільному (стек) висоту задає min-h. */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <ol className="space-y-3">
            {CARE_SCHEME.steps.map((step, index) => (
              <SchemeStep
                key={step.title}
                number={index + 1}
                title={step.title}
                note={step.note}
              />
            ))}
          </ol>
          <div className="relative min-h-[18rem] w-full overflow-hidden rounded-[16px]">
            <Image
              src={CARE_SCHEME.image.src}
              alt={CARE_SCHEME.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
