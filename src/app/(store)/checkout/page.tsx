"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/cart";
import { useHydrated, usePricedProducts } from "@/store/hooks";
import { formatCAD } from "@/lib/pricing";

const FREE_SHIP = 250;
const SHIP_FEE = 19.99;
const TAX_RATE = 0.13;

type Errors = Record<string, string>;

export default function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const hydrated = useHydrated();
  const priced = usePricedProducts();
  const [placed, setPlaced] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "", email: "", phone: "", clinic: "", address: "", city: "", province: "", postal: "",
  });

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const p = priced.find((x) => x.id === l.productId);
          return p ? { qty: l.qty, product: p } : null;
        })
        .filter(Boolean) as { qty: number; product: (typeof priced)[number] }[],
    [lines, priced],
  );

  const subtotal = items.reduce((s, i) => s + i.product.effectivePrice * i.qty, 0);
  const shipping = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : SHIP_FEE;
  const tax = (subtotal + shipping) * TAX_RATE;
  const total = subtotal + shipping + tax;

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your full name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.phone.trim()) next.phone = "Please enter a phone number";
    if (!form.address.trim()) next.address = "Please enter your address";
    if (!form.city.trim()) next.city = "Required";
    if (!form.postal.trim()) next.postal = "Required";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = document.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    const ref = "MK-" + Math.abs(hashStr(form.email + items.length + total.toFixed(2))).toString(36).slice(0, 8).toUpperCase();
    setPlaced(ref);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!hydrated) return <div className="container-page py-20 text-center text-ink-3">Loading…</div>;

  if (placed) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-accent">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink md:text-3xl">Order placed — thank you!</h1>
          <p className="mt-2 text-ink-2">
            Your order reference is{" "}
            <span className="font-mono font-bold text-primary">{placed}</span>. Our team will
            confirm availability and dispatch details by email shortly.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link href="/products" className="btn btn-primary">Continue shopping</Link>
            <Link href="/" className="btn btn-outline">Back to home</Link>
          </div>
          <p className="mt-6 text-xs text-ink-3">This is a demo checkout — no payment was processed.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
        <Link href="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-3 hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-ink md:text-3xl">Checkout</h1>

      <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <fieldset className="card p-6">
            <legend className="px-1 font-display text-lg font-bold text-ink">Contact details</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" required />
              <Field label="Clinic / practice (optional)" name="clinic" value={form.clinic} onChange={(v) => set("clinic", v)} autoComplete="organization" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" required />
              <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" required />
            </div>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="px-1 font-display text-lg font-bold text-ink">Shipping address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street address" name="address" value={form.address} onChange={(v) => set("address", v)} error={errors.address} autoComplete="street-address" required />
              </div>
              <Field label="City" name="city" value={form.city} onChange={(v) => set("city", v)} error={errors.city} autoComplete="address-level2" required />
              <Field label="Province" name="province" value={form.province} onChange={(v) => set("province", v)} autoComplete="address-level1" />
              <Field label="Postal code" name="postal" value={form.postal} onChange={(v) => set("postal", v)} error={errors.postal} autoComplete="postal-code" required />
            </div>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="px-1 font-display text-lg font-bold text-ink">Payment</legend>
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-muted p-3 text-sm text-ink-2">
              <Lock className="h-4 w-4 text-primary" /> This is a demonstration store. No card details are collected and no payment is taken.
            </p>
          </fieldset>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-5">
            <h2 className="font-display text-lg font-bold text-ink">Your order</h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map(({ qty, product }) => (
                <li key={product.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="line-clamp-1 font-medium text-ink-2">{product.name}</span>
                    <span className="text-xs text-ink-3 tnum">Qty {qty} × {formatCAD(product.effectivePrice)}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-ink tnum">{formatCAD(product.effectivePrice * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-ink-3">Subtotal</dt><dd className="tnum">{formatCAD(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-3">Shipping</dt><dd className="tnum">{shipping === 0 ? "Free" : formatCAD(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-3">Tax (13%)</dt><dd className="tnum">{formatCAD(tax)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 text-base font-bold text-ink"><dt>Total</dt><dd className="tnum">{formatCAD(total)}</dd></div>
            </dl>
            <button type="submit" className="btn btn-accent mt-5 w-full text-base">Place order</button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-3">
              <Lock className="h-3.5 w-3.5" /> Secure demo checkout
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label, name, value, onChange, error, type = "text", required, autoComplete,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-2">
        {label} {required ? <span className="text-danger">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className="field"
        style={error ? { borderColor: "var(--color-danger)" } : undefined}
      />
      {error ? (
        <p id={`${name}-err`} role="alert" className="mt-1 text-xs font-medium text-danger">{error}</p>
      ) : null}
    </div>
  );
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
