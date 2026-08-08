const REPLACEMENTS: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Екранування довільного тексту перед вставкою в HTML.
 * Потрібне скрізь, де в розмітку потрапляє ввід користувача — наприклад у листах
 * про заявки, які збираються конкатенацією рядків, а не JSX.
 */
export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => REPLACEMENTS[char]);
