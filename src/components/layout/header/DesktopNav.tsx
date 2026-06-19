import { NavLink } from "./NavLink";
import { NAV_ITEMS } from "./nav-config";

/** Центроване головне меню для десктопу (nav-брейкпоінт і ширше). */
export function DesktopNav() {
  return (
    <nav
      aria-label="Головна навігація"
      className="hidden min-w-0 flex-1 justify-center nav:flex"
    >
      <ul className="flex items-center gap-6 whitespace-nowrap 2xl:gap-9">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} className="text-base tracking-widest">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
