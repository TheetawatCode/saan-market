import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/data/catalog";
import { ProductCard } from "./product-card";

describe("ProductCard", () => {
  it("renders product provenance, stock status, badge, and formatted price", () => {
    render(<ProductCard product={products[0]} />);

    expect(
      screen.getByRole("heading", { name: "Lamun Stoneware Cup" }),
    ).toBeInTheDocument();
    expect(screen.getByText("฿890")).toBeInTheDocument();
    expect(screen.getByText("Small studio batch, Lampang")).toBeInTheDocument();
    expect(screen.getByText("Small batch")).toBeInTheDocument();
    expect(screen.getByText("New arrival")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Lamun Stoneware Cup" })).toHaveAttribute(
      "href",
      "/products/lamun-stoneware-cup",
    );
  });
});
