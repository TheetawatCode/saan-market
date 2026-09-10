"use client";

import Link from "next/link";
import { ArtDirectedVisual } from "@/components/art-directed-visual";
import { getCartSummary } from "@/lib/cart";
import { formatThaiBaht } from "@/lib/money";
import { useCartStore } from "@/store/cart-store";

function QuantityControl({ variantId, quantity }: { variantId: string; quantity: number }) {
  const setQuantity = useCartStore((state) => state.setQuantity);

  return (
    <div className="flex items-center rounded-md border border-border bg-surface" role="group" aria-label="Quantity">
      <button className="flex size-11 items-center justify-center rounded-l-md text-lg font-semibold text-ink hover:bg-surface-muted" onClick={() => setQuantity(variantId, quantity - 1)} type="button" aria-label="Decrease quantity">−</button>
      <span className="min-w-9 text-center font-mono text-sm font-semibold tabular-nums" aria-live="polite">{quantity}</span>
      <button className="flex size-11 items-center justify-center rounded-r-md text-lg font-semibold text-ink hover:bg-surface-muted" onClick={() => setQuantity(variantId, quantity + 1)} type="button" aria-label="Increase quantity">+</button>
    </div>
  );
}

export function CartPage() {
  const lines = useCartStore((state) => state.lines);
  const removeItem = useCartStore((state) => state.removeItem);
  const summary = getCartSummary(lines);

  if (summary.availableLines.length === 0 && summary.unavailableLines.length === 0) {
    return (
      <section className="max-w-xl py-10 sm:py-16" aria-labelledby="empty-cart-heading">
        <p className="section-eyebrow">Your cart</p>
        <h1 id="empty-cart-heading" className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Nothing here yet.</h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-ink-muted">A useful object or two is a good place to begin.</p>
        <Link className="primary-link mt-8" href="/shop">Explore the collection <span aria-hidden="true">→</span></Link>
      </section>
    );
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Your cart</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A considered collection.</h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted">{summary.itemCount} {summary.itemCount === 1 ? "object" : "objects"} ready when you are.</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <section aria-label="Cart items" className="space-y-5 lg:col-span-7">
          {summary.availableLines.map((line) => (
            <article className="grid grid-cols-[6rem_1fr] gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:p-5" key={line.variantId}>
              <ArtDirectedVisual tone={line.product.visualTone} className="aspect-square overflow-hidden rounded-xl" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h2 className="text-lg font-semibold tracking-[-0.025em]">{line.product.name}</h2>
                    {line.variant ? <p className="mt-1 text-sm text-ink-muted">{line.product.variantGroup?.label}: {line.variant.label}</p> : null}
                  </div>
                  <p className="font-mono text-base font-semibold tabular-nums text-ink">{formatThaiBaht(line.priceSatang * line.quantity)}</p>
                </div>
                <p className="mt-2 text-sm text-ink-muted">{line.availability} · {line.product.deliveryNote}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <QuantityControl variantId={line.variantId} quantity={line.quantity} />
                  <button className="min-h-11 rounded-sm px-2 text-sm font-semibold text-cobalt-hover underline underline-offset-4 hover:text-navy" onClick={() => removeItem(line.variantId)} type="button">Remove <span className="sr-only">{line.product.name}</span></button>
                </div>
              </div>
            </article>
          ))}

          {summary.unavailableLines.length > 0 ? (
            <section aria-labelledby="unavailable-cart-heading" className="rounded-2xl border border-earth bg-earth-soft p-5 sm:p-6">
              <p className="section-eyebrow text-earth">Needs attention</p>
              <h2 id="unavailable-cart-heading" className="mt-3 text-xl font-semibold tracking-[-0.03em]">Some saved items are no longer available.</h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">Remove these stale cart entries to continue with the current collection.</p>
              <ul className="mt-4 space-y-3">
                {summary.unavailableLines.map((line) => (
                  <li className="flex items-center justify-between gap-4 border-t border-earth/25 pt-3" key={line.variantId}>
                    <span className="text-sm font-medium text-ink">Saved item unavailable</span>
                    <button className="min-h-11 rounded-sm px-2 text-sm font-semibold text-cobalt-hover underline underline-offset-4 hover:text-navy" onClick={() => removeItem(line.variantId)} type="button">Remove</button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </section>

        <aside aria-labelledby="cart-summary-heading" className="h-fit rounded-2xl border border-border bg-surface-muted p-6 sm:p-8 lg:col-span-4 lg:col-start-9">
          <h2 id="cart-summary-heading" className="text-2xl font-semibold tracking-[-0.035em]">Order summary</h2>
          <dl className="mt-6 space-y-4 border-y border-border py-5">
            <div className="flex items-center justify-between gap-4"><dt className="text-ink-muted">Subtotal</dt><dd className="font-mono text-xl font-semibold tabular-nums">{formatThaiBaht(summary.subtotalSatang)}</dd></div>
            <div className="flex items-center justify-between gap-4"><dt className="text-ink-muted">Delivery</dt><dd className="text-sm font-semibold">Calculated later</dd></div>
          </dl>
          {summary.unavailableLines.length > 0 ? (
            <p className="mt-5 text-sm leading-6 text-ink-muted">Remove unavailable saved items before continuing to the simulated checkout.</p>
          ) : (
            <Link className="primary-link mt-5" href="/checkout">Continue to checkout <span aria-hidden="true">→</span></Link>
          )}
          <Link className="text-link mt-5" href="/shop">Continue shopping <span aria-hidden="true">→</span></Link>
        </aside>
      </div>
    </div>
  );
}
