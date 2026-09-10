export type ProductCategory =
  | "Textiles"
  | "Tableware"
  | "Home accents"
  | "Desk objects";

export type ProductAvailability = "In stock" | "Small batch" | "Made to order";

export type ProductBadge = "New arrival" | "Limited batch" | "Hand finished";

export type VisualTone = "indigo" | "clay" | "timber" | "rice" | "cobalt";

export type ProductVariant = {
  id: string;
  label: string;
  priceSatang: number;
  availability: ProductAvailability;
};

export type ProductVariantGroup = {
  label: string;
  options: readonly ProductVariant[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  thaiName: string;
  description: string;
  priceSatang: number;
  category: ProductCategory;
  material: string;
  provenance: string;
  availability: ProductAvailability;
  deliveryNote: string;
  badge?: ProductBadge;
  visualTone: VisualTone;
  variantGroup?: ProductVariantGroup;
  featured?: boolean;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  visualTone: VisualTone;
  productSlugs: string[];
};

export const products: readonly Product[] = [
  {
    id: "prod-lamun-cup",
    slug: "lamun-stoneware-cup",
    name: "Lamun Stoneware Cup",
    thaiName: "ละมุน",
    description: "A softly rounded cup for unhurried morning tea.",
    priceSatang: 89000,
    category: "Tableware",
    material: "Hand-finished speckled stoneware",
    provenance: "Small studio batch, Lampang",
    availability: "Small batch",
    deliveryNote: "Dispatches in 2–4 working days.",
    badge: "New arrival",
    visualTone: "clay",
    featured: true,
  },
  {
    id: "prod-rim-nam-throw",
    slug: "baan-rim-nam-linen-throw",
    name: "Baan Rim Nam Linen Throw",
    thaiName: "บ้านริมน้ำ",
    description: "Washed linen with a quiet, lived-in drape.",
    priceSatang: 245000,
    category: "Textiles",
    material: "Garment-washed linen",
    provenance: "Woven in a small Chiang Mai workshop",
    availability: "In stock",
    deliveryNote: "Dispatches in 2–4 working days.",
    badge: "Hand finished",
    visualTone: "indigo",
    variantGroup: {
      label: "Colour",
      options: [
        { id: "indigo", label: "Indigo", priceSatang: 245000, availability: "In stock" },
        { id: "oat", label: "Oat", priceSatang: 235000, availability: "Made to order" },
      ],
    },
    featured: true,
  },
  {
    id: "prod-koh-teak-tray",
    slug: "koh-teak-serving-tray",
    name: "Koh Teak Serving Tray",
    thaiName: "เกาะ",
    description: "A low-profile tray with softened hand-sanded edges.",
    priceSatang: 189000,
    category: "Home accents",
    material: "Reclaimed teak",
    provenance: "Made in Prachuap Khiri Khan",
    availability: "Small batch",
    deliveryNote: "Dispatches in 3–5 working days.",
    badge: "Limited batch",
    visualTone: "timber",
    featured: true,
  },
  {
    id: "prod-fah-desk-tidy",
    slug: "fah-desk-tidy",
    name: "Fah Desk Tidy",
    thaiName: "ฟ้า",
    description: "A considered place for notes, pencils, and small tools.",
    priceSatang: 129000,
    category: "Desk objects",
    material: "Powder-coated steel and ash",
    provenance: "Assembled in Bangkok",
    availability: "In stock",
    deliveryNote: "Dispatches in 2–4 working days.",
    visualTone: "cobalt",
    featured: true,
  },
  {
    id: "prod-monsoon-runner",
    slug: "monsoon-indigo-table-runner",
    name: "Monsoon Indigo Table Runner",
    thaiName: "มรสุม",
    description: "A narrow handwoven runner with an indigo field.",
    priceSatang: 165000,
    category: "Textiles",
    material: "Handwoven cotton",
    provenance: "Natural-dyed in Sakon Nakhon",
    availability: "Made to order",
    deliveryNote: "Made to order; allow 10–14 working days.",
    visualTone: "indigo",
  },
  {
    id: "prod-sai-basket",
    slug: "sai-palm-basket",
    name: "Sai Palm Basket",
    thaiName: "สาย",
    description: "A tactile catchall for a slower, more useful home.",
    priceSatang: 119000,
    category: "Home accents",
    material: "Braided nipa palm",
    provenance: "Woven by a coastal collective, Songkhla",
    availability: "Small batch",
    deliveryNote: "Dispatches in 3–5 working days.",
    visualTone: "rice",
  },
  {
    id: "prod-prai-candleholder",
    slug: "prai-candleholder",
    name: "Prai Candleholder",
    thaiName: "ไพร",
    description: "A grounded ceramic form for a soft evening table.",
    priceSatang: 75000,
    category: "Home accents",
    material: "Unglazed terracotta",
    provenance: "Thrown in Ratchaburi",
    availability: "In stock",
    deliveryNote: "Dispatches in 2–4 working days.",
    visualTone: "clay",
  },
  {
    id: "prod-tawan-notebook-stand",
    slug: "tawan-notebook-stand",
    name: "Tawan Notebook Stand",
    thaiName: "ตะวัน",
    description: "A simple angled stand for the day’s working pages.",
    priceSatang: 149000,
    category: "Desk objects",
    material: "Oiled rubberwood",
    provenance: "Made in Nakhon Pathom",
    availability: "Made to order",
    deliveryNote: "Made to order; allow 7–10 working days.",
    visualTone: "timber",
  },
];

export const collections: readonly Collection[] = [
  {
    id: "col-everyday-table",
    slug: "everyday-table",
    title: "The everyday table",
    eyebrow: "Gather slowly",
    summary: "Tactile pieces that make ordinary meals feel considered.",
    visualTone: "clay",
    productSlugs: ["lamun-stoneware-cup", "koh-teak-serving-tray", "prai-candleholder"],
  },
  {
    id: "col-soft-structure",
    slug: "soft-structure",
    title: "Soft structure",
    eyebrow: "Woven rhythm",
    summary: "Textiles with patient texture, restraint, and a little movement.",
    visualTone: "indigo",
    productSlugs: ["baan-rim-nam-linen-throw", "monsoon-indigo-table-runner"],
  },
  {
    id: "col-work-rest",
    slug: "work-and-rest",
    title: "Work, then rest",
    eyebrow: "Useful calm",
    summary: "Small objects that give the desk and home a quieter cadence.",
    visualTone: "cobalt",
    productSlugs: ["fah-desk-tidy", "tawan-notebook-stand", "sai-palm-basket"],
  },
];

export function getFeaturedProducts(): readonly Product[] {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export type ProductOffer = {
  priceSatang: number;
  availability: ProductAvailability;
  selectedVariant?: ProductVariant;
};

export function getProductOffer(product: Product, variantId?: string): ProductOffer {
  const selectedVariant = product.variantGroup?.options.find(
    (variant) => variant.id === variantId,
  ) ?? product.variantGroup?.options[0];

  if (selectedVariant) {
    return {
      priceSatang: selectedVariant.priceSatang,
      availability: selectedVariant.availability,
      selectedVariant,
    };
  }

  return { priceSatang: product.priceSatang, availability: product.availability };
}

export function validateCatalog(
  productList: readonly Product[],
  collectionList: readonly Collection[],
): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const product of productList) {
    if (!product.id || !product.slug || !product.name) {
      errors.push("Every product needs an id, slug, and name.");
    }
    if (slugs.has(product.slug)) {
      errors.push(`Duplicate product slug: ${product.slug}`);
    }
    slugs.add(product.slug);
    if (!Number.isInteger(product.priceSatang) || product.priceSatang <= 0) {
      errors.push(`Product ${product.slug} needs a positive integer satang price.`);
    }
    if (!product.deliveryNote) {
      errors.push(`Product ${product.slug} needs a delivery expectation.`);
    }
    if (product.variantGroup) {
      const variantIds = new Set<string>();
      for (const variant of product.variantGroup.options) {
        if (variantIds.has(variant.id)) {
          errors.push(`Product ${product.slug} contains a duplicate variant id: ${variant.id}`);
        }
        variantIds.add(variant.id);
        if (!Number.isInteger(variant.priceSatang) || variant.priceSatang <= 0) {
          errors.push(`Variant ${variant.id} needs a positive integer satang price.`);
        }
      }
    }
  }

  for (const collection of collectionList) {
    if (!collection.id || !collection.slug || !collection.title) {
      errors.push("Every collection needs an id, slug, and title.");
    }
    for (const productSlug of collection.productSlugs) {
      if (!slugs.has(productSlug)) {
        errors.push(
          `Collection ${collection.slug} references missing product ${productSlug}.`,
        );
      }
    }
  }

  return errors;
}
