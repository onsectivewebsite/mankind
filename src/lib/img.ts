import { PHOTO_POOLS } from "./productPhotos";

/** Build a sized Unsplash URL from a photo id (all ids verified to return 200). */
export const unsplash = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70${h ? `&h=${h}` : ""}`;

/** Curated, spot-checked photo ids. */
export const PHOTO = {
  dentalA: "1588776814546-1ffcf47267a5", // dentist reviewing x-rays
  dentalB: "1606811841689-23dfddce3e95", // dentist & patient
  dentalC: "1609840114035-3c981b782dfe", // clear aligner
  dentalProc: "1606811971618-4486d14f3f99", // scaler close-up
  medicalA: "1631815589968-fdb09a223b1e", // blood pressure check
  medicalB: "1576091160550-2173dba999ef", // stethoscope + laptop
  medicalC: "1559757148-5c350d0d3c56", // brain model
  surgery: "1579684453423-f84349ef60b0", // operating theatre team
  vetA: "1576201836106-db1758fd1c97", // golden retriever puppy
  vetB: "1628009368231-7bb7cfcb0def", // vet with cat
  physioA: "1518611012118-696072aa579a", // rehab / exercise on mats
  physioB: "1607962837359-5e7e89f86776", // movement / group exercise
  lab: "1631549916768-4119b2e5f926", // lab work
  hero: "1612277795421-9bc7706a4a34", // clinician with patient
} as const;

/** Per-industry primary imagery. */
export const INDUSTRY_PHOTO = {
  dental: PHOTO.dentalA,
  medical: PHOTO.surgery,
  veterinary: PHOTO.vetA,
  physiotherapy: PHOTO.physioA,
} as const;

/** Hero slider — 5 slides spanning all four fields. */
export const HERO_SLIDES: { id: string; label: string; caption: string }[] = [
  { id: PHOTO.dentalProc, label: "Dental", caption: "Instruments, chairs & operatory equipment" },
  { id: PHOTO.surgery, label: "Medical", caption: "Surgical, diagnostics, PPE & patient care" },
  { id: PHOTO.vetA, label: "Veterinary", caption: "Companion & large-animal essentials" },
  { id: PHOTO.physioA, label: "Physiotherapy", caption: "Rehab, electrotherapy & recovery" },
  { id: PHOTO.medicalA, label: "Clinical", caption: "Monitoring & everyday consumables" },
];

/** Secondary imagery used in showcases. */
export const SHOWCASE = {
  dental: [PHOTO.dentalB, PHOTO.dentalC],
  medical: [PHOTO.medicalB, PHOTO.medicalC],
  veterinary: [PHOTO.vetB, PHOTO.vetA],
  physiotherapy: [PHOTO.physioB, PHOTO.physioA],
} as const;

/* ============================================================
   Per-product stock photography
   ------------------------------------------------------------
   The catalogue is ~5,000 procedurally-generated SKUs. Each product
   resolves to a RELEVANT term (from its base name first, then its
   category, then its industry), and we pick a photo from that term's
   pool of curated, load-verified Unsplash images (see productPhotos.ts).

   The pick is `pool[seq % pool.length]` using the product's globally-
   unique `seq`, so consecutive products in a category rotate through
   the pool — relevant AND varied — and every product keeps the SAME
   photo across SSR/CSR and reloads. Photos repeat only every N (≈6)
   products that share a term (the documented relevance/variety trade).
   Refresh the pools by re-running scratchpad/fetchphotos.mjs.
   ============================================================ */

/** Relevant search term per category id (must exist as a key in PHOTO_POOLS). */
const CATEGORY_TERM: Record<string, string> = {
  // Dental
  instruments: "dental instruments",
  consumables: "medical mask gloves",
  restorative: "dental composite filling",
  endodontics: "dentist",
  orthodontics: "orthodontic braces",
  sterilization: "autoclave sterilizer",
  imaging: "radiology",
  equipment: "dentist",
  impression: "dental impression mold",
  preventive: "dental care toothbrush",
  surgical: "oral surgery",
  implants: "dental implant",
  whitening: "teeth whitening",
  lab: "dental instruments",
  burs: "dental drill",
  ppe: "medical protective gown",
  // Medical
  "med-diagnostics": "blood pressure monitor",
  "med-consumables": "medical syringe",
  "med-surgical": "surgical instruments",
  "med-ppe": "medical mask gloves",
  "med-wound": "wound bandage dressing",
  "med-mobility": "wheelchair",
  "med-respiratory": "oxygen mask respiratory",
  "med-emergency": "first aid kit",
  "med-ortho": "knee brace orthopedic",
  "med-infusion": "iv drip infusion",
  "med-lab": "laboratory test tubes",
  "med-sterilization": "autoclave sterilizer",
  "med-aesthetic": "facial treatment",
  "med-nursing": "hospital",
  "med-cardiology": "cardiology",
  // Veterinary
  "vet-instruments": "veterinary surgery instruments",
  "vet-diagnostics": "veterinarian dog examination",
  "vet-consumables": "veterinary syringe",
  "vet-surgical": "veterinary surgery",
  "vet-dental": "dog teeth veterinary",
  "vet-anesthesia": "veterinary anesthesia",
  "vet-grooming": "dog grooming",
  "vet-pharmacy": "veterinary medicine",
  "vet-largeanimal": "cattle farm veterinarian",
  "vet-imaging": "radiology",
  // Physiotherapy
  "physio-electro": "physiotherapy electrotherapy",
  "physio-ultrasound": "ultrasound therapy physiotherapy",
  "physio-exercise": "physiotherapy rehabilitation exercise",
  "physio-hotcold": "ice pack cold therapy",
  "physio-tables": "massage",
  "physio-shockwave": "laser therapy physiotherapy",
  "physio-supports": "knee support brace",
  "physio-massage": "massage therapy",
};

/** Industry floor, used when a category id is somehow unmapped. */
const INDUSTRY_TERM: Record<string, string> = {
  dental: "dentist",
  medical: "hospital",
  veterinary: "veterinary surgery",
  physiotherapy: "physiotherapy rehabilitation exercise",
};

/**
 * Base-name → term overrides, checked in order (first match wins).
 * These sharpen relevance for distinctive items that span many categories
 * (gloves, wheelchairs, lasers, braces, …) regardless of their category.
 * Every value must be a key in PHOTO_POOLS.
 */
const BASE_TERM_RULES: [RegExp, string][] = [
  [/glove/i, "medical gloves"],
  [/mask|respirator/i, "surgical mask"],
  [/wheelchair/i, "wheelchair"],
  [/walker|crutch|\bcane\b|rollator/i, "walking frame mobility"],
  [/laser/i, "medical laser device"],
  [/ultrasound/i, "ultrasound machine"],
  [/nebulizer|oxygen|cannula|ambu/i, "oxygen mask respiratory"],
  [/syringe/i, "syringe injection"],
  [/needle/i, "hypodermic needle"],
  [/scalpel|blade/i, "scalpel surgery"],
  [/forceps|scissors|retractor|hemostat|rongeur|curette|elevator/i, "surgical instruments"],
  [/autoclave|steriliz|pouch/i, "autoclave sterilizer"],
  [/microscope|slide|petri|centrifuge|pipette|vacutainer/i, "laboratory microscope"],
  [/thermometer/i, "medical thermometer"],
  [/oximeter/i, "pulse oximeter"],
  [/stethoscope/i, "stethoscope"],
  [/x-?ray|sensor|phosphor|radiograph/i, "radiology"],
  [/brace|splint|collar|compression|stabiliz/i, "knee brace orthopedic"],
  [/operatory|cuspidor/i, "dentist"],
  [/plinth|traction/i, "massage"],
  [/band|resistance|balance|putty|pulley|pedal|stability|\bball\b/i, "resistance band fitness"],
  [/massage|roller|cupping|percussion/i, "massage therapy"],
  [/tens|ems|stimulator|electrode|interferential|microcurrent/i, "physiotherapy electrotherapy"],
  [/paraffin|cryo|\bice\b|cold pack|hot pack/i, "ice pack cold therapy"],
  [/whiten|bleach/i, "teeth whitening"],
  [/implant|abutment/i, "dental implant"],
  [/bracket|arch wire|molar band|ligature|ortho/i, "orthodontic braces"],
  [/clipper|grooming|slicker|nail trimmer/i, "dog grooming"],
  [/ecg|holter|defibrillator|telemetry/i, "cardiology"],
  [/bandage|dressing|gauze|suture|wound/i, "wound bandage dressing"],
  [/first aid|emergency|tourniquet|trauma/i, "first aid kit"],
];

/** Resolve the most relevant PHOTO_POOLS term for a product. */
function termFor(base: string, categoryId: string, industryId?: string): string {
  for (const [re, term] of BASE_TERM_RULES) if (re.test(base)) return term;
  return (
    CATEGORY_TERM[categoryId] ??
    (industryId ? INDUSTRY_TERM[industryId] : undefined) ??
    "hospital"
  );
}

/**
 * Pick a curated, relevant Unsplash photo URL for a product.
 * Deterministic: the same `seq` always yields the same photo, so it is
 * stable across SSR/CSR and reloads. Rotates through the term's pool so
 * neighbouring products in a category look varied.
 */
export function productPhoto(base: string, categoryId: string, seq: number, industryId?: string): string {
  const term = termFor(base, categoryId, industryId);
  let pool = PHOTO_POOLS[term];
  if (!pool || pool.length === 0) {
    pool = PHOTO_POOLS[INDUSTRY_TERM[industryId ?? "medical"] ?? "hospital"] ?? PHOTO_POOLS["hospital"];
  }
  if (!pool || pool.length === 0) return unsplash(PHOTO.hero, 600); // absolute fallback
  const id = pool[Math.abs(seq) % pool.length];
  return unsplash(id, 600);
}
