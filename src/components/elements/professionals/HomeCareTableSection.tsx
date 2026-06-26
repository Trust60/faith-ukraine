import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { HOME_CARE } from "./content/care-content";

/**
 * Секція «Система домашнього догляду»: широка таблиця-зображення. На вузьких екранах
 * контейнер гортається горизонтально (фокусований region — доступний із клавіатури).
 */
export function HomeCareTableSection() {
  return (
    <Container>
      <section>
        <SectionHeading as="h2" className="mt-10 md:mt-15">
          {HOME_CARE.heading}
        </SectionHeading>
        <div
          tabIndex={0}
          role="group"
          aria-label="Таблиця системи домашнього догляду FAITH — гортайте горизонтально"
          className="mt-8 overflow-x-auto rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Image
            src={HOME_CARE.table.src}
            alt={HOME_CARE.table.alt}
            width={HOME_CARE.table.width}
            height={HOME_CARE.table.height}
            sizes="(min-width: 1536px) 1500px, 100vw"
            className="h-auto w-full min-w-[860px] rounded-[12px] border border-line"
          />
        </div>
      </section>
    </Container>
  );
}
