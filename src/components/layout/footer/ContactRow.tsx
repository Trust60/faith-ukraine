import type { TContactItem } from "./footer-config";

type TContactRowProps = {
  item: TContactItem;
};

/**
 * Рядок контакту: темний круглий бейдж з іконкою + текст.
 * Для tel:/mailto: весь рядок стає посиланням; адреса — звичайний текст.
 */
export function ContactRow({ item }: TContactRowProps) {
  const { icon: Icon, label, href, ariaLabel } = item;

  const badge = (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-soft text-background">
      <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
    </span>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-3">
        {badge}
        <span className="text-sm sm:text-base">{label}</span>
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
      <span className="text-sm underline-offset-4 group-hover:underline sm:text-base">
        {label}
      </span>
    </a>
  );
}
