import type { Metadata } from "next";
import { PatentsIntroSection } from "@/components/elements/about/patents/PatentsIntroSection";
import { PatentsListSection } from "@/components/elements/about/patents/PatentsListSection";
import { SectionSeam } from "@/ui/SectionSeam";

export const metadata: Metadata = {
  title: "Міжнародні патенти FAITH — захист інноваційних технологій",
  description:
    "Міжнародні патенти бренду FAITH у США, Тайвані, Китаї, Південній Кореї та Європі: захищені методи ферментації, живий колаген і технології доставки активних інгредієнтів.",
};

export default function PatentsPage() {
  return (
    <>
      <PatentsIntroSection />

      {/* Стикова тінь між білими секціями — як на «Про FAITH» і «Технологіях». */}
      <SectionSeam>
        <PatentsListSection />
      </SectionSeam>
    </>
  );
}
