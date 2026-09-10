import type { Product } from "@/data/catalog";
import { formatThaiBaht } from "@/lib/money";
import { ArtDirectedVisual } from "./art-directed-visual";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <ArtDirectedVisual
        tone={product.visualTone}
        className="aspect-[4/5] overflow-hidden rounded-2xl border border-border"
      />
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
              {product.category}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 pt-0.5 font-mono text-sm font-medium tabular-nums text-ink">
            {formatThaiBaht(product.priceSatang)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{product.provenance}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-ink-muted">
            {product.availability}
          </span>
          {product.badge ? (
            <span className="rounded-full bg-earth-soft px-2.5 py-1 text-xs font-semibold text-earth">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
