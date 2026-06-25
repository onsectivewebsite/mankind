"use client";

import { useMemo } from "react";
import { useCatalog, mergeProducts } from "./catalog";
import { priceProduct } from "@/lib/pricing";
import type { PricedProduct } from "@/lib/types";

/** Live product list = base catalogue + admin deltas. */
export function useProducts() {
  const overrides = useCatalog((s) => s.overrides);
  const customProducts = useCatalog((s) => s.customProducts);
  const deletedIds = useCatalog((s) => s.deletedIds);
  return useMemo(
    () => mergeProducts({ overrides, customProducts, deletedIds }),
    [overrides, customProducts, deletedIds],
  );
}

/** Live product list with the best active offer applied to each item. */
export function usePricedProducts(): PricedProduct[] {
  const products = useProducts();
  const offers = useCatalog((s) => s.offers);
  return useMemo(
    () => products.map((p) => priceProduct(p, offers)),
    [products, offers],
  );
}

export function usePricedProduct(id: string | undefined): PricedProduct | null {
  const products = useProducts();
  const offers = useCatalog((s) => s.offers);
  return useMemo(() => {
    if (!id) return null;
    const p = products.find((x) => x.id === id);
    return p ? priceProduct(p, offers) : null;
  }, [products, offers, id]);
}

export function useOffers() {
  return useCatalog((s) => s.offers);
}

export function useHydrated() {
  return useCatalog((s) => s._hydrated);
}
