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
   The catalogue is ~5,000 procedurally-generated SKUs, so photos
   are resolved by keyword rather than hand-picked per SKU. We use
   LoremFlickr (keyword-driven, always returns a 200) with a `lock`
   seed that fixes WHICH photo the keyword returns.

   Two rules keep every product's photo UNIQUE:
     1. lock = the product's globally-unique `seq` (1..N) — so no two
        products ever share a lock (avoids birthday-paradox collisions).
     2. keywords are SINGLE words — LoremFlickr's pool for a single term
        is deep (hundreds of photos), whereas a comma-compound term
        ("autoclave,sterilizer") collapses to ~1 photo and duplicates.
   Together: a unique lock into a deep single-word pool → a distinct,
   still-relevant, SSR/CSR-stable photo for each SKU.
   ============================================================ */

/** Single deep-pool keyword per category id — the relevance floor for its SKUs. */
const CATEGORY_KEYWORDS: Record<string, string> = {
  // Dental
  instruments: "dental",
  consumables: "dentistry",
  restorative: "dental",
  endodontics: "dentist",
  orthodontics: "braces",
  sterilization: "laboratory",
  imaging: "radiology",
  equipment: "dentist",
  impression: "dental",
  preventive: "toothpaste",
  surgical: "surgery",
  implants: "implant",
  whitening: "teeth",
  lab: "laboratory",
  burs: "drill",
  ppe: "mask",
  // Medical
  "med-diagnostics": "stethoscope",
  "med-consumables": "syringe",
  "med-surgical": "surgery",
  "med-ppe": "mask",
  "med-wound": "bandage",
  "med-mobility": "wheelchair",
  "med-respiratory": "oxygen",
  "med-emergency": "ambulance",
  "med-ortho": "orthopedic",
  "med-infusion": "infusion",
  "med-lab": "laboratory",
  "med-sterilization": "laboratory",
  "med-aesthetic": "cosmetic",
  "med-nursing": "hospital",
  "med-cardiology": "cardiology",
  // Veterinary
  "vet-instruments": "veterinary",
  "vet-diagnostics": "veterinarian",
  "vet-consumables": "veterinary",
  "vet-surgical": "veterinary",
  "vet-dental": "dog",
  "vet-anesthesia": "veterinary",
  "vet-grooming": "grooming",
  "vet-pharmacy": "medicine",
  "vet-largeanimal": "cattle",
  "vet-imaging": "radiology",
  // Physiotherapy
  "physio-electro": "physiotherapy",
  "physio-ultrasound": "ultrasound",
  "physio-exercise": "fitness",
  "physio-hotcold": "ice",
  "physio-tables": "massage",
  "physio-shockwave": "laser",
  "physio-supports": "orthopedic",
  "physio-massage": "massage",
};

/** Industry floor, used when a category id is somehow unmapped. */
const INDUSTRY_KEYWORDS: Record<string, string> = {
  dental: "dentist",
  medical: "hospital",
  veterinary: "veterinary",
  physiotherapy: "physiotherapy",
};

/**
 * Base-name → single keyword overrides, checked in order (first match wins).
 * These sharpen relevance for distinctive items that span many categories
 * (gloves, wheelchairs, lasers, braces, …) regardless of their category.
 * Every value is ONE word so its LoremFlickr pool stays deep enough to
 * keep photos unique across the many SKUs that share it.
 */
const BASE_RULES: [RegExp, string][] = [
  [/glove/i, "gloves"],
  [/mask|respirator/i, "mask"],
  [/wheelchair/i, "wheelchair"],
  [/walker|crutch|\bcane\b|rollator/i, "walker"],
  [/laser/i, "laser"],
  [/ultrasound/i, "ultrasound"],
  [/nebulizer|oxygen|cannula|ambu/i, "oxygen"],
  [/syringe/i, "syringe"],
  [/needle/i, "needle"],
  [/scalpel|blade/i, "scalpel"],
  [/forceps|scissors|retractor|hemostat|rongeur|curette|elevator/i, "surgery"],
  [/autoclave|steriliz|pouch/i, "laboratory"],
  [/microscope|slide|petri|centrifuge|pipette|vacutainer/i, "microscope"],
  [/thermometer/i, "thermometer"],
  [/oximeter/i, "oximeter"],
  [/stethoscope/i, "stethoscope"],
  [/x-?ray|sensor|phosphor|radiograph/i, "radiology"],
  [/commode|bedpan|urinal|patient/i, "hospital"],
  [/brace|splint|collar|sling|support|compression|stabiliz/i, "orthopedic"],
  [/chair|operatory|stool|cuspidor/i, "dentist"],
  [/table|plinth|traction/i, "massage"],
  [/band|resistance|balance|putty|pulley|pedal|stability|\bball\b/i, "fitness"],
  [/massage|roller|cupping|percussion/i, "massage"],
  [/tens|ems|stimulator|electrode|interferential|microcurrent/i, "physiotherapy"],
  [/paraffin|cryo|\bice\b|cold pack|hot pack/i, "ice"],
  [/whiten|bleach/i, "teeth"],
  [/implant|abutment/i, "implant"],
  [/bracket|arch wire|molar band|ligature|ortho/i, "braces"],
  [/clipper|grooming|slicker|nail trimmer/i, "grooming"],
  [/ecg|holter|defibrillator|telemetry|electrode/i, "cardiology"],
  [/bandage|dressing|gauze|suture|wound/i, "bandage"],
  [/first aid|emergency|tourniquet|trauma/i, "ambulance"],
];

/** Resolve the best single keyword for a product from its base name and category. */
export function keywordFor(base: string, categoryId: string, industryId?: string): string {
  for (const [re, kw] of BASE_RULES) if (re.test(base)) return kw;
  return (
    CATEGORY_KEYWORDS[categoryId] ??
    (industryId ? INDUSTRY_KEYWORDS[industryId] : undefined) ??
    "medical"
  );
}

/**
 * Deterministic LoremFlickr URL for a product photo.
 * Pass the product's unique `seq` as `lock` so every SKU gets a distinct,
 * stable photo from the keyword's pool — same image on every render/reload.
 */
export function productImageUrl(keyword: string, lock: number, size = 600): string {
  const kw = keyword
    .toLowerCase()
    .replace(/[^a-z,]+/g, ",")
    .replace(/,+/g, ",")
    .replace(/(^,|,$)/g, "");
  return `https://loremflickr.com/${size}/${size}/${kw}?lock=${lock}`;
}
