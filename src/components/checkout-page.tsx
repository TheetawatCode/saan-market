"use client";

import { type FormEvent, type RefObject, useRef, useState } from "react";
import Link from "next/link";

import { getCartSummary } from "@/lib/cart";
import { formatThaiBaht } from "@/lib/money";
import { useCartStore } from "@/store/cart-store";

type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryOption: string;
};

type CheckoutField = keyof CheckoutFields;
type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const initialFields: CheckoutFields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  deliveryOption: "",
};

const fieldOrder: CheckoutField[] = ["name", "email", "phone", "address", "deliveryOption"];
const demoOrderReference = "SM-DEMO-042";

function validateFields(fields: CheckoutFields): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!fields.name.trim()) errors.name = "Enter a name for this simulated delivery.";
  if (!fields.email.trim()) {
    errors.email = "Enter an email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Enter an email address in a valid format.";
  }
  if (!fields.phone.trim()) errors.phone = "Enter a phone number.";
  if (!fields.address.trim()) errors.address = "Enter a delivery address.";
  if (!fields.deliveryOption) errors.deliveryOption = "Choose a simulated delivery option.";

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-2 text-sm font-medium text-earth" id={id}>{message}</p> : null;
}

function CheckoutQuantityControl({ variantId, quantity }: { variantId: string; quantity: number }) {
  const setQuantity = useCartStore((state) => state.setQuantity);

  return (
    <div aria-label="Quantity" className="flex items-center rounded-md border border-border bg-surface" role="group">
      <button aria-label="Decrease quantity" className="flex size-11 items-center justify-center rounded-l-md text-lg font-semibold text-ink hover:bg-surface-muted" onClick={() => setQuantity(variantId, quantity - 1)} type="button">−</button>
      <span aria-live="polite" className="min-w-9 text-center font-mono text-sm font-semibold tabular-nums">{quantity}</span>
      <button aria-label="Increase quantity" className="flex size-11 items-center justify-center rounded-r-md text-lg font-semibold text-ink hover:bg-surface-muted" onClick={() => setQuantity(variantId, quantity + 1)} type="button">+</button>
    </div>
  );
}

