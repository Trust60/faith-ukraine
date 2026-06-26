import { cn } from "@/utils/cn";
import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { SectionHeading } from "@/ui/SectionHeading";
import { COOPERATION } from "./content/cooperation-content";
import { BulletItem } from "./BulletItem";

/** Бічні фото портретні (3/4) — як у галереї, щоб вертикальні знімки не обрізались. */
const SIDE_IMAGE_CLASS = "aspect-[3/4] rounded-[16px]";

/** Секція «Співпраця з нами – це»: перелік переваг між двома фото процедур. */
export function CooperationSection() {
  return (
    <Container>
      <section>
        <SectionHeading as="h2" align="center" className="mt-10 md:mt-15">
          {COOPERATION.heading}
        </SectionHeading>

        {/* Мобільний: список зверху (на 2 колонки) + два фото в ряд по 2, як у галереї.
            Десктоп: фото ліворуч | список (2 кол.) | фото праворуч. */}
        <div className="mt-10 grid grid-cols-2 items-center gap-x-4 gap-y-8 md:mt-12 lg:grid-cols-4 lg:gap-10">
          <FramedImage
            src={COOPERATION.images.left.src}
            alt={COOPERATION.images.left.alt}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={cn(SIDE_IMAGE_CLASS, "order-2 lg:order-1 lg:col-span-1")}
          />
          <ul className="order-1 col-span-2 space-y-4 lg:order-2 lg:col-span-2">
            {COOPERATION.items.map((item) => (
              <BulletItem key={item.slice(0, 32)} text={item} />
            ))}
          </ul>
          <FramedImage
            src={COOPERATION.images.right.src}
            alt={COOPERATION.images.right.alt}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={cn(SIDE_IMAGE_CLASS, "order-3 lg:col-span-1")}
          />
        </div>
      </section>
    </Container>
  );
}
