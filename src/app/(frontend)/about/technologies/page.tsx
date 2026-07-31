import type { Metadata } from "next";
import { GelBaseSection } from "@/components/elements/about/technologies/GelBaseSection";
import { LamellarMethodSection } from "@/components/elements/about/technologies/LamellarMethodSection";
import { LiposomesSection } from "@/components/elements/about/technologies/LiposomesSection";
import { LiposomeTypesSection } from "@/components/elements/about/technologies/LiposomeTypesSection";
import { CollagenSection } from "@/components/elements/about/technologies/CollagenSection";
import { Mc2xSection } from "@/components/elements/about/technologies/Mc2xSection";
import { SectionSeam } from "@/ui/SectionSeam";

export const metadata: Metadata = {
  title: "Технології FAITH — ламелярний метод, ліпосоми та MC2X",
  description:
    "Високотехнологічна гелева основа, ламелярний метод краси, запатентовані ліпосоми з колагеном і технологія доставки компонентів MC2X — власні розробки бренду FAITH.",
};

export default function TechnologiesPage() {
  return (
    <>
      <h1 className="sr-only">Технології FAITH</h1>
      <GelBaseSection />

      {/* Стикові тіні між білими секціями — як на «Про FAITH» і «Для професіоналів».
          Першу секцію не обгортаємо: над нею лише шапка. */}
      <SectionSeam>
        <LamellarMethodSection />
      </SectionSeam>
      <SectionSeam>
        <LiposomesSection />
      </SectionSeam>
      <SectionSeam>
        <LiposomeTypesSection />
      </SectionSeam>
      <SectionSeam>
        <CollagenSection />
      </SectionSeam>
      <SectionSeam>
        <Mc2xSection />
      </SectionSeam>
    </>
  );
}
