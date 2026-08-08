import type { CollectionConfig } from "payload";

/**
 * Заявки з сайту: анкета індивідуального підбору догляду та форма співпраці.
 *
 * Це джерело істини для заявок — лист менеджеру лише дублює запис (див.
 * src/lib/email/), тож збій пошти не губить звернення. Відповіді зберігаємо одним
 * JSON-полем: набір питань анкети живе в коді форми й може змінюватись, а плодити під
 * кожне питання окреме поле схеми (і міграцію) не варто.
 *
 * Створення відкрите (публічна форма), читання й редагування — лише з адмінки.
 * Запис read-only: заявку не редагують, її обробляють.
 */
export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Заявка",
    plural: "Заявки",
  },
  admin: {
    useAsTitle: "contact",
    defaultColumns: ["contact", "type", "answers", "createdAt"],
    group: "Звернення",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "type",
      type: "select",
      label: "Тип заявки",
      required: true,
      options: [
        { label: "Підбір догляду", value: "consultation" },
        { label: "Співпраця", value: "partnership" },
      ],
      admin: { readOnly: true },
    },
    {
      name: "contact",
      type: "text",
      label: "Контакт",
      required: true,
      admin: {
        readOnly: true,
        description: "Імʼя та контакт із заявки — для колонки списку.",
      },
    },
    {
      name: "answers",
      type: "json",
      label: "Відповіді",
      required: true,
      admin: {
        readOnly: true,
        // Замість редактора JSON — читабельна картка (у списку короткий
        // підсумок). Підписи полів спільні з листом менеджеру, див.
        // src/lib/submissions. Шляхи — від admin.importMap.baseDir (= src/);
        // після зміни треба `pnpm generate:importmap`.
        components: {
          Field: "/components/admin/SubmissionCard#SubmissionCard",
          Cell: "/components/admin/SubmissionCell#SubmissionCell",
        },
      },
    },
  ],
};
