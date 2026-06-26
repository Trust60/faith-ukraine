import type { Metadata } from "next";
import { Suspense } from "react";
import { PARTNERS_SECTION } from "@/components/elements/partners/partners-content";
import { PartnershipSection } from "@/components/elements/partners/PartnershipSection";
import { WhyChooseUsSection } from "@/components/elements/partners/WhyChooseUsSection";
import { PartnersGrid } from "@/components/elements/partners/PartnersGrid";
import { PartnersGridSkeleton } from "@/components/elements/partners/PartnersGridSkeleton";

export const metadata: Metadata = {
  title: "Партнери — FAITH",
  description:
    "Партнери FAITH в Україні: СПА центри, клініки, салони краси та косметологи, де можна придбати оригінальну продукцію.",
};

/**
 * Сторінка «Партнери»: статичні секції «Партнерство» і «Чому нас обирають» (показуються
 * одразу), далі — повношинна смуга «Наші партнери» з тоном bg-surface. На стику — градієнт-
 * затемнення, що лежить у нижній частині верхніх (білих) секцій і згасає вгору сторінки
 * (як оверлей із WordPress). Сітка карток партнерів стрімиться під Suspense (скелетон-фолбек).
 * Смугу винесено зі сітки секцій, щоб фон був на всю ширину.
 */
export default function PartnersPage() {
  return (
    <>
      <div className="flex flex-col gap-16 pt-10 pb-10 md:pt-16">
        <PartnershipSection />
        <WhyChooseUsSection />
      </div>

      <section className="relative bg-surface">
        {/* Затемнення на стику: сидить над верхньою грею смуги (bottom-full), тобто в нижній
            частині білих секцій, і згасає вгору. Лежить поверх їх контенту (смуга — наступний
            сиблінг у DOM), pointer-events-none — клікам не заважає. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full h-12 bg-linear-to-t from-black/10 to-transparent"
        />
        <div className="mx-auto w-full max-w-[1600px] px-4 py-10 md:px-8 lg:px-12">
          <h2 className="text-center font-display text-[28px] uppercase tracking-[0.02em] text-heading md:text-[35px]">
            {PARTNERS_SECTION.heading}
          </h2>
          <p className="mt-3 text-center font-serif text-lg text-ink">
            {PARTNERS_SECTION.subtitle}
          </p>

          <div className="mt-12 md:mt-16">
            <Suspense fallback={<PartnersGridSkeleton />}>
              <PartnersGrid />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
