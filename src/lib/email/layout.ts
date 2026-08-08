import { escapeHtml } from "@/utils/escape-html";

/**
 * Скелет HTML-листа.
 *
 * Пошта — не браузер. Outlook на Windows досі рендерить движком Word: без
 * flexbox, без border-radius, а padding тримається лише на `<td>`. Тому тут
 * таблиці й інлайн-стилі, а `<style>` несе тільки теми — Gmail на Android з
 * POP/IMAP вирізає його цілком, і лист має лишатися читабельним без нього.
 *
 * Шрифти сайту (Lora / Bebas) свідомо не використовуємо: `@font-face` не працює
 * в Gmail і Yahoo, а Outlook при невдачі падає не на наш стек, а на Times New
 * Roman. Georgia — найближчий web-safe сериф до тону сайту.
 */
export const EMAIL_COLORS = {
  page: "#f1f0ee",
  card: "#ffffff",
  heading: "#333333",
  text: "#3d3d3f",
  muted: "#8b8681",
  line: "#eaeaea",
  brand: "#c8a97e",
  button: "#585651",
} as const;

export const EMAIL_FONT = "Georgia, 'Times New Roman', Times, serif";

/** Горизонтальні поля картки. Media query їх лише зменшує — база має бути безпечною. */
export const EMAIL_PADDING_X = "32px";

// Невидимий добивач прехедера: без нього клієнт підтягне у прев'ю початок листа.
// Трійка сутностей (figure space + ZWNBSP + combining mark) — бо сам по собі
// &#847; перестав ховатися в Yahoo/AOL.
const PREHEADER_FILL = "&#8199;&#65279;&#847; ".repeat(60);

const STYLES = `
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (max-width: 600px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .page { background-color: #1a1a1a !important; }
    .card { background-color: #232323 !important; }
    .t-head { color: #f2f0ec !important; }
    .t-body { color: #dcd9d4 !important; }
    .t-muted { color: #a8a29a !important; }
    .rule { border-color: #3a3a3a !important; }
  }
  [data-ogsb] .page { background-color: #1a1a1a !important; }
  [data-ogsc] .card { background-color: #232323 !important; }
  [data-ogsc] .t-head { color: #f2f0ec !important; }
  [data-ogsc] .t-body { color: #dcd9d4 !important; }
  [data-ogsc] .t-muted { color: #a8a29a !important; }
  [data-ogsc] .rule { border-color: #3a3a3a !important; }
`;

type TRenderArgs = {
  /** Тема листа — дублюється в <title> для клієнтів, що його показують. */
  title: string;
  /** Текст прев'ю в списку вхідних. Головне — в перших 40–50 символах. */
  preheader: string;
  /** Готові `<tr>` картки. */
  body: string;
};

export const renderEmailHtml = ({ title, preheader, body }: TRenderArgs) =>
  `<!doctype html>
<html lang="uk" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escapeHtml(title)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>${STYLES}</style>
</head>
<body class="page" style="margin:0;padding:0;width:100%;background-color:${EMAIL_COLORS.page};">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}${PREHEADER_FILL}</div>
<table role="presentation" class="page" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;background-color:${EMAIL_COLORS.page};">
<tr>
<td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" class="card" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;text-align:left;background-color:${EMAIL_COLORS.card};">
${body}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
</table>
</body>
</html>`;
