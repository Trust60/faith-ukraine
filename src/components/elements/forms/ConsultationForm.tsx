"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submitConsultation } from "@/actions/submit-form";
import { useSubmissionForm } from "@/hooks/use-submission-form";
import { OutlineButton } from "@/ui/OutlineButton";
import {
  CONSULTATION_FIELDS as F,
  CONSULTATION_FORM,
} from "./content/consultation-content";
import { ChoiceGroupField } from "./fields/ChoiceGroupField";
import { FormStatus } from "./fields/FormStatus";
import { FormSuccess } from "./fields/FormSuccess";
import { TextField } from "./fields/TextField";
import { consultationSchema, type TConsultationValues } from "./schemas";

const DEFAULT_VALUES: TConsultationValues = {
  name: "",
  age: "",
  skinType: "",
  concerns: [],
  dayBehaviour: "",
  usesCare: "",
  allergies: "",
  careFormat: "",
  contact: "",
};

/** Анкета індивідуального підбору догляду FAITH — 9 питань. */
export function ConsultationForm({ onDone }: { onDone: () => void }) {
  const { register, errors, isSubmitting, isSent, submitError, onSubmit } =
    useSubmissionForm<TConsultationValues>({
      resolver: zodResolver(consultationSchema),
      defaultValues: DEFAULT_VALUES,
      action: submitConsultation,
    });

  if (isSent) {
    return <FormSuccess message={CONSULTATION_FORM.success} onClose={onDone} />;
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7">
      <TextField
        id="consultation-name"
        label={F.name.label}
        hint={F.name.hint}
        error={errors.name?.message}
        required
        registration={register("name")}
      />
      <ChoiceGroupField
        id="consultation-age"
        label={F.age.label}
        options={F.age.options}
        error={errors.age?.message}
        required
        registration={register("age")}
      />
      <ChoiceGroupField
        id="consultation-skin-type"
        label={F.skinType.label}
        options={F.skinType.options}
        error={errors.skinType?.message}
        required
        registration={register("skinType")}
      />
      <ChoiceGroupField
        id="consultation-concerns"
        label={F.concerns.label}
        hint={F.concerns.hint}
        options={F.concerns.options}
        error={errors.concerns?.message}
        required
        multiple
        registration={register("concerns")}
      />
      <ChoiceGroupField
        id="consultation-day-behaviour"
        label={F.dayBehaviour.label}
        options={F.dayBehaviour.options}
        error={errors.dayBehaviour?.message}
        required
        registration={register("dayBehaviour")}
      />
      <ChoiceGroupField
        id="consultation-uses-care"
        label={F.usesCare.label}
        options={F.usesCare.options}
        error={errors.usesCare?.message}
        required
        registration={register("usesCare")}
      />
      <ChoiceGroupField
        id="consultation-allergies"
        label={F.allergies.label}
        options={F.allergies.options}
        error={errors.allergies?.message}
        required
        registration={register("allergies")}
      />
      <ChoiceGroupField
        id="consultation-care-format"
        label={F.careFormat.label}
        options={F.careFormat.options}
        error={errors.careFormat?.message}
        required
        registration={register("careFormat")}
      />
      <TextField
        id="consultation-contact"
        label={F.contact.label}
        hint={F.contact.hint}
        error={errors.contact?.message}
        required
        registration={register("contact")}
      />

      <p className="font-serif text-sm leading-relaxed text-ink">
        {CONSULTATION_FORM.note}
      </p>
      <FormStatus error={submitError} />
      <OutlineButton type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Надсилаємо…" : CONSULTATION_FORM.submit}
      </OutlineButton>
    </form>
  );
}
