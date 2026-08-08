/**
 * Розбір контакту із заявки.
 *
 * В анкеті `contact` — вільний рядок: email, телефон або Instagram. У формі
 * співпраці email немає взагалі. Тому нічого не вгадуємо: що розпізнали — те й
 * стає кнопкою дії та `replyTo` листа; не розпізнали — просто показуємо текстом.
 * Сміттєве значення в `replyTo` дало б помилку відправки або баунс.
 */
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const PHONE_PATTERN = /\+?\d{9,15}/;
/** Роздільники номера: пробіли, дужки, крапки й усі різновиди тире. */
const PHONE_NOISE = /[\s().\-‐-―]/g;

export const findEmail = (value: string) =>
  value.match(EMAIL_PATTERN)?.[0].toLowerCase();

export const findPhone = (value: string) => {
  // Адресу прибираємо першою, інакше «olena1234567890@mail.com» стане «телефоном».
  const compact = value.replace(EMAIL_PATTERN, " ").replace(PHONE_NOISE, "");
  return compact.match(PHONE_PATTERN)?.[0];
};

export type TContactAction = { href: string; label: string };

export type TContactLinks = {
  /** Адреса для `replyTo` — тільки якщо це справді email. */
  email?: string;
  /** `href` для головного рядка контакту (`tel:` або `mailto:`). */
  href?: string;
  actions: TContactAction[];
};

export const parseContact = (value: string): TContactLinks => {
  const email = findEmail(value);
  const phone = findPhone(value);

  const actions = [
    phone ? { href: `tel:${phone}`, label: "Подзвонити" } : undefined,
    email ? { href: `mailto:${email}`, label: "Написати листа" } : undefined,
  ].filter((action): action is TContactAction => action !== undefined);

  return { email, href: actions[0]?.href, actions };
};
