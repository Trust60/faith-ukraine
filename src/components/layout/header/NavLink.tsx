"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

type TNavLinkProps = {
  href: string;
  children: React.ReactNode;
  /** Додаткові класи для тексту (розмір, трекінг, відступи). */
  className?: string;
  onClick?: () => void;
};

/**
 * Пункт навігації: при наведенні/фокусі та на активній вкладці
 * з'являється підкреслення (анімація transform — без перефарбовування).
 */
export function NavLink({ href, children, className, onClick }: TNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "" : undefined}
      className={cn("group relative inline-block uppercase text-nav", className)}
    >
      {children}
      {/*
        Зсув підкреслення залежить від контексту хедера (точка nav = 1200px):
        у бургер-меню (< nav) у посилань є `py-2`, тож тримаємо рыску ближче до
        тексту (`bottom-0.5`); на десктопі (>= nav) відступу немає — `-bottom-1.5`.
      */}
      <span
        aria-hidden
        className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-nav transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[active]:scale-x-100 nav:-bottom-1.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
