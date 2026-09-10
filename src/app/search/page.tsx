import type { Metadata } from "next";
import { SearchResults } from "@/components/search-results";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { normalizeSearchQuery, searchProducts, type SearchParams } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Saan Market’s fictional collection by material, category, collection, or product name.",
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = normalizeSearchQuery((await searchParams).q);
  const results = searchProducts(query);

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <p className="section-eyebrow">Find your next useful thing</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl">Search the collection.</h1>
        <form action="/search" className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-[1fr_auto]" method="get">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            Search products and materials
            <input className="min-h-12 rounded-md border border-border bg-surface px-4 text-base font-normal text-ink placeholder:text-ink-muted" defaultValue={query} maxLength={80} name="q" placeholder="Try linen, stoneware, or desk" type="search" />
          </label>
          <button className="catalog-submit sm:mt-7" type="submit">Search</button>
        </form>
        <SearchResults query={query} products={results} />
      </main>
      <SiteFooter />
    </div>
  );
}
