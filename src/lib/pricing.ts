import type { Offer, PricedProduct, Product } from "./types";

export function offerApplies(offer: Offer, product: Product): boolean {
  if (!offer.active) return false;
  switch (offer.scope.type) {
    case "all":
      return true;
    case "category":
      return product.categoryId === offer.scope.value;
    case "brand":
      return product.brand === offer.scope.value;
  }
}

/** Returns the single best (largest %) active offer for a product, or null. */
export function bestOffer(product: Product, offers: Offer[]): Offer | null {
  let best: Offer | null = null;
  for (const o of offers) {
    if (offerApplies(o, product) && (!best || o.percent > best.percent)) best = o;
  }
  return best;
}

export function priceProduct(product: Product, offers: Offer[]): PricedProduct {
  const offer = bestOffer(product, offers);
  const base = product.price; // already may be below mrp
  const effectivePrice = offer
    ? Math.round(base * (1 - offer.percent / 100) * 100) / 100
    : base;
  const discountPercent =
    product.mrp > 0
      ? Math.round(((product.mrp - effectivePrice) / product.mrp) * 100)
      : 0;
  return {
    ...product,
    effectivePrice,
    appliedOffer: offer,
    discountPercent: Math.max(0, discountPercent),
  };
}

export const formatCAD = (n: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);
