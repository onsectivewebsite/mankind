import { Star } from "lucide-react";
import { formatCAD } from "@/lib/pricing";

export function Stars({
  rating,
  reviews,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  size?: number;
}) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < full ? "fill-amber-400 text-amber-400" : "text-line-strong"}
            aria-hidden="true"
          />
        ))}
      </span>
      <span className="text-xs font-medium text-ink-3 tnum">
        {rating.toFixed(1)}
        {reviews != null ? ` (${reviews})` : ""}
      </span>
    </span>
  );
}

export function PriceTag({
  price,
  mrp,
  size = "md",
}: {
  price: number;
  mrp?: number;
  size?: "sm" | "md" | "lg";
}) {
  const showStrike = mrp != null && mrp > price + 0.001;
  const cls = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-bold text-ink ${cls} tnum`}>{formatCAD(price)}</span>
      {showStrike ? (
        <span className="text-sm text-ink-3 line-through tnum">{formatCAD(mrp!)}</span>
      ) : null}
    </span>
  );
}

export function DiscountBadge({ percent }: { percent: number }) {
  if (percent <= 0) return null;
  return (
    <span className="chip bg-accent text-white">-{percent}%</span>
  );
}

export function StockPill({ stock }: { stock: number }) {
  if (stock <= 0)
    return <span className="chip bg-muted text-ink-3">Out of stock</span>;
  if (stock < 10)
    return <span className="chip bg-amber-100 text-amber-800">Low stock · {stock}</span>;
  return <span className="chip bg-emerald-50 text-emerald-700">In stock</span>;
}
