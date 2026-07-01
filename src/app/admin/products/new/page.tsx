"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, PackagePlus, ChevronDown } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { CATEGORIES, BRANDS, INDUSTRIES, categoriesByIndustry } from "@/data/catalog";
import { ProductMedia } from "@/components/ProductMedia";
import { formatCAD } from "@/lib/pricing";

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useCatalog((s) => s.addProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [created, setCreated] = useState<{ id: string; name: string } | null>(null);
  const [f, setF] = useState({
    name: "", brand: BRANDS[0], categoryId: CATEGORIES[0].id,
    price: "", mrp: "", stock: "25", unit: "each", description: "", image: "",
  });

  const set = (k: keyof typeof f, v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!f.name.trim()) next.name = "Product name is required";
    const price = parseFloat(f.price);
    if (isNaN(price) || price < 0) next.price = "Enter a valid selling price";
    const mrp = f.mrp ? parseFloat(f.mrp) : price;
    if (f.mrp && (isNaN(mrp) || mrp < price)) next.mrp = "MRP must be ≥ selling price";
    const stock = parseInt(f.stock, 10);
    if (isNaN(stock) || stock < 0) next.stock = "Enter a valid stock quantity";
    setErrors(next);
    if (Object.keys(next).length) return;

    const product = addProduct({
      name: f.name.trim(),
      brand: f.brand,
      categoryId: f.categoryId,
      price,
      mrp: mrp || price,
      stock,
      unit: f.unit.trim() || "each",
      description: f.description.trim(),
      image: f.image.trim() || undefined,
    });
    setCreated({ id: product.id, name: product.name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (created) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mint-soft text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-ink">Product added</h1>
        <p className="mt-2 text-ink-2">“{created.name}” is now live in your catalogue.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`/products/${created.id}`} className="btn btn-primary">View product</Link>
          <button
            onClick={() => { setCreated(null); setF((s) => ({ ...s, name: "", price: "", mrp: "", description: "" })); }}
            className="btn btn-outline"
          >
            <PackagePlus className="h-5 w-5" /> Add another
          </button>
          <Link href="/admin/products" className="btn btn-ghost">Go to products</Link>
        </div>
      </div>
    );
  }

  const previewPrice = parseFloat(f.price);

  return (
    <div>
      <Link href="/admin/products" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-3 hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>
      <h1 className="text-2xl font-bold text-ink md:text-3xl">Add a new product</h1>
      <p className="mt-1 text-sm text-ink-3">It will appear instantly in the storefront catalogue.</p>

      <form onSubmit={submit} noValidate className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="card space-y-5 p-6">
          <Field label="Product name" required error={errors.name}>
            <input className="field" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. MankindPro Nitrile Gloves — Medium" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Brand">
              <Select value={f.brand} onChange={(v) => set("brand", v)}>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </Select>
            </Field>
            <Field label="Category">
              <Select value={f.categoryId} onChange={(v) => set("categoryId", v)}>
                {INDUSTRIES.map((ind) => (
                  <optgroup key={ind.id} label={ind.name}>
                    {categoriesByIndustry(ind.id).map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Selling price (CAD)" required error={errors.price}>
              <input type="number" min={0} step="0.01" className="field tnum" value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
            </Field>
            <Field label="MRP / list price" error={errors.mrp} hint="Optional — for showing a discount">
              <input type="number" min={0} step="0.01" className="field tnum" value={f.mrp} onChange={(e) => set("mrp", e.target.value)} placeholder="0.00" />
            </Field>
            <Field label="Stock quantity" required error={errors.stock}>
              <input type="number" min={0} step="1" className="field tnum" value={f.stock} onChange={(e) => set("stock", e.target.value)} />
            </Field>
          </div>

          <Field label="Unit" hint="e.g. each, box of 100, pack of 5">
            <input className="field" value={f.unit} onChange={(e) => set("unit", e.target.value)} />
          </Field>

          <Field label="Image URL" hint="Optional — paste a link to the product photo">
            <input type="url" className="field" value={f.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…" />
          </Field>

          <Field label="Description">
            <textarea className="field min-h-28 resize-y py-2.5" value={f.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the product, its use and key specifications…" />
          </Field>

          <div className="flex gap-3 pt-1">
            <button type="submit" className="btn btn-primary">Add product</button>
            <Link href="/admin/products" className="btn btn-ghost">Cancel</Link>
          </div>
        </div>

        {/* live preview */}
        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-3">Live preview</p>
          <div className="card overflow-hidden">
            <ProductMedia categoryId={f.categoryId} brand={f.brand} image={f.image.trim() || undefined} className="aspect-[4/3] w-full" iconClass="h-10 w-10" rounded="rounded-none" />
            <div className="p-4">
              <p className="line-clamp-2 font-display text-sm font-semibold text-ink">{f.name || "Product name"}</p>
              <p className="mt-2 text-lg font-bold text-ink tnum">
                {!isNaN(previewPrice) && f.price ? formatCAD(previewPrice) : "—"}
              </p>
              <p className="text-xs text-ink-3">per {f.unit || "each"}</p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label, required, error, hint, children,
}: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-2">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      {children}
      {hint && !error ? <span className="mt-1 block text-xs text-ink-3">{hint}</span> : null}
      {error ? <span role="alert" className="mt-1 block text-xs font-medium text-danger">{error}</span> : null}
    </label>
  );
}

function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field appearance-none pr-9">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
    </div>
  );
}
