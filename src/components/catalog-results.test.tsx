import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { products } from "@/data/catalog";
import { CatalogResults } from "./catalog-results";

describe("CatalogResults", () => {
  afterEach(() => cleanup());

  it("renders result count and product cards", () => {
    render(<CatalogResults products={products.slice(0, 2)} summary="All categories · Featured" />);

    expect(screen.getByRole("status")).toHaveTextContent("2 objects · All categories · Featured");
    expect(screen.getByRole("heading", { name: "Lamun Stoneware Cup" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Baan Rim Nam Linen Throw" })).toBeInTheDocument();
  });

  it("renders a useful empty state", () => {
    render(<CatalogResults products={[]} summary="Textiles · In stock · Featured" />);

    expect(screen.getByRole("status")).toHaveTextContent("No objects found for this combination.");
    expect(screen.getByRole("link", { name: /clear all refinements/i })).toHaveAttribute("href", "/shop");
  });
});
