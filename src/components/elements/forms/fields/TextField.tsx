import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/utils/cn";

type TTextFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
};

/** Текстове поле форми: підпис, підказка, input і повідомлення про помилку. */
export function TextField({
  id,
  label,
  hint,
  error,
  required,
  registration,
}: TTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-serif text-base font-semibold text-ink-soft"
      >
        {label}
        {required && (
          <span className="text-brand" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
      {hint && <p className="font-serif text-sm text-ink">{hint}</p>}

      <input
        id={id}
        type="text"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-11 w-full border bg-background px-3 font-serif text-base text-ink-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          error ? "border-destructive" : "border-line",
        )}
        {...registration}
      />

      {error && (
        <p id={errorId} role="alert" className="font-serif text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
