"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headset,
  PackageCheck,
  Tag,
  Star,
} from "lucide-react";
import { CATEGORIES, PRODUCT_COUNT, BRANDS } from "@/data/catalog";
import { usePricedProducts, useOffers } from "@/store/hooks";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";

function SectionHead({
  eyebrow,
  title,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-bold text-ink md:text-3xl">{title}</h2>
      </div>
      {href ? (
        <Link href={href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:gap-2 sm:inline-flex">
          {hrefLabel} <ArrowRight className="h-4 w-4 transition-all" />
        </Link>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const products = usePricedProducts();
  const offers = useOffers().filter((o) => o.active);

  // bestsellers — spread across categories so the row shows variety
  const bestsellers = useMemo(() => {
    const pool = products.filter((p) => p.bestSeller && p.stock > 0);
    const seen = new Set<string>();
    const diverse = pool.filter((p) => {
      if (seen.has(p.categoryId)) return false;
      seen.add(p.categoryId);
      return true;
    });
    return (diverse.length >= 8 ? diverse : [...diverse, ...pool]).slice(0, 8);
  }, [products]);

  const deals = useMemo(
    () =>
      [...products]
        .filter((p) => p.discountPercent > 0 && p.stock > 0)
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, 8),
    [products],
  );
  const newArrivals = useMemo(
    () => [...products].sort((a, b) => b.seq - a.seq).slice(0, 4),
    [products],
  );

  return (
    <div className="animate-fade-up">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line bg-section">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 80% -10%, #cffafe 0%, transparent 60%), radial-gradient(40rem 24rem at 0% 110%, #d1fae5 0%, transparent 60%)",
          }}
        />
        <div className="container-page relative grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <span className="chip mb-4 w-fit bg-white text-primary shadow-sm">
              <ShieldCheck className="h-4 w-4" /> Trusted by dental practices across Canada
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] text-ink md:text-5xl lg:text-6xl">
              Everything your{" "}
              <span className="text-primary">dental practice</span> needs — in one place.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              {PRODUCT_COUNT.toLocaleString()}+ clinic-grade products across instruments,
              consumables, equipment and more. Competitive trade pricing, fast dispatch and
              expert support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary text-base">
                Browse all products <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/offers" className="btn btn-outline text-base">
                <Tag className="h-5 w-5" /> Today&apos;s offers
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-2">
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Canada-wide dispatch</span>
              <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4 text-accent" /> {PRODUCT_COUNT.toLocaleString()}+ SKUs</span>
              <span className="inline-flex items-center gap-2"><Headset className="h-4 w-4 text-accent" /> Specialist support</span>
            </div>
          </div>

          {/* hero visual: category tiles */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {CATEGORIES.slice(0, 6).map((c, i) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  className={`card flex flex-col gap-2 p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${i === 0 ? "sm:row-span-2 sm:justify-end" : ""}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <CategoryIcon name={c.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-semibold leading-tight text-ink">{c.name}</span>
                </Link>
              ))}
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-lift)] sm:block">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-1 text-xs font-medium text-ink-2">Loved by 2,400+ clinicians</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="container-page py-14">
        <SectionHead eyebrow="Shop by category" title="Find supplies by department" href="/products" hrefLabel="All categories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className="card group flex items-center gap-3 p-4 transition-all duration-200 hover:border-primary hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold text-ink">{c.name}</span>
                <span className="line-clamp-1 text-xs text-ink-3">{c.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ OFFER BANNER ============ */}
      {offers.length ? (
        <section className="container-page">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-1">
            <div className="grid items-center gap-4 rounded-[14px] bg-ink/0 px-6 py-7 md:grid-cols-[1fr_auto] md:px-10">
              <div className="text-white">
                <p className="mb-1 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/90">
                  <Tag className="h-4 w-4" /> Limited time
                </p>
                <h2 className="text-2xl font-bold md:text-3xl">{offers[0].title}</h2>
                {offers[0].code ? (
                  <p className="mt-2 text-white/90">
                    Use code{" "}
                    <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono font-bold tracking-wide">
                      {offers[0].code}
                    </span>{" "}
                    at checkout.
                  </p>
                ) : null}
              </div>
              <Link href="/offers" className="btn bg-white text-primary hover:bg-white/90">
                Shop the sale <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ BESTSELLERS ============ */}
      <section className="container-page py-14">
        <SectionHead eyebrow="Most popular" title="Bestselling supplies" href="/products?sort=popular" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ============ DEALS ============ */}
      {deals.length ? (
        <section className="bg-section py-14">
          <div className="container-page">
            <SectionHead eyebrow="Save more" title="Top deals right now" href="/offers" hrefLabel="See all offers" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {deals.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ NEW + BRANDS ============ */}
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHead eyebrow="Just landed" title="New arrivals" href="/products?sort=new" />
          <div className="grid grid-cols-2 gap-4">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
        <div>
          <SectionHead title="Trusted brands" />
          <div className="card grid grid-cols-2 gap-3 p-5">
            {BRANDS.map((b) => (
              <Link
                key={b}
                href={`/products?brand=${encodeURIComponent(b)}`}
                className="flex h-16 items-center justify-center rounded-xl border border-line bg-canvas px-3 text-center font-display text-sm font-bold text-ink-2 transition-colors hover:border-primary hover:text-primary"
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="container-page pb-16">
        <div className="rounded-2xl border border-line bg-surface px-6 py-10 text-center shadow-[var(--shadow-soft)] md:px-12 md:py-14">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Opening or restocking a practice?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-2">
            Talk to our dental supply specialists for bulk pricing, equipment quotes and
            tailored ordering for your clinic.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="tel:+14372682091" className="btn btn-primary">Call +1 437 268 2091</a>
            <a href="mailto:info@mankindhealthcare.com" className="btn btn-outline">Email our team</a>
          </div>
        </div>
      </section>
    </div>
  );
}
