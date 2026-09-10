"use client";

import { useState } from "react";
import { getProductOffer, type Product } from "@/data/catalog";
import { formatThaiBaht } from "@/lib/money";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variantGroup?.options[0]?.id,
  );
  const offer = getProductOffer(product, selectedVariantId);

  return (
    <aside aria-labelledby="purchase-panel-heading" className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="section-eyebrow">Available to order soon</p>
      <h2 id="purchase-panel-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
        A considered next step.
      </h2>

      {product.variantGroup ? (
        <fieldset className="mt-7 border-t border-border pt-6">
          <legend className="text-sm font-semibold text-ink">{product.variantGroup.label}</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {product.variantGroup.options.map((variant) => (
              <label
                key={variant.id}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-semibold transition-colors ${
                  offer.selectedVariant?.id === variant.id
                    ? "border-cobalt bg-blue-50 text-ink"
                    : "border-border bg-surface text-ink-muted hover:border-ink-muted"
                }`}
              >
                <input
                  checked={offer.selectedVariant?.id === variant.id}
                  className="sr-only"
                  name="variant"
                  onChange={() => setSelectedVariantId(variant.id)}
                  type="radio"
                  value={variant.id}
                />
                {variant.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <dl aria-live="polite" className="mt-7 space-y-4 border-t border-border pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-sm text-ink-muted">Price</dt>
          <dd className="font-mono text-xl font-semibold tabular-nums text-ink">{formatThaiBaht(offer.priceSatang)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-sm text-ink-muted">Availability</dt>
          <dd className="text-sm font-semibold text-ink">{offer.availability}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-sm text-ink-muted">Delivery</dt>
          <dd className="max-w-48 text-right text-sm leading-6 text-ink">{product.deliveryNote}</dd>
        </div>
      </dl>

      <p className="mt-7 border-t border-border pt-5 text-sm leading-6 text-ink-muted">
        Cart actions arrive in Milestone 3. This product story is ready for its next interaction layer.
      </p>
    </aside>
  );
}
