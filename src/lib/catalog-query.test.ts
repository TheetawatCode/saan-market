import { describe, expect, it } from "vitest";
import { products } from "@/data/catalog";
import {
  filterAndSortProducts,
  normalizeCatalogQuery,
} from "./catalog-query";

describe("catalog query normalization", () => {
  it("uses sensible defaults for unknown values", () => {
    expect(
      normalizeCatalogQuery({ category: "Unknown", availability: "Soon", sort: "newest" }),
    ).toEqual({ category: "all", availability: "all", sort: "featured" });
  });

  it("keeps valid query values and supports a real no-results combination", () => {
    const query = normalizeCatalogQuery({
      category: "Textiles",
      availability: "Small batch",
      sort: "price-asc",
    });

    expect(query).toEqual({
      category: "Textiles",
      availability: "Small batch",
      sort: "price-asc",
    });
    expect(filterAndSortProducts(products, query)).toEqual([]);
  });
});

describe("catalog sorting", () => {
  it("sorts filtered products from lowest to highest price", () => {
    const results = filterAndSortProducts(
      products,
      normalizeCatalogQuery({ category: "Home accents", sort: "price-asc" }),
    );

    expect(results.map((product) => product.slug)).toEqual([
      "prai-candleholder",
      "sai-palm-basket",
      "koh-teak-serving-tray",
    ]);
  });
});
