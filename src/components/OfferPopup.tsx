"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X, Tag, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { useOffers } from "@/store/hooks";
import { categoryById, industryById } from "@/data/catalog";
import { Photo } from "./Photo";
import { PHOTO } from "@/lib/img";
import type { Offer } from "@/lib/types";

const SEEN_KEY = "mk-offer-flyer-seen";

function scopeLabel(o: Offer): string {
  if (o.scope.type === "all") return "the entire store";
  if (o.scope.type === "category") return categoryById(o.scope.value)?.name ?? "selected products";
  return `${o.scope.value} products`;
}

export function OfferPopup() {
  const offers = useOffers();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // pick the highest-value active offer
  const offer = [...offers].filter((o) => o.active).sort((a, b) => b.percent - a.percent)[0];

  useEffect(() => {
    if (!offer) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, [offer]);

  // body scroll lock + focus + Esc
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  const copy = () => {
    if (!offer?.code) return;
    navigator.clipboard?.writeText(offer.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (!open || !offer) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        aria-label="Close offer"
        onClick={dismiss}
        className="animate-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      {/* flyer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-flyer-title"
        className="animate-pop relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-surface shadow-[var(--shadow-lift)] md:grid-cols-2"
      >
        <button
          ref={closeRef}
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* visual side */}
        <div className="relative hidden md:block">
          <Photo id={PHOTO.dentalB} alt="Mankind Healthcare" priority className="h-full min-h-[22rem] w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/35 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Mankind Healthcare</p>
            <p className="font-display text-lg font-bold leading-tight">Dental · Medical · Veterinary · Physio</p>
          </div>
        </div>

        {/* content side */}
        <div className="relative p-7 md:p-8">
          <span className="animate-shine chip mb-4 w-fit bg-gold text-[color:var(--color-on-gold)]">
            <Sparkles className="h-4 w-4" /> Limited-time offer
          </span>

          <p className="font-display text-5xl font-extrabold leading-none text-primary md:text-6xl">
            {offer.percent}<span className="text-gold">% OFF</span>
          </p>
          <h2 id="offer-flyer-title" className="mt-3 font-display text-xl font-bold text-ink">
            {offer.title}
          </h2>
          <p className="mt-1.5 text-sm text-ink-2">
            Save on {scopeLabel(offer)} — discount already reflected in prices across our
            dental, medical, veterinary &amp; physiotherapy range.
          </p>

          {offer.code ? (
            <div className="mt-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">Your code</p>
              <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-section px-4 py-3">
                <span className="font-mono text-lg font-extrabold tracking-[0.15em] text-primary">{offer.code}</span>
                <button onClick={copy} className="btn btn-accent h-9 min-h-0 px-3 text-xs">
                  {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-mint-soft px-3 py-2 text-sm font-semibold text-primary">
              <Tag className="h-4 w-4" /> Auto-applied at checkout — no code needed
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link href="/offers" onClick={dismiss} className="btn btn-primary flex-1">
              Shop the offers <ArrowRight className="h-5 w-5" />
            </Link>
            <button onClick={dismiss} className="btn btn-ghost text-ink-3">Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
