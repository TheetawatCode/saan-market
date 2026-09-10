import { collections, products, validateCatalog } from "./catalog";
import { describe, expect, it } from "vitest";

describe("Saan Market fixtures", () => {
  it("contain valid products and collection references", () => {
    expect(products).toHaveLength(8);
    expect(validateCatalog(products, collections)).toEqual([]);
  });
});
