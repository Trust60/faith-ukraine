import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type TPartnerInfoImage = {
  src: string;
  alt: string;
};

type TPartnerInfoSectionProps = {
  heading: string;
  as: "h1" | "h2";
  image: TPartnerInfoImage;
  imageSide: "left" | "right";
  children: ReactNode;
  className?: string;
};

/** Заголовок секцій сторінки «Партнери»: дисплейний шрифт, колір #585651, 35px (десктоп). */
const HEADING_CLASS =
  "font-display text-[28px] uppercase tracking-[0.02em] text-heading md:text-[35px]";

/**
 * Презентаційний враппер інформаційної секції: фото + текстова колонка. Дві колонки на
 * десктопі (lg+), одна — на мобільному (фото зверху, текст знизу). Бік фото на десктопі
 * задає imageSide (через lg:order-*); на мобільному фото завжди першим (за макетом).
 */
export function PartnerInfoSection({
  heading,
  as,
  image,
  imageSide,
  children,
  className,
}: TPartnerInfoSectionProps) {
  const Heading = as;

  return (
    <section
      className={cn("mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12", className)}
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div
          className={cn(
            // Фіксований бокс (однакове співвідношення для обох фото) + object-cover —
            // обидві картинки виглядають однаково за розміром, без спотворення (різні
            // оригінальні пропорції злегка обрізаються). rounded-[16px] — за вимогою (токен
            // rounded-2xl = 18px, тож задаємо рівно 16px явно).
            "relative aspect-[3/2] w-full overflow-hidden rounded-[16px]",
            imageSide === "right" && "lg:order-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className={cn(imageSide === "right" && "lg:order-1")}>
          <Heading className={HEADING_CLASS}>{heading}</Heading>
          <div className="mt-6 space-y-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
