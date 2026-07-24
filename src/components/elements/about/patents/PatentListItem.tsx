type TPatentListItemProps = { text: string };

/** Пункт нумерованого списку патентів FAITH. */
export function PatentListItem({ text }: TPatentListItemProps) {
  return (
    <li className="font-serif text-lg leading-relaxed text-ink md:text-xl">
      {text}
    </li>
  );
}
