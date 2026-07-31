"use client";

import { FormDialog } from "./FormDialog";
import { PartnershipForm } from "./PartnershipForm";
import { PARTNERSHIP_FORM } from "./content/partnership-content";

/** CTA «Залишити заявку» + модальна форма співпраці. */
export function PartnershipDialog({ triggerLabel }: { triggerLabel: string }) {
  return (
    <FormDialog
      triggerLabel={triggerLabel}
      title={PARTNERSHIP_FORM.title}
      intro={PARTNERSHIP_FORM.intro}
    >
      {(onDone) => <PartnershipForm onDone={onDone} />}
    </FormDialog>
  );
}
