import {
  Wrench, Package, Layers, GitBranch, AlignCenter, ShieldCheck, Scan, Armchair,
  Fingerprint, Sparkles, Scissors, Anchor, Sun, Box, CircleDot, HardHat,
  Stethoscope, Syringe, Bandage, Accessibility, Wind, Siren, Bone, Droplets,
  FlaskConical, Activity, Bath, Pill, Tractor, PawPrint, HeartPulse, Smile, Gauge,
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
  stethoscope: Stethoscope,
  syringe: Syringe,
  bandage: Bandage,
  accessibility: Accessibility,
  wind: Wind,
  siren: Siren,
  bone: Bone,
  droplets: Droplets,
  "flask-conical": FlaskConical,
  activity: Activity,
  bath: Bath,
  pill: Pill,
  tractor: Tractor,
  "paw-print": PawPrint,
  "heart-pulse": HeartPulse,
  smile: Smile,
  gauge: Gauge,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Stethoscope;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
