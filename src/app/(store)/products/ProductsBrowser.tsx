"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Check,
  PackageX,
} from "lucide-react";
import { CATEGORIES, BRANDS, categoryById, INDUSTRIES, industryById, categoriesByIndustry } from "@/data/catalog";
import { usePricedProducts } from "@/store/hooks";
import { ProductCard } from "@/components/ProductCard";
import type { PricedProduct, IndustryId } from "@/lib/types";

const PAGE_SIZE = 24;
const SORTS = [
  { id: "relevance", label: "Relevance" },
  { id: "new", label: "Newest" },
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
] as const;

const PRICE_BANDS = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "u25", label: "Under $25", min: 0, max: 25 },
  { id: "25-100", label: "$25 – $100", min: 25, max: 100 },
  { id: "100-500", label: "$100 – $500", min: 100, max: 500 },
  { id: "500+", label: "$500 & above", min: 500, max: Infinity },
] as const;

export function ProductsBrowser() {
  const router = useRouter();
  const sp = useSearchParams();
  const all = usePricedProducts();

  const q = sp.get("q") ?? "";
  const industry = sp.get("industry") ?? "";
  const category = sp.get("category") ?? "";
  const brand = sp.get("brand") ?? "";
  const band = sp.get("price") ?? "all";
  const sort = sp.get("sort") ?? (q ? "relevance" : "popular");
  const inStock = sp.get("stock") === "1";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10) || 1);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const setParam = (patch: Record<string, string | null>, resetPage = true) => {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    if (resetPage) next.delete("page");
    router.replace(`/products?${next.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const pb = PRICE_BANDS.find((b) => b.id === band) ?? PRICE_BANDS[0];
    let list = all.filter((p) => {
      if (industry && p.industryId !== industry) return false;
      if (category && p.categoryId !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (inStock && p.stock <= 0) return false;
      if (p.effectivePrice < pb.min || p.effectivePrice > pb.max) return false;
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.sku} ${categoryById(p.categoryId)?.name ?? ""} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });

    const sorters: Record<string, (a: PricedProduct, b: PricedProduct) => number> = {
      relevance: () => 0,
      new: (a, b) => b.seq - a.seq,
      popular: (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || b.reviews - a.reviews,
      "price-asc": (a, b) => a.effectivePrice - b.effectivePrice,
      "price-desc": (a, b) => b.effectivePrice - a.effectivePrice,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    };
    if (sort !== "relevance") list = [...list].sort(sorters[sort] ?? (() => 0));
    return list;
  }, [all, q, industry, category, brand, band, inStock, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeCat = category ? categoryById(category) : null;
  const activeIndustry = industry ? industryById(industry) : null;
  const hasFilters = Boolean(industry || category || brand || (band && band !== "all") || inStock || q);
  const categoryList = industry ? categoriesByIndustry(industry as IndustryId) : CATEGORIES;

  const FilterPanel = (
    <div className="space-y-6">
      {/* industry */}
      <FilterGroup title="Industry">
        <button
          onClick={() => setParam({ industry: null, category: null })}
          className={`filter-row ${!industry ? "filter-row-active" : ""}`}
        >
          All industries {!industry ? <Check className="h-4 w-4" /> : null}
        </button>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setParam({ industry: ind.id, category: null })}
            className={`filter-row ${industry === ind.id ? "filter-row-active" : ""}`}
          >
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${ind.id === "dental" ? "bg-[#0f6f73]" : ind.id === "medical" ? "bg-[#3b9fd6]" : "bg-[#2e9e7b]"}`} />
              {ind.name}
            </span>
            {industry === ind.id ? <Check className="h-4 w-4 shrink-0" /> : null}
          </button>
        ))}
      </FilterGroup>

      {/* category */}
      <FilterGroup title="Category">
        <button
          onClick={() => setParam({ category: null })}
          className={`filter-row ${!category ? "filter-row-active" : ""}`}
        >
          All categories
          {!category ? <Check className="h-4 w-4" /> : null}
        </button>
        {categoryList.map((c) => (
          <button
            key={c.id}
            onClick={() => setParam({ category: c.id, industry: c.industry })}
            className={`filter-row ${category === c.id ? "filter-row-active" : ""}`}
          >
            <span className="truncate">{c.name}</span>
            {category === c.id ? <Check className="h-4 w-4 shrink-0" /> : null}
          </button>
        ))}
      </FilterGroup>

      {/* brand */}
      <FilterGroup title="Brand">
        <button
          onClick={() => setParam({ brand: null })}
          className={`filter-row ${!brand ? "filter-row-active" : ""}`}
        >
          All brands {!brand ? <Check className="h-4 w-4" /> : null}
        </button>
        {BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => setParam({ brand: b })}
            className={`filter-row ${brand === b ? "filter-row-active" : ""}`}
          >
            {b} {brand === b ? <Check className="h-4 w-4" /> : null}
          </button>
        ))}
      </FilterGroup>

      {/* price */}
      <FilterGroup title="Price">
        {PRICE_BANDS.map((b) => (
          <button
            key={b.id}
            onClick={() => setParam({ price: b.id === "all" ? null : b.id })}
            className={`filter-row ${band === b.id ? "filter-row-active" : ""}`}
          >
            {b.label} {band === b.id ? <Check className="h-4 w-4" /> : null}
          </button>
        ))}
      </FilterGroup>

      <label className="flex cursor-pointer items-center gap-2.5 px-1 text-sm font-medium text-ink-2">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setParam({ stock: e.target.checked ? "1" : null })}
          className="h-4 w-4 accent-[var(--color-primary)]"
        />
        In stock only
      </label>
    </div>
  );

  return (
    <div className="container-page py-8">
      {/* header */}
      <div className="mb-6">
        {activeIndustry && !activeCat ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gradient">{activeIndustry.tagline}</p>
        ) : null}
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          {activeCat ? activeCat.name : activeIndustry ? `${activeIndustry.name} supplies` : brand ? `${brand} products` : q ? `Search results` : "All products"}
        </h1>
        <p className="mt-1 text-sm text-ink-3">
          {q ? <>Showing matches for <span className="font-semibold text-ink-2">“{q}”</span> · </> : null}
          {filtered.length.toLocaleString()} {filtered.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* active filter chips */}
      {hasFilters ? (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {q ? <Chip label={`“${q}”`} onClear={() => setParam({ q: null })} /> : null}
          {activeIndustry ? <Chip label={activeIndustry.name} onClear={() => setParam({ industry: null })} /> : null}
          {activeCat ? <Chip label={activeCat.name} onClear={() => setParam({ category: null })} /> : null}
          {brand ? <Chip label={brand} onClear={() => setParam({ brand: null })} /> : null}
          {band !== "all" ? <Chip label={PRICE_BANDS.find((b) => b.id === band)?.label ?? band} onClear={() => setParam({ price: null })} /> : null}
          {inStock ? <Chip label="In stock" onClear={() => setParam({ stock: null })} /> : null}
          <button
            onClick={() => router.replace("/products", { scroll: false })}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            {FilterPanel}
          </div>
        </aside>

        <div>
          {/* toolbar */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="btn btn-outline h-11 min-h-0 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="hidden text-sm text-ink-3 sm:block">Sort by</label>
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setParam({ sort: e.target.value }, false)}
                  className="field h-11 min-h-0 appearance-none pr-9"
                >
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              </div>
            </div>
          </div>

          {pageItems.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
              <PackageX className="h-10 w-10 text-ink-3" />
              <p className="font-display text-lg font-semibold text-ink">No products match your filters</p>
              <p className="max-w-sm text-sm text-ink-3">Try removing a filter or searching for something else.</p>
              <button onClick={() => router.replace("/products", { scroll: false })} className="btn btn-primary mt-2">
                Reset filters
              </button>
            </div>
          )}

          {/* pagination */}
          {totalPages > 1 ? (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onGo={(p) => {
                setParam({ page: String(p) }, false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ) : null}
        </div>
      </div>

      {/* mobile filter drawer */}
      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setFiltersOpen(false)} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="btn btn-ghost h-10 w-10 min-h-0 p-0" aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button onClick={() => setFiltersOpen(false)} className="btn btn-primary mt-6 w-full">
              Show {filtered.length.toLocaleString()} results
            </button>
          </div>
        </div>
      ) : null}

      <style>{`
        .filter-row { display:flex; align-items:center; justify-content:space-between; gap:.5rem; width:100%; text-align:left; padding:.5rem .65rem; border-radius:9px; font-size:.875rem; color:var(--color-ink-2); transition:background-color .15s ease,color .15s ease; }
        .filter-row:hover { background:var(--color-muted); }
        .filter-row-active { background:var(--color-primary-soft); color:var(--color-ink); font-weight:600; }
      `}</style>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 px-1 font-display text-sm font-bold uppercase tracking-wide text-ink-3">{title}</h3>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="chip bg-primary-soft text-ink-2">
      {label}
      <button onClick={onClear} aria-label={`Remove ${label} filter`} className="ml-0.5 rounded-full p-0.5 hover:bg-white">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function Pagination({ page, totalPages, onGo }: { page: number; totalPages: number; onGo: (p: number) => void }) {
  const pages: (number | "…")[] = [];
  const add = (n: number) => pages.push(n);
  add(1);
  if (page > 3) pages.push("…");
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) add(p);
  if (page < totalPages - 2) pages.push("…");
  if (totalPages > 1) add(totalPages);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button onClick={() => onGo(page - 1)} disabled={page <= 1} className="btn btn-outline h-10 min-h-0 px-3">Prev</button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-ink-3">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onGo(p)}
            aria-current={p === page ? "page" : undefined}
            className={`btn h-10 min-h-0 w-10 p-0 ${p === page ? "btn-primary" : "btn-outline"}`}
          >
            {p}
          </button>
        ),
      )}
      <button onClick={() => onGo(page + 1)} disabled={page >= totalPages} className="btn btn-outline h-10 min-h-0 px-3">Next</button>
    </nav>
  );
}
