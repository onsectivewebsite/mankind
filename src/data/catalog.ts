import type { Category, Product } from "@/lib/types";

/* ============================================================
   Categories
   ============================================================ */
export const CATEGORIES: Category[] = [
  { id: "instruments", name: "Dental Instruments", slug: "instruments", icon: "tool", blurb: "Mirrors, explorers, forceps, scalers & more" },
  { id: "consumables", name: "Consumables", slug: "consumables", icon: "package", blurb: "Gloves, masks, gauze, bibs & daily essentials" },
  { id: "restorative", name: "Restorative Materials", slug: "restorative", icon: "layers", blurb: "Composites, bonding agents, cements & matrices" },
  { id: "endodontics", name: "Endodontics", slug: "endodontics", icon: "git-branch", blurb: "Files, gutta-percha, sealers & rotary systems" },
  { id: "orthodontics", name: "Orthodontics", slug: "orthodontics", icon: "align-center", blurb: "Brackets, arch wires, bands & elastics" },
  { id: "sterilization", name: "Sterilization & Infection Control", slug: "sterilization", icon: "shield-check", blurb: "Autoclaves, pouches & surface disinfectants" },
  { id: "imaging", name: "Imaging & X-Ray", slug: "imaging", icon: "scan", blurb: "Sensors, films, phosphor plates & accessories" },
  { id: "equipment", name: "Equipment", slug: "equipment", icon: "armchair", blurb: "Chairs, units, handpieces, curing lights" },
  { id: "impression", name: "Impression Materials", slug: "impression", icon: "fingerprint", blurb: "Alginate, PVS, trays & bite registration" },
  { id: "preventive", name: "Preventive", slug: "preventive", icon: "sparkles", blurb: "Fluoride, sealants, prophy paste & polishing" },
  { id: "surgical", name: "Oral Surgery", slug: "surgical", icon: "scissors", blurb: "Sutures, blades, bone grafts & membranes" },
  { id: "implants", name: "Implants", slug: "implants", icon: "anchor", blurb: "Implant kits, abutments & healing caps" },
  { id: "whitening", name: "Whitening", slug: "whitening", icon: "sun", blurb: "Gels, trays, lamps & take-home kits" },
  { id: "lab", name: "Lab & CAD/CAM", slug: "lab", icon: "box", blurb: "Zirconia blocks, milling burs & articulators" },
  { id: "burs", name: "Burs & Rotary", slug: "burs", icon: "circle-dot", blurb: "Diamond burs, carbide burs & polishers" },
  { id: "ppe", name: "PPE & Apparel", slug: "ppe", icon: "hard-hat", blurb: "Gowns, face shields, scrubs & caps" },
];

export const BRANDS = [
  "MankindPro",
  "DentMax",
  "OroTech",
  "VitalDent",
  "ClearLine",
  "ApexMed",
  "PureSeal",
  "FlexiCore",
  "SteriPro",
  "NovaDent",
  "ToothGuard",
  "ProClinic",
] as const;

/* ============================================================
   Per-category catalogue blueprints
   bases × variants × brand rotation  →  1000+ SKUs
   ============================================================ */
type Blueprint = {
  cat: string;
  unit: string;
  priceRange: [number, number];
  bases: string[];
  variants: string[];
  specKeys: [string, string][]; // [label, sampleA|sampleB|...]
};

