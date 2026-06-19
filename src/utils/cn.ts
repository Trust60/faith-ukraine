import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Об'єднує класи через clsx (умовні/масиви) і розв'язує конфлікти
 * Tailwind через tailwind-merge. Єдиний спосіб склеювати className у проєкті.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
