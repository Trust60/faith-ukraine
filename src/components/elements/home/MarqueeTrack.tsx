import { MARQUEE_PHRASES } from "./content/marquee-content";

type TMarqueePhraseProps = { phrase: string };

/** Фраза рядка з круглим роздільником перед нею. */
function MarqueePhrase({ phrase }: TMarqueePhraseProps) {
  return (
    <li className="flex shrink-0 items-center gap-4 md:gap-5">
      <span
        className="size-[0.3125rem] shrink-0 rounded-full bg-white/80"
        aria-hidden="true"
      />
      <span className="shrink-0">{phrase}</span>
    </li>
  );
}

/**
 * Половина бігучого рядка. Трек складається з двох таких списків: перший озвучується
 * скрінрідером, другий — суто візуальний дубль, який робить цикл безшовним.
 */
export function MarqueeTrack({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5"
      aria-hidden={hidden ? "true" : undefined}
    >
      {MARQUEE_PHRASES.map((phrase) => (
        <MarqueePhrase key={phrase} phrase={phrase} />
      ))}
    </ul>
  );
}
