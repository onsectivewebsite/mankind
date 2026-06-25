"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, categoryById } from "@/data/catalog";
import type { Offer, Product } from "@/lib/types";

type NewProductInput = {
  name: string;
  brand: string;
  categoryId: string;
  price: number;
  mrp: number;
  stock: number;
  unit: string;
  description: string;
};

type CatalogState = {
  /** partial edits keyed by product id (price/stock/name/etc.) */
  overrides: Record<string, Partial<Product>>;
  /** admin-created products */
  customProducts: Product[];
  /** ids hidden from the catalog */
  deletedIds: string[];
  /** store offers / discounts */
  offers: Offer[];
  _hydrated: boolean;

  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (input: NewProductInput) => Product;
  deleteProduct: (id: string) => void;
  restoreProduct: (id: string) => void;
  resetCatalog: () => void;

  addOffer: (offer: Omit<Offer, "id">) => void;
  updateOffer: (id: string, patch: Partial<Offer>) => void;
  toggleOffer: (id: string) => void;
  deleteOffer: (id: string) => void;

  setHydrated: () => void;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const DEFAULT_OFFERS: Offer[] = [
  { id: "ofr-welcome", title: "Welcome Offer — 10% off everything", percent: 10, scope: { type: "all" }, active: true, code: "WELCOME10" },
  { id: "ofr-ppe", title: "Infection Control Week — 20% off Sterilization", percent: 20, scope: { type: "category", value: "sterilization" }, active: true, code: "STERI20" },
  { id: "ofr-burs", title: "Bulk Burs Blowout — 15% off", percent: 15, scope: { type: "category", value: "burs" }, active: true },
];

let idCounter = 0;
const nextId = (prefix: string) => {
  idCounter += 1;
  return `${prefix}-${PRODUCTS.length + idCounter}-${idCounter}`;
};

export const useCatalog = create<CatalogState>()(
  persist(
    (set, get) => ({
      overrides: {},
      customProducts: [],
      deletedIds: [],
      offers: DEFAULT_OFFERS,
      _hydrated: false,

      updateProduct: (id, patch) => {
        const custom = get().customProducts.find((p) => p.id === id);
        if (custom) {
          set((s) => ({
            customProducts: s.customProducts.map((p) =>
              p.id === id ? { ...p, ...patch } : p,
            ),
          }));
          return;
        }
        set((s) => ({
          overrides: { ...s.overrides, [id]: { ...s.overrides[id], ...patch } },
        }));
      },

      addProduct: (input) => {
        const seq = PRODUCTS.length + get().customProducts.length + 1;
        const id = nextId("mkc");
        const product: Product = {
          id,
          sku: `NEW-${String(seq).padStart(5, "0")}`,
          name: input.name,
          slug: `${slugify(input.name)}-${seq}`,
          categoryId: input.categoryId,
          industryId: categoryById(input.categoryId)?.industry ?? "dental",
          brand: input.brand || "MankindPro",
          mrp: input.mrp || input.price,
          price: input.price,
          unit: input.unit || "each",
          rating: 5,
          reviews: 0,
          stock: input.stock,
          tags: ["new"],
          bestSeller: false,
          isNew: true,
          description: input.description || `${input.name} supplied by Mankind Healthcare.`,
          specs: { Brand: input.brand || "MankindPro", SKU: `NEW-${String(seq).padStart(5, "0")}` },
          seq: 1_000_000 + seq,
        };
        set((s) => ({ customProducts: [product, ...s.customProducts] }));
        return product;
      },

      deleteProduct: (id) => {
        const isCustom = get().customProducts.some((p) => p.id === id);
        if (isCustom) {
          set((s) => ({ customProducts: s.customProducts.filter((p) => p.id !== id) }));
        } else {
          set((s) => ({ deletedIds: Array.from(new Set([...s.deletedIds, id])) }));
        }
      },

      restoreProduct: (id) =>
        set((s) => ({ deletedIds: s.deletedIds.filter((x) => x !== id) })),

      resetCatalog: () =>
        set({ overrides: {}, customProducts: [], deletedIds: [], offers: DEFAULT_OFFERS }),

      addOffer: (offer) =>
        set((s) => ({ offers: [{ ...offer, id: nextId("ofr") }, ...s.offers] })),

      updateOffer: (id, patch) =>
        set((s) => ({ offers: s.offers.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),

      toggleOffer: (id) =>
        set((s) => ({
          offers: s.offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o)),
        })),

      deleteOffer: (id) => set((s) => ({ offers: s.offers.filter((o) => o.id !== id) })),

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "mankind-catalog-v1",
      partialize: (s) => ({
        overrides: s.overrides,
        customProducts: s.customProducts,
        deletedIds: s.deletedIds,
        offers: s.offers,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/** Merge base catalogue with admin deltas → the live product list. */
export function mergeProducts(state: {
  overrides: Record<string, Partial<Product>>;
  customProducts: Product[];
  deletedIds: string[];
}): Product[] {
  const deleted = new Set(state.deletedIds);
  const base = PRODUCTS.filter((p) => !deleted.has(p.id)).map((p) => {
    const o = state.overrides[p.id];
    return o ? { ...p, ...o } : p;
  });
  return [...state.customProducts, ...base];
}
