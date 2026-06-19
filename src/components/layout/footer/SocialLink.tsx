import type { TSocialLink } from "./footer-config";

type TSocialLinkProps = {
  item: TSocialLink;
};

/** Кругла кнопка-посилання на соцмережу (білий гліф на темному колі). */
export function SocialLink({ item }: TSocialLinkProps) {
  const { href, label, icon: Icon } = item;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid size-12 place-items-center rounded-full bg-ink-soft text-background transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none sm:size-14"
    >
      <Icon className="size-5 sm:size-6" aria-hidden />
    </a>
  );
}
