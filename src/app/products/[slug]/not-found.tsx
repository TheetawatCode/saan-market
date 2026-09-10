import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-20 sm:px-8 lg:px-12">
        <section aria-labelledby="not-found-heading" className="max-w-2xl">
          <p className="section-eyebrow">A quieter detour</p>
          <h1 id="not-found-heading" className="mt-5 text-5xl leading-[0.96] font-semibold tracking-[-0.055em] sm:text-6xl">This object is not in the edit.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">The product may have moved, or this was never part of the Saan collection. The current edit is waiting in the shop.</p>
          <Link className="primary-link mt-8" href="/shop">Browse the collection <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
