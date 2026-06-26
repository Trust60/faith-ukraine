import type { TSchemeStep } from "./content/care-content";

type TSchemeStepProps = TSchemeStep & {
  number: number;
};

/** Один крок схеми догляду: нумерований кружечок + назва кроку (та опційний підпис). */
export function SchemeStep({ number, title, note }: TSchemeStepProps) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-line px-3 py-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand font-serif text-brand">
        {number}
      </span>
      <span className="font-serif font-bold text-ink-soft text-base md:text-xl">
        {title}
        {note && (
          <span className="mt-0.5 block font-serif font-normal text-sm text-ink">
            {note}
          </span>
        )}
      </span>
    </li>
  );
}
