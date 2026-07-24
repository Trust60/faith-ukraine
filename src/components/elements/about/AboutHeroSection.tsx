import Image from "next/image";
import Link from "next/link";
import { Container } from "@/ui/Container";
import { OUTLINE_BUTTON_CLASS } from "@/ui/OutlineButton";
import { cn } from "@/utils/cn";
import { ABOUT_HERO } from "./content/hero-content";

/** Hero-банер сторінки «Про FAITH»: повноширинне фото продукції + CTA в каталог. */
export function AboutHeroSection() {
  return (
    <section className="relative">
      <h1 className="sr-only">{ABOUT_HERO.title}</h1>
      <div className="relative aspect-[5/6] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={ABOUT_HERO.image.src}
          alt={ABOUT_HERO.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
