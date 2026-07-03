"use client";

/** Межа помилок сторінки товару. `error` приймається за контрактом Next, але не показується. */
export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 text-center md:px-8 md:py-24">
      <h1 className="font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Товар
      </h1>
      <p className="mt-10 text-nav">Не вдалося завантажити товар.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 underline underline-offset-4 transition-colors hover:text-ink-soft"
      >
        Спробувати ще раз
      </button>
    </section>
  );
}
