import { PartnerInfoSection } from "./PartnerInfoSection";
import { PARTNERS_IMAGES, WHY_CHOOSE_US } from "./partners-content";
import { ReasonItem } from "./ReasonItem";

/** Секція «Чому нас обирають»: фото зліва на десктопі + перелік типів партнерів (h2). */
export function WhyChooseUsSection() {
  return (
    <PartnerInfoSection
      as="h2"
      heading={WHY_CHOOSE_US.heading}
      image={PARTNERS_IMAGES.whyChooseUs}
      imageSide="left"
    >
      <ul className="space-y-5">
        {WHY_CHOOSE_US.reasons.map((reason) => (
          <ReasonItem
            key={reason.title}
            title={reason.title}
            text={reason.text}
          />
        ))}
      </ul>
    </PartnerInfoSection>
  );
}
