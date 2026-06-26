type TOfferCardProps = {
  text: string;
};

/** Картка блоку «Ми пропонуємо»: матове скло, текст + декоративний роздільник. */
export function OfferCard({ text }: TOfferCardProps) {
  return (
    <article className="flex flex-col items-center gap-5 rounded-[16px] bg-white/80 p-8 text-center shadow-card backdrop-blur-sm md:p-10">
      <p className="font-serif text-lg leading-relaxed text-ink">{text}</p>
      <span aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px w-10 bg-line" />
        <span className="size-1.5 rotate-45 bg-brand" />
        <span className="h-px w-10 bg-line" />
      </span>
    </article>
  );
}
