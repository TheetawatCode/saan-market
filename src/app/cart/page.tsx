import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the selected Saan Market objects in a persistent client-side cart.",
};

export default function CartRoute() {
  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><CartPage /></main>
      <SiteFooter />
    </div>
  );
}
