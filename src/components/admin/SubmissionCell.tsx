import type { DefaultServerCellComponentProps } from "payload";
import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { describeSubmission } from "@/lib/submissions";

/** Скільки відповідей показати в колонці списку, щоб рядок лишався коротким. */
const PREVIEW_ROWS = 3;

/**
 * Колонка «Відповіді» у списку заявок: короткий підсумок замість сирого JSON,
 * щоб менеджер бачив суть заявки не відкриваючи її.
 */
export const SubmissionCell = ({
  cellData,
  rowData,
}: DefaultServerCellComponentProps) => {
  const type = rowData?.type as TSubmissionType | undefined;
  const answers = cellData as Record<string, unknown> | undefined;

  if (!type || !answers) return <span>—</span>;

  const { rows } = describeSubmission({ type, answers });

  return (
    <span>
      {rows
        .slice(0, PREVIEW_ROWS)
        .map(({ value }) => value)
        .join(" · ")}
    </span>
  );
};
