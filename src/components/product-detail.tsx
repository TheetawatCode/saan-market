import type { Product } from "@/data/catalog";
import { formatThaiBaht } from "@/lib/money";
import { ArtDirectedVisual } from "./art-directed-visual";
import { ProductPurchasePanel } from "./product-purchase-panel";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <a className="text-link" href="/shop"><span aria-hidden="true">←</span> Back to the collection</a>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-24">
        <section aria-label={`${product.name} material studies`} className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <ArtDirectedVisual tone={product.visualTone} className="sm:col-span-2 aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-border" />
            <ArtDirectedVisual tone="rice" className="aspect-square overflow-hidden rounded-2xl border border-border" />
            <ArtDirectedVisual tone="timber" className="aspect-square overflow-hidden rounded-2xl border border-border" />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">Original material studies stand in for the first art-directed product imagery.</p>
        </section>

        <div className="lg:col-span-4 lg:col-start-9">
          <p className="section-eyebrow">{product.category}</p>
          <h1 className="mt-4 text-4xl leading-[0.98] font-semibold tracking-[-0.05em] text-balance sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-ink-muted" lang="th">{product.thaiName}</p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">{product.description}</p>

          <dl className="mt-8 grid gap-5 border-y border-border py-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-muted">Material</dt>
              <dd className="mt-1.5 font-semibold leading-6 text-ink">{product.material}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Made with care</dt>
              <dd className="mt-1.5 font-semibold leading-6 text-ink">{product.provenance}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Base price</dt>
              <dd className="mt-1.5 font-mono font-semibold tabular-nums text-ink">{formatThaiBaht(product.priceSatang)}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Collection context</dt>
              <dd className="mt-1.5 font-semibold leading-6 text-ink">Part of a considered Saan home edit.</dd>
            </div>
          </dl>

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
