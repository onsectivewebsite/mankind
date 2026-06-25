import {
  Wrench,
  Package,
  Layers,
  GitBranch,
  AlignCenter,
  ShieldCheck,
  Scan,
  Armchair,
  Fingerprint,
  Sparkles,
  Scissors,
  Anchor,
  Sun,
  Box,
  CircleDot,
  HardHat,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  tool: Wrench,
  package: Package,
  layers: Layers,
  "git-branch": GitBranch,
  "align-center": AlignCenter,
  "shield-check": ShieldCheck,
  scan: Scan,
  armchair: Armchair,
  fingerprint: Fingerprint,
  sparkles: Sparkles,
  scissors: Scissors,
  anchor: Anchor,
  sun: Sun,
  box: Box,
  "circle-dot": CircleDot,
  "hard-hat": HardHat,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? Stethoscope;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
