"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { FooterInfo } from "./FooterInfo";

export function Footer() {
  const pathname = usePathname();
  const isContact = pathname === "/contacts";

  return (
    <footer
      className={cn(
        "relative isolate overflow-hidden border-t border-line bg-background",
        isContact && "flex min-h-[calc(100dvh-112px)] flex-col justify-center",
      )}
    >
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
        {/* Обрізаний вордмарк (без білих полів logo.webp): ширина = самі літери, як на WP. */}
        <Image
          src="/home/hero/wordmark.webp"
          alt="FAITH"
          width={1200}
          height={1072}
          sizes="(min-width: 1024px) 352px, 240px"
          className="h-auto w-60 self-center justify-self-center lg:w-88 lg:justify-self-end"
        />
      </div>
    </footer>
  );
}
