import { describe, expect, it } from "vitest";
import { createCartStore } from "./cart-store";

describe("cart store actions", () => {
  it("adds, merges, changes, and removes cart lines", () => {
    const store = createCartStore();

    store.getState().addItem("indigo", 1);
    store.getState().addItem("indigo", 2);
    expect(store.getState().lines).toEqual([{ variantId: "indigo", quantity: 3 }]);

    store.getState().setQuantity("indigo", 4);
    expect(store.getState().lines).toEqual([{ variantId: "indigo", quantity: 4 }]);

    store.getState().setQuantity("indigo", 0);
    expect(store.getState().lines).toEqual([]);
  });
});
