import { Suspense } from "react";
import { ProductsAdmin } from "./ProductsAdmin";

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-ink-3">Loading…</div>}>
      <ProductsAdmin />
    </Suspense>
  );
}
