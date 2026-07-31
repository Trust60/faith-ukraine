import type { UseFormRegisterReturn } from "react-hook-form";

type TChoiceGroupFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: readonly string[];
  /** true — чекбокси (кілька відповідей), false — радіо (одна). */
  multiple?: boolean;
  registration: UseFormRegisterReturn;
};

type TChoiceProps = {
  value: string;
  type: "radio" | "checkbox";
  /** Одна й та сама реєстрація на всі варіанти — react-hook-form групує їх за name. */
  registration: UseFormRegisterReturn;
};

function Choice({ value, type, registration }: TChoiceProps) {
  return (
    <li>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 font-serif text-base text-ink">
        <input
          type={type}
          value={value}
          className="size-4 shrink-0 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          {...registration}
        />
        <span>{value}</span>
      </label>
    </li>
  );
}

/**
 * Група варіантів відповіді. Нативні radio/checkbox: доступні з клавіатури й
 * скрінрідера «з коробки», без власного стану — react-hook-form читає їх напряму.
 */
export function ChoiceGroupField({
  id,
  label,
  hint,
  error,
  required,
  options,
  multiple,
  registration,
}: TChoiceGroupFieldProps) {
  const errorId = `${id}-error`;

  return (
    <fieldset
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="font-serif text-base font-semibold text-ink-soft">
        {label}
        {required && (
          <span className="text-brand" aria-hidden="true">
            {" *"}
          </span>
        )}
      </legend>
      {hint && <p className="mt-1 font-serif text-sm text-ink">{hint}</p>}
      <ul className="mt-2">
        {options.map((option) => (
          <Choice
            key={option}
            value={option}
            type={multiple ? "checkbox" : "radio"}
            registration={registration}
          />
        ))}
      </ul>
      {error && (
        <p id={errorId} role="alert" className="mt-1 font-serif text-sm text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}
