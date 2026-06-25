"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Boxes,
  PackageX,
  BadgePercent,
  Wallet,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useProducts, useOffers } from "@/store/hooks";
import { useCatalog } from "@/store/catalog";
import { CATEGORIES, categoryById } from "@/data/catalog";
import { formatCAD } from "@/lib/pricing";

export default function AdminDashboard() {
  const products = useProducts();
  const offers = useOffers();
  const customProducts = useCatalog((s) => s.customProducts);

  const stats = useMemo(() => {
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;
    const inventoryValue = products.reduce((s, p) => s + p.price * p.stock, 0);
    const activeOffers = offers.filter((o) => o.active).length;
    return { total: products.length, outOfStock, lowStock, inventoryValue, activeOffers };
  }, [products, offers]);

  const byCategory = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count: products.filter((p) => p.categoryId === c.id).length,
      })).sort((a, b) => b.count - a.count),
    [products],
  );
  const maxCount = Math.max(1, ...byCategory.map((c) => c.count));

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink md:text-3xl">Dashboard</h1>
          <p className="text-sm text-ink-3">Manage your catalogue, pricing and promotions.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          <PlusCircle className="h-5 w-5" /> Add product
        </Link>
      </header>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Boxes} tint="bg-primary-soft text-primary" label="Total products" value={stats.total.toLocaleString()} />
        <StatCard icon={Wallet} tint="bg-emerald-50 text-accent" label="Inventory value" value={formatCAD(stats.inventoryValue)} />
        <StatCard icon={BadgePercent} tint="bg-cyan-50 text-cyan-700" label="Active offers" value={String(stats.activeOffers)} />
        <StatCard icon={PackageX} tint="bg-amber-50 text-amber-700" label="Out of stock" value={String(stats.outOfStock)} sub={`${stats.lowStock} low`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* category distribution */}
        <div className="card p-6">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-ink">Products by category</h2>
          </div>
          <div className="space-y-3">
            {byCategory.slice(0, 9).map((c) => (
              <Link key={c.id} href={`/admin/products?category=${c.id}`} className="block">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-2">{c.name}</span>
                  <span className="font-semibold text-ink tnum">{c.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(c.count / maxCount) * 100}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* quick actions / recent */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Quick actions</h2>
            <div className="grid gap-2">
              <QuickLink href="/admin/products/new" label="Add a new product" />
              <QuickLink href="/admin/products" label="Edit prices & stock" />
              <QuickLink href="/admin/offers" label="Run an offer" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-3 font-display text-lg font-bold text-ink">Recently added</h2>
            {customProducts.length ? (
              <ul className="space-y-2.5">
                {customProducts.slice(0, 5).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/products/${p.id}`} className="line-clamp-1 font-medium text-ink-2 hover:text-primary">{p.name}</Link>
                    <span className="shrink-0 text-xs text-ink-3">{categoryById(p.categoryId)?.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-3">
                No custom products yet. <Link href="/admin/products/new" className="font-medium text-primary hover:underline">Add your first product →</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, tint, label, value, sub,
}: {
  icon: React.ElementType; tint: string; label: string; value: string; sub?: string;
}) {
  return (
    <div className="card p-5">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-2xl font-bold text-ink tnum">{value}</p>
      <p className="text-sm text-ink-3">{label}{sub ? <span className="ml-1 text-amber-600">· {sub}</span> : null}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-medium text-ink-2 transition-colors hover:border-primary hover:text-primary">
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
