const foundations = [
  "Responsive, editorial commerce UI",
  "Accessible interactions by default",
  "Typed product and cart foundations",
  "Testing and performance as quality gates",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-6 text-ink sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col rounded-[1.5rem] border border-border bg-surface sm:min-h-[calc(100vh-4rem)]">
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8">
          <span className="text-sm font-semibold tracking-[0.18em] uppercase">
            Saan Market
          </span>
          <span className="rounded-full bg-earth-soft px-3 py-1.5 text-xs font-semibold text-earth">
            Milestone 0
          </span>
        </header>

        <section className="grid flex-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:px-16 lg:py-24">
          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.16em] text-cobalt uppercase">
              Contemporary Thai living
            </p>
            <h1 className="max-w-3xl text-5xl leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              Thoughtful objects, made for everyday rituals.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted">
              Saan Market is a fictional storefront for modern Thai home and
              lifestyle goods. The foundation is ready; the first shoppable
              stories arrive in Milestone 1.
            </p>
          </div>

          <aside
            aria-labelledby="foundation-heading"
            className="rounded-2xl bg-navy p-6 text-white sm:p-8"
          >
            <p className="text-sm font-medium text-blue-200">Project brief</p>
            <h2
              id="foundation-heading"
              className="mt-2 text-2xl font-semibold tracking-tight"
            >
              Built to demonstrate
            </h2>
            <ul className="mt-6 space-y-4">
              {foundations.map((foundation) => (
                <li
                  key={foundation}
                  className="flex gap-3 border-t border-white/15 pt-4 text-sm leading-6 text-blue-50 first:border-0 first:pt-0"
                >
                  <span aria-hidden="true" className="text-blue-300">
                    —
                  </span>
                  {foundation}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <footer className="border-t border-border px-5 py-4 text-sm text-ink-muted sm:px-8">
          Fictional portfolio project · No products are sold here
        </footer>
      </div>
    </main>
  );
}
