import { PartnerInfoSection } from "./PartnerInfoSection";
import { PARTNERS_IMAGES, PARTNERSHIP } from "./partners-content";

/** Секція «Партнерство»: вступний текст (h1) + фото справа на десктопі. */
export function PartnershipSection() {
  return (
    <PartnerInfoSection
      as="h1"
      heading={PARTNERSHIP.heading}
      image={PARTNERS_IMAGES.partnership}
      imageSide="right"
    >
      {PARTNERSHIP.paragraphs.map((paragraph, index) => (
        <p key={index} className="font-serif text-xl leading-relaxed text-ink">
          {paragraph}
        </p>
      ))}
    </PartnerInfoSection>
  );
}
