import { HeroSlider } from "./HeroSlider";
import { Marquee } from "./Marquee";
import { HERO_SLIDES } from "./content/hero-content";

/** Перший екран головної: слайдер бренду + бігучий рядок з перевагами під ним. */
export function HeroSection() {
  return (
    <section>
      <HeroSlider slides={HERO_SLIDES} />
      <Marquee />
    </section>
  );
}
