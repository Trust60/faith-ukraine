"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/ui/IconButton";
import { NavLink } from "./NavLink";
import { NAV_ITEMS } from "./nav-config";

/** Бургер-меню з висувною панеллю для мобільних / планшетів (до lg). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="nav:hidden">
      <IconButton
        aria-label="Відкрити меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" strokeWidth={1.5} aria-hidden />
      </IconButton>

      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Меню навігації"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-4/5 max-w-xs flex-col bg-background px-6 py-5 shadow-xl transition-transform duration-300 will-change-transform motion-reduce:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <IconButton
          aria-label="Закрити меню"
          onClick={() => setOpen(false)}
          className="mb-6 self-end"
        >
          <X className="size-6" strokeWidth={1.5} aria-hidden />
        </IconButton>

        <nav aria-label="Мобільна навігація">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-lg tracking-widest"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
