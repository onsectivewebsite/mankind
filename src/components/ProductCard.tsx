"use client";

import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { PricedProduct } from "@/lib/types";
import { ProductMedia } from "./ProductMedia";
import { PriceTag, Stars, DiscountBadge } from "./ui";
import { useCart } from "@/store/cart";
import { categoryById } from "@/data/catalog";

export function ProductCard({ product }: { product: PricedProduct }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const cat = categoryById(product.categoryId);

  const onAdd = () => {
    if (product.stock <= 0) return;
    add(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={`/products/${product.id}`}
        className="relative block"
        aria-label={product.name}
      >
        <ProductMedia
          categoryId={product.categoryId}
          brand={product.brand}
          image={product.image}
          className="aspect-[4/3] w-full"
          rounded="rounded-none"
          iconClass="h-11 w-11"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.discountPercent > 0 ? <DiscountBadge percent={product.discountPercent} /> : null}
          {product.isNew ? <span className="chip bg-primary text-white">New</span> : null}
          {product.bestSeller ? (
            <span className="chip bg-gold text-[color:var(--color-on-gold)] shadow-sm">Bestseller</span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          {cat?.name}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink hover:text-primary"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <PriceTag price={product.effectivePrice} mrp={product.mrp} />
            <span className="text-[11px] text-ink-3">per {product.unit}</span>
          </div>
          <button
            type="button"
            onClick={onAdd}
            disabled={product.stock <= 0}
            aria-label={`Add ${product.name} to cart`}
            className={`btn ${added ? "btn-accent" : "btn-primary"} h-10 min-h-0 w-10 rounded-xl p-0`}
          >
            {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          </button>
        </div>
        {product.stock <= 0 ? (
          <span className="text-[11px] font-medium text-ink-3">Currently unavailable</span>
        ) : null}
      </div>
    </div>
  );
}
