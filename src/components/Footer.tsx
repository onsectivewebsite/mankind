import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Truck, CreditCard, Headset } from "lucide-react";
import { INDUSTRIES, categoriesByIndustry } from "@/data/catalog";
import { SocialLinks } from "./SocialLinks";

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
            { icon: Headset, title: "Expert Support", text: "Across all 4 fields" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold">
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

      <div className="container-page py-12">
        <div className="mb-10 max-w-lg">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold text-white">Mankind Healthcare</span>
          </div>
          <p className="text-sm text-slate-400">
            Your one-stop supplier across <span className="text-white">Dental</span>,{" "}
            <span className="text-white">Medical</span>,{" "}
            <span className="text-white">Veterinary</span> and{" "}
            <span className="text-white">Physiotherapy</span> — everything from chairside
            consumables to complete clinic equipment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {INDUSTRIES.map((ind) => (
          <div key={ind.id}>
            <h3 className="mb-3 font-display text-sm font-semibold text-white">{ind.name}</h3>
            <ul className="space-y-2 text-sm">
              {categoriesByIndustry(ind.id).slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={`/products?category=${c.id}`} className="text-slate-400 hover:text-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/products?industry=${ind.id}`} className="font-medium text-gold hover:underline">
                  All {ind.name} →
                </Link>
              </li>
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-white">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+14372682091" className="flex items-center gap-2.5 text-slate-300 hover:text-gold">
                <Phone className="h-4 w-4 shrink-0 text-gold" /> +1 437 268 2091
              </a>
            </li>
            <li>
              <a href="mailto:info@mankindhealthcare.com" className="flex items-center gap-2.5 text-slate-300 hover:text-gold">
                <Mail className="h-4 w-4 shrink-0 text-gold" /> info@mankindhealthcare.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              105, Mall Road, Canada
            </li>
          </ul>
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Follow us</p>
            <SocialLinks chip iconClass="h-4 w-4" gap="gap-2" />
          </div>
          <Link href="/products" className="btn btn-gradient mt-5 h-10 min-h-0 text-sm">Shop all products</Link>
        </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Mankind Healthcare. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/contact" className="hover:text-gold">Contact</Link>
            <Link href="/terms" className="hover:text-gold">Terms &amp; Conditions</Link>
            <Link href="/offers" className="hover:text-gold">Offers</Link>
            <Link href="/admin" className="hover:text-gold">Admin</Link>
          </div>
          <p className="text-center md:text-right">Prices in CAD · Serving all four fields</p>
        </div>
      </div>
    </footer>
  );
}
