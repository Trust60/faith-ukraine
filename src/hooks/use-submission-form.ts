"use client";

import { useState } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import type { TSubmitResult } from "@/components/elements/forms/schemas";

type TUseSubmissionFormArgs<TValues extends FieldValues> = {
  resolver: Resolver<TValues>;
  defaultValues: DefaultValues<TValues>;
  /** Server action прийому заявки. */
  action: (values: TValues) => Promise<TSubmitResult>;
};

/**
 * Спільна логіка форм заявок: валідація, відправка в server action і стан результату.
 * Після успіху форма скидається й показується підтвердження — вікно не закриваємо
 * автоматично, щоб користувач побачив, що заявку прийнято.
 */
export function useSubmissionForm<TValues extends FieldValues>({
  resolver,
  defaultValues,
  action,
}: TUseSubmissionFormArgs<TValues>) {
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const form = useForm<TValues>({ resolver, defaultValues });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(undefined);
    const result = await action(values);
    if (result.ok) {
      setIsSent(true);
      form.reset();
      return;
    }
    setSubmitError(result.message);
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isSent,
    submitError,
    onSubmit,
  };
}
