"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Search, ShoppingCart, Menu, X, Phone, Mail, Truck, ChevronDown, LayoutGrid, Tag,
  Home, User as UserIcon, LogOut, LayoutDashboard, LogIn,
} from "lucide-react";
import { INDUSTRIES, categoriesByIndustry, PRODUCT_COUNT } from "@/data/catalog";
import { useCart, cartCount } from "@/store/cart";
import { useAuth, useCurrentUser } from "@/store/auth";
import { AuthModal } from "./AuthModal";
import { SocialLinks } from "./SocialLinks";
import { CategoryIcon } from "./CategoryIcon";
import type { IndustryId } from "@/lib/types";

const INDUSTRY_COLOR: Record<IndustryId, { text: string; soft: string; dot: string }> = {
  dental: { text: "text-[#0f6f73]", soft: "bg-[#d9eded]", dot: "bg-[#0f6f73]" },
  medical: { text: "text-[#2f7fb0]", soft: "bg-[#e2f1fa]", dot: "bg-[#3b9fd6]" },
  veterinary: { text: "text-[#2e9e7b]", soft: "bg-[#dcf3ea]", dot: "bg-[#2e9e7b]" },
  physiotherapy: { text: "text-[#6d4bc7]", soft: "bg-[#ece8fb]", dot: "bg-[#7c5cd9]" },
};

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Mankind Healthcare home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M12 21s-6.5-4.35-8.5-8.2C2.1 10 3 6.5 6 5.6c1.9-.6 3.6.3 4.5 1.6.9-1.3 2.6-2.2 4.5-1.6 3 .9 3.9 4.4 2.5 7.2C18.5 16.65 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8.5 12h2l1-2 1.5 3 1-1.5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-extrabold text-ink">Mankind</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gradient">
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
        placeholder={`Search ${PRODUCT_COUNT.toLocaleString()}+ products across dental, medical, veterinary & physiotherapy…`}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const count = hydrated ? cartCount(lines) : 0;

  const currentUser = useCurrentUser();
  const logout = useAuth((s) => s.logout);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [acctOpen, setAcctOpen] = useState(false);

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
    setAcctOpen(false);
  };
  const initials = currentUser
    ? currentUser.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : "";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
      {/* utility bar */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" /> One-stop supplier · Dental · Medical · Veterinary · Physiotherapy
          </span>
          <div className="flex items-center gap-4">
            <a href="tel:+14372682091" className="inline-flex items-center gap-1.5 hover:text-gold">
              <Phone className="h-3.5 w-3.5" /> +1 437 268 2091
            </a>
            <a href="mailto:info@mankindhealthcare.com" className="inline-flex items-center gap-1.5 hover:text-gold">
              <Mail className="h-3.5 w-3.5" /> info@mankindhealthcare.com
            </a>
            <span className="h-3.5 w-px bg-white/20" />
            <SocialLinks iconClass="h-3.5 w-3.5" gap="gap-2.5" linkClass="!text-slate-300" />
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="container-page flex h-16 items-center gap-3">
        <button
          type="button"
          className="btn btn-ghost -ml-2 h-11 w-11 min-h-0 p-0 xl:hidden"
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

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          <Link href="/" className="btn btn-ghost h-11 min-h-0 px-2.5 text-sm">
            <Home className="h-4 w-4" /> Home
          </Link>
          <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
            <button type="button" className="btn btn-ghost h-11 min-h-0 px-2.5 text-sm" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
              <LayoutGrid className="h-4 w-4" /> Shop <ChevronDown className="h-4 w-4" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-full w-[60rem] pt-2">
                <div className="card grid grid-cols-4 gap-2 p-3">
                  {INDUSTRIES.map((ind) => (
                    <div key={ind.id}>
                      <Link
                        href={`/products?industry=${ind.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 font-display text-sm font-bold ${INDUSTRY_COLOR[ind.id].text}`}
                      >
                        <span className={`h-2 w-2 rounded-full ${INDUSTRY_COLOR[ind.id].dot}`} /> {ind.name}
                      </Link>
                      <div className="flex flex-col">
                        {categoriesByIndustry(ind.id).slice(0, 6).map((c) => (
                          <Link
                            key={c.id}
                            href={`/products?category=${c.id}`}
                            onClick={() => setMenuOpen(false)}
                            className="truncate rounded-md px-2 py-1.5 text-[13px] text-ink-2 hover:bg-muted hover:text-ink"
                          >
                            {c.name}
                          </Link>
                        ))}
                        <Link
                          href={`/products?industry=${ind.id}`}
                          onClick={() => setMenuOpen(false)}
                          className={`mt-0.5 px-2 py-1 text-[13px] font-semibold ${INDUSTRY_COLOR[ind.id].text} hover:underline`}
                        >
                          View all →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {INDUSTRIES.map((ind) => (
            <Link key={ind.id} href={`/products?industry=${ind.id}`} className="btn btn-ghost h-11 min-h-0 px-2.5 text-sm">
              {ind.label}
            </Link>
          ))}
          <Link href="/offers" className="btn btn-ghost h-11 min-h-0 px-2.5 text-sm">
            <Tag className="h-4 w-4" /> Offers
          </Link>
          <Link href="/contact" className="btn btn-ghost h-11 min-h-0 px-2.5 text-sm">Contact</Link>

          {/* account */}
          <div className="relative ml-1" onMouseEnter={() => setAcctOpen(true)} onMouseLeave={() => setAcctOpen(false)}>
            {currentUser ? (
              <button onClick={() => setAcctOpen((v) => !v)} className="flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-surface pl-1.5 pr-2.5 hover:border-primary" aria-expanded={acctOpen} aria-label="Account menu">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">{initials}</span>
                <span className="max-w-[7rem] truncate text-sm font-semibold text-ink-2">{currentUser.name.split(" ")[0]}</span>
                <ChevronDown className="h-4 w-4 text-ink-3" />
              </button>
            ) : (
              <button onClick={() => openAuth("login")} className="btn btn-outline h-11 min-h-0 px-3 text-sm">
                <UserIcon className="h-4 w-4" /> Sign in
              </button>
            )}
            {acctOpen && currentUser ? (
              <div className="absolute right-0 top-full w-60 pt-2">
                <div className="card overflow-hidden p-1.5">
                  <div className="border-b border-line px-3 py-2.5">
                    <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
                    <p className="truncate text-xs text-ink-3">{currentUser.email}</p>
                  </div>
                  <Link href="/cart" onClick={() => setAcctOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-muted">
                    <ShoppingCart className="h-4 w-4" /> My cart
                  </Link>
                  <Link href="/admin" onClick={() => setAcctOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-muted">
                    <LayoutDashboard className="h-4 w-4" /> Admin panel
                  </Link>
                  <button onClick={() => { logout(); setAcctOpen(false); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#b23b38] hover:bg-[#fdecea]">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <Link href="/cart" className="btn btn-gradient relative ml-auto h-11 min-h-0 lg:ml-2" aria-label={`Cart, ${count} items`}>
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-[color:var(--color-on-gold)] tnum ring-2 ring-white">
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
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute left-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-surface p-4 shadow-xl animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <Brand />
              <button type="button" className="btn btn-ghost h-11 w-11 min-h-0 p-0" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* account */}
            {currentUser ? (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-line bg-canvas p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{initials}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
                  <p className="truncate text-xs text-ink-3">{currentUser.email}</p>
                </div>
                <button onClick={() => { logout(); }} className="btn btn-ghost h-9 min-h-0 px-2 text-[#b23b38]" aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mb-3 grid grid-cols-2 gap-2">
                <button onClick={() => openAuth("login")} className="btn btn-outline">
                  <LogIn className="h-4 w-4" /> Sign in
                </button>
                <button onClick={() => openAuth("register")} className="btn btn-primary">Create account</button>
              </div>
            )}
            <nav className="mb-2 flex flex-col gap-1" aria-label="Mobile">
              <Link href="/" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}><Home className="h-4 w-4" /> Home</Link>
              <Link href="/offers" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}><Tag className="h-4 w-4" /> Offers</Link>
              <Link href="/contact" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}><Mail className="h-4 w-4" /> Contact</Link>
              <Link href="/admin" className="btn btn-ghost justify-start" onClick={() => setMobileOpen(false)}><LayoutDashboard className="h-4 w-4" /> Admin Panel</Link>
            </nav>
            {INDUSTRIES.map((ind) => (
              <div key={ind.id} className="mb-2">
                <Link
                  href={`/products?industry=${ind.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-1 py-2 font-display text-sm font-bold ${INDUSTRY_COLOR[ind.id].text}`}
                >
                  <span className={`h-2 w-2 rounded-full ${INDUSTRY_COLOR[ind.id].dot}`} /> {ind.name}
                </Link>
                <div className="grid grid-cols-2 gap-1">
                  {categoriesByIndustry(ind.id).map((c) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="truncate rounded-md px-2 py-1.5 text-[13px] text-ink-2 hover:bg-muted"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </header>
  );
}
