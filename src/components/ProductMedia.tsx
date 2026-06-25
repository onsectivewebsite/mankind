import { categoryById } from "@/data/catalog";
import { CategoryIcon } from "./CategoryIcon";

/** On-brand category tints (kept within the cyan/teal/green family). */
const TINTS: Record<string, [string, string, string]> = {
  instruments: ["#ecfeff", "#cffafe", "#0891b2"],
  consumables: ["#f0fdfa", "#ccfbf1", "#0d9488"],
  restorative: ["#eff6ff", "#dbeafe", "#2563eb"],
  endodontics: ["#ecfeff", "#a5f3fc", "#0e7490"],
  orthodontics: ["#f5f3ff", "#ede9fe", "#7c3aed"],
  sterilization: ["#ecfdf5", "#d1fae5", "#059669"],
  imaging: ["#eef2ff", "#e0e7ff", "#4f46e5"],
  equipment: ["#f0f9ff", "#e0f2fe", "#0284c7"],
  impression: ["#fdf4ff", "#fae8ff", "#a21caf"],
  preventive: ["#f0fdf4", "#dcfce7", "#16a34a"],
  surgical: ["#fef2f2", "#fee2e2", "#e11d48"],
  implants: ["#f8fafc", "#e2e8f0", "#475569"],
  whitening: ["#fefce8", "#fef9c3", "#ca8a04"],
  lab: ["#f0fdfa", "#99f6e4", "#0f766e"],
  burs: ["#ecfeff", "#cffafe", "#155e75"],
  ppe: ["#eff6ff", "#bfdbfe", "#1d4ed8"],
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
  const [c1, c2, accent] = TINTS[categoryId] ?? ["#ecfeff", "#cffafe", "#0891b2"];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
      aria-hidden="true"
    >
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(${accent}22 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur-sm"
        style={{ color: accent }}
      >
        <CategoryIcon name={cat?.icon ?? "package"} className={iconClass} />
      </div>
      {brand ? (
        <span
          className="absolute bottom-2 left-2 rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide backdrop-blur-sm"
          style={{ color: accent }}
        >
          {brand}
        </span>
      ) : null}
    </div>
  );
}
