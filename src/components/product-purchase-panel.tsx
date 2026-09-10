"use client";

import { useEffect, useRef, useState } from "react";
import { getProductOffer, type Product } from "@/data/catalog";
import { CART_QUANTITY_MAX, CART_QUANTITY_MIN, getCartVariantId } from "@/lib/cart";
import { formatThaiBaht } from "@/lib/money";
import { useCartStore } from "@/store/cart-store";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variantGroup?.options[0]?.id,
  );
  const [quantity, setQuantity] = useState(CART_QUANTITY_MIN);
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState("");
  const feedbackTimer = useRef<number | undefined>(undefined);
  const addItem = useCartStore((state) => state.addItem);
  const offer = getProductOffer(product, selectedVariantId);
  const variantId = getCartVariantId(product, offer.selectedVariant?.id);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  function handleQuantityChange(nextQuantity: number) {
    if (!Number.isFinite(nextQuantity)) return;
    setQuantity(Math.min(CART_QUANTITY_MAX, Math.max(CART_QUANTITY_MIN, Math.trunc(nextQuantity))));
  }

  function handleAddToCart() {
    setIsAdding(true);
    addItem(variantId, quantity);
    const optionLabel = offer.selectedVariant ? ` in ${offer.selectedVariant.label}` : "";
    setFeedback(`${product.name}${optionLabel} added to your cart.`);
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setIsAdding(false), 300);
  }

  return (
    <aside aria-labelledby="purchase-panel-heading" className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="section-eyebrow">Ready to add</p>
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

      <div className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-[auto_1fr] sm:items-end">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Quantity
          <span className="flex items-center rounded-md border border-border bg-surface">
            <button className="flex size-11 items-center justify-center rounded-l-md text-lg font-semibold text-ink hover:bg-surface-muted disabled:cursor-not-allowed disabled:text-ink-muted" disabled={quantity <= CART_QUANTITY_MIN} onClick={() => handleQuantityChange(quantity - 1)} type="button" aria-label="Decrease quantity">−</button>
            <input aria-label="Quantity" className="h-11 w-12 border-x border-border bg-surface text-center font-mono font-semibold tabular-nums" max={CART_QUANTITY_MAX} min={CART_QUANTITY_MIN} onChange={(event) => handleQuantityChange(Number(event.target.value))} type="number" value={quantity} />
            <button className="flex size-11 items-center justify-center rounded-r-md text-lg font-semibold text-ink hover:bg-surface-muted disabled:cursor-not-allowed disabled:text-ink-muted" disabled={quantity >= CART_QUANTITY_MAX} onClick={() => handleQuantityChange(quantity + 1)} type="button" aria-label="Increase quantity">+</button>
          </span>
        </label>
        <button className="catalog-submit w-full" disabled={isAdding} onClick={handleAddToCart} type="button">
          {isAdding ? "Adding…" : "Add to cart"}
        </button>
      </div>
      <p className="mt-4 min-h-6 text-sm font-medium text-ink" role="status" aria-live="polite">{feedback}</p>
    </aside>
  );
}
