export type TLiposomeType = {
  title: string;
  text: string;
  size: string;
};

type TLiposomeTypeItemProps = TLiposomeType;

/** Один пункт у картці різновидів ліпосом: назва, опис і розмір нанокапсули. */
export function LiposomeTypeItem({ title, text, size }: TLiposomeTypeItemProps) {
  return (
    <div>
      <h3 className="font-serif text-lg font-semibold text-ink-soft">{title}</h3>
      <p className="mt-2 font-serif text-base leading-relaxed text-ink">
        {text}
        <span className="mt-1 block">{size}</span>
      </p>
    </div>
  );
}
