import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { getProductBySlug } from "@/data/catalog";
import { ProductDetail } from "./product-detail";

describe("ProductDetail", () => {
  afterEach(() => cleanup());

  it("renders the critical product story and purchase-foundation information", () => {
    const product = getProductBySlug("baan-rim-nam-linen-throw");
    render(<ProductDetail product={product!} />);

    expect(screen.getByRole("heading", { name: "Baan Rim Nam Linen Throw", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("บ้านริมน้ำ")).toBeInTheDocument();
    expect(screen.getByText("Garment-washed linen")).toBeInTheDocument();
    expect(screen.getByText("Dispatches in 2–4 working days.")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Colour" })).toBeInTheDocument();
    expect(screen.getByText(/cart actions arrive in milestone 3/i)).toBeInTheDocument();
  });

  it("uses the planned meaningful alternative text for Lamun's primary photograph", () => {
    const product = getProductBySlug("lamun-stoneware-cup");
    render(<ProductDetail product={product!} />);

    expect(screen.getByRole("img", { name: "Speckled stoneware Lamun cup on a pale table." })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Close view of the Lamun cup’s speckled hand-finished rim." })).toBeInTheDocument();
  });

  it("renders the planned Baan Rim Nam gallery photographs", () => {
    const product = getProductBySlug("baan-rim-nam-linen-throw");
    render(<ProductDetail product={product!} />);

    expect(screen.getByRole("img", { name: "Indigo Baan Rim Nam linen throw folded on a low bench." })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Close view of the washed linen weave and finished edge." })).toBeInTheDocument();
  });
});
