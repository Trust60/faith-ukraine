const HINTS = [
  { keys: ["↑", "↓"], label: "Навігація" },
  { keys: ["Enter"], label: "Відкрити" },
  { keys: ["Esc"], label: "Закрити" },
];

const KBD_CLASS =
  "grid h-6 min-w-6 place-items-center border border-line px-1.5 text-[11px] leading-none text-nav";

type TSearchHintProps = {
  keys: string[];
  label: string;
};

function SearchHint({ keys, label }: TSearchHintProps) {
  return (
    <li className="flex items-center gap-1.5">
      {keys.map((key) => (
        <kbd key={key} className={KBD_CLASS}>
          {key}
        </kbd>
      ))}
      <span className="ml-0.5">{label}</span>
    </li>
  );
}

/**
 * Підказки клавіш унизу діалогу. Лише десктоп: на тачі фізичної клавіатури
 * зазвичай немає, а місце на екрані цінніше.
 */
export function SearchHints() {
  return (
    <ul className="hidden items-center gap-5 border-t border-line px-5 py-3 text-xs text-nav md:flex">
      {HINTS.map((hint) => (
        <SearchHint key={hint.label} keys={hint.keys} label={hint.label} />
      ))}
    </ul>
  );
}
