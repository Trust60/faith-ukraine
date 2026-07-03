import type { Product } from "@/payload-types";

/** Lexical-стан richText-полів Payload (description / howToUse). */
export type TRichTextValue = Product["description"];

/**
 * Чи є в richText реальний контент. Порожнім вважаємо і «торкнутий» стан
 * лексикалу — один параграф без дітей (редактор відкривали, але нічого не ввели).
 * Type guard: після перевірки значення можна передавати в <RichText data>.
 */
export const hasRichText = (
  value: TRichTextValue,
): value is NonNullable<TRichTextValue> => {
  const children = value?.root?.children;
  if (!children || children.length === 0) return false;
  if (children.length > 1) return true;
  const nested = (children[0] as { children?: unknown[] }).children;
  return !Array.isArray(nested) || nested.length > 0;
};
