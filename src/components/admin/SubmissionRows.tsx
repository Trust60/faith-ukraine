import type { TSubmissionRow } from "@/lib/submissions";

/** Відповіді заявки як список означень: підпис — значення. */
export const SubmissionRows = ({ rows }: { rows: TSubmissionRow[] }) => {
  if (rows.length === 0) return null;

  return (
    <dl className="submission-card__rows">
      {rows.map(({ label, value }) => (
        <div key={label} className="submission-card__row">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
};
