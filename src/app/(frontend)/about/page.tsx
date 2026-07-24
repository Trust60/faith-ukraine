import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/elements/about/AboutHeroSection";
import { StorySection } from "@/components/elements/about/StorySection";
import { PillarsSection } from "@/components/elements/about/PillarsSection";
import { UniquenessSection } from "@/components/elements/about/UniquenessSection";
import { DirectionsSection } from "@/components/elements/about/DirectionsSection";

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
      <PillarsSection />
      <UniquenessSection />
      <DirectionsSection />
    </>
  );
}
