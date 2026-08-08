import { Resend } from "resend";
import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { buildSubmissionEmail } from "./submission-email";

/**
 * Лист-повідомлення менеджеру про нову заявку.
 *
 * Пошта — дубль, а не джерело істини: заявка вже збережена в колекції Submissions.
 * Якщо RESEND_API_KEY не заданий (локальна розробка, прев'ю), функція нічого не робить
 * — форма продовжує працювати, заявку видно в адмінці.
 */
type TSendArgs = {
  type: TSubmissionType;
  id: number | string;
  createdAt: Date;
  answers: Record<string, unknown>;
};

export async function sendSubmissionEmail(args: TSendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBMISSIONS_EMAIL_TO;
  const from = process.env.SUBMISSIONS_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    // Явно кажемо, чого саме бракує: інакше «лист не прийшов» виглядає як загадка.
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !to && "SUBMISSIONS_EMAIL_TO",
      !from && "SUBMISSIONS_EMAIL_FROM",
    ].filter(Boolean);
    console.warn(
      `[email] лист не відправлено — немає змінних: ${missing.join(", ")}. ` +
        "Справжні значення мають бути в .env.local (не в .env.example), і після " +
        "правки .env.local дев-сервер треба перезапустити.",
    );
    return;
  }

  const { subject, html, text, replyTo } = buildSubmissionEmail(args);

  // Шлемо обидві частини: HTML-only лист ловить MIME_HTML_ONLY у спам-фільтрах,
  // а якщо `text` не передати — Resend згенерує його сам і гірше.
  // `replyTo` ставимо лише коли контакт справді email: тоді менеджер відповідає
  // клієнту звичайною кнопкою «Відповісти».
  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject,
    html,
    text,
    replyTo,
  });

  // Resend SDK не кидає виключення на помилку API, а повертає її в `error`,
  // тому перевіряємо саме поле — інакше відмова (напр. неверифікований домен
  // відправника) виглядала б як успішна відправка.
  if (error) {
    throw new Error(`Resend відмовив: ${error.name} — ${error.message}`);
  }
}
