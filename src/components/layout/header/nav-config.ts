export type TNavItem = {
  label: string;
  href: string;
};

/** Пункти головного меню (зберігаємо у звичайному регістрі — верхній даємо через CSS). */
export const NAV_ITEMS: TNavItem[] = [
  { label: "Головна", href: "/" },
  { label: "Про FAITH", href: "/about" },
  { label: "Каталог", href: "/catalog" },
  { label: "Партнери", href: "/partners" },
  { label: "Для професіоналів", href: "/professionals" },
  { label: "Контакти", href: "/contacts" },
];
