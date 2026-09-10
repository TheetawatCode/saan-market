const thaiBahtFormatter = new Intl.NumberFormat("en-TH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formats an integer satang amount for display in Thai baht. */
export function formatThaiBaht(satang: number): string {
  if (!Number.isInteger(satang)) {
    throw new TypeError("Thai baht amounts must be stored as integer satang.");
  }

  return `฿${thaiBahtFormatter.format(satang / 100)}`;
}
