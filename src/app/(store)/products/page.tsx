import { Suspense } from "react";
import { ProductsBrowser } from "./ProductsBrowser";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-ink-3">Loading products…</div>
      }
    >
      <ProductsBrowser />
    </Suspense>
  );
}