const BLUEPRINTS: Blueprint[] = [
  {
    cat: "instruments", unit: "each", priceRange: [9, 89],
    bases: ["Mouth Mirror", "Dental Explorer", "Periodontal Probe", "College Tweezers", "Sickle Scaler", "Gracey Curette", "Extraction Forceps", "Periosteal Elevator", "Amalgam Carrier", "Composite Instrument", "Cement Spatula", "Crown Remover", "Elevator Straight", "Root Tip Pick"],
    variants: ["Standard", "#23", "#5", "Premium Satin", "Cone Socket", "Ergo Grip", "Mini Head", "Anterior", "Posterior", "Titanium-Coated"],
    specKeys: [["Material", "Surgical Steel|Titanium|Stainless 420"], ["Handle", "Hollow|Solid|Silicone Grip"], ["Sterilizable", "Yes, autoclavable 134°C"]],
  },
  {
    cat: "consumables", unit: "box of 100", priceRange: [4, 39],
    bases: ["Nitrile Exam Gloves", "Latex Gloves", "Earloop Face Masks", "Cotton Rolls", "Gauze Sponges", "Patient Bibs", "Saliva Ejectors", "Surface Wipes", "Micro Applicators", "Tray Covers", "Barrier Film", "Air-Water Tips"],
    variants: ["Small", "Medium", "Large", "X-Large", "Blue", "Lavender", "2-Ply", "3-Ply", "Non-Sterile", "Powder-Free"],
    specKeys: [["Quantity", "100/box|50/pack|2000/case"], ["Compliance", "ASTM D6319"], ["Type", "Single-use disposable"]],
  },
  {
    cat: "restorative", unit: "syringe", priceRange: [19, 159],
    bases: ["Nano-Hybrid Composite", "Flowable Composite", "Universal Bonding Agent", "Glass Ionomer Cement", "Resin Cement", "Cavity Liner", "Etchant Gel 37%", "Sectional Matrix Kit", "Core Build-Up Material", "Temporary Cement", "Pit & Fissure Sealant"],
    variants: ["Shade A1", "Shade A2", "Shade A3", "Shade B1", "Shade OA2", "Refill", "Intro Kit", "Light-Cure", "Dual-Cure", "Bulk-Fill"],
    specKeys: [["Cure", "Light-cure|Dual-cure|Self-cure"], ["Volume", "4g|2.5ml|5ml"], ["Radiopaque", "Yes"]],
  },
  {
    cat: "endodontics", unit: "pack of 6", priceRange: [12, 199],
    bases: ["Rotary NiTi Files", "Hand K-Files", "Gutta-Percha Points", "Paper Points", "Root Canal Sealer", "Apex Locator Tips", "Obturation Pellets", "Irrigation Needles", "EDTA Solution", "Endo Motor Files"],
    variants: ["Size 15", "Size 20", "Size 25", "Size 04 Taper", "Size 06 Taper", "Assorted", "21mm", "25mm", "31mm", "Sterile"],
    specKeys: [["Length", "21mm|25mm|31mm"], ["Taper", ".04|.06|.02"], ["Material", "NiTi|Stainless Steel"]],
  },
  {
    cat: "orthodontics", unit: "pack", priceRange: [14, 249],
    bases: ["Metal Brackets Kit", "Ceramic Brackets", "NiTi Arch Wire", "Stainless Arch Wire", "Molar Bands", "Elastomeric Ligatures", "Power Chain", "Ortho Buccal Tubes", "Bonding Adhesive", "Inter-Arch Elastics"],
    variants: ["Roth .022", "MBT .018", "Upper", "Lower", "Round 016", "Rect 019x025", "Clear", "Assorted Colors", "Pack of 10", "Pack of 50"],
    specKeys: [["Slot", ".022|.018"], ["Prescription", "Roth|MBT|Damon"], ["Pack", "10/pk|50/pk"]],
  },
  {
    cat: "sterilization", unit: "each", priceRange: [9, 4900],
    bases: ["Class B Autoclave", "Sterilization Pouches", "Chemical Indicator Strips", "Biological Indicators", "Ultrasonic Cleaner", "Instrument Cassette", "Surface Disinfectant", "Enzymatic Cleaner", "Hand Sanitizer Gel", "Distilled Water Unit"],
    variants: ["18L", "23L", "90x230mm", "200/box", "1L Spray", "5L Refill", "Small", "Medium", "Large", "Digital"],
    specKeys: [["Standard", "EN13060|ISO 11140"], ["Capacity", "18L|23L|1L"], ["Cycle", "B-class vacuum"]],
  },
  {
    cat: "imaging", unit: "each", priceRange: [29, 7900],
    bases: ["Intraoral Sensor", "Phosphor Plate", "X-Ray Film", "Sensor Holder Kit", "Lead Apron", "Pano Phosphor Plate", "Bite Wing Tabs", "Film Mounts", "Processing Solution", "Sensor Sleeves"],
    variants: ["Size 0", "Size 1", "Size 2", "Adult", "Child", "USB", "Wireless", "100/box", "Refill", "Thyroid Collar"],
    specKeys: [["Resolution", "20+ lp/mm"], ["Size", "0|1|2"], ["Connection", "USB|Wireless"]],
  },
  {
    cat: "equipment", unit: "each", priceRange: [89, 14900],
    bases: ["High-Speed Handpiece", "Low-Speed Handpiece", "LED Curing Light", "Ultrasonic Scaler", "Dental Chair Unit", "Air Compressor", "Suction Unit", "Amalgamator", "Apex Locator", "Electric Micromotor", "Intraoral Camera", "Operating Light LED"],
    variants: ["Push-Button", "Fiber-Optic", "Cordless", "Standard", "Premium", "4-Hole", "2-Hole", "Wireless", "Oil-Free", "Touch Panel"],
    specKeys: [["Speed", "Up to 400,000 rpm"], ["Warranty", "1 Year|2 Years"], ["Power", "Mains|Rechargeable"]],
  },
  {
    cat: "impression", unit: "pack", priceRange: [11, 129],
    bases: ["Alginate Impression Powder", "PVS Light Body", "PVS Heavy Body", "Bite Registration Paste", "Impression Trays Metal", "Impression Trays Plastic", "Tray Adhesive", "Wax Bite Sheets", "Putty Soft Set", "Monophase Impression"],
    variants: ["Fast Set", "Regular Set", "Mint", "Cartridge 50ml", "Bulk 500g", "Upper", "Lower", "Assorted", "Refill", "Intro Kit"],
    specKeys: [["Set Time", "Fast|Regular"], ["Volume", "50ml|500g"], ["Type", "VPS|Alginate"]],
  },
  {
    cat: "preventive", unit: "each", priceRange: [6, 79],
    bases: ["Fluoride Varnish", "Prophy Paste Cups", "Prophy Angles", "Pit & Fissure Sealant", "Topical Fluoride Gel", "Disclosing Tablets", "Polishing Strips", "Dental Floss Bulk", "Fluoride Foam", "Remineralizing Paste"],
    variants: ["Mint", "Bubblegum", "Coarse", "Medium", "Fine", "5% NaF", "Unit Dose", "100/box", "Refill", "Cherry"],
    specKeys: [["Flavor", "Mint|Bubblegum|Cherry"], ["Grit", "Coarse|Medium|Fine"], ["Fluoride", "5% NaF|1.23% APF"]],
  },
  {
    cat: "surgical", unit: "pack", priceRange: [9, 299],
    bases: ["Surgical Sutures", "Scalpel Blades", "Scalpel Handle", "Bone Graft Granules", "Collagen Membrane", "Surgical Aspirator Tips", "Hemostatic Gauze", "Suture Removal Kit", "Bone Scraper", "Tissue Punch"],
    variants: ["3-0", "4-0", "5-0", "#11", "#15", "0.5cc", "1.0cc", "Resorbable", "Non-Resorbable", "Sterile"],
    specKeys: [["Gauge", "3-0|4-0|5-0"], ["Type", "Resorbable|Non-resorbable"], ["Sterile", "Yes, single-use"]],
  },
  {
    cat: "implants", unit: "each", priceRange: [49, 499],
    bases: ["Titanium Implant Fixture", "Healing Abutment", "Cover Screw", "Straight Abutment", "Angled Abutment", "Impression Coping", "Implant Analog", "Surgical Drill Kit", "Torque Wrench", "Implant Scan Body"],
    variants: ["Ø3.5", "Ø4.0", "Ø4.5", "8mm", "10mm", "12mm", "Internal Hex", "Conical", "Regular", "Wide"],
    specKeys: [["Diameter", "3.5mm|4.0mm|4.5mm"], ["Length", "8|10|12mm"], ["Connection", "Internal Hex|Conical"]],
  },
  {
    cat: "whitening", unit: "kit", priceRange: [14, 399],
    bases: ["Take-Home Whitening Gel", "In-Office Whitening Kit", "Whitening Trays", "LED Whitening Lamp", "Desensitizing Gel", "Whitening Pen", "Gingival Barrier", "Carbamide Peroxide Gel", "Hydrogen Peroxide Gel", "Whitening Strips Pro"],
    variants: ["10%", "16%", "22%", "35%", "Mint", "4-Syringe", "Single", "Patient Kit", "Refill", "Cool Light"],
    specKeys: [["Concentration", "10%|16%|22%|35%"], ["Type", "Carbamide|Hydrogen Peroxide"], ["Flavor", "Mint|Neutral"]],
  },
  {
    cat: "lab", unit: "each", priceRange: [19, 899],
    bases: ["Zirconia Block", "PMMA Disc", "Milling Bur Set", "Articulator", "Model Plaster", "Wax-Up Kit", "Sintering Crucible", "Polishing Kit Lab", "Die Stone", "CAD/CAM Wax Disc"],
    variants: ["98mm", "71mm", "Type IV", "Multilayer", "Shade A2", "HT", "ST", "Semi-Adjustable", "Fine", "Coarse"],
    specKeys: [["Diameter", "98mm|71mm"], ["Material", "Zirconia|PMMA|Wax"], ["Translucency", "HT|ST|Multilayer"]],
  },
  {
    cat: "burs", unit: "pack of 5", priceRange: [7, 69],
    bases: ["Diamond Bur Round", "Diamond Bur Flat-End", "Diamond Bur Tapered", "Carbide Bur Round", "Carbide Bur Fissure", "Surgical Length Bur", "Composite Polisher", "Zirconia Bur", "Trimming Bur", "Endo-Z Bur"],
    variants: ["Coarse", "Medium", "Fine", "Extra-Fine", "FG", "RA", "Short Shank", "Long Shank", "Football", "Wheel"],
    specKeys: [["Shank", "FG|RA|HP"], ["Grit", "Coarse|Medium|Fine"], ["Pack", "5/pk|10/pk"]],
  },
  {
    cat: "ppe", unit: "pack", priceRange: [5, 89],
    bases: ["Isolation Gowns", "Face Shields", "Surgical Caps", "Shoe Covers", "Scrub Tops", "Scrub Pants", "Protective Eyewear", "N95 Respirators", "Lab Coats", "Reusable Goggles"],
    variants: ["Level 1", "Level 2", "Level 3", "Small", "Medium", "Large", "X-Large", "Blue", "Anti-Fog", "10/pack"],
    specKeys: [["Level", "AAMI Level 1|2|3"], ["Size", "S|M|L|XL"], ["Reusable", "Single-use|Reusable"]],
  },
];

