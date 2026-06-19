import Image from "next/image";
import { FooterInfo } from "./FooterInfo";

/**
 * Футер магазину: шовкове тло, контактна інформація ліворуч і великий
 * акцентний знак FAITH праворуч (унизу на мобільному).
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-background">
      <Image
        src="/footer-background.webp"
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 py-10 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-12 lg:py-20">
        <FooterInfo />
        <Image
          src="/logo.webp"
          alt="FAITH"
          width={799}
          height={449}
          sizes="(min-width: 1024px) 420px, 240px"
          className="h-auto w-60 self-center justify-self-center lg:w-[26rem] lg:justify-self-end"
        />
      </div>
    </footer>
  );
}
