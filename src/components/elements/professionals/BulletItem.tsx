type TBulletItemProps = {
  term?: string;
  text: string;
};

/**
 * Узагальнений пункт маркованого списку сторінки «Для професіоналів». З term — жирний
 * термін + опис (стани шкіри); без term — звичайний пункт (переваги, співпраця).
 */
export function BulletItem({ term, text }: TBulletItemProps) {
  return (
    <li className="font-serif text-lg leading-relaxed text-ink">
      {term ? (
        <>
          <span className="font-semibold text-ink-soft">{term}:</span> {text}
        </>
      ) : (
        text
      )}
    </li>
  );
}
