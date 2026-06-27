"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/store/cart";
import { useHydrated, usePricedProducts } from "@/store/hooks";
import { ProductMedia } from "@/components/ProductMedia";
import { formatCAD } from "@/lib/pricing";
import { categoryById } from "@/data/catalog";

const FREE_SHIP = 250;
const SHIP_FEE = 19.99;

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const hydrated = useHydrated();
  const priced = usePricedProducts();

  const items = useMemo(() => {
    return lines
      .map((l) => {
        const p = priced.find((x) => x.id === l.productId);
        return p ? { line: l, product: p } : null;
      })
      .filter(Boolean) as { line: { productId: string; qty: number }; product: (typeof priced)[number] }[];
  }, [lines, priced]);

  const subtotal = items.reduce((s, i) => s + i.product.effectivePrice * i.line.qty, 0);
  const listTotal = items.reduce((s, i) => s + i.product.mrp * i.line.qty, 0);
  const savings = Math.max(0, listTotal - subtotal);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIP - subtotal);

  if (!hydrated) {
    return <div className="container-page py-20 text-center text-ink-3">Loading your cart…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <ShoppingBag className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-ink-3">Browse our catalogue of clinic-grade dental supplies and add items to get started.</p>
          <Link href="/products" className="btn btn-primary mt-6">Start shopping <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink md:text-3xl">Your cart ({items.length})</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        {/* line items */}
        <div className="space-y-3">
          {items.map(({ line, product }) => (
            <div key={product.id} className="card flex gap-4 p-3 sm:p-4">
              <Link href={`/products/${product.id}`} className="shrink-0">
                <ProductMedia categoryId={product.categoryId} className="h-24 w-24 sm:h-28 sm:w-28" iconClass="h-9 w-9" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{categoryById(product.categoryId)?.name}</span>
                <Link href={`/products/${product.id}`} className="line-clamp-2 font-display font-semibold text-ink hover:text-primary">
                  {product.name}
                </Link>
                <span className="mt-0.5 text-xs text-ink-3">{formatCAD(product.effectivePrice)} / {product.unit}</span>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex h-10 items-center rounded-lg border border-line-strong">
                    <button onClick={() => setQty(product.id, line.qty - 1)} className="flex h-full w-9 items-center justify-center rounded-l-lg hover:bg-muted" aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold tnum">{line.qty}</span>
                    <button onClick={() => setQty(product.id, line.qty + 1)} className="flex h-full w-9 items-center justify-center rounded-r-lg hover:bg-muted" aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-ink tnum">{formatCAD(product.effectivePrice * line.qty)}</span>
                    <button onClick={() => remove(product.id)} className="btn btn-ghost h-9 w-9 min-h-0 p-0 text-ink-3 hover:text-danger" aria-label={`Remove ${product.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <Link href="/products" className="btn btn-ghost">← Continue shopping</Link>
            <button onClick={clear} className="btn btn-ghost text-ink-3 hover:text-danger">Clear cart</button>
          </div>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-5">
            <h2 className="font-display text-lg font-bold text-ink">Order summary</h2>

            {remaining > 0 ? (
              <div className="mt-4 rounded-xl bg-primary-soft p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
                  <Truck className="h-4 w-4 text-primary" /> Add {formatCAD(remaining)} for free shipping
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} />
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                🎉 You&apos;ve qualified for free shipping
              </p>
            )}

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink-3">Subtotal</dt><dd className="font-medium text-ink tnum">{formatCAD(subtotal)}</dd></div>
              {savings > 0 ? (
                <div className="flex justify-between text-[#0e6f57]"><dt>You save</dt><dd className="font-medium tnum">−{formatCAD(savings)}</dd></div>
              ) : null}
              <div className="flex justify-between"><dt className="text-ink-3">Shipping</dt><dd className="font-medium text-ink tnum">{shipping === 0 ? "Free" : formatCAD(shipping)}</dd></div>
              <div className="my-2 border-t border-line" />
              <div className="flex justify-between text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-bold text-ink tnum">{formatCAD(total)}</dd></div>
              <p className="text-xs text-ink-3">Taxes calculated at checkout</p>
            </dl>

            <Link href="/checkout" className="btn btn-accent mt-5 w-full text-base">
              Checkout <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
