import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useCartStore } from "@/store/cart-store";

import { CheckoutPage } from "./checkout-page";

function fillValidCheckoutForm() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Niran S." } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "niran@example.test" } });
  fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "0812345678" } });
  fireEvent.change(screen.getByLabelText("Delivery address"), { target: { value: "12 Example Lane, Bangkok" } });
  fireEvent.click(screen.getByLabelText(/Standard demonstration delivery/i));
}

describe("CheckoutPage", () => {
  afterEach(() => {
    cleanup();
    useCartStore.setState({ lines: [] });
  });

  it("routes an empty cart to a useful collection recovery state", () => {
    render(<CheckoutPage />);

    expect(screen.getByRole("heading", { name: "Your checkout is waiting for an object." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore the collection/i })).toHaveAttribute("href", "/shop");
  });

  it("shows linked inline validation errors and focuses the first invalid field", async () => {
    useCartStore.setState({ lines: [{ variantId: "prod-lamun-cup", quantity: 1 }] });
    render(<CheckoutPage />);

    fireEvent.submit(screen.getByRole("button", { name: /complete simulated order/i }).closest("form")!);

    expect(await screen.findByText("Enter a name for this simulated delivery.")).toHaveAttribute("id", "checkout-name-error");
    const nameField = screen.getByRole("textbox", { name: /name/i });
    expect(nameField).toHaveAttribute("aria-describedby", "checkout-name-error");
    await waitFor(() => expect(nameField).toHaveFocus());
    expect(useCartStore.getState().lines).toHaveLength(1);
  });

  it("clears the cart only after a valid simulated completion and announces it", async () => {
    useCartStore.setState({ lines: [{ variantId: "prod-lamun-cup", quantity: 1 }] });
    render(<CheckoutPage />);

    expect(useCartStore.getState().lines).toHaveLength(1);
    fillValidCheckoutForm();
    fireEvent.submit(screen.getByRole("button", { name: /complete simulated order/i }).closest("form")!);

    expect(await screen.findByRole("status")).toHaveTextContent(/no payment occurred/i);
    expect(screen.getByRole("status")).toHaveTextContent("SM-DEMO-042");
    expect(useCartStore.getState().lines).toEqual([]);
  });
});
