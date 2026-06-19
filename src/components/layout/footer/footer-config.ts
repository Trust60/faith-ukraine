import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";

/** Текстовий блок дистриб'ютора (поряд із круглим логотипом). */
export const DISTRIBUTOR = {
  title: "Офіційний дистриб'ютор в Україні",
  subtitle: "ФОП Шанцина Л.П.",
} as const;

/** Блок виробника. */
export const MANUFACTURER = {
  heading: "Виробник",
  address:
    "Location : FAITH Co. Ltd, 7-8, TANIMACHI 2-CHOME, CHUO-KU, 540-0012 JAPAN",
} as const;

export type TContactItem = {
  icon: LucideIcon;
  /** Видимий текст контакту. */
  label: string;
  /** tel:/mailto: — якщо рядок клікабельний (для адреси відсутнє). */
  href?: string;
  /** Доступна назва для клікабельних контактів. */
  ariaLabel?: string;
};

export const CONTACTS: TContactItem[] = [
  { icon: MapPin, label: "Україна, Київ" },
  {
    icon: Phone,
    label: "+380 99 257 42 67",
    href: "tel:+380992574267",
    ariaLabel: "Зателефонувати: +380 99 257 42 67",
  },
  {
    icon: Mail,
    label: "office@faithukraine.com.ua",
    href: "mailto:office@faithukraine.com.ua",
    ariaLabel: "Написати лист: office@faithukraine.com.ua",
  },
];

export type TSocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const SOCIAL_LINKS: TSocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/lora.shantsyna.7/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/faithukraine/",
    icon: FaInstagram,
  },
  {
    label: "Telegram",
    href: "https://t.me/faith_ukraine",
    icon: FaTelegramPlane,
  },
];
