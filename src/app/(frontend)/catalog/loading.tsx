/** Стан завантаження каталогу (стрімінг Next під час серверного fetch). */
export default function CatalogLoading() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
      <h1 className="text-center font-display text-3xl uppercase tracking-[0.02em] text-heading md:text-4xl">
        Каталог
      </h1>
      <p
        className="mt-10 text-center text-nav"
        role="status"
        aria-live="polite"
      >
        Завантаження…
      </p>
    </section>
  );
}
