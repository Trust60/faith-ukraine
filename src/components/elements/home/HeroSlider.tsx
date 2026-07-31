"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HeroArrow } from "./HeroArrow";
import { HeroDots } from "./HeroDots";
import { HeroSlide } from "./HeroSlide";
import { HERO_LABELS, type THeroSlideContent } from "./content/hero-content";

type THeroSliderProps = { slides: readonly THeroSlideContent[] };

/**
 * Hero-слайдер головної. Автоплею немає (як на WP): перемикання лише стрілками,
 * точками, свайпом або ←/→. Висота фіксована — 500px на мобільному, 750px з md.
 */
export function HeroSlider({ slides }: THeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const syncIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    syncIndex();
    emblaApi.on("select", syncIndex);
    emblaApi.on("reInit", syncIndex);

    return () => {
      emblaApi.off("select", syncIndex);
      emblaApi.off("reInit", syncIndex);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div
      role="region"
      aria-roledescription="карусель"
      aria-label={HERO_LABELS.region}
      className="relative h-[500px] md:h-[750px]"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") scrollPrev();
        if (event.key === "ArrowRight") scrollNext();
      }}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <ul className="flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <HeroSlide
              key={slide.image.src}
              slide={slide}
              index={index}
              total={slides.length}
            />
          ))}
        </ul>
      </div>

      <HeroArrow direction="prev" label={HERO_LABELS.prev} onClick={scrollPrev} />
      <HeroArrow direction="next" label={HERO_LABELS.next} onClick={scrollNext} />
      <HeroDots
        count={slides.length}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
      />
    </div>
  );
}
