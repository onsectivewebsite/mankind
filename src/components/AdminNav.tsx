"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  PlusCircle,
  BadgePercent,
  Store,
  ShieldCheck,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/products/new", label: "Add Product", icon: PlusCircle },
  { href: "/admin/offers", label: "Offers", icon: BadgePercent },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {LINKS.map((l) => {
        const active = isActive(l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-white shadow-sm"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <l.icon className="h-5 w-5" /> {l.label}
          </Link>
        );
      })}
      <div className="my-3 border-t border-white/10" />
      <Link href="/" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">
        <Store className="h-5 w-5" /> View storefront
      </Link>
    </nav>
  );
}

export function AdminBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <div className="leading-none">
        <p className="font-display text-base font-extrabold text-white">Mankind</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">Admin</p>
      </div>
    </div>
  );
}
