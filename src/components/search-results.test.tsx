import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { searchProducts } from "@/lib/search";

import { SearchResults } from "./search-results";

afterEach(cleanup);

describe("SearchResults", () => {
  it("offers a useful discovery state when the query is empty", () => {
    render(<SearchResults products={[]} query="" />);

    expect(screen.getByRole("heading", { name: "Begin with a material." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lamun stoneware cup/i })).toBeInTheDocument();
  });

  it("renders an accessible summary and linked matching cards", () => {
    render(<SearchResults products={searchProducts("linen")} query="linen" />);

    expect(screen.getByRole("status")).toHaveTextContent(/object for “linen”/i);
    expect(screen.getByRole("link", { name: /baan rim nam linen throw/i })).toHaveAttribute(
      "href",
      "/products/baan-rim-nam-linen-throw",
    );
  });

  it("provides recovery links when nothing matches", () => {
    render(<SearchResults products={[]} query="nonexistent material" />);

    expect(screen.getByRole("status")).toHaveTextContent(/no objects match/i);
    expect(screen.getByRole("link", { name: /clear search/i })).toHaveAttribute("href", "/search");
    expect(screen.getByRole("link", { name: /browse all objects/i })).toHaveAttribute("href", "/shop");
  });
});
