import { describe, expect, it } from "vitest";
import { getCartSummary, mergeCartLines, sanitizeCartLines } from "./cart";

describe("cart derivation", () => {
  it("merges matching variants and respects quantity boundaries", () => {
    expect(mergeCartLines([{ variantId: "indigo", quantity: 8 }], { variantId: "indigo", quantity: 5 }))
      .toEqual([{ variantId: "indigo", quantity: 10 }]);
  });

  it("recovers safely from malformed persisted line data", () => {
    expect(sanitizeCartLines([
      { variantId: "indigo", quantity: 2 },
      { variantId: "indigo", quantity: 3 },
      { variantId: "", quantity: 1 },
      { variantId: "oat", quantity: 0 },
      null,
      "not a line",
    ])).toEqual([{ variantId: "indigo", quantity: 5 }]);
  });

  it("derives variant prices, item counts, and subtotal from fixtures", () => {
    const summary = getCartSummary([
      { variantId: "indigo", quantity: 2 },
      { variantId: "prod-lamun-cup", quantity: 1 },
    ]);

    expect(summary.itemCount).toBe(3);
    expect(summary.subtotalSatang).toBe(579000);
    expect(summary.availableLines[0]?.variant?.label).toBe("Indigo");
  });

  it("keeps stale variant identifiers in a recoverable unavailable state", () => {
    const summary = getCartSummary([{ variantId: "removed-variant", quantity: 2 }]);

    expect(summary.itemCount).toBe(0);
    expect(summary.subtotalSatang).toBe(0);
    expect(summary.unavailableLines).toEqual([{ variantId: "removed-variant", quantity: 2, reason: "missing-variant" }]);
  });
});
