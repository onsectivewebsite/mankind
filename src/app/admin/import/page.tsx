"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Upload, FileText, CheckCircle2, AlertTriangle, Braces, Table, ArrowRight } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { CATEGORIES } from "@/data/catalog";
import { formatCAD } from "@/lib/pricing";

type Format = "csv" | "json";

type ParsedRow = {
  input: { name: string; categoryId: string; price: number; mrp: number; brand: string; stock: number; unit: string; description: string; image?: string };
  categoryLabel: string;
  valid: boolean;
  reason?: string;
};

const SAMPLE_CSV = `name,category,price,mrp,brand,stock,unit,description,image
Nitrile Exam Gloves — Medium,Dental Consumables,18.99,21.99,MCare,120,box of 100,Powder-free nitrile gloves,https://example.com/gloves.jpg
Autoclave 23L Class B,Dental Sterilization,4290,4790,MCare Elite,8,each,Class B vacuum autoclave,https://example.com/autoclave.jpg`;

const SAMPLE_JSON = `[
  {
    "name": "Nitrile Exam Gloves — Medium",
    "category": "Dental Consumables",
    "price": 18.99,
    "mrp": 21.99,
    "brand": "MCare",
    "stock": 120,
    "unit": "box of 100",
    "description": "Powder-free nitrile gloves",
    "image": "https://example.com/gloves.jpg"
  }
]`;

function resolveCategory(v: string): string {
  const s = (v || "").trim().toLowerCase();
  const c = CATEGORIES.find((c) => c.id.toLowerCase() === s || c.name.toLowerCase() === s || c.slug.toLowerCase() === s);
  return c?.id ?? "";
}

function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let cur: string[] = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { cur.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (field !== "" || cur.length) { cur.push(field); rows.push(cur); cur = []; field = ""; }
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else field += ch;
  }
  if (field !== "" || cur.length) { cur.push(field); rows.push(cur); }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {};
    headers.forEach((h, i) => (o[h] = (r[i] ?? "").trim()));
    return o;
  });
}