export function CheckoutPage() {
  const lines = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const summary = getCartSummary(lines);
  const [fields, setFields] = useState<CheckoutFields>(initialFields);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isComplete, setIsComplete] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const deliveryRef = useRef<HTMLInputElement>(null);
  const refs: Record<CheckoutField, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    address: addressRef,
    deliveryOption: deliveryRef,
  };

  if (isComplete) {
    return (
      <section aria-labelledby="confirmation-heading" className="max-w-2xl py-12 sm:py-20">
        <p className="section-eyebrow">Demo order confirmed</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl" id="confirmation-heading">Your selection has been noted.</h1>
        <div aria-live="polite" className="mt-7 rounded-2xl border border-border bg-surface p-6 sm:p-8" role="status">
          <p className="font-mono text-sm font-semibold tracking-[0.12em] text-cobalt">{demoOrderReference}</p>
          <p className="mt-4 text-lg leading-8 text-ink-muted">This is a portfolio demonstration: no payment occurred, and your contact or delivery details were not sent or stored.</p>
        </div>
        <Link className="primary-link mt-8" href="/shop">Return to the collection <span aria-hidden="true">→</span></Link>
      </section>
    );
  }

  if (summary.availableLines.length === 0 && summary.unavailableLines.length === 0) {
    return (
      <section aria-labelledby="checkout-empty-heading" className="max-w-xl py-12 sm:py-20">
        <p className="section-eyebrow">Simulated checkout</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl" id="checkout-empty-heading">Your checkout is waiting for an object.</h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">Choose something considered, then return here when your cart is ready.</p>
        <Link className="primary-link mt-8" href="/shop">Explore the collection <span aria-hidden="true">→</span></Link>
      </section>
    );
  }

  function updateField(field: CheckoutField, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateFields(fields);
    if (summary.unavailableLines.length > 0) {
      nextErrors.deliveryOption = "Remove unavailable saved items before completing this checkout.";
    }

    setErrors(nextErrors);
    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      refs[firstInvalidField].current?.focus();
      return;
    }

    setFields(initialFields);
    setErrors({});
    clearCart();
    setIsComplete(true);
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Simulated checkout</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A few practical details.</h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted">This form demonstrates a considered checkout interaction. It never collects, sends, or stores personal data.</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <form className="space-y-10 lg:col-span-7" noValidate onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-2xl font-semibold tracking-[-0.035em]">Contact and delivery</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="checkout-name">Name
                <input aria-describedby={errors.name ? "checkout-name-error" : undefined} aria-invalid={Boolean(errors.name)} className="min-h-12 rounded-md border border-border bg-surface px-4 text-base font-normal" id="checkout-name" onChange={(event) => updateField("name", event.target.value)} ref={nameRef} type="text" value={fields.name} />
                <FieldError id="checkout-name-error" message={errors.name} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="checkout-email">Email
                <input aria-describedby={errors.email ? "checkout-email-error" : undefined} aria-invalid={Boolean(errors.email)} className="min-h-12 rounded-md border border-border bg-surface px-4 text-base font-normal" id="checkout-email" onChange={(event) => updateField("email", event.target.value)} ref={emailRef} type="email" value={fields.email} />
                <FieldError id="checkout-email-error" message={errors.email} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="checkout-phone">Phone
                <input aria-describedby={errors.phone ? "checkout-phone-error" : undefined} aria-invalid={Boolean(errors.phone)} className="min-h-12 rounded-md border border-border bg-surface px-4 text-base font-normal" id="checkout-phone" onChange={(event) => updateField("phone", event.target.value)} ref={phoneRef} inputMode="tel" type="tel" value={fields.phone} />
                <FieldError id="checkout-phone-error" message={errors.phone} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink sm:col-span-2" htmlFor="checkout-address">Delivery address
                <textarea aria-describedby={errors.address ? "checkout-address-error" : undefined} aria-invalid={Boolean(errors.address)} className="min-h-28 rounded-md border border-border bg-surface px-4 py-3 text-base font-normal" id="checkout-address" onChange={(event) => updateField("address", event.target.value)} ref={addressRef} value={fields.address} />
                <FieldError id="checkout-address-error" message={errors.address} />
              </label>
            </div>
          </fieldset>

          <fieldset aria-describedby={errors.deliveryOption ? "checkout-delivery-error" : undefined} aria-invalid={Boolean(errors.deliveryOption)}>
            <legend className="text-xl font-semibold tracking-[-0.03em]">Delivery option</legend>
            <div className="mt-4 grid gap-3">
              <label className="flex min-h-12 items-center gap-3 rounded-md border border-border bg-surface px-4 text-sm font-medium">
                <input checked={fields.deliveryOption === "standard"} name="delivery-option" onChange={(event) => updateField("deliveryOption", event.target.value)} ref={deliveryRef} type="radio" value="standard" />
                Standard demonstration delivery · 2–4 working days
              </label>
              <label className="flex min-h-12 items-center gap-3 rounded-md border border-border bg-surface px-4 text-sm font-medium">
                <input checked={fields.deliveryOption === "made-to-order"} name="delivery-option" onChange={(event) => updateField("deliveryOption", event.target.value)} type="radio" value="made-to-order" />
                Made-to-order demonstration · timing follows the object
              </label>
            </div>
            <FieldError id="checkout-delivery-error" message={errors.deliveryOption} />
          </fieldset>

          <button className="primary-link w-full justify-center sm:w-auto" type="submit">Complete simulated order <span aria-hidden="true">→</span></button>
        </form>

        <aside aria-labelledby="checkout-summary-heading" className="h-fit rounded-2xl border border-border bg-surface-muted p-6 sm:p-8 lg:col-span-4 lg:col-start-9">
          <h2 className="text-2xl font-semibold tracking-[-0.035em]" id="checkout-summary-heading">Order summary</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {summary.availableLines.map((line) => (
              <li className="py-4" key={line.variantId}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{line.product.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{line.variant ? `${line.product.variantGroup?.label}: ${line.variant.label} · ` : ""}{formatThaiBaht(line.priceSatang)} each</p>
                  </div>
                  <p className="font-mono text-sm font-semibold tabular-nums">{formatThaiBaht(line.priceSatang * line.quantity)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <CheckoutQuantityControl quantity={line.quantity} variantId={line.variantId} />
                  <button className="min-h-11 rounded-sm px-2 text-sm font-semibold text-cobalt-hover underline underline-offset-4 hover:text-navy" onClick={() => removeItem(line.variantId)} type="button">Remove <span className="sr-only">{line.product.name}</span></button>
                </div>
              </li>
            ))}
          </ul>

          {summary.unavailableLines.length > 0 ? (
            <section aria-labelledby="checkout-unavailable-heading" className="mt-5 rounded-xl border border-earth bg-earth-soft p-4">
              <h3 className="font-semibold" id="checkout-unavailable-heading">Unavailable saved item</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">Remove unavailable saved items before the simulated order can be completed.</p>
              {summary.unavailableLines.map((line) => <button className="mt-2 min-h-11 rounded-sm px-2 text-sm font-semibold text-cobalt-hover underline underline-offset-4 hover:text-navy" key={line.variantId} onClick={() => removeItem(line.variantId)} type="button">Remove unavailable item</button>)}
            </section>
          ) : null}

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4"><dt className="text-ink-muted">Subtotal</dt><dd className="font-mono text-xl font-semibold tabular-nums">{formatThaiBaht(summary.subtotalSatang)}</dd></div>
            <div className="flex items-start justify-between gap-4"><dt className="text-ink-muted">Delivery and payment</dt><dd className="max-w-44 text-right text-sm font-semibold">Simulated — no charge</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
