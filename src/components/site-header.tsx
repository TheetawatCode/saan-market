"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getCartSummary } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";

const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#our-story", label: "Our approach" },
];

function CartLink({ onNavigate }: { onNavigate?: () => void }) {
  const lines = useCartStore((state) => state.lines);
  const itemCount = getCartSummary(lines).itemCount;
  const itemLabel = itemCount === 1 ? "item" : "items";

  return (
    <Link aria-label={`Cart, ${itemCount} ${itemLabel}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink" href="/cart" onClick={onNavigate}>
      Cart <span aria-hidden="true" className="min-w-5 rounded-full bg-surface-muted px-1.5 py-0.5 text-center font-mono text-xs font-semibold tabular-nums text-ink">{itemCount}</span>
    </Link>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="border-b border-border bg-canvas/95">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          className="rounded-sm text-sm font-semibold tracking-[0.18em] text-ink uppercase"
          href="/"
        >
          Saan Market
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-sm py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li><CartLink /></li>
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          className="flex size-11 items-center justify-center rounded-sm border border-border text-sm font-semibold text-ink md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span className="sr-only">{isOpen ? "Close" : "Open"} navigation</span>
          <span aria-hidden="true">{isOpen ? "×" : "Menu"}</span>
        </button>
      </div>

      {isOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface px-5 py-3 md:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto max-w-7xl">
            {navigation.map((item, index) => (
              <li key={item.href} className="border-b border-border last:border-0">
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="flex min-h-12 items-center rounded-sm text-base font-medium text-ink"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-border last:border-0"><CartLink onNavigate={closeMenu} /></li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
