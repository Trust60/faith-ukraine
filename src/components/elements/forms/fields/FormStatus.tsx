type TFormStatusProps = {
  /** Повідомлення про помилку відправки (не валідації полів). */
  error?: string;
};

/** Рядок статусу відправки форми. Озвучується скрінрідером через role="status". */
export function FormStatus({ error }: TFormStatusProps) {
  return (
    <p role="status" aria-live="polite" className="min-h-5 font-serif text-sm text-destructive">
      {error}
    </p>
  );
}
