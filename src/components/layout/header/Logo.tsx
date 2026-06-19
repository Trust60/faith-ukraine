import Image from "next/image";
import Link from "next/link";

type TLogoProps = {
  /** Класи позиціонування зовнішнього посилання (видимість на брейкпоінтах). */
  className?: string;
};

export function Logo({ className }: TLogoProps) {
  return (
    <Link href="/" aria-label="FAITH — на головну" className={className}>
      <Image
        src="/logo.webp"
        alt="FAITH"
        width={799}
        height={449}
        priority
        sizes="(min-width: 1536px) 160px, 128px"
        className="h-16 w-auto 2xl:h-20"
      />
    </Link>
  );
}
