import { notFound } from "next/navigation";

/**
 * Невідомі адреси сайту → наш not-found.tsx з хедером і футером.
 *
 * Звичайний app/not-found.tsx тут не спрацює: у застосунку два кореневі лейаути
 * ((frontend) і (payload)), тож спільного лейаута для глобальної 404 немає. Next для
 * цього має global-not-found.js, але він за експериментальним прапорцем. Конкретні
 * маршрути (/catalog, /admin, /api…) мають пріоритет над catch-all, тож сюди
 * потрапляє лише те, що не збіглося ні з чим.
 */
export default function UnknownRoute() {
  notFound();
}
