import type { MetadataRoute } from "next";

import { products } from "@/data/catalog";

const siteUrl = "https://saan-market.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Collections are editorial sections of the homepage, not standalone URLs;
    // the homepage entry covers their indexable content without fragment URLs.
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
