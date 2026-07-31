import { z } from "zod";

const required = (message: string) => z.string().trim().min(1, message);

/** Анкета індивідуального підбору догляду (9 питань, як у формі на WP). */
export const consultationSchema = z.object({
  name: required("Вкажіть імʼя та прізвище"),
  age: required("Оберіть вік"),
  skinType: required("Оберіть тип шкіри"),
  concerns: z.array(z.string()).min(1, "Оберіть хоча б один запит"),
  dayBehaviour: required("Оберіть варіант"),
  usesCare: required("Оберіть варіант"),
  allergies: required("Оберіть варіант"),
  careFormat: required("Оберіть формат догляду"),
  contact: required("Вкажіть email, телефон або Instagram"),
});

/** Коротка форма співпраці для салонів, клінік і приватних косметологів. */
export const partnershipSchema = z.object({
  name: required("Вкажіть імʼя"),
  phone: required("Вкажіть номер телефону"),
  city: required("Вкажіть місто"),
  business: required("Вкажіть салон, клініку або «приватний косметолог»"),
  link: z.string().trim().optional(),
});

export type TConsultationValues = z.infer<typeof consultationSchema>;
export type TPartnershipValues = z.infer<typeof partnershipSchema>;

export const SUBMISSION_SCHEMAS = {
  consultation: consultationSchema,
  partnership: partnershipSchema,
} as const;

export type TSubmissionType = keyof typeof SUBMISSION_SCHEMAS;

/** Результат server action — однаковий для обох форм. */
export type TSubmitResult = { ok: true } | { ok: false; message: string };
