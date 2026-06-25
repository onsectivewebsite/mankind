"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Tag, Copy, ArrowRight, BadgePercent } from "lucide-react";
import { useOffers, usePricedProducts } from "@/store/hooks";
import { ProductCard } from "@/components/ProductCard";
import { categoryById } from "@/data/catalog";

export default function OffersPage() {
  const offers = useOffers().filter((o) => o.active);
  const priced = usePricedProducts();

  const deals = useMemo(
    () => [...priced].filter((p) => p.discountPercent > 0 && p.stock > 0).sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 24),
    [priced],
  );

  const scopeLabel = (o: (typeof offers)[number]) => {
    if (o.scope.type === "all") return "Everything";
    if (o.scope.type === "category") return categoryById(o.scope.value)?.name ?? o.scope.value;
    return o.scope.value;
  };

  return (
    <div className="animate-fade-up">
      <section className="border-b border-line bg-section">
        <div className="container-page py-12 text-center">
          <span className="chip mx-auto mb-4 w-fit bg-white text-accent shadow-sm">
            <BadgePercent className="h-4 w-4" /> Limited-time savings
          </span>
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Current offers & deals</h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-2">
            Save across our dental catalogue. Apply the codes below at checkout — discounts are
            already reflected in product prices.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        {offers.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => (
              <div key={o.id} className="card relative overflow-hidden p-6">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary-soft" />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">
                    <Tag className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold text-ink">{o.percent}% OFF</p>
                  <p className="mt-1 font-display font-semibold text-ink-2">{o.title}</p>
                  <p className="mt-1 text-sm text-ink-3">Applies to: <span className="font-medium text-ink-2">{scopeLabel(o)}</span></p>
                  {o.code ? (
                    <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-dashed border-line-strong bg-canvas px-3 py-2">
                      <span className="font-mono text-sm font-bold tracking-wider text-primary">{o.code}</span>
                      <CopyButton code={o.code} />
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-accent">Auto-applied · no code needed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">No active offers right now</p>
            <p className="mt-1 text-sm text-ink-3">Check back soon — we run regular promotions across the catalogue.</p>
            <Link href="/products" className="btn btn-primary mt-5">Browse products</Link>
          </div>
        )}
      </section>

      {deals.length ? (
        <section className="container-page pb-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-ink">Top discounted products</h2>
            <Link href="/products?sort=price-asc" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:gap-2 sm:inline-flex">
              Shop all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {deals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(code)}
      className="btn btn-ghost h-8 min-h-0 px-2 text-xs text-ink-3 hover:text-primary"
      aria-label={`Copy code ${code}`}
    >
      <Copy className="h-3.5 w-3.5" /> Copy
    </button>
  );
}
