import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { CONTACT_KEYS, SUBMISSION_LABELS, SUBMISSION_TITLES } from "./labels";

/**
 * Читабельний опис заявки — спільний для листа менеджеру й для картки в адмінці.
 * У базі `answers` лежить сирим JSON, тож перетворення в підписані рядки має
 * бути в одному місці: інакше лист і адмінка розʼїдуться.
 */
export type TSubmissionRow = { label: string; value: string };

/** Порожній рядок теж має ставати прочерком: необовʼязкові поля приходять як "". */
export const formatAnswer = (value: unknown) => {
  if (Array.isArray(value)) return value.join(", ");
  return String(value ?? "").trim() || "—";
};

type TDescribeArgs = {
  type: TSubmissionType;
  answers: Record<string, unknown>;
};

export const describeSubmission = ({ type, answers }: TDescribeArgs) => {
  const labels = SUBMISSION_LABELS[type];
  const contactKey = CONTACT_KEYS[type];
  const known = Object.keys(labels);
  // Ключі, яких немає в мапі, — зі старих заявок, поданих до зміни форми.
  // Показуємо їх сирими: жодна відповідь не має зникнути з листа чи адмінки.
  const extra = Object.keys(answers).filter((key) => !known.includes(key));

  // Імʼя й головний контакт показуємо окремо, тож у рядках їх не дублюємо.
  const rows: TSubmissionRow[] = [...known, ...extra]
    .filter((key) => key !== "name" && key !== contactKey)
    .map((key) => ({
      label: labels[key] ?? key,
      value: formatAnswer(answers[key]),
    }));

  return {
    title: SUBMISSION_TITLES[type],
    name: formatAnswer(answers.name),
    contactLabel: labels[contactKey] ?? "Контакт",
    contact: formatAnswer(answers[contactKey]),
    rows,
  };
};
