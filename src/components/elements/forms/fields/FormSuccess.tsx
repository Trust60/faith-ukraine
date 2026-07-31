import { Check } from "lucide-react";
import { OutlineButton } from "@/ui/OutlineButton";

type TFormSuccessProps = {
  message: string;
  onClose: () => void;
};

/** Підтвердження після успішної відправки заявки. */
export function FormSuccess({ message, onClose }: TFormSuccessProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-6 py-6 text-center">
      <Check className="size-10 text-brand" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-serif text-lg leading-relaxed text-ink">{message}</p>
      <OutlineButton onClick={onClose}>Закрити</OutlineButton>
    </div>
  );
}
