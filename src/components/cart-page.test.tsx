import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store/cart-store";
import { CartPage } from "./cart-page";

describe("CartPage", () => {
  afterEach(() => {
    cleanup();
    useCartStore.setState({ lines: [] });
  });

  it("renders a useful empty cart state", () => {
    render(<CartPage />);

    expect(screen.getByRole("heading", { name: "Nothing here yet." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore the collection/i })).toHaveAttribute("href", "/shop");
  });
});
