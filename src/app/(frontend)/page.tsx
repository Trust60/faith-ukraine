import type { Metadata } from "next";
import { SectionSeam } from "@/ui/SectionSeam";
import { HeroSection } from "@/components/elements/home/HeroSection";
import { InnovationsSection } from "@/components/elements/home/InnovationsSection";
import { DeliverySection } from "@/components/elements/home/DeliverySection";
import { SafetySection } from "@/components/elements/home/SafetySection";
import { BeautyConceptSection } from "@/components/elements/home/BeautyConceptSection";
import { CareLinesSection } from "@/components/elements/home/CareLinesSection";
import { FamilySection } from "@/components/elements/home/FamilySection";
import { PartnerCtaSection } from "@/components/elements/home/PartnerCtaSection";

export const metadata: Metadata = {
  title: "FAITH — японська професійна косметика PreventAge",
  description:
    "Ексклюзивний дистриб’ютор японської косметики FAITH в Україні: власні патенти, живий колаген NAMA, ламелярний догляд і прицільна доставка активних компонентів МС2Х.",
};

export default function HomePage() {
  return (
    <>
      {/* Видимого h1 немає: перший екран — слайдер з вордмарком бренду. */}
      <h1 className="sr-only">FAITH — японська професійна косметика</h1>

      <HeroSection />

      {/* Стикові тіні між білими секціями — як на решті сторінок сайту. */}
      <SectionSeam>
        <InnovationsSection />
      </SectionSeam>
      <SectionSeam>
        <DeliverySection />
      </SectionSeam>
      <SectionSeam>
        <SafetySection />
      </SectionSeam>
      <SectionSeam>
        <BeautyConceptSection />
      </SectionSeam>
      <SectionSeam>
        <CareLinesSection />
      </SectionSeam>
      <SectionSeam>
        <FamilySection />
      </SectionSeam>
      <PartnerCtaSection />
    </>
  );
}