/* ----- deterministic pseudo-random helpers (stable across SSR/CSR) ----- */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
const pick = <T,>(arr: T[], seed: number) => arr[Math.floor(seed * arr.length) % arr.length];
const round99 = (n: number) => Math.max(1, Math.round(n) - 0.01 + 0.0); // -> .99 endings

function buildCatalog(): Product[] {
  const products: Product[] = [];
  let seq = 0;

  for (const bp of BLUEPRINTS) {
    for (let b = 0; b < bp.bases.length; b++) {
      const base = bp.bases[b];
      for (let v = 0; v < bp.variants.length; v++) {
        const variant = bp.variants[v];
        seq++;
        const idNum = String(seq).padStart(5, "0");
        const id = `mk-${idNum}`;
        const seed = hash(id);
        const seed2 = hash(id + "x");
        const seed3 = hash(id + "y");

        const brand = pick([...BRANDS], seed);
        const [lo, hi] = bp.priceRange;
        const rawMrp = lo + seed2 * (hi - lo);
        const mrp = round99(rawMrp);
        // ~45% of items carry a built-in saving
        const hasDeal = seed3 > 0.55;
        const price = hasDeal ? round99(rawMrp * (0.7 + seed * 0.18)) : mrp;

        const name = `${brand} ${base} — ${variant}`;
        const specs: Record<string, string> = {};
        for (const [label, sample] of bp.specKeys) {
          const opts = sample.split("|");
          specs[label] = opts.length > 1 ? pick(opts, hash(id + label)) : opts[0];
        }
        specs["Brand"] = brand;
        specs["SKU"] = `${bp.cat.slice(0, 3).toUpperCase()}-${idNum}`;

        products.push({
          id,
          sku: `${bp.cat.slice(0, 3).toUpperCase()}-${idNum}`,
          name,
          slug: `${base}-${variant}-${idNum}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          categoryId: bp.cat,
          brand,
          mrp,
          price,
          unit: bp.unit,
          rating: Math.round((3.6 + seed2 * 1.4) * 10) / 10,
          reviews: Math.floor(seed3 * 480) + 3,
          stock: seed > 0.08 ? Math.floor(seed2 * 240) + 4 : 0,
          tags: [variant, bp.cat],
          bestSeller: seed > 0.86,
          isNew: seed3 > 0.9,
          description: `Professional-grade ${base.toLowerCase()} (${variant}) from ${brand}. Engineered for dental clinics and labs to clinical standards, with reliable performance and consistent quality. Supplied by Mankind Healthcare with fast Canada-wide dispatch.`,
          specs,
          seq,
        });
      }
    }
  }
  return products;
}

export const PRODUCTS: Product[] = buildCatalog();
export const PRODUCT_COUNT = PRODUCTS.length;

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
