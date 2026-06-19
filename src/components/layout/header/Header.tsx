import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { MobileMenu } from "./MobileMenu";

/**
 * Головний хедер магазину.
 * Десктоп (lg+): логотип ліворуч, меню по центру, дії праворуч.
 * Мобільний: бургер ліворуч, логотип по центру, дії праворуч.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-background">
      <div className="relative mx-auto flex h-24 w-full max-w-[1600px] items-center justify-between gap-4 px-4 md:h-28 md:px-8 lg:px-12">
        <div className="flex items-center nav:flex-none">
          <MobileMenu />
          <Logo className="hidden nav:flex" />
        </div>

        <DesktopNav />

        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nav:hidden" />

        <HeaderActions />
      </div>
    </header>
  );
}
