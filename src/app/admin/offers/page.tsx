"use client";

import { useMemo, useState } from "react";
import { BadgePercent, Plus, Trash2, Tag, ChevronDown } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { useProducts } from "@/store/hooks";
import { CATEGORIES, BRANDS, categoryById } from "@/data/catalog";
import type { Offer, OfferScope } from "@/lib/types";

export default function OffersAdminPage() {
  const offers = useCatalog((s) => s.offers);
  const addOffer = useCatalog((s) => s.addOffer);
  const toggleOffer = useCatalog((s) => s.toggleOffer);
  const deleteOffer = useCatalog((s) => s.deleteOffer);
  const updateOffer = useCatalog((s) => s.updateOffer);
  const products = useProducts();

  const [title, setTitle] = useState("");
  const [percent, setPercent] = useState("15");
  const [scopeType, setScopeType] = useState<OfferScope["type"]>("all");
  const [scopeValue, setScopeValue] = useState(CATEGORIES[0].id);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const affectedCount = (o: Offer) =>
    products.filter((p) => {
      if (o.scope.type === "all") return true;
      if (o.scope.type === "category") return p.categoryId === o.scope.value;
      return p.brand === o.scope.value;
    }).length;

  const scopeLabel = (o: Offer) =>
    o.scope.type === "all" ? "Entire store"
      : o.scope.type === "category" ? categoryById(o.scope.value)?.name ?? o.scope.value
      : o.scope.value;

  const previewCount = useMemo(() => {
    return products.filter((p) => {
      if (scopeType === "all") return true;
      if (scopeType === "category") return p.categoryId === scopeValue;
      return p.brand === scopeValue;
    }).length;
  }, [products, scopeType, scopeValue]);

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const pct = parseInt(percent, 10);
    if (!title.trim()) return setErr("Please give the offer a title");
    if (isNaN(pct) || pct < 1 || pct > 90) return setErr("Discount must be between 1% and 90%");
    setErr("");
    const scope: OfferScope =
      scopeType === "all" ? { type: "all" }
        : scopeType === "category" ? { type: "category", value: scopeValue }
        : { type: "brand", value: scopeValue };
    addOffer({ title: title.trim(), percent: pct, scope, active: true, code: code.trim() || undefined });
    setTitle(""); setPercent("15"); setCode("");
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">Offers & discounts</h1>
        <p className="text-sm text-ink-3">Run promotions across the whole store, a category or a brand. Discounts apply instantly on the storefront.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* existing offers */}
        <div className="space-y-3">
          {offers.length === 0 ? (
            <div className="card px-6 py-16 text-center text-sm text-ink-3">No offers yet. Create one on the right →</div>
          ) : (
            offers.map((o) => (
              <div key={o.id} className={`card flex flex-wrap items-center gap-4 p-4 ${o.active ? "" : "opacity-70"}`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${o.active ? "bg-accent" : "bg-ink-3"}`}>
                  <span className="text-sm font-extrabold tnum">{o.percent}%</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-ink">{o.title}</p>
                  <p className="text-xs text-ink-3">
                    {scopeLabel(o)} · {affectedCount(o).toLocaleString()} products
                    {o.code ? <> · code <span className="font-mono font-semibold text-primary">{o.code}</span></> : <> · auto-applied</>}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-2">
                    <span className="hidden sm:inline">{o.active ? "Active" : "Paused"}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={o.active}
                      onClick={() => toggleOffer(o.id)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${o.active ? "bg-accent" : "bg-line-strong"}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${o.active ? "left-[1.45rem]" : "left-0.5"}`} />
                    </button>
                  </label>
                  <button onClick={() => deleteOffer(o.id)} className="btn btn-ghost h-10 w-10 min-h-0 p-0 text-ink-3 hover:text-danger" aria-label={`Delete ${o.title}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* create form */}
        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <form onSubmit={create} className="card space-y-4 p-5">
            <div className="flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold text-ink">New offer</h2>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-2">Title</span>
              <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Spring Sale" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-2">Discount %</span>
              <input type="number" min={1} max={90} className="field tnum" value={percent} onChange={(e) => setPercent(e.target.value)} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-2">Applies to</span>
              <div className="relative">
                <select className="field appearance-none pr-9" value={scopeType} onChange={(e) => setScopeType(e.target.value as OfferScope["type"])}>
                  <option value="all">Entire store</option>
                  <option value="category">A category</option>
                  <option value="brand">A brand</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              </div>
            </label>

            {scopeType !== "all" ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-2">{scopeType === "category" ? "Category" : "Brand"}</span>
                <div className="relative">
                  <select className="field appearance-none pr-9" value={scopeValue} onChange={(e) => setScopeValue(e.target.value)}>
                    {scopeType === "category"
                      ? CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)
                      : BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                </div>
              </label>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-2">Coupon code <span className="text-ink-3">(optional)</span></span>
              <input className="field font-mono uppercase" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="SAVE15" />
            </label>

            <p className="flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs font-medium text-ink-2">
              <Tag className="h-3.5 w-3.5 text-primary" /> Will discount {previewCount.toLocaleString()} products
            </p>

            {err ? <p role="alert" className="text-xs font-medium text-danger">{err}</p> : null}

            <button type="submit" className="btn btn-accent w-full">
              <Plus className="h-5 w-5" /> Create offer
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
