import Image from "next/image";
import type { TPartner } from "@/data/partners";

type TPartnerCardProps = {
  partner: TPartner;
};

/**
 * Картка партнера: логотип у боксі фіксованого розміру (150×150 на мобільному, 286×235 на
 * десктопі, rounded 16px) — лого різної форми/формату вписуються object-contain, тож кадр
 * у всіх однаковий і нічого не обрізається; без фону й падингів. Назва, адреса, телефон як
 * tel:-посилання. Без ховер-ефектів — картка інформаційна, не клікабельна цілком.
 */
export function PartnerCard({ partner }: TPartnerCardProps) {
  const { logo, name, address, phone } = partner;

  return (
    <article className="flex flex-col items-center text-center">
      <div className="h-[150px] w-[150px] overflow-hidden rounded-[16px] lg:h-[235px] lg:w-[286px]">
        <Image
          src={logo.url}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          sizes="(min-width: 1024px) 286px, 150px"
          className="h-full w-full object-contain"
        />
      </div>
      <h3 className="mt-5 font-serif text-base text-heading">{name}</h3>
      <p className="mt-1 font-serif text-base leading-relaxed text-ink">
        {address}
      </p>
      {phone && (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="mt-2 font-serif text-base text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {phone}
        </a>
      )}
    </article>
  );
}
