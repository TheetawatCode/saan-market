import Link from "next/link";
import { getFeaturedProducts, type Product } from "@/data/catalog";
import { ProductCard } from "./product-card";

type SearchResultsProps = {
  query: string;
  products: readonly Product[];
};

export function SearchResults({ query, products }: SearchResultsProps) {
  if (!query) {
    return (
      <section aria-labelledby="search-discovery-heading" className="mt-12 border-t border-border pt-10 sm:mt-16">
        <p className="section-eyebrow">A small starting edit</p>
        <h2 id="search-discovery-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Begin with a material.</h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-ink-muted">Try “linen”, “stoneware”, or “desk”, or start with these considered objects.</p>
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
          {getFeaturedProducts().map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section aria-labelledby="no-results-heading" className="mt-12 max-w-2xl border-t border-border pt-10 sm:mt-16">
        <p className="text-sm font-semibold text-ink-muted" role="status">No objects match “{query}”.</p>
        <h2 id="no-results-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Try another material or room ritual.</h2>
        <p className="mt-4 text-lg leading-8 text-ink-muted">Search by material, category, or a collection feeling—such as “teak”, “tableware”, or “woven rhythm”.</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link className="text-link" href="/search">Clear search <span aria-hidden="true">→</span></Link>
          <Link className="text-link" href="/shop">Browse all objects <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="search-results-heading" className="mt-12 sm:mt-16">
      <p className="text-sm font-medium text-ink-muted" role="status">{products.length} {products.length === 1 ? "object" : "objects"} for “{query}”</p>
      <h2 id="search-results-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Objects with a related story.</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
