import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Truck, CreditCard, Headset } from "lucide-react";
import { CATEGORIES } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-ink text-slate-300">
      {/* trust strip */}
      <div className="border-b border-white/10">
        <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: Truck, title: "Fast Dispatch", text: "Canada-wide delivery" },
            { icon: ShieldCheck, title: "Certified Supply", text: "Clinic-grade quality" },
            { icon: CreditCard, title: "Trade Pricing", text: "Bulk & contract rates" },
            { icon: Headset, title: "Expert Support", text: "Dental specialists" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-secondary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs text-slate-400">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold text-white">Mankind Healthcare</span>
          </div>
          <p className="text-sm text-slate-400">
            Canada&apos;s trusted dental healthcare and equipment supplier. Everything your
            practice needs, from chairside consumables to complete operatory equipment.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-white">Shop</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.slice(0, 7).map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`} className="text-slate-400 hover:text-secondary">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-medium text-secondary hover:underline">
                View all products →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/offers" className="text-slate-400 hover:text-secondary">Current Offers</Link></li>
            <li><Link href="/admin" className="text-slate-400 hover:text-secondary">Admin Panel</Link></li>
            <li><Link href="/cart" className="text-slate-400 hover:text-secondary">Your Cart</Link></li>
            <li><Link href="/products?sort=new" className="text-slate-400 hover:text-secondary">New Arrivals</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="mb-3 font-display text-sm font-semibold text-white">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+14372682091" className="flex items-center gap-2.5 text-slate-300 hover:text-secondary">
                <Phone className="h-4 w-4 shrink-0 text-secondary" /> +1 437 268 2091
              </a>
            </li>
            <li>
              <a href="mailto:info@mankindhealthcare.com" className="flex items-center gap-2.5 text-slate-300 hover:text-secondary">
                <Mail className="h-4 w-4 shrink-0 text-secondary" /> info@mankindhealthcare.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              105, Mall Road, Canada
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Mankind Healthcare. All rights reserved.</p>
          <p>Prices in CAD · For licensed dental professionals</p>
        </div>
      </div>
    </footer>
  );
}
