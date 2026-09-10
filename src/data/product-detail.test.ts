import { describe, expect, it } from "vitest";
import { getProductBySlug, getProductOffer } from "./catalog";

describe("product lookup", () => {
  it("returns a known product and safely returns undefined for an unknown slug", () => {
    expect(getProductBySlug("lamun-stoneware-cup")?.name).toBe("Lamun Stoneware Cup");
    expect(getProductBySlug("not-a-saan-product")).toBeUndefined();
  });
});

describe("product variant offers", () => {
  it("derives the selected variant price and availability", () => {
    const throwProduct = getProductBySlug("baan-rim-nam-linen-throw");

    expect(throwProduct).toBeDefined();
    expect(getProductOffer(throwProduct!, "oat")).toMatchObject({
      priceSatang: 235000,
      availability: "Made to order",
      selectedVariant: { label: "Oat" },
    });
  });
});