export default function ImportPage() {
  const importProducts = useCatalog((s) => s.importProducts);
  const [format, setFormat] = useState<Format>("csv");
  const [raw, setRaw] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<number | null>(null);

  const parsed = useMemo<ParsedRow[]>(() => {
    setError("");
    if (!raw.trim()) return [];
    let records: Record<string, unknown>[] = [];
    try {
      if (format === "json") {
        const j = JSON.parse(raw);
        records = Array.isArray(j) ? j : [j];
      } else {
        records = parseCSV(raw);
      }
    } catch {
      return [];
    }
    return records.map((r) => {
      const name = String(r.name ?? "").trim();
      const catRaw = String(r.category ?? r.categoryid ?? r.categoryId ?? "").trim();
      const categoryId = resolveCategory(catRaw);
      const price = parseFloat(String(r.price ?? ""));
      const mrp = parseFloat(String(r.mrp ?? r.price ?? ""));
      const stock = parseInt(String(r.stock ?? "25"), 10);
      const cat = CATEGORIES.find((c) => c.id === categoryId);
      let reason = "";
      if (!name) reason = "Missing name";
      else if (!categoryId) reason = `Unknown category “${catRaw}”`;
      else if (isNaN(price)) reason = "Invalid price";
      return {
        input: {
          name, categoryId, price, mrp: isNaN(mrp) ? price : mrp,
          brand: String(r.brand ?? "MCare").trim() || "MCare",
          stock: isNaN(stock) ? 25 : stock,
          unit: String(r.unit ?? "each").trim() || "each",
          description: String(r.description ?? "").trim(),
          image: String(r.image ?? "").trim() || undefined,
        },
        categoryLabel: cat?.name ?? catRaw,
        valid: !reason,
        reason: reason || undefined,
      };
    });
  }, [raw, format]);

  const validRows = parsed.filter((r) => r.valid);
  const invalidRows = parsed.filter((r) => !r.valid);

  const runImport = () => {
    if (!validRows.length) { setError("No valid rows to import."); return; }
    const n = importProducts(validRows.map((r) => r.input));
    setDone(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done !== null) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mint-soft text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-ink">{done.toLocaleString()} products imported</h1>
        <p className="mt-2 text-ink-2">They&apos;re now live in the catalogue and saved in your browser.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/products?sort=new" className="btn btn-primary">View in store</Link>
          <Link href="/admin/products" className="btn btn-outline">Manage products</Link>
          <button onClick={() => { setDone(null); setRaw(""); }} className="btn btn-ghost">Import more</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">Import products</h1>
        <p className="text-sm text-ink-3">
          Paste a CSV or JSON product feed to bulk-load products — including image URLs, prices and
          categories. Imported items appear instantly in the storefront.
        </p>
      </header>

      {/* format toggle */}
      <div className="flex gap-2">
        {(["csv", "json"] as Format[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`btn h-10 min-h-0 ${format === f ? "btn-primary" : "btn-outline"}`}
          >
            {f === "csv" ? <Table className="h-4 w-4" /> : <Braces className="h-4 w-4" />} {f.toUpperCase()}
          </button>
        ))}
        <button
          onClick={() => setRaw(format === "csv" ? SAMPLE_CSV : SAMPLE_JSON)}
          className="btn btn-ghost h-10 min-h-0 text-sm"
        >
          <FileText className="h-4 w-4" /> Load sample
        </button>
      </div>

      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={12}
        spellCheck={false}
        placeholder={format === "csv"
          ? "name,category,price,mrp,brand,stock,unit,description,image\n…"
          : '[ { "name": "…", "category": "…", "price": 0, "image": "…" } ]'}
        className="field min-h-[16rem] w-full resize-y py-3 font-mono text-[13px] leading-relaxed"
      />

      <p className="text-xs text-ink-3">
        Columns/keys: <span className="font-medium text-ink-2">name, category, price</span> (required) ·
        mrp, brand, stock, unit, description, image (optional). <span className="font-medium text-ink-2">category</span> must
        match an existing category name or id — see the list in Products.
      </p>

      {error ? <p role="alert" className="rounded-lg bg-[#fdecea] px-3 py-2 text-sm font-medium text-[#b23b38]">{error}</p> : null}

      {/* preview */}
      {parsed.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-line bg-muted px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-primary"><CheckCircle2 className="h-4 w-4" /> {validRows.length} ready</span>
            {invalidRows.length ? <span className="inline-flex items-center gap-1.5 font-semibold text-[#b23b38]"><AlertTriangle className="h-4 w-4" /> {invalidRows.length} skipped</span> : null}
            <button onClick={runImport} disabled={!validRows.length} className="btn btn-primary ml-auto h-9 min-h-0">
              <Upload className="h-4 w-4" /> Import {validRows.length} products <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface text-left text-xs uppercase tracking-wide text-ink-3">
                <tr>
                  <th className="px-4 py-2 font-semibold">Product</th>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Price</th>
                  <th className="px-4 py-2 font-semibold">Image</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {parsed.slice(0, 100).map((r, i) => (
                  <tr key={i} className={r.valid ? "" : "bg-[#fdecea]/40"}>
                    <td className="px-4 py-2 font-medium text-ink">{r.input.name || <span className="text-ink-3">—</span>}</td>
                    <td className="px-4 py-2 text-ink-2">{r.categoryLabel}</td>
                    <td className="px-4 py-2 tnum text-ink-2">{isNaN(r.input.price) ? "—" : formatCAD(r.input.price)}</td>
                    <td className="px-4 py-2 text-ink-3">{r.input.image ? "✓" : "—"}</td>
                    <td className="px-4 py-2">
                      {r.valid ? <span className="text-primary">Ready</span> : <span className="text-[#b23b38]">{r.reason}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parsed.length > 100 ? <p className="border-t border-line px-4 py-2 text-xs text-ink-3">Showing first 100 of {parsed.length.toLocaleString()} rows · all valid rows will import.</p> : null}
        </div>
      ) : null}
    </div>
  );
}
