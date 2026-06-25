# Mankind Healthcare — Dental Supplies E-commerce

A production-grade e-commerce website for **Mankind Healthcare**, a dental healthcare and
equipment supplier serving clinics across Canada. Built with **Next.js 16 + React 19 +
Tailwind CSS v4**.

> Dental healthcare & equipment supplier · 105, Mall Road, Canada
> +1 437 268 2091 · info@mankindhealthcare.com

## Features

### Storefront
- **1,690+ products** across 16 dental categories (instruments, consumables, restorative,
  endodontics, orthodontics, sterilization, imaging, equipment, implants, whitening, lab,
  burs, PPE and more).
- **Catalog browsing** with search, category / brand / price filters, sorting and pagination.
- **Product detail** pages with specs, ratings, applied offers, quantity selector and
  related products.
- **Cart** with quantity editing, live order summary, free-shipping progress and savings.
- **Checkout** (demo) with accessible, validated forms and an order-confirmation flow.
- **Offers** page showing every active promotion and the top discounted products.

### Admin panel (`/admin`)
- **Dashboard** — inventory value, stock alerts, active offers, products-by-category chart.
- **Products** — search, filter, and **edit prices / MRP / stock inline**; delete products.
- **Add product** — full form with a live preview; new items appear instantly in the store.
- **Offers** — create, pause and delete store-wide, per-category or per-brand discounts
  with optional coupon codes.

### Persistence
All admin changes (new products, price/stock edits, deletions, offers) and the shopping cart
are saved to the **browser's local storage** — no backend or account required. Only the
*deltas* from the base catalogue are stored, keeping it well within storage limits.

Use **Admin → Products → Reset all** to restore the default catalogue at any time.

## Design system
- **Style:** Accessible & Ethical (WCAG-friendly) — high contrast, visible focus rings,
  keyboard navigation, reduced-motion support.
- **Palette:** calm cyan (`#0891B2`) + health green (`#059669`).
- **Type:** Figtree (display) / Noto Sans (body).

## Getting started

```bash
npm install      # already done during scaffolding
npm run dev      # start the dev server → http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
src/
  app/
    (store)/            # storefront (Header + Footer shell)
      page.tsx          # home
      products/         # catalog + [id] detail
      offers/  cart/  checkout/
    admin/              # admin panel (own sidebar shell)
      page.tsx          # dashboard
      products/         # manage + new
      offers/
  components/           # Header, Footer, ProductCard, ProductMedia, ui atoms…
  data/catalog.ts       # 16 categories + 1,690-product generator
  lib/                  # types + pricing helpers
  store/                # Zustand stores (catalog + cart) with localStorage persistence
```

> This is a front-end demo: the checkout does not process real payments, and data lives in
> the browser. It can be upgraded to a real database (e.g. Supabase) without changing the UI.
