import type { Product } from "@/data/catalog";
import { formatThaiBaht } from "@/lib/money";
import Image from "next/image";
import { ArtDirectedVisual } from "./art-directed-visual";
import { ProductPurchasePanel } from "./product-purchase-panel";

type ProductDetailProps = {
  product: Product;
};

const bespokeProductPhotography = new Set([
  "lamun-stoneware-cup",
  "baan-rim-nam-linen-throw",
]);

export function ProductDetail({ product }: ProductDetailProps) {
  const hasBespokePhotography = bespokeProductPhotography.has(product.slug);

  return (
    <article>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <a className="text-link" href="/shop"><span aria-hidden="true">←</span> Back to the collection</a>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-24">
        <section aria-label={`${product.name} gallery`} className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {product.slug === "lamun-stoneware-cup" ? (
              <Image
                src="/images/saan-lamun-gallery-01.png"
                alt="Speckled stoneware Lamun cup on a pale table."
                width={1400}
                height={1120}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="sm:col-span-2 aspect-[5/4] h-full w-full overflow-hidden rounded-[1.5rem] border border-border object-cover"
              />
            ) : product.slug === "baan-rim-nam-linen-throw" ? (
              <Image
                src="/images/saan-rim-nam-gallery-01.png"
                alt="Indigo Baan Rim Nam linen throw folded on a low bench."
                width={1400}
                height={1120}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="sm:col-span-2 aspect-[5/4] h-full w-full overflow-hidden rounded-[1.5rem] border border-border object-cover"
              />
            ) : (
              <ArtDirectedVisual tone={product.visualTone} className="sm:col-span-2 aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-border" />
            )}
            {product.slug === "lamun-stoneware-cup" ? (
              <Image
                src="/images/saan-lamun-gallery-02.png"
                alt="Close view of the Lamun cup’s speckled hand-finished rim."
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-square h-full w-full overflow-hidden rounded-2xl border border-border object-cover"
              />
            ) : product.slug === "baan-rim-nam-linen-throw" ? (
              <Image
                src="/images/saan-rim-nam-gallery-02.png"
                alt="Close view of the washed linen weave and finished edge."
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-square h-full w-full overflow-hidden rounded-2xl border border-border object-cover"
              />
            ) : (
              <ArtDirectedVisual tone="rice" className="aspect-square overflow-hidden rounded-2xl border border-border" />
            )}
            <ArtDirectedVisual tone="timber" className="aspect-square overflow-hidden rounded-2xl border border-border" />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            {hasBespokePhotography
              ? "Art-directed photography leads this gallery; the remaining material study intentionally stands in for future product imagery."
              : "Original material studies stand in for the first art-directed product imagery."}
          </p>
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
