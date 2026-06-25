"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  Truck,
  ChevronDown,
  LayoutGrid,
  Tag,
} from "lucide-react";
import { CATEGORIES } from "@/data/catalog";
import { useCart, cartCount } from "@/store/cart";
import { CategoryIcon } from "./CategoryIcon";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Mankind Healthcare home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M12 21s-6.5-4.35-8.5-8.2C2.1 10 3 6.5 6 5.6c1.9-.6 3.6.3 4.5 1.6.9-1.3 2.6-2.2 4.5-1.6 3 .9 3.9 4.4 2.5 7.2C18.5 16.65 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M8.5 12h2l1-2 1.5 3 1-1.5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-extrabold text-ink">Mankind</span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Healthcare
        </span>
      </span>
    </Link>
  );
}

function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
        onSubmit?.();
      }}
      className="relative w-full"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" aria-hidden="true" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search 1,600+ dental products, brands, SKUs…"
        aria-label="Search products"
        className="field pl-10 pr-4"
      />
    </form>
  );
}

export function Header() {
  const lines = useCart((s) => s.lines);
  const hydrated = useCart((s) => s._hydrated);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const count = hydrated ? cartCount(lines) : 0;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      {/* utility bar */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" /> Free dispatch on orders over $250 · Canada-wide
          </span>
          <div className="flex items-center gap-4">
            <a href="tel:+14372682091" className="inline-flex items-center gap-1.5 hover:text-secondary">
              <Phone className="h-3.5 w-3.5" /> +1 437 268 2091
            </a>
            <a href="mailto:info@mankindhealthcare.com" className="inline-flex items-center gap-1.5 hover:text-secondary">
              <Mail className="h-3.5 w-3.5" /> info@mankindhealthcare.com
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="container-page flex h-16 items-center gap-3">
        <button
          type="button"
          className="btn btn-ghost -ml-2 h-11 w-11 min-h-0 p-0 lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Brand />

        <div className="mx-2 hidden flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              className="btn btn-ghost h-11 min-h-0"
              aria-expanded={catOpen}
              onClick={() => setCatOpen((v) => !v)}
            >
              <LayoutGrid className="h-4 w-4" /> Categories
              <ChevronDown className="h-4 w-4" />
            </button>
            {catOpen ? (
              <div className="absolute right-0 top-full w-[34rem] pt-2">
                <div className="card grid grid-cols-2 gap-1 p-2">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.id}`}
                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted"
                      onClick={() => setCatOpen(false)}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <CategoryIcon name={c.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{c.name}</span>
                        <span className="line-clamp-1 text-xs text-ink-3">{c.blurb}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <Link href="/products" className="btn btn-ghost h-11 min-h-0">Shop All</Link>
          <Link href="/offers" className="btn btn-ghost h-11 min-h-0">
            <Tag className="h-4 w-4" /> Offers
          </Link>
          <Link href="/admin" className="btn btn-outline h-11 min-h-0">Admin</Link>
        </nav>

        <Link
          href="/cart"
          className="btn btn-primary relative ml-auto h-11 min-h-0 lg:ml-2"
          aria-label={`Cart, ${count} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white tnum">
              {count}
            </span>
          ) : null}
        </Link>
      </div>

      {/* mobile search */}
      <div className="container-page pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-surface p-4 shadow-xl animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <Brand />
              <button
                type="button"
                className="btn btn-ghost h-11 w-11 min-h-0 p-0"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              <Link href="/products" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}>Shop All</Link>
              <Link href="/offers" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}>Offers</Link>
              <Link href="/admin" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
            </nav>
            <p className="mb-2 mt-4 px-1 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Categories
            </p>
            <div className="flex flex-col">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <CategoryIcon name={c.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
