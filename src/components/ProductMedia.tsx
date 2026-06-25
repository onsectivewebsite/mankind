import { categoryById } from "@/data/catalog";
import { CategoryIcon } from "./CategoryIcon";
import type { IndustryId } from "@/lib/types";

/** Vibrant per-industry gradient tints (so cards read by segment at a glance). */
const TINTS: Record<IndustryId, [string, string, string]> = {
  dental: ["#f5f3ff", "#ddd6fe", "#7c3aed"],
  medical: ["#eff6ff", "#bfdbfe", "#2563eb"],
  veterinary: ["#f0fdfa", "#99f6e4", "#0d9488"],
};

export function ProductMedia({
  categoryId,
  brand,
  className = "",
  iconClass = "h-12 w-12",
  rounded = "rounded-xl",
}: {
  categoryId: string;
  brand?: string;
  className?: string;
  iconClass?: string;
  rounded?: string;
}) {
  const cat = categoryById(categoryId);
  const industry = (cat?.industry ?? "dental") as IndustryId;
  const [c1, c2, accent] = TINTS[industry];
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
