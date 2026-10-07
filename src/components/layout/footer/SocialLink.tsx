import type { TSocialLink } from "./footer-config";

type TSocialLinkProps = {
  item: TSocialLink;
};

/** Кругла кнопка-посилання на соцмережу: залитий білий гліф на чорному колі 60px (як на WP). */
export function SocialLink({ item }: TSocialLinkProps) {
  const { href, label, icon: Icon } = item;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid size-14 place-items-center rounded-full bg-black text-white transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none sm:size-15"
    >
      <Icon className="size-7 sm:size-[1.875rem]" aria-hidden />
    </a>
  );
}
