import type {
  TConsultationValues,
  TPartnershipValues,
  TSubmissionType,
} from "@/components/elements/forms/schemas";

/**
 * Короткі підписи полів заявки — для листа менеджеру й для адмінки.
 *
 * Лейбли самої форми — це питання («Чи є у вас алергії або непереносимість на
 * косметику?»), у таблиці вони нечитабельні, тому підписи окремі. Тип виводимо
 * зі схем валідації: додали поле у форму — TypeScript одразу вимагає підпис,
 * тож відповідь не може мовчки загубитися. Порядок ключів = порядок рядків.
 */
const CONSULTATION_LABELS: Record<keyof TConsultationValues, string> = {
  name: "Імʼя",
  contact: "Контакт",
  age: "Вік",
  skinType: "Тип шкіри",
  concerns: "Запити",
  dayBehaviour: "Шкіра протягом дня",
  usesCare: "Користується доглядом",
  allergies: "Алергії",
  careFormat: "Формат догляду",
};

const PARTNERSHIP_LABELS: Record<keyof TPartnershipValues, string> = {
  name: "Імʼя",
  phone: "Телефон",
  city: "Місто",
  business: "Тип бізнесу",
  link: "Сайт / соцмережі",
};

export const SUBMISSION_LABELS: Record<
  TSubmissionType,
  Record<string, string>
> = {
  consultation: CONSULTATION_LABELS,
  partnership: PARTNERSHIP_LABELS,
};

export const SUBMISSION_TITLES: Record<TSubmissionType, string> = {
  consultation: "Анкета підбору догляду",
  partnership: "Заявка на співпрацю",
};

/** Поле, яке виноситься окремо як головний контакт заявки. */
export const CONTACT_KEYS: Record<TSubmissionType, string> = {
  consultation: "contact",
  partnership: "phone",
};
