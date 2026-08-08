import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { describeSubmission, formatAnswer } from "@/lib/submissions";
import { parseContact } from "@/lib/submissions/contact";
import {
  actionsBlock,
  fieldsBlock,
  footerBlock,
  headerBlock,
  summaryBlock,
} from "./blocks";
import { renderEmailHtml } from "./layout";

/** Заголовок листа й початок теми — коротко, бо на мобільному видно ~35 символів. */
const EMAIL_TEXTS: Record<
  TSubmissionType,
  { heading: string; subject: string; preheaderKeys: string[] }
> = {
  consultation: {
    heading: "Нова анкета підбору догляду",
    subject: "Анкета догляду",
    // Що показати у прев'ю списку вхідних після контакту.
    preheaderKeys: ["skinType", "concerns"],
  },
  partnership: {
    heading: "Нова заявка на співпрацю",
    subject: "Заявка на співпрацю",
    preheaderKeys: ["city", "business"],
  },
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

type TBuildArgs = {
  type: TSubmissionType;
  id: number | string;
  createdAt: Date;
  answers: Record<string, unknown>;
};

export const buildSubmissionEmail = ({
  type,
  id,
  createdAt,
  answers,
}: TBuildArgs) => {
  const texts = EMAIL_TEXTS[type];
  const { name, contact, contactLabel, rows } = describeSubmission({
    type,
    answers,
  });
  const links = parseContact(contact);

  const meta = `${formatDate(createdAt)} · Заявка №${id}`;
  // Номер у темі не лише для посилань: Gmail склеює листи з однаковою темою
  // в один тред, і нові заявки стають непомітними.
  const subject = `${texts.subject} — ${name} (№${id})`;
  const preheader = [
    contact,
    ...texts.preheaderKeys.map((key) => formatAnswer(answers[key])),
  ].join(" · ");

  const html = renderEmailHtml({
    title: subject,
    preheader,
    body: [
      headerBlock({ heading: texts.heading, meta }),
      summaryBlock({ name, contact, contactHref: links.href }),
      actionsBlock(links.actions),
      fieldsBlock(rows),
      footerBlock(),
    ].join("\n"),
  });

  const text = [
    `FAITH · ${texts.heading}`,
    meta,
    "",
    name,
    `${contactLabel}: ${contact}`,
    "",
    ...rows.map(({ label, value }) => `${label}: ${value}`),
    "",
    "Заявка збережена в адмінці FAITH.",
  ].join("\n");

  return { subject, preheader, html, text, replyTo: links.email };
};
