import Image from "next/image";
import { Container } from "@/ui/Container";
import { SectionHeading } from "@/ui/SectionHeading";
import { PartnershipDialog } from "@/components/elements/forms/PartnershipDialog";
import { OFFERS } from "./content/cooperation-content";
import { OfferCard } from "./OfferCard";

/**
 * Секція «Ми пропонуємо»: заголовок і CTA-кнопка — на білому тлі (поза смугою). Повноширинна
 * смуга з розмитим продуктовим фото-фоном містить лише картки переваг (за макетом).
 *
 * CTA відкриває ту саму модалку «Співпраця», що й на головній: форма одна на весь сайт
 * (`PartnershipDialog`), тож копія, валідація й тип заявки не дублюються.
 */
export function OffersSection() {
  return (
    <section className="py-5 md:py-10">
      <Container>
        <SectionHeading as="h2" align="center" className="mt-5">
          {OFFERS.heading}
        </SectionHeading>
      </Container>

      {/* Повноширинна смуга з фоновим фото — лише картки всередині */}
      <div className="relative overflow-hidden md:mt-16">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={OFFERS.background.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <Container className="relative py-12 md:py-32">
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
            {OFFERS.items.map((item) => (
              <li key={item.slice(0, 32)}>
                <OfferCard text={item} />
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container>
        <div className="mt-12 flex justify-center md:mt-16 mb-10 md:mb-15">
          <PartnershipDialog triggerLabel={OFFERS.ctaLabel} />
        </div>
      </Container>
    </section>
  );
}
