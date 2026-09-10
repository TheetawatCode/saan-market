import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { getProductBySlug } from "@/data/catalog";
import { useCartStore } from "@/store/cart-store";
import { ProductPurchasePanel } from "./product-purchase-panel";

describe("ProductPurchasePanel", () => {
  afterEach(() => {
    cleanup();
    useCartStore.setState({ lines: [] });
  });

  it("adds the selected variant and announces the result without moving focus", () => {
    const product = getProductBySlug("baan-rim-nam-linen-throw");
    render(<ProductPurchasePanel product={product!} />);

    fireEvent.click(screen.getByRole("radio", { name: "Oat" }));
    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    const addButton = screen.getByRole("button", { name: "Add to cart" });
    addButton.focus();
    fireEvent.click(addButton);

    expect(useCartStore.getState().lines).toEqual([{ variantId: "oat", quantity: 2 }]);
    expect(screen.getByRole("status")).toHaveTextContent("Baan Rim Nam Linen Throw in Oat added to your cart.");
    expect(addButton).toHaveFocus();
  });
});
