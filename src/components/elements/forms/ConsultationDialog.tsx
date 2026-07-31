"use client";

import { ConsultationForm } from "./ConsultationForm";
import { FormDialog } from "./FormDialog";
import { CONSULTATION_FORM } from "./content/consultation-content";

/** CTA «Отримати консультацію» + модальна анкета підбору догляду. */
export function ConsultationDialog({ triggerLabel }: { triggerLabel: string }) {
  return (
    <FormDialog
      triggerLabel={triggerLabel}
      title={CONSULTATION_FORM.title}
      intro={CONSULTATION_FORM.intro}
    >
      {(onDone) => <ConsultationForm onDone={onDone} />}
    </FormDialog>
  );
}
