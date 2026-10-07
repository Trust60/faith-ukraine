import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegram,
} from "react-icons/fa";

// Іконки — залиті гліфи Font Awesome, як на WP (лінійні lucide там не використовуються).

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
  /** Сайт виробника — адреса веде на нього, як на WP. */
  href: "https://www.faith-gr.co.jp/",
} as const;

export type TContactItem = {
  icon: IconType;
  /** Видимий текст контакту. */
  label: string;
  /** tel:/mailto: — якщо рядок клікабельний (для адреси відсутнє). */
  href?: string;
  /** Доступна назва для клікабельних контактів. */
  ariaLabel?: string;
};

export const CONTACTS: TContactItem[] = [
  { icon: FaMapMarkerAlt, label: "Україна, Київ" },
  {
    icon: FaPhoneAlt,
    label: "+380 99 257 42 67",
    href: "tel:+380992574267",
    ariaLabel: "Зателефонувати: +380 99 257 42 67",
  },
  {
    icon: FaEnvelope,
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
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/faithukraine/",
    icon: FaInstagram,
  },
  {
    label: "Telegram",
    href: "https://t.me/faith_ukraine",
    icon: FaTelegram,
  },
];
