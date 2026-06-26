import { cn } from "@/utils/cn";
import type { TLoyaltyCard } from "./content/intro-content";

type TLoyaltyCardProps = TLoyaltyCard & {
  variant: "light" | "dark";
};

/** Картка «Програми лояльності»: іконка + заголовок + опис; світлий або тёмний фон. */
export function LoyaltyCard({ icon: Icon, title, text, variant }: TLoyaltyCardProps) {
  const isLight = variant === "light";

  return (
    <article
      className={cn(
        "flex h-full items-start gap-5 p-8 md:p-10",
        isLight ? "bg-white" : "bg-pro-dark",
      )}
    >
      <Icon
        className={cn(
          "size-11 shrink-0",
          isLight ? "text-heading" : "text-white",
        )}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div>
        <h3
          className={cn(
            "font-serif text-xl font-semibold",
            isLight ? "text-heading" : "text-white",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 font-serif leading-relaxed",
            isLight ? "text-ink" : "text-white/75",
          )}
        >
          {text}
        </p>
      </div>
    </article>
  );
}
