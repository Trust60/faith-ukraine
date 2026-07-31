"use server";

import { getPayloadClient } from "@/lib/getPayload";
import { sendSubmissionEmail } from "@/lib/email";
import {
  SUBMISSION_SCHEMAS,
  type TConsultationValues,
  type TPartnershipValues,
  type TSubmitResult,
  type TSubmissionType,
} from "@/components/elements/forms/schemas";

const GENERIC_ERROR =
  "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам на office@faithukraine.com.ua.";

/**
 * Прийом заявки з форми: валідація → запис у Payload → лист менеджеру.
 *
 * Валідуємо тією ж Zod-схемою, що й на клієнті: клієнтська перевірка — це UX, а не
 * захист. Запис у БД — джерело істини, тому лист відправляємо після нього й у try/catch:
 * недоступний Resend не повинен ламати вже прийняту заявку.
 */
async function submit(
  type: TSubmissionType,
  values: unknown,
): Promise<TSubmitResult> {
  const parsed = SUBMISSION_SCHEMAS[type].safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Перевірте, будь ласка, заповнені поля." };
  }

  const answers = parsed.data as Record<string, unknown>;
  const contact = `${answers.name} — ${answers.contact ?? answers.phone}`;

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "submissions",
      data: { type, contact, answers },
    });
  } catch {
    return { ok: false, message: GENERIC_ERROR };
  }

  try {
    await sendSubmissionEmail({ type, contact, answers });
  } catch (error) {
    // Заявка вже збережена — користувачу показуємо успіх, лист відправимо вручну.
    // Але в лог пишемо: без цього не видно, чому саме лист не дійшов.
    console.error("[submit-form] лист не відправлено:", error);
  }

  return { ok: true };
}

export async function submitConsultation(
  values: TConsultationValues,
): Promise<TSubmitResult> {
  return submit("consultation", values);
}

export async function submitPartnership(
  values: TPartnershipValues,
): Promise<TSubmitResult> {
  return submit("partnership", values);
}
