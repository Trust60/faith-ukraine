type TReasonItemProps = {
  title: string;
  text: string;
};

/** Один пункт блоку «Чому нас обирають»: підзаголовок (тип партнера) + опис. */
export function ReasonItem({ title, text }: TReasonItemProps) {
  return (
    <li>
      <h3 className="font-serif text-xl font-semibold text-heading">
        {title}:
      </h3>
      <p className="mt-1 font-serif text-xl leading-relaxed text-ink">{text}</p>
    </li>
  );
}
