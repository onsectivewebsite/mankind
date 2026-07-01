"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
} from "lucide-react";
import { usePricedProduct, usePricedProducts } from "@/store/hooks";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductCard } from "@/components/ProductCard";
import { PriceTag, Stars, StockPill } from "@/components/ui";
import { useCart } from "@/store/cart";
import { categoryById } from "@/data/catalog";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = usePricedProduct(id);
  const all = usePricedProducts();
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    return all
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.stock > 0)
      .slice(0, 4);
  }, [all, product]);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Product not found</h1>
        <p className="mt-2 text-ink-3">It may have been removed or is no longer available.</p>
        <Link href="/products" className="btn btn-primary mt-6">Browse all products</Link>
      </div>
    );
  }

  const cat = categoryById(product.categoryId);
  const onAdd = () => {
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="container-page py-8 animate-fade-up">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-3">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/products?category=${product.categoryId}`} className="hover:text-primary">{cat?.name}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="line-clamp-1 text-ink-2">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* media */}
        <div>
          <ProductMedia
            categoryId={product.categoryId}
            brand={product.brand}
            image={product.image}
            className="aspect-square w-full"
            iconClass="h-24 w-24"
            rounded="rounded-2xl"
          />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductMedia
                key={i}
                categoryId={product.categoryId}
                className="aspect-square w-full opacity-90"
                iconClass="h-7 w-7"
              />
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/products?category=${product.categoryId}`} className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline">
              {cat?.name}
            </Link>
            {product.isNew ? <span className="chip bg-primary text-white">New</span> : null}
            {product.bestSeller ? <span className="chip bg-amber-100 text-amber-800">Bestseller</span> : null}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-ink md:text-3xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Stars rating={product.rating} reviews={product.reviews} size={16} />
            <span className="text-sm text-ink-3">SKU: <span className="font-medium text-ink-2 tnum">{product.sku}</span></span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <PriceTag price={product.effectivePrice} mrp={product.mrp} size="lg" />
            <span className="text-sm text-ink-3">per {product.unit}</span>
          </div>
          {product.appliedOffer ? (
            <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary">
              <Tag className="h-4 w-4" /> {product.appliedOffer.title}
              {product.appliedOffer.code ? <span className="font-mono font-bold">· {product.appliedOffer.code}</span> : null}
            </p>
          ) : null}

          <div className="mt-4"><StockPill stock={product.stock} /></div>

          <p className="mt-5 text-ink-2">{product.description}</p>

          {/* qty + add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-xl border border-line-strong bg-surface">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-full w-12 items-center justify-center rounded-l-xl text-ink-2 hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold text-ink tnum" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                className="flex h-full w-12 items-center justify-center rounded-r-xl text-ink-2 hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              disabled={product.stock <= 0}
              className={`btn ${added ? "btn-accent" : "btn-primary"} h-12 flex-1 text-base sm:flex-none sm:px-8`}
            >
              {added ? <><Check className="h-5 w-5" /> Added to cart</> : <><ShoppingCart className="h-5 w-5" /> Add to cart</>}
            </button>
            <button
              onClick={() => { add(product.id, qty); router.push("/cart"); }}
              disabled={product.stock <= 0}
              className="btn btn-outline h-12 text-base"
            >
              Buy now
            </button>
          </div>

          {/* assurances */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, t: "Fast dispatch", s: "Canada-wide" },
              { icon: ShieldCheck, t: "Clinic-grade", s: "Certified supply" },
              { icon: RotateCcw, t: "Easy returns", s: "30-day policy" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3 py-2.5">
                <f.icon className="h-5 w-5 text-primary" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">{f.t}</p>
                  <p className="text-xs text-ink-3">{f.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* specs */}
      <section className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Product details</h2>
          <p className="text-ink-2">{product.description}</p>
        </div>
        <div className="card p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Specifications</h2>
          <dl className="divide-y divide-line">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-3">{k}</dt>
                <dd className="text-right font-medium text-ink-2">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 py-2.5 text-sm">
              <dt className="text-ink-3">Unit</dt>
              <dd className="text-right font-medium text-ink-2">{product.unit}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* related */}
      {related.length ? (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-ink">You may also need</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
