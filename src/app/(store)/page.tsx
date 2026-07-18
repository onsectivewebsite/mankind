"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight, Truck, Tag, CheckCircle2,
  BadgeCheck, Award, Headphones, Wallet, Boxes,
} from "lucide-react";
import { INDUSTRIES, PRODUCT_COUNT, categoriesByIndustry } from "@/data/catalog";
import { usePricedProducts, useOffers } from "@/store/hooks";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Photo } from "@/components/Photo";
import { PHOTO } from "@/lib/img";
import { HeroSlider } from "@/components/HeroSlider";
import { Reveal, Marquee } from "@/components/motion";
import type { IndustryId } from "@/lib/types";

const THEME: Record<IndustryId, { hex: string; soft: string }> = {
  dental: { hex: "#0f6f73", soft: "#d9eded" },
  medical: { hex: "#2f7fb0", soft: "#e2f1fa" },
  veterinary: { hex: "#2e9e7b", soft: "#dcf3ea" },
  physiotherapy: { hex: "#6d4bc7", soft: "#ece8fb" },
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
    const combined = diverse.length >= 8 ? diverse : [...diverse, ...pool];
    return combined.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i).slice(0, 8);
  }, [products]);

  const deals = useMemo(() => {
    const pool = [...products]
      .filter((p) => p.discountPercent > 0 && p.stock > 0)
      .sort((a, b) => b.discountPercent - a.discountPercent);
    const seen = new Set<string>();
    const diverse = pool.filter((p) => (seen.has(p.categoryId) ? false : (seen.add(p.categoryId), true)));
    const combined = diverse.length >= 8 ? diverse : [...diverse, ...pool];
    return combined.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i).slice(0, 8);
  }, [products]);

  const featuredCats = useMemo(
    () => INDUSTRIES.flatMap((ind) => categoriesByIndustry(ind.id).slice(0, 4)),
    [],
  );

  return (
    <div>
      {/* ============ HERO — auto-scrolling image slider, fits viewport under the sticky header ============ */}
      <section className="border-b border-line">
        <HeroSlider
          aspectClass="h-[calc(100svh-125px)] w-full md:h-[calc(100svh-101px)]"
          roundedClass="rounded-none"
        />
      </section>

      {/* ============ INDUSTRY SEGMENTS ============ */}
      <section className="container-page py-16">
        <SectionHead center eyebrow="One supplier, four fields" title="Shop by your field" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 100}>
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
              <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Why Choose Mankind Healthcare</p>
              <h2 className="text-2xl font-bold md:text-[2rem]">One trusted partner for your whole practice</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                From dental chairside to hospital wards, the vet clinic to the physio studio —
                source it all from a supplier built around quality, value and service.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { icon: BadgeCheck, t: "Quality Products", d: "Clinic-grade, compliant supplies you can rely on every day." },
              { icon: Award, t: "Our Own MCare Brand", d: "The MCare range — engineered in-house to clinical standards across every field." },
              { icon: Truck, t: "Fast Delivery", d: "Quick, reliable Canada-wide dispatch — free over $250." },
              { icon: Headphones, t: "Customer Support", d: "Specialists across dental, medical, veterinary & physio." },
              { icon: Wallet, t: "Competitive Pricing", d: "Trade, bulk and contract rates that keep costs down." },
              { icon: Boxes, t: "Wide Product Range", d: `${PRODUCT_COUNT.toLocaleString()}+ products across four healthcare fields.` },
            ].map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 90}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#2e9e7b] text-white transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-white">{f.t}</p>
                    <p className="mt-1 text-sm text-slate-300">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPOTLIGHT ============ */}
      <section className="container-page py-16">
        <SectionHead eyebrow="What's new" title="Featured this season" />
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { img: PHOTO.physioA, tag: "New field", title: "Physiotherapy & Rehab", copy: "Electrotherapy, ultrasound, shockwave & treatment tables.", href: "/products?industry=physiotherapy", span: "lg:col-span-2 aspect-[16/10] lg:aspect-[16/8]" },
            { img: PHOTO.dentalProc, tag: "Equipment", title: "MCare equipment & lasers", copy: "Operatory chairs, LED lights & soft-tissue diode lasers.", href: "/products?category=equipment", span: "aspect-[16/10]" },
          ].map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className={s.span.includes("col-span-2") ? "lg:col-span-2" : ""}>
              <Link href={s.href} className="group relative block h-full overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                <Photo id={s.img} alt={s.title} className={`w-full ${s.span} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="chip mb-2 w-fit bg-gold text-[color:var(--color-on-gold)]">{s.tag}</span>
                  <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                  <p className="mt-1 max-w-md text-sm text-white/85">{s.copy}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white transition-all group-hover:gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CATEGORY SHOWCASE ============ */}
      <section className="bg-section py-16">
        <div className="container-page">
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
        </div>
      </section>

      {/* ============ OFFER BANNER ============ */}
      {offers.length ? (
        <section className="container-page pb-16">
          <Reveal>
            <div className="animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-[#0d5a5e] to-[#2e9e7b] px-6 py-9 md:px-12">
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

      {/* ============ TRUST MARQUEE ============ */}
      <section className="border-y border-line bg-surface py-10">
        <p className="container-page mb-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-3">
          The MCare promise
        </p>
        <Marquee>
          {[
            "Own-Brand MCare Quality", "Health-Canada Ready", "ISO-Grade Manufacturing",
            "Fast Canada-Wide Dispatch", "Trade & Bulk Pricing", "Dedicated Clinical Support",
            "30-Day Easy Returns", "Serving 4 Healthcare Fields",
          ].map((t) => (
            <span key={t} className="mx-5 inline-flex items-center gap-2 font-display text-lg font-bold text-ink-3/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
            </span>
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
