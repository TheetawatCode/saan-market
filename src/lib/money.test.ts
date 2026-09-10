import { describe, expect, it } from "vitest";
import { formatThaiBaht } from "./money";

describe("formatThaiBaht", () => {
  it("formats integer satang as whole Thai baht", () => {
    expect(formatThaiBaht(245000)).toBe("฿2,450");
  });

  it("rejects non-integer satang values", () => {
    expect(() => formatThaiBaht(1250.5)).toThrow(
      "Thai baht amounts must be stored as integer satang.",
    );
  });
});
