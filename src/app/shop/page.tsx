import type { Metadata } from "next";
import { CatalogResults } from "@/components/catalog-results";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  availabilityOptions,
  categoryOptions,
  describeCatalogQuery,
  filterAndSortProducts,
  hasActiveCatalogFilters,
  normalizeCatalogQuery,
  sortOptions,
  type CatalogSearchParams,
} from "@/lib/catalog-query";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Saan Market's fictional collection of contemporary Thai home and lifestyle goods.",
};

type ShopPageProps = {
  searchParams: Promise<CatalogSearchParams>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = normalizeCatalogQuery(await searchParams);
  const results = filterAndSortProducts(products, query);
  const summary = describeCatalogQuery(query);
  const hasRefinements = hasActiveCatalogFilters(query);

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12 lg:py-18">
            <div className="lg:col-span-7">
              <p className="section-eyebrow">The Saan collection</p>
              <h1 className="mt-5 text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl">
                Objects for the everyday, chosen with care.
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-ink-muted lg:col-span-4 lg:col-start-9">
              A small, considered edit of contemporary Thai home and lifestyle goods—each with its own material story.
            </p>
          </div>
        </section>

        <section aria-labelledby="catalog-controls-heading" className="bg-surface-muted">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
            <h2 className="sr-only" id="catalog-controls-heading">Refine the collection</h2>
            <form action="/shop" className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end" method="get">
              <label className="grid gap-2 text-sm font-semibold text-ink">
                Category
                <select className="catalog-select" defaultValue={query.category === "all" ? "" : query.category} name="category">
                  <option value="">All categories</option>
                  {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                Availability
                <select className="catalog-select" defaultValue={query.availability === "all" ? "" : query.availability} name="availability">
                  <option value="">All availability</option>
                  {availabilityOptions.map((availability) => <option key={availability} value={availability}>{availability}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                Sort by
                <select className="catalog-select" defaultValue={query.sort} name="sort">
                  {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <button className="catalog-submit" type="submit">Apply</button>
            </form>
            {hasRefinements ? (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <p className="text-sm text-ink-muted">Viewing: {summary}</p>
                <a className="text-link" href="/shop">Clear filters</a>
              </div>
            ) : null}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <CatalogResults products={results} summary={summary} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
