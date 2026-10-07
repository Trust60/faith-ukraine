import type { TContactItem } from "./footer-config";

type TContactRowProps = {
  item: TContactItem;
};

/**
 * Рядок контакту: чорний круглий бейдж із залитою іконкою + текст 18–20px (як на WP).
 * Для tel:/mailto: весь рядок стає посиланням; адреса — звичайний текст.
 */
export function ContactRow({ item }: TContactRowProps) {
  const { icon: Icon, label, href, ariaLabel } = item;

  const badge = (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-white">
      <Icon className="size-5" aria-hidden />
    </span>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-3">
        {badge}
        <span className="text-lg md:text-xl">{label}</span>
      </div>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="group flex items-center gap-3 rounded-lg outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand"
    >
      {badge}
      <span className="text-lg underline-offset-4 group-hover:underline md:text-xl">
        {label}
      </span>
    </a>
  );
}
