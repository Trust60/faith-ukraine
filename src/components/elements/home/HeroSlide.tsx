import Image from "next/image";
import Link from "next/link";
import { Container } from "@/ui/Container";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { cn } from "@/utils/cn";
import { HERO_LABELS, type THeroSlideContent } from "./content/hero-content";

type THeroSlideProps = {
  slide: THeroSlideContent;
  index: number;
  total: number;
};

/**
 * Один слайд hero-банера: фонове фото на всю смугу + контент у сітці сторінки.
 * На мобільному контент по центру, з lg — ліворуч (як у макетах). Для світлого тексту
 * на мобільному додаємо скрим: вузький екран обрізає фото так, що текст лягає на
 * найсвітлішу ділянку й без підложки не читається.
 */
export function HeroSlide({ slide, index, total }: THeroSlideProps) {
  const isLightText = slide.tone === "light";
  const toneClass = isLightText ? "text-white" : "text-black";

  return (
    <li
      className="relative min-w-0 shrink-0 grow-0 basis-full"
      aria-roledescription="слайд"
      aria-label={HERO_LABELS.slide(index, total)}
    >
      <Image
        src={slide.image.src}
        alt={slide.image.alt}
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-cover"
      />

      {isLightText && (
        <div
          className="absolute inset-0 bg-black/35 md:hidden"
          aria-hidden="true"
        />
      )}

      <Container className="relative flex h-full flex-col items-center justify-center text-center lg:items-start lg:text-left">
        <div className="flex max-w-[46rem] flex-col items-center lg:items-start">
          {slide.wordmark && (
            <Image
              src={slide.wordmark.src}
              alt={slide.wordmark.alt}
              width={slide.wordmark.width}
              height={slide.wordmark.height}
              priority
              className="h-auto w-[9rem] md:w-[15rem] lg:w-[20rem]"
            />
          )}

          {/* Шрифти рядків — як на WP: привітання й підпис дистрибʼютора Arial 500,
              підпис слайда Open Sans 300. */}
          {slide.title && (
            <h2
              className={cn(
                "font-arial text-[1.375rem] font-medium leading-snug tracking-[0.08em] md:text-[1.5625rem]",
                toneClass,
              )}
            >
              {slide.title}
            </h2>
          )}

          {slide.subtitle && (
            <p
              className={cn(
                "mt-6 font-arial text-sm font-medium uppercase md:mt-8 md:text-lg",
                toneClass,
              )}
            >
              {slide.subtitle}
            </p>
          )}

          {slide.caption && (
            <p
              className={cn(
                "mt-4 font-opensans text-lg font-light tracking-[0.12em] md:mt-8 md:text-[1.5625rem]",
                toneClass,
              )}
            >
              {slide.caption.emphasis && <em>{slide.caption.emphasis}</em>}
              {slide.caption.text}
            </p>
          )}

          {slide.cta && (
            <Link
              href={slide.cta.href}
              className={cn(
                OUTLINE_BUTTON_CLASS,
                "mt-8 md:mt-10",
                isLightText &&
                  "border-white text-white hover:bg-white hover:text-ink-soft",
              )}
            >
              {slide.cta.label}
            </Link>
          )}
        </div>
      </Container>
    </li>
  );
}
