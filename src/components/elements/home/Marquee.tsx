import { MarqueeTrack } from "./MarqueeTrack";

/**
 * Бігучий рядок під hero: тёпло-сіра смуга з перевагами бренду. Анімується лише
 * transform (GPU-композит); за prefers-reduced-motion рух вимикається, і видно
 * перший набір фраз. Дубль треку робить цикл безшовним (див. --animate-marquee).
 */
export function Marquee() {
  return (
    <div className="overflow-hidden bg-marquee py-3 md:py-4">
      <div className="flex w-max animate-marquee font-serif text-base tracking-[0.125em] whitespace-nowrap text-white motion-reduce:animate-none md:text-xl">
        <MarqueeTrack />
        <MarqueeTrack hidden />
      </div>
    </div>
  );
}
