import { categoryById } from "@/data/catalog";
import { CategoryIcon } from "./CategoryIcon";
import { Photo } from "./Photo";
import type { IndustryId } from "@/lib/types";

/** Vibrant per-industry gradient tints (so cards read by segment at a glance). */
const TINTS: Record<IndustryId, [string, string, string]> = {
  dental: ["#ecf6f6", "#bfe3e3", "#0f6f73"],
  medical: ["#eef6fc", "#bcdcf2", "#2f7fb0"],
  veterinary: ["#eafaf4", "#b3e6d5", "#2e9e7b"],
  physiotherapy: ["#f4f1fd", "#d9cdf6", "#6d4bc7"],
};

export function ProductMedia({
  categoryId,
  brand,
  image,
  className = "",
  iconClass = "h-12 w-12",
  rounded = "rounded-xl",
}: {
  categoryId: string;
  brand?: string;
  image?: string;
  className?: string;
  iconClass?: string;
  rounded?: string;
}) {
  const cat = categoryById(categoryId);
  const industry = (cat?.industry ?? "dental") as IndustryId;
  const [c1, c2, accent] = TINTS[industry];

  // real product photo (e.g. from an import) takes precedence over the tile
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-white ${rounded} ${className}`}>
        <Photo src={image} alt={brand ? `${brand} product` : "Product"} className="h-full w-full" />
        {brand ? (
          <span className="absolute bottom-2 left-2 rounded-md bg-white/85 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-ink-2 backdrop-blur-sm">
            {brand}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`group/media relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${accent}26 1px, transparent 1px)`,
          backgroundSize: "13px 13px",
        }}
      />
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl"
        style={{ background: accent }}
      />
      <div
        className="relative flex items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover/media:scale-110 group-hover:scale-110"
        style={{ color: accent }}
      >
        <CategoryIcon name={cat?.icon ?? "package"} className={iconClass} />
      </div>
      {brand ? (
        <span
          className="absolute bottom-2 left-2 rounded-md bg-white/85 px-1.5 py-0.5 text-[10px] font-bold tracking-wide backdrop-blur-sm"
          style={{ color: accent }}
        >
          {brand}
        </span>
      ) : null}
    </div>
  );
}
