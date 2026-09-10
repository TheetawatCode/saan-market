import type { Product, ProductAvailability, ProductCategory } from "@/data/catalog";

export const categoryOptions: readonly ProductCategory[] = [
  "Textiles",
  "Tableware",
  "Home accents",
  "Desk objects",
];

export const availabilityOptions: readonly ProductAvailability[] = [
  "In stock",
  "Small batch",
  "Made to order",
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type CatalogSort = (typeof sortOptions)[number]["value"];

export type CatalogQuery = {
  category: ProductCategory | "all";
  availability: ProductAvailability | "all";
  sort: CatalogSort;
};

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

const defaultCatalogQuery: CatalogQuery = {
  category: "all",
  availability: "all",
  sort: "featured",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isCategory(value: string | undefined): value is ProductCategory {
  return categoryOptions.some((category) => category === value);
}

function isAvailability(value: string | undefined): value is ProductAvailability {
  return availabilityOptions.some((availability) => availability === value);
}

function isSort(value: string | undefined): value is CatalogSort {
  return sortOptions.some((option) => option.value === value);
}

/** Converts untrusted URL search parameters to a safe, predictable catalog state. */
export function normalizeCatalogQuery(searchParams: CatalogSearchParams): CatalogQuery {
  const category = firstValue(searchParams.category);
  const availability = firstValue(searchParams.availability);
  const sort = firstValue(searchParams.sort);

  return {
    category: isCategory(category) ? category : defaultCatalogQuery.category,
    availability: isAvailability(availability)
      ? availability
      : defaultCatalogQuery.availability,
    sort: isSort(sort) ? sort : defaultCatalogQuery.sort,
  };
}

export function filterAndSortProducts(
  productList: readonly Product[],
  query: CatalogQuery,
): readonly Product[] {
  const filtered = productList.filter((product) => {
    const matchesCategory = query.category === "all" || product.category === query.category;
    const matchesAvailability =
      query.availability === "all" || product.availability === query.availability;
    return matchesCategory && matchesAvailability;
  });

  if (query.sort === "price-asc") {
    return [...filtered].sort((first, second) => first.priceSatang - second.priceSatang);
  }

  if (query.sort === "price-desc") {
    return [...filtered].sort((first, second) => second.priceSatang - first.priceSatang);
  }

  return [...filtered].sort(
    (first, second) => Number(Boolean(second.featured)) - Number(Boolean(first.featured)),
  );
}

export function hasActiveCatalogFilters(query: CatalogQuery): boolean {
  return (
    query.category !== defaultCatalogQuery.category ||
    query.availability !== defaultCatalogQuery.availability ||
    query.sort !== defaultCatalogQuery.sort
  );
}

export function describeCatalogQuery(query: CatalogQuery): string {
  const refinements = [
    query.category === "all" ? "All categories" : query.category,
    query.availability === "all" ? "All availability" : query.availability,
    sortOptions.find((option) => option.value === query.sort)?.label ?? "Featured",
  ];

  return refinements.join(" · ");
}
