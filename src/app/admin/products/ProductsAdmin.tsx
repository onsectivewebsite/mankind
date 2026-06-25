"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Search,
  PlusCircle,
  Trash2,
  ChevronDown,
  RotateCcw,
  Check,
  Pencil,
} from "lucide-react";
import { useProducts } from "@/store/hooks";
import { useCatalog } from "@/store/catalog";
import { CATEGORIES, categoryById } from "@/data/catalog";
import { ProductMedia } from "@/components/ProductMedia";
import { formatCAD } from "@/lib/pricing";

const PAGE_SIZE = 20;

export function ProductsAdmin() {
  const sp = useSearchParams();
  const products = useProducts();
  const updateProduct = useCatalog((s) => s.updateProduct);
  const deleteProduct = useCatalog((s) => s.deleteProduct);
  const resetCatalog = useCatalog((s) => s.resetCatalog);
  const overrides = useCatalog((s) => s.overrides);
  const customProducts = useCatalog((s) => s.customProducts);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState(sp.get("category") ?? "");
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.categoryId !== category) return false;
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.sku}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [products, q, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const customIds = new Set(customProducts.map((p) => p.id));
  const editedCount = Object.keys(overrides).length + customProducts.length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink md:text-3xl">Products</h1>
          <p className="text-sm text-ink-3">
            {filtered.length.toLocaleString()} of {products.length.toLocaleString()} products
            {editedCount ? <span className="ml-1 text-accent">· {editedCount} customised</span> : null}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {editedCount ? (
            <button
              onClick={() => { if (confirm("Reset ALL catalogue changes (prices, stock, added & deleted products, offers) back to defaults?")) resetCatalog(); }}
              className="btn btn-ghost text-ink-3 hover:text-danger"
            >
              <RotateCcw className="h-4 w-4" /> Reset all
            </button>
          ) : null}
          <Link href="/admin/products/new" className="btn btn-primary">
            <PlusCircle className="h-5 w-5" /> Add product
          </Link>
        </div>
      </header>

      {/* toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Search by name, brand or SKU…"
            className="field pl-10"
            aria-label="Search products"
          />
        </div>
        <div className="relative sm:w-64">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="field appearance-none pr-9"
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
        </div>
      </div>

      {/* table */}
      <div className="card overflow-hidden">
        {/* header row (desktop) */}
        <div className="hidden grid-cols-[1fr_8rem_7rem_6rem_3rem] gap-3 border-b border-line bg-muted px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3 md:grid">
          <span>Product</span>
          <span>Price (CAD)</span>
          <span>MRP</span>
          <span>Stock</span>
          <span className="text-right">Del</span>
        </div>

        <div className="divide-y divide-line">
          {rows.map((p) => {
            const isCustom = customIds.has(p.id);
            const isEdited = !!overrides[p.id] || isCustom;
            return (
              <div key={p.id} className="grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[1fr_8rem_7rem_6rem_3rem] md:items-center">
                {/* product */}
                <div className="flex items-center gap-3">
                  <ProductMedia categoryId={p.categoryId} className="h-12 w-12 shrink-0" iconClass="h-5 w-5" rounded="rounded-lg" />
                  <div className="min-w-0">
                    <Link href={`/products/${p.id}`} className="line-clamp-1 text-sm font-semibold text-ink hover:text-primary">{p.name}</Link>
                    <p className="text-xs text-ink-3">
                      <span className="tnum">{p.sku}</span> · {categoryById(p.categoryId)?.name}
                      {isCustom ? <span className="ml-1 chip bg-primary-soft text-primary !px-1.5 !py-0">custom</span> : isEdited ? <span className="ml-1 text-accent">· edited</span> : null}
                    </p>
                  </div>
                </div>

                {/* price */}
                <label className="flex items-center gap-1 md:block">
                  <span className="w-16 text-xs text-ink-3 md:hidden">Price</span>
                  <input
                    type="number" min={0} step="0.01" defaultValue={p.price}
                    onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v !== p.price) updateProduct(p.id, { price: Math.max(0, v) }); }}
                    className="field h-10 min-h-0 px-2 text-sm tnum"
                    aria-label={`Price for ${p.name}`}
                  />
                </label>

                {/* mrp */}
                <label className="flex items-center gap-1 md:block">
                  <span className="w-16 text-xs text-ink-3 md:hidden">MRP</span>
                  <input
                    type="number" min={0} step="0.01" defaultValue={p.mrp}
                    onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v !== p.mrp) updateProduct(p.id, { mrp: Math.max(0, v) }); }}
                    className="field h-10 min-h-0 px-2 text-sm tnum"
                    aria-label={`MRP for ${p.name}`}
                  />
                </label>

                {/* stock */}
                <label className="flex items-center gap-1 md:block">
                  <span className="w-16 text-xs text-ink-3 md:hidden">Stock</span>
                  <input
                    type="number" min={0} step="1" defaultValue={p.stock}
                    onBlur={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v !== p.stock) updateProduct(p.id, { stock: Math.max(0, v) }); }}
                    className="field h-10 min-h-0 px-2 text-sm tnum"
                    aria-label={`Stock for ${p.name}`}
                  />
                </label>

                {/* delete */}
                <div className="flex justify-end">
                  {confirmId === p.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => { deleteProduct(p.id); setConfirmId(null); }} className="btn btn-accent h-9 min-h-0 px-2 text-xs" aria-label="Confirm delete"><Check className="h-4 w-4" /></button>
                      <button onClick={() => setConfirmId(null)} className="btn btn-ghost h-9 min-h-0 px-2 text-xs">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(p.id)} className="btn btn-ghost h-9 w-9 min-h-0 p-0 text-ink-3 hover:text-danger" aria-label={`Delete ${p.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {rows.length === 0 ? (
            <div className="px-4 py-16 text-center text-sm text-ink-3">No products match your search.</div>
          ) : null}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-ink-3">
        <Pencil className="h-3.5 w-3.5" /> Tip: edit a price or stock field and click away (blur) to save instantly. Changes persist in your browser.
      </p>

      {/* pagination */}
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1} className="btn btn-outline h-10 min-h-0 px-3">Prev</button>
          <span className="text-sm text-ink-3 tnum">Page {safePage} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages} className="btn btn-outline h-10 min-h-0 px-3">Next</button>
        </div>
      ) : null}
    </div>
  );
}
