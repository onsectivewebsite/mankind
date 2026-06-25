"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight, ShieldCheck, Truck, Headset, PackageCheck, Tag, Star, CheckCircle2, Sparkles,
} from "lucide-react";
import { INDUSTRIES, CATEGORIES, PRODUCT_COUNT, BRANDS, categoriesByIndustry } from "@/data/catalog";
import { usePricedProducts, useOffers } from "@/store/hooks";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Photo } from "@/components/Photo";
import { Reveal, Marquee, CountUp } from "@/components/motion";
import type { IndustryId } from "@/lib/types";

const THEME: Record<IndustryId, { hex: string; soft: string }> = {
  dental: { hex: "#5b21b6", soft: "#ede9fe" },
  medical: { hex: "#1e40af", soft: "#dbeafe" },
  veterinary: { hex: "#047857", soft: "#d1fae5" },
};

function SectionHead({ eyebrow, title, href, hrefLabel = "View all", center = false }: {
  eyebrow?: string; title: string; href?: string; hrefLabel?: string; center?: boolean;
}) {
  return (
    <div className={`mb-7 ${center ? "text-center" : "flex items-end justify-between gap-4"}`}>
      <div>
        {eyebrow ? <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gradient">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold text-ink md:text-[2rem]">{title}</h2>
      </div>
      {href && !center ? (
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

  const bestsellers = useMemo(() => {
    const pool = products.filter((p) => p.bestSeller && p.stock > 0);
    const seen = new Set<string>();
    const diverse = pool.filter((p) => (seen.has(p.categoryId) ? false : (seen.add(p.categoryId), true)));
    return (diverse.length >= 8 ? diverse : [...diverse, ...pool]).slice(0, 8);
  }, [products]);

  const deals = useMemo(() => {
    const pool = [...products]
      .filter((p) => p.discountPercent > 0 && p.stock > 0)
      .sort((a, b) => b.discountPercent - a.discountPercent);
    const seen = new Set<string>();
    const diverse = pool.filter((p) => (seen.has(p.categoryId) ? false : (seen.add(p.categoryId), true)));
    return (diverse.length >= 8 ? diverse : [...diverse, ...pool]).slice(0, 8);
  }, [products]);

  const featuredCats = useMemo(
    () => INDUSTRIES.flatMap((ind) => categoriesByIndustry(ind.id).slice(0, 4)),
    [],
  );

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line bg-section">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-24 -top-24 h-80 w-80 bg-primary/25 blur-3xl" />
          <div className="animate-blob absolute -right-16 top-20 h-72 w-72 bg-accent/20 blur-3xl" style={{ animationDelay: "-5s" }} />
          <div className="animate-blob absolute bottom-0 left-1/3 h-64 w-64 bg-[#b8924f]/20 blur-3xl" style={{ animationDelay: "-9s" }} />
        </div>

        <div className="container-page relative grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center animate-fade-up">
            <span className="chip mb-4 w-fit border border-line bg-white text-primary shadow-sm">
              <Sparkles className="h-4 w-4 text-gold" /> One-stop healthcare supplier · Canada
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.04] text-ink md:text-5xl lg:text-[3.5rem]">
              <span className="text-gradient">Dental, Medical &amp; Veterinary</span> supplies — one trusted source.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              {PRODUCT_COUNT.toLocaleString()}+ clinic-grade products across all three industries.
              Competitive trade pricing, fast Canada-wide dispatch and specialist support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-gradient text-base">
                Browse all products <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/offers" className="btn btn-outline text-base">
                <Tag className="h-5 w-5" /> Today&apos;s offers
              </Link>
            </div>
            <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                { n: PRODUCT_COUNT, s: "+", l: "Products" },
                { n: 3, s: "", l: "Industries" },
                { n: 14, s: "+", l: "Trusted brands" },
              ].map((stat) => (
                <div key={stat.l}>
                  <p className="text-2xl font-extrabold text-ink md:text-3xl">
                    <CountUp to={stat.n} suffix={stat.s} />
                  </p>
                  <p className="text-xs font-medium text-ink-3">{stat.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* hero collage */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-float space-y-4">
                <Photo id={INDUSTRIES[0].image} alt="Dental practice" priority overlay className="aspect-[3/4] rounded-2xl shadow-[var(--shadow-lift)]" />
                <Photo id={INDUSTRIES[2].image} alt="Veterinary care" priority overlay className="aspect-square rounded-2xl shadow-[var(--shadow-lift)]" />
              </div>
              <div className="animate-float-slow space-y-4 pt-10" style={{ animationDelay: "-3s" }}>
                <Photo id={INDUSTRIES[1].image} alt="Medical clinic" priority overlay className="aspect-square rounded-2xl shadow-[var(--shadow-lift)]" />
                <div className="card flex flex-col gap-1 p-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-ink">Trusted by 2,400+ clinicians</p>
                  <p className="text-xs text-ink-3">Dental · Medical · Veterinary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THREE INDUSTRY SEGMENTS ============ */}
      <section className="container-page py-16">
        <SectionHead center eyebrow="One supplier, three industries" title="Shop by your field" />
        <div className="grid gap-5 md:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 120}>
              <Link
                href={`/products?industry=${ind.id}`}
                className="group block overflow-hidden rounded-[20px] border border-line bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative">
                  <span className="absolute inset-x-0 top-0 z-10 h-1.5" style={{ background: THEME[ind.id].hex }} />
                  <Photo id={ind.image} alt={ind.name} overlay className="aspect-[16/10] w-full" />
                  <span
                    className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg"
                    style={{ background: THEME[ind.id].hex }}
                  >
                    <CategoryIcon name={ind.icon} className="h-6 w-6" />
                  </span>
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-90">{ind.tagline}</p>
                    <p className="font-display text-2xl font-bold">{ind.name}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-ink-2">{ind.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold transition-all group-hover:gap-2" style={{ color: THEME[ind.id].hex }}>
                    Explore {ind.name} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ONE-STOP VALUE BAND ============ */}
      <section className="bg-ink py-16 text-white">
        <div className="container-page">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Why Mankind Healthcare</p>
              <h2 className="text-2xl font-bold md:text-[2rem]">Everything your practice needs, in one order</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                Stop juggling multiple suppliers. From dental chairside to hospital wards to the
                vet clinic — source it all from one trusted partner.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              { icon: PackageCheck, t: "Comprehensive range", d: `${PRODUCT_COUNT.toLocaleString()}+ SKUs across 3 industries` },
              { icon: Truck, t: "Fast dispatch", d: "Canada-wide, free over $250" },
              { icon: ShieldCheck, t: "Certified quality", d: "Clinic-grade, compliant supply" },
              { icon: Headset, t: "Specialist support", d: "Dental, medical & vet experts" },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 90}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-display text-base font-bold text-white">{f.t}</p>
                  <p className="mt-1 text-sm text-slate-300">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORY SHOWCASE ============ */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Browse departments" title="Popular categories" href="/products" hrefLabel="All categories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featuredCats.map((c, i) => {
            const t = THEME[c.industry];
            return (
              <Reveal key={c.id} delay={(i % 4) * 70}>
                <Link
                  href={`/products?category=${c.id}`}
                  className="card group flex h-full items-center gap-3 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: t.soft, color: t.hex }}
                  >
                    <CategoryIcon name={c.icon} className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold text-ink">{c.name}</span>
                    <span className="line-clamp-1 text-xs capitalize text-ink-3">{c.industry}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ OFFER BANNER ============ */}
      {offers.length ? (
        <section className="container-page pb-16">
          <Reveal>
            <div className="animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-gold px-6 py-9 md:px-12">
              <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
                <div className="text-white">
                  <p className="mb-1 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/90">
                    <Tag className="h-4 w-4" /> Limited time
                  </p>
                  <h2 className="text-2xl font-bold md:text-3xl">{offers[0].title}</h2>
                  {offers[0].code ? (
                    <p className="mt-2 text-white/90">
                      Use code <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono font-bold tracking-wide">{offers[0].code}</span> at checkout.
                    </p>
                  ) : null}
                </div>
                <Link href="/offers" className="btn bg-white text-primary hover:bg-white/90">
                  Shop the sale <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ============ BESTSELLERS ============ */}
      <section className="container-page pb-16">
        <SectionHead eyebrow="Across all fields" title="Bestselling supplies" href="/products?sort=popular" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ============ DEALS ============ */}
      {deals.length ? (
        <section className="bg-section py-16">
          <div className="container-page">
            <SectionHead eyebrow="Save more" title="Top deals right now" href="/offers" hrefLabel="See all offers" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {deals.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ BRAND MARQUEE ============ */}
      <section className="border-y border-line bg-surface py-10">
        <p className="container-page mb-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-3">
          Stocking the brands clinics trust
        </p>
        <Marquee>
          {BRANDS.map((b) => (
            <span key={b} className="mx-4 font-display text-xl font-extrabold text-ink-3/70">{b}</span>
          ))}
        </Marquee>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="container-page py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 text-center shadow-[var(--shadow-soft)] md:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-ink md:text-3xl">Opening, restocking or switching supplier?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-ink-2">
                Talk to our specialists for bulk pricing, equipment quotes and tailored ordering
                across dental, medical and veterinary.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-2">
                {["Bulk & contract pricing", "Equipment quotes", "Dedicated account manager"].map((x) => (
                  <span key={x} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> {x}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="tel:+14372682091" className="btn btn-gradient">Call +1 437 268 2091</a>
                <a href="mailto:info@mankindhealthcare.com" className="btn btn-outline">Email our team</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
