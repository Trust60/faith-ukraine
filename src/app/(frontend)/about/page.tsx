import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/elements/about/AboutHeroSection";
import { StorySection } from "@/components/elements/about/StorySection";
import { PillarsSection } from "@/components/elements/about/PillarsSection";
import { UniquenessSection } from "@/components/elements/about/UniquenessSection";
import { DirectionsSection } from "@/components/elements/about/DirectionsSection";
import { SectionSeam } from "@/ui/SectionSeam";

export const metadata: Metadata = {
  title: "Про FAITH — історія та філософія бренду",
  description:
    "Історія та філософія японського бренду FAITH: власні технології й патенти, корнеотерапія та ексклюзивна дистрибуція професійної косметики.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <StorySection />

      {/* Білі секції зі стиковими тінями між ними (як на сторінці «Партнери»). */}
      <SectionSeam>
        <PillarsSection />
      </SectionSeam>
      <SectionSeam>
        <UniquenessSection />
      </SectionSeam>
      <SectionSeam>
        <DirectionsSection />
      </SectionSeam>
    </>
  );
}
