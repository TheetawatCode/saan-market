import type { Product } from "@/data/catalog";
import { ProductCard } from "./product-card";

type CatalogResultsProps = {
  products: readonly Product[];
  summary: string;
};

export function CatalogResults({ products, summary }: CatalogResultsProps) {
  if (products.length === 0) {
    return (
      <section aria-labelledby="catalog-results-heading" className="mt-10 border-t border-border pt-10">
        <p className="text-sm font-medium text-ink-muted" role="status">
          No objects found for this combination.
        </p>
        <h2 id="catalog-results-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
          Try a different point of view.
        </h2>
        <p className="mt-3 max-w-lg leading-7 text-ink-muted">
          This edit does not currently include matching objects. Clear a refinement to see the full collection.
        </p>
        <a className="text-link mt-6" href="/shop">
          Clear all refinements <span aria-hidden="true">→</span>
        </a>
      </section>
    );
  }

  return (
    <section aria-labelledby="catalog-results-heading" className="mt-10">
      <p className="text-sm text-ink-muted" role="status">
        {products.length} {products.length === 1 ? "object" : "objects"} · {summary}
      </p>
      <h2 className="sr-only" id="catalog-results-heading">
        Catalog results
      </h2>
      <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
