import type { Metadata } from "next";
import { TermsSection } from "@/components/elements/professionals/TermsSection";
import { LoyaltySection } from "@/components/elements/professionals/LoyaltySection";
import { ProblemsSection } from "@/components/elements/professionals/ProblemsSection";
import { ResultsSection } from "@/components/elements/professionals/ResultsSection";
import { CareSchemeSection } from "@/components/elements/professionals/CareSchemeSection";
import { HomeCareTableSection } from "@/components/elements/professionals/HomeCareTableSection";
import { CooperationSection } from "@/components/elements/professionals/CooperationSection";
import { ProfessionalsGallery } from "@/components/elements/professionals/ProfessionalsGallery";
import { OffersSection } from "@/components/elements/professionals/OffersSection";
import { SectionSeam } from "@/ui/SectionSeam";

export const metadata: Metadata = {
  title: "Для професіоналів — FAITH",
  description:
    "Співпраця з FAITH для салонів краси, клінік та косметологів: умови партнерства, програма лояльності, схема професійного догляду та результати японської косметики FAITH.",
};

/**
 * Сторінка «Для професіоналів»: довга контент-сторінка для косметологів/салонів/клінік.
 * Контент статичний (content/*-content.ts). Повноширинні смуги — «Програма лояльності»
 * (тёмна) та «Ми пропонуємо» (фонове фото) — виносяться поза контейнер, решта секцій іде
 * вертикальним потоком.
 */
export default function ProfessionalsPage() {
  return (
    <>
      <TermsSection />
      <LoyaltySection />
      <ProblemsSection />

      {/* Білі секції зі стиковими тінями між ними (як на сторінці «Партнери»). */}
      <div className="flex flex-col gap-16">
        <SectionSeam>
          <ResultsSection />
        </SectionSeam>
        <SectionSeam>
          <CareSchemeSection />
        </SectionSeam>
        <SectionSeam>
          <HomeCareTableSection />
        </SectionSeam>
        <SectionSeam>
          <div className="flex flex-col gap-8 mb-10 md:mb-15">
            <CooperationSection />
            <ProfessionalsGallery />
          </div>
        </SectionSeam>
      </div>
      <SectionSeam>
        <OffersSection />
      </SectionSeam>
    </>
  );
}
