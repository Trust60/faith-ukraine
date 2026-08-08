import type { TSubmissionRow } from "@/lib/submissions";
import type { TContactAction } from "@/lib/submissions/contact";
import { escapeHtml } from "@/utils/escape-html";
import { EMAIL_COLORS, EMAIL_FONT, EMAIL_PADDING_X } from "./layout";

/**
 * Цеглинки листа. Кожна повертає готовий `<tr>` картки.
 *
 * Вертикальні відступи тримаємо на `<td>`, а не на `margin` тексту: Outlook
 * ігнорує margin/padding на `<p>`, `<div>` і `<a>`.
 */

const TEXT = `font-family:${EMAIL_FONT};mso-line-height-rule:exactly;`;
const INNER_TABLE = `role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;"`;

/** Рядок картки з горизонтальними полями; `px` дає медіазапиту зменшити їх на мобільному. */
const section = (paddingTop: string, content: string) =>
  `<tr><td class="px" style="padding:${paddingTop} ${EMAIL_PADDING_X} 0 ${EMAIL_PADDING_X};">${content}</td></tr>`;

export const headerBlock = ({
  heading,
  meta,
}: {
  heading: string;
  meta: string;
}) =>
  section(
    "36px",
    `<table ${INNER_TABLE}>
<tr><td style="${TEXT}font-size:19px;line-height:24px;letter-spacing:0.34em;color:${EMAIL_COLORS.brand};">FAITH</td></tr>
<tr><td style="padding-top:14px;font-size:0;line-height:0;">
<table role="presentation" width="48" cellpadding="0" cellspacing="0" border="0" style="width:48px;border-collapse:collapse;">
<tr><td height="1" bgcolor="${EMAIL_COLORS.brand}" style="height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
</table>
</td></tr>
<tr><td style="padding-top:20px;">
<h1 class="t-head" style="margin:0;${TEXT}font-size:21px;line-height:28px;letter-spacing:0.05em;text-transform:uppercase;font-weight:normal;color:${EMAIL_COLORS.heading};">${escapeHtml(heading)}</h1>
</td></tr>
<tr><td class="t-muted" style="padding-top:10px;${TEXT}font-size:13px;line-height:20px;color:${EMAIL_COLORS.muted};">${escapeHtml(meta)}</td></tr>
</table>`,
  );

/** Головна відповідь листа: хто написав і як з ним звʼязатися. Найбільший текст. */
export const summaryBlock = ({
  name,
  contact,
  contactHref,
}: {
  name: string;
  contact: string;
  contactHref?: string;
}) => {
  const value = escapeHtml(contact);
  // Клас на самому посиланні, а не лише на комірці: інлайновий color перебиває
  // успадкування, і в темній темі контакт зливався б з фоном.
  const rendered = contactHref
    ? `<a class="t-body" href="${escapeHtml(contactHref)}" style="color:${EMAIL_COLORS.text};text-decoration:none;">${value}</a>`
    : value;

  return section(
    "30px",
    `<table ${INNER_TABLE}>
<tr><td class="t-head" style="${TEXT}font-size:25px;line-height:32px;color:${EMAIL_COLORS.heading};">${escapeHtml(name)}</td></tr>
<tr><td class="t-body" style="padding-top:8px;${TEXT}font-size:17px;line-height:24px;color:${EMAIL_COLORS.text};">${rendered}</td></tr>
</table>`,
  );
};

/**
 * Кнопки дії. Складені в стовпчик навмисно: медіазапити не працюють в Outlook
 * і в Gmail на Android з POP/IMAP, а два кнопки в ряд не влазять у 320px.
 */
export const actionsBlock = (actions: TContactAction[]) => {
  if (actions.length === 0) return "";

  const buttons = actions
    .map(
      ({ href, label }) => `<tr><td style="padding-bottom:8px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
<tr><td bgcolor="${EMAIL_COLORS.button}" style="padding:13px 26px;">
<a href="${escapeHtml(href)}" style="${TEXT}display:inline-block;font-size:15px;line-height:20px;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a>
</td></tr></table>
</td></tr>`,
    )
    .join("\n");

  return section("22px", `<table ${INNER_TABLE}>\n${buttons}\n</table>`);
};

/**
 * Відповіді анкети. Це справжні табличні дані, тому — `<th scope="row">`
 * і жодного `role="presentation"`, на відміну від таблиць-каркасів.
 */
export const fieldsBlock = (rows: TSubmissionRow[]) => {
  if (rows.length === 0) return "";

  const cell = `padding:11px 0;border-top:1px solid ${EMAIL_COLORS.line};`;
  const body = rows
    .map(
      ({ label, value }) => `<tr>
<th scope="row" align="left" valign="top" class="t-muted rule" style="${TEXT}${cell}width:38%;padding-right:14px;font-size:13px;line-height:20px;font-weight:normal;color:${EMAIL_COLORS.muted};">${escapeHtml(label)}</th>
<td valign="top" class="t-body rule" style="${TEXT}${cell}font-size:15px;line-height:22px;color:${EMAIL_COLORS.text};">${escapeHtml(value)}</td>
</tr>`,
    )
    .join("\n");

  return section(
    "26px",
    `<table role="table" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">\n${body}\n</table>`,
  );
};

export const footerBlock = () =>
  `<tr><td class="px" style="padding:30px ${EMAIL_PADDING_X} 34px ${EMAIL_PADDING_X};">
<table ${INNER_TABLE}>
<tr><td class="t-muted rule" style="padding-top:20px;border-top:1px solid ${EMAIL_COLORS.line};${TEXT}font-size:12px;line-height:19px;color:${EMAIL_COLORS.muted};">Автоматичне повідомлення з сайту faithukraine.com.ua. Заявка збережена в адмінці FAITH.</td></tr>
</table>
</td></tr>`;
