import { collections, products, type Product } from "@/data/catalog";

export const MAX_SEARCH_QUERY_LENGTH = 80;

export type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

/** Converts URL input to a compact, shareable query without throwing on untrusted values. */
export function normalizeSearchQuery(value: string | string[] | undefined): string {
  return firstValue(value)
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .slice(0, MAX_SEARCH_QUERY_LENGTH);
}

function collectionTagsForProduct(product: Product): string {
  return collections
    .filter((collection) => collection.productSlugs.includes(product.slug))
    .flatMap((collection) => [collection.title, collection.eyebrow, collection.summary])
    .join(" ")
    .toLocaleLowerCase();
}

/**
 * Ranks every token independently. Exact full-name matches score first, then
 * name, category, material, collection tags, and descriptive copy. Ties keep
 * fixture order so a shared URL always produces the same result order.
 */
export function searchProducts(query: string, productList: readonly Product[] = products): readonly Product[] {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(" ");
  return productList
    .map((product, index) => {
      const fields = {
        name: product.name.toLocaleLowerCase(),
        category: product.category.toLocaleLowerCase(),
        material: product.material.toLocaleLowerCase(),
        collections: collectionTagsForProduct(product),
        description: `${product.description} ${product.provenance}`.toLocaleLowerCase(),
      };

      const score = tokens.reduce((total, token) => total
        + (fields.name.includes(token) ? 100 : 0)
        + (fields.category.includes(token) ? 45 : 0)
        + (fields.material.includes(token) ? 35 : 0)
        + (fields.collections.includes(token) ? 25 : 0)
        + (fields.description.includes(token) ? 20 : 0), normalizedQuery === fields.name ? 200 : 0);

      return { product, index, score };
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score || first.index - second.index)
    .map((result) => result.product);
}
