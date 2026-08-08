import type { JSONFieldServerComponent } from "payload";
import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { describeSubmission } from "@/lib/submissions";
import { parseContact } from "@/lib/submissions/contact";
import { SubmissionRows } from "./SubmissionRows";

/**
 * Картка заявки замість сирого JSON у картці документа.
 *
 * Стоїть на полі `answers` як `admin.components.Field`, тому отримує `data` —
 * увесь документ. Читабельний вигляд збирає `describeSubmission`, спільний з
 * листом менеджеру: підписи полів і порядок рядків не мають розʼїжджатися.
 */
export const SubmissionCard: JSONFieldServerComponent = ({ data }) => {
  const type = data?.type as TSubmissionType | undefined;
  const answers = data?.answers as Record<string, unknown> | undefined;

  if (!type || !answers) {
    return (
      <p className="submission-card__empty">
        Заявки створює форма на сайті — відповідей тут ще немає.
      </p>
    );
  }

  const { title, name, contactLabel, contact, rows } = describeSubmission({
    type,
    answers,
  });
  const { href, actions } = parseContact(contact);

  return (
    <section className="submission-card">
      <p className="submission-card__kicker">{title}</p>
      <p className="submission-card__name">{name}</p>

      <p className="submission-card__contact">
        <span className="submission-card__contact-label">{contactLabel}:</span>{" "}
        {href ? <a href={href}>{contact}</a> : contact}
      </p>

      {actions.length > 0 && (
        <p className="submission-card__actions">
          {actions.map(({ href: actionHref, label }) => (
            <a key={actionHref} className="submission-card__action" href={actionHref}>
              {label}
            </a>
          ))}
        </p>
      )}

      <SubmissionRows rows={rows} />

      <details className="submission-card__raw">
        <summary>Сирі дані (JSON)</summary>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </details>
    </section>
  );
};
