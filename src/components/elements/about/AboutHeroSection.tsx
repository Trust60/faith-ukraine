import Image from "next/image";
import Link from "next/link";
import { Container } from "@/ui/Container";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { cn } from "@/utils/cn";
import { ABOUT_HERO } from "./content/hero-content";

/**
 * Нахил hero-фото — як на WP-версії сторінки, плюс зум, що компенсує поворот.
 * Без зуму повернуте фото не покриває смугу: по кутах лишаються білі клини, а продукти
 * читаються дрібними серед пустоти. Мінімум для 25° — 1.41 при aspect 5/6, 1.66 при 16/9
 * і 1.89 при 21/9, тому масштаб різний по брейкпоінтах.
 */
const HERO_TILT_CLASS = "rotate-[25deg] scale-[1.45] sm:scale-[1.7] lg:scale-[1.9]";

/** Hero-банер сторінки «Про FAITH»: повноширинне фото продукції + CTA в каталог. */
export function AboutHeroSection() {
  return (
    <section className="relative">
      <h1 className="sr-only">{ABOUT_HERO.title}</h1>
      <div className="relative aspect-[5/6] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={ABOUT_HERO.image.src}
          alt={ABOUT_HERO.image.alt}
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", HERO_TILT_CLASS)}
        />
      </div>
      <div className="absolute inset-x-0 bottom-8 md:bottom-12">
        <Container className="flex justify-center md:justify-start">
          <Link
            href={ABOUT_HERO.cta.href}
            className={cn(OUTLINE_BUTTON_CLASS, "bg-white/90")}
          >
            {ABOUT_HERO.cta.label}
          </Link>
        </Container>
      </div>
    </section>
  );
}
