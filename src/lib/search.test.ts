import { describe, expect, it } from "vitest";

import { MAX_SEARCH_QUERY_LENGTH, normalizeSearchQuery, searchProducts } from "./search";

describe("normalizeSearchQuery", () => {
  it("normalizes casing and collapsed whitespace", () => {
    expect(normalizeSearchQuery("  LINEN\n   throw  ")).toBe("linen throw");
  });

  it("handles absent, repeated, and unusually long values safely", () => {
    expect(normalizeSearchQuery(undefined)).toBe("");
    expect(normalizeSearchQuery(["  teak  ", "ignored"])).toBe("teak");
    expect(normalizeSearchQuery("a".repeat(MAX_SEARCH_QUERY_LENGTH + 20))).toHaveLength(
      MAX_SEARCH_QUERY_LENGTH,
    );
  });
});

describe("searchProducts", () => {
  it("ranks an exact product name before broader field matches", () => {
    expect(searchProducts("Lamun Stoneware Cup")[0]?.slug).toBe("lamun-stoneware-cup");
  });

  it("finds collection context as well as product fields", () => {
    const results = searchProducts("woven rhythm");

    expect(results.map((product) => product.slug)).toEqual(
      expect.arrayContaining(["baan-rim-nam-linen-throw", "monsoon-indigo-table-runner"]),
    );
  });

  it("returns no products for an empty query", () => {
    expect(searchProducts("   ")).toEqual([]);
  });
});
