import type { Metadata } from "next";

import { CheckoutPage } from "@/components/checkout-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Simulated checkout",
  description: "Complete a demonstration-only Saan Market checkout with no payment or data storage.",
  robots: { index: false, follow: false },
};

export default function CheckoutRoute() {
  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12" id="main-content">
        <CheckoutPage />
      </main>
      <SiteFooter />
    </div>
  );
}
