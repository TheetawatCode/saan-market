import { getProductOffer, products, type Product, type ProductAvailability, type ProductVariant } from "@/data/catalog";

export const CART_QUANTITY_MIN = 1;
export const CART_QUANTITY_MAX = 10;

export type CartLine = {
  variantId: string;
  quantity: number;
};

export type AvailableCartLine = CartLine & {
  product: Product;
  variant?: ProductVariant;
  priceSatang: number;
  availability: ProductAvailability;
};

export type UnavailableCartLine = CartLine & {
  reason: "missing-variant";
};

export type CartSummary = {
  availableLines: AvailableCartLine[];
  unavailableLines: UnavailableCartLine[];
  itemCount: number;
  subtotalSatang: number;
};

export function clampCartQuantity(quantity: number): number {
  return Math.min(CART_QUANTITY_MAX, Math.max(CART_QUANTITY_MIN, Math.trunc(quantity)));
}

export function sanitizeCartLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  return value.reduce<CartLine[]>((lines, candidate) => {
    if (!candidate || typeof candidate !== "object") return lines;

    const { variantId, quantity } = candidate as Record<string, unknown>;
    if (typeof variantId !== "string" || !variantId.trim() || typeof quantity !== "number" || !Number.isFinite(quantity) || quantity < CART_QUANTITY_MIN) {
      return lines;
    }

    return mergeCartLines(lines, { variantId, quantity });
  }, []);
}

export function mergeCartLines(lines: readonly CartLine[], addition: CartLine): CartLine[] {
  const quantity = clampCartQuantity(addition.quantity);
  const existing = lines.find((line) => line.variantId === addition.variantId);

  if (!existing) {
    return [...lines, { variantId: addition.variantId, quantity }];
  }

  return lines.map((line) => (
    line.variantId === addition.variantId
      ? { ...line, quantity: clampCartQuantity(line.quantity + quantity) }
      : line
  ));
}

export function getCartVariantId(product: Product, variantId?: string): string {
  return variantId ?? product.variantGroup?.options[0]?.id ?? product.id;
}

function resolveCartLine(line: CartLine, productList: readonly Product[]): AvailableCartLine | undefined {
  for (const product of productList) {
    const variant = product.variantGroup?.options.find((option) => option.id === line.variantId);
    if (variant) {
      const offer = getProductOffer(product, variant.id);
      return { ...line, product, variant, priceSatang: offer.priceSatang, availability: offer.availability };
    }

    if (!product.variantGroup && product.id === line.variantId) {
      const offer = getProductOffer(product);
      return { ...line, product, priceSatang: offer.priceSatang, availability: offer.availability };
    }
  }
}

export function getCartSummary(lines: readonly CartLine[], productList: readonly Product[] = products): CartSummary {
  const availableLines: AvailableCartLine[] = [];
  const unavailableLines: UnavailableCartLine[] = [];

  for (const line of sanitizeCartLines(lines)) {
    const resolved = resolveCartLine(line, productList);
    if (resolved) {
      availableLines.push(resolved);
    } else {
      unavailableLines.push({ ...line, reason: "missing-variant" });
    }
  }

  return {
    availableLines,
    unavailableLines,
    itemCount: availableLines.reduce((total, line) => total + line.quantity, 0),
    subtotalSatang: availableLines.reduce((total, line) => total + line.priceSatang * line.quantity, 0),
  };
}
