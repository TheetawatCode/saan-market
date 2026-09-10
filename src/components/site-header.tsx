"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "#collections", label: "Collections" },
  { href: "#featured", label: "Featured objects" },
  { href: "#our-story", label: "Our approach" },
];

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
        <a
          className="rounded-sm text-sm font-semibold tracking-[0.18em] text-ink uppercase"
          href="#top"
        >
          Saan Market
        </a>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="rounded-sm py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
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
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="flex min-h-12 items-center rounded-sm text-base font-medium text-ink"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
