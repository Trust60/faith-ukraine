import Image from "next/image";
import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionHeading } from "@/ui/SectionHeading";
import { PartnershipDialog } from "@/components/elements/forms/PartnershipDialog";
import { PARTNER_CTA } from "./content/partner-cta-content";

/** «Станьте партнером FAITH»: фото-смуга з напівпрозорою карткою й формою співпраці. */
export function PartnerCtaSection() {
  return (
    <section className="parallax-band relative isolate overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Шар вищий за секцію на 50%: паралакс рухає його, не відкриваючи край фото. */}
      <div className="parallax-drift absolute inset-x-0 -inset-y-[25%] -z-10">
        <Image
          src={PARTNER_CTA.image.src}
          alt={PARTNER_CTA.image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container>
        <Reveal className="max-w-[38rem] rounded-[16px] bg-white/80 px-6 py-8 backdrop-blur-sm md:px-10 md:py-12">
          <SectionHeading as="h2">{PARTNER_CTA.heading}</SectionHeading>
          <p className="mt-5 font-serif text-base leading-relaxed text-ink text-justify md:text-lg">
            {PARTNER_CTA.text}
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <PartnershipDialog triggerLabel={PARTNER_CTA.cta.label} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
