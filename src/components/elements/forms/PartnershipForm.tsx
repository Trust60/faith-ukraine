"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { submitPartnership } from "@/actions/submit-form";
import { useSubmissionForm } from "@/hooks/use-submission-form";
import { OutlineButton } from "@/ui/OutlineButton";
import { PARTNERSHIP_FIELDS, PARTNERSHIP_FORM } from "./content/partnership-content";
import { FormStatus } from "./fields/FormStatus";
import { FormSuccess } from "./fields/FormSuccess";
import { TextField } from "./fields/TextField";
import { partnershipSchema, type TPartnershipValues } from "./schemas";

const DEFAULT_VALUES: TPartnershipValues = {
  name: "",
  phone: "",
  city: "",
  business: "",
  link: "",
};

/** Форма співпраці: салони, клініки та приватні косметологи. */
export function PartnershipForm({ onDone }: { onDone: () => void }) {
  const { register, errors, isSubmitting, isSent, submitError, onSubmit } =
    useSubmissionForm<TPartnershipValues>({
      resolver: zodResolver(partnershipSchema),
      defaultValues: DEFAULT_VALUES,
      action: submitPartnership,
    });

  if (isSent) {
    return <FormSuccess message={PARTNERSHIP_FORM.success} onClose={onDone} />;
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <TextField
        id="partnership-name"
        label={PARTNERSHIP_FIELDS.name.label}
        error={errors.name?.message}
        required
        registration={register("name")}
      />
      <TextField
        id="partnership-phone"
        label={PARTNERSHIP_FIELDS.phone.label}
        hint={PARTNERSHIP_FIELDS.phone.hint}
        error={errors.phone?.message}
        required
        registration={register("phone")}
      />
      <TextField
        id="partnership-city"
        label={PARTNERSHIP_FIELDS.city.label}
        error={errors.city?.message}
        required
        registration={register("city")}
      />
      <TextField
        id="partnership-business"
        label={PARTNERSHIP_FIELDS.business.label}
        error={errors.business?.message}
        required
        registration={register("business")}
      />
      <TextField
        id="partnership-link"
        label={PARTNERSHIP_FIELDS.link.label}
        hint={PARTNERSHIP_FIELDS.link.hint}
        error={errors.link?.message}
        registration={register("link")}
      />

      <FormStatus error={submitError} />
      <OutlineButton type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Надсилаємо…" : PARTNERSHIP_FORM.submit}
      </OutlineButton>
    </form>
  );
}
