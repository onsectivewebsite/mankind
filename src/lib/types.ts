export type IndustryId = "dental" | "medical" | "veterinary";

export type Industry = {
  id: IndustryId;
  name: string;
  /** short word e.g. "Dental" */
  label: string;
  tagline: string;
  blurb: string;
  /** lucide icon key */
  icon: string;
  /** hero/section photo url */
  image: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  industry: IndustryId;
  /** lucide icon key, resolved in CategoryIcon */
  icon: string;
  blurb: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  industryId: IndustryId;
  brand: string;
  /** list price (MRP) in CAD */
  mrp: number;
  /** selling price in CAD before store offers */
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  bestSeller: boolean;
  isNew: boolean;
  description: string;
  specs: Record<string, string>;
  /** monotonic index used for "newest" sorting */
  seq: number;
};

export type OfferScope =
  | { type: "all" }
  | { type: "category"; value: string }
  | { type: "brand"; value: string };

export type Offer = {
  id: string;
  title: string;
  /** percent off, 1-90 */
  percent: number;
  scope: OfferScope;
  active: boolean;
  /** optional coupon code shown to customers */
  code?: string;
};

export type CartLine = {
  productId: string;
  qty: number;
};

/** A product with its current effective price after the best applicable offer. */
export type PricedProduct = Product & {
  effectivePrice: number;
  appliedOffer: Offer | null;
  discountPercent: number;
};
