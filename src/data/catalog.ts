import type { Category, Industry, IndustryId, Product } from "@/lib/types";
import { INDUSTRY_PHOTO } from "@/lib/img";

/* ============================================================
   Industries — Mankind is a one-stop supplier across all three
   ============================================================ */
export const INDUSTRIES: Industry[] = [
  {
    id: "dental",
    name: "Dental",
    label: "Dental",
    tagline: "Chairside to operatory",
    blurb: "Instruments, consumables, restorative materials, imaging and full operatory equipment for modern dental practices.",
    icon: "smile",
    image: INDUSTRY_PHOTO.dental,
  },
  {
    id: "medical",
    name: "Medical",
    label: "Medical",
    tagline: "Clinic & hospital ready",
    blurb: "Diagnostics, surgical instruments, wound care, PPE, mobility and patient-care essentials for clinics and hospitals.",
    icon: "heart-pulse",
    image: INDUSTRY_PHOTO.medical,
  },
  {
    id: "veterinary",
    name: "Veterinary",
    label: "Veterinary",
    tagline: "Companion to large animal",
    blurb: "Veterinary instruments, diagnostics, anaesthesia, dental and consumables for companion and large-animal practice.",
    icon: "paw-print",
    image: INDUSTRY_PHOTO.veterinary,
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    label: "Physiotherapy",
    tagline: "Rehab & recovery",
    blurb: "Electrotherapy, therapeutic ultrasound, shockwave, treatment tables, supports and rehab tools for physiotherapy and recovery clinics.",
    icon: "activity",
    image: INDUSTRY_PHOTO.physiotherapy,
  },
];

export const industryById = (id: string) => INDUSTRIES.find((i) => i.id === id);

/* ============================================================
   Categories (tagged by industry)
   ============================================================ */
export const CATEGORIES: Category[] = [
  // ---- Dental ----
  { id: "instruments", name: "Dental Instruments", slug: "instruments", industry: "dental", icon: "tool", blurb: "Mirrors, explorers, forceps, scalers & more" },
  { id: "consumables", name: "Dental Consumables", slug: "consumables", industry: "dental", icon: "package", blurb: "Gloves, gauze, bibs & daily essentials" },
  { id: "restorative", name: "Restorative Materials", slug: "restorative", industry: "dental", icon: "layers", blurb: "Composites, bonding agents & cements" },
  { id: "endodontics", name: "Endodontics", slug: "endodontics", industry: "dental", icon: "git-branch", blurb: "Files, gutta-percha & rotary systems" },
  { id: "orthodontics", name: "Orthodontics", slug: "orthodontics", industry: "dental", icon: "align-center", blurb: "Brackets, arch wires, bands & elastics" },
  { id: "sterilization", name: "Dental Sterilization", slug: "sterilization", industry: "dental", icon: "shield-check", blurb: "Autoclaves, pouches & disinfectants" },
  { id: "imaging", name: "Dental Imaging & X-Ray", slug: "imaging", industry: "dental", icon: "scan", blurb: "Sensors, films & phosphor plates" },
  { id: "equipment", name: "Dental Equipment", slug: "equipment", industry: "dental", icon: "armchair", blurb: "Chairs, units, handpieces & curing lights" },
  { id: "impression", name: "Impression Materials", slug: "impression", industry: "dental", icon: "fingerprint", blurb: "Alginate, PVS, trays & bite registration" },
  { id: "preventive", name: "Preventive", slug: "preventive", industry: "dental", icon: "sparkles", blurb: "Fluoride, sealants & prophy paste" },
  { id: "surgical", name: "Oral Surgery", slug: "oral-surgery", industry: "dental", icon: "scissors", blurb: "Sutures, blades, bone grafts & membranes" },
  { id: "implants", name: "Dental Implants", slug: "implants", industry: "dental", icon: "anchor", blurb: "Implant kits, abutments & healing caps" },
  { id: "whitening", name: "Whitening", slug: "whitening", industry: "dental", icon: "sun", blurb: "Gels, trays, lamps & take-home kits" },
  { id: "lab", name: "Dental Lab & CAD/CAM", slug: "lab", industry: "dental", icon: "box", blurb: "Zirconia blocks, milling burs & articulators" },
  { id: "burs", name: "Burs & Rotary", slug: "burs", industry: "dental", icon: "circle-dot", blurb: "Diamond burs, carbide burs & polishers" },
  { id: "ppe", name: "Dental PPE & Apparel", slug: "ppe", industry: "dental", icon: "hard-hat", blurb: "Gowns, face shields, scrubs & caps" },

  // ---- Medical ----
  { id: "med-diagnostics", name: "Diagnostics & Monitoring", slug: "diagnostics", industry: "medical", icon: "stethoscope", blurb: "BP monitors, oximeters, thermometers" },
  { id: "med-consumables", name: "Medical Consumables", slug: "medical-consumables", industry: "medical", icon: "syringe", blurb: "Syringes, needles, IV sets & dressings" },
  { id: "med-surgical", name: "Surgical Instruments", slug: "surgical-instruments", industry: "medical", icon: "scissors", blurb: "Scalpels, forceps, scissors & retractors" },
  { id: "med-ppe", name: "Exam & PPE", slug: "exam-ppe", industry: "medical", icon: "shield-check", blurb: "Gloves, gowns, masks & face shields" },
  { id: "med-wound", name: "Wound Care & Dressings", slug: "wound-care", industry: "medical", icon: "bandage", blurb: "Dressings, sutures & antiseptics" },
  { id: "med-mobility", name: "Mobility & Patient Care", slug: "mobility", industry: "medical", icon: "accessibility", blurb: "Wheelchairs, walkers & supports" },
  { id: "med-respiratory", name: "Respiratory Care", slug: "respiratory", industry: "medical", icon: "wind", blurb: "Nebulizers, oxygen & airway" },
  { id: "med-emergency", name: "Emergency & First Aid", slug: "emergency", industry: "medical", icon: "siren", blurb: "First-aid kits, splints & trauma" },
  { id: "med-ortho", name: "Orthopedic Supports", slug: "orthopedic", industry: "medical", icon: "bone", blurb: "Braces, splints & compression" },
  { id: "med-infusion", name: "IV & Infusion", slug: "infusion", industry: "medical", icon: "droplets", blurb: "IV cannulas, sets & infusion" },
  { id: "med-lab", name: "Lab & Diagnostics", slug: "lab-diagnostics", industry: "medical", icon: "flask-conical", blurb: "Test strips, tubes & analyzers" },
  { id: "med-sterilization", name: "Sterilization", slug: "medical-sterilization", industry: "medical", icon: "shield-check", blurb: "Autoclaves, pouches & indicators" },
  { id: "med-aesthetic", name: "Aesthetic Supplies", slug: "aesthetic", industry: "medical", icon: "sparkles", blurb: "Cannulas, fillers, microneedling & PRP" },
  { id: "med-nursing", name: "Nursing & Patient Care", slug: "nursing", industry: "medical", icon: "bed", blurb: "Gowns, bed pans, pads & home care" },
  { id: "med-cardiology", name: "Cardiology", slug: "cardiology", industry: "medical", icon: "heart-pulse", blurb: "ECG, electrodes, monitoring & leads" },

  // ---- Veterinary ----
  { id: "vet-instruments", name: "Veterinary Instruments", slug: "vet-instruments", industry: "veterinary", icon: "tool", blurb: "Surgical kits, forceps & scissors" },
  { id: "vet-diagnostics", name: "Animal Diagnostics", slug: "animal-diagnostics", industry: "veterinary", icon: "activity", blurb: "Vet thermometers, stethoscopes & monitors" },
  { id: "vet-consumables", name: "Veterinary Consumables", slug: "vet-consumables", industry: "veterinary", icon: "package", blurb: "Syringes, gloves & bandages" },
  { id: "vet-surgical", name: "Vet Surgical & Wound", slug: "vet-surgical", industry: "veterinary", icon: "scissors", blurb: "Sutures, blades & wound care" },
  { id: "vet-dental", name: "Veterinary Dental", slug: "veterinary-dental", industry: "veterinary", icon: "sparkles", blurb: "Animal scalers, elevators & polishers" },
  { id: "vet-anesthesia", name: "Anaesthesia & Monitoring", slug: "anaesthesia", industry: "veterinary", icon: "gauge", blurb: "Circuits, masks & monitoring" },
  { id: "vet-grooming", name: "Grooming & Restraint", slug: "grooming", industry: "veterinary", icon: "bath", blurb: "Clippers, tables & restraint" },
  { id: "vet-pharmacy", name: "Vet Pharmacy Supplies", slug: "vet-pharmacy", industry: "veterinary", icon: "pill", blurb: "Dosing, vials & dispensing" },
  { id: "vet-largeanimal", name: "Large Animal & Livestock", slug: "large-animal", industry: "veterinary", icon: "tractor", blurb: "Equine & livestock essentials" },
  { id: "vet-imaging", name: "Veterinary Imaging", slug: "vet-imaging", industry: "veterinary", icon: "scan", blurb: "Sensors, plates & accessories" },

  // ---- Physiotherapy ----
  { id: "physio-electro", name: "Electrotherapy & TENS", slug: "electrotherapy", industry: "physiotherapy", icon: "zap", blurb: "TENS, EMS, IFT & electrode supplies" },
  { id: "physio-ultrasound", name: "Ultrasound Therapy", slug: "ultrasound-therapy", industry: "physiotherapy", icon: "audio-waveform", blurb: "Therapeutic ultrasound & combo units" },
  { id: "physio-exercise", name: "Exercise & Rehab", slug: "exercise-rehab", industry: "physiotherapy", icon: "dumbbell", blurb: "Bands, balls, balance & hand therapy" },
  { id: "physio-hotcold", name: "Hot & Cold Therapy", slug: "hot-cold", industry: "physiotherapy", icon: "snowflake", blurb: "Hot packs, cold packs & paraffin" },
  { id: "physio-tables", name: "Treatment Tables", slug: "treatment-tables", industry: "physiotherapy", icon: "bed", blurb: "Plinths, traction & massage tables" },
  { id: "physio-shockwave", name: "Laser & Shockwave", slug: "laser-shockwave", industry: "physiotherapy", icon: "waves", blurb: "Shockwave & laser therapy systems" },
  { id: "physio-supports", name: "Supports & Bracing", slug: "supports-bracing", industry: "physiotherapy", icon: "bandage", blurb: "Braces, taping & compression" },
  { id: "physio-massage", name: "Massage & Manual", slug: "massage-manual", industry: "physiotherapy", icon: "hand", blurb: "Massage guns, rollers & cupping" },
];

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
export const categoriesByIndustry = (industry: IndustryId) =>
  CATEGORIES.filter((c) => c.industry === industry);

// House brand — Mankind Healthcare's own line.
export const BRANDS = ["Mankind"] as const;

/* ============================================================
   Live catalogue — real Mankind Healthcare products.
   Each row: [name, categoryId, price (CAD), image].
   `name` "D2D" tokens are shown under the Mankind house brand.
   ============================================================ */
type Raw = [name: string, cat: string, price: number, image: string];

const RAW: Raw[] = [
  ["D2D Curved Tip Syringe 12ml", "consumables", 27.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_15_533x.png?v=1770672679"],
  ["D2D PLUS Dental Bibs", "consumables", 39.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_6_0eae8712-c6fd-4ce8-ad54-5870a73c3bba_533x.png?v=1653358700"],
  ["MARK3 Topical Anesthetic Gel - Topicare", "surgical", 10.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign-2023-04-21T171016.661_533x.png?v=1682147132"],
  ["Protective Face Shield", "ppe", 49.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/image_533x.jpg?v=1642770419"],
  ["D2D Plastic Tray Sleeve", "consumables", 25.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_24_40c23f54-c83b-43c8-bd19-c2a951b522f3_533x.png?v=1653358593"],
  ["D2D CSR Sterilization Wrap", "sterilization", 69.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_14_533x.png?v=1653358614"],
  ["D2D Dry Angle Cotton Roll Substitute", "consumables", 9.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_17_533x.png?v=1653358635"],
  ["D2D Retainer Boxes - Assorted Colors", "orthodontics", 11.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_25_0a4216df-e3b7-443f-a4fe-1f1033cbe5e1_533x.png?v=1653358597"],
  ["D2D PLUS Gauze 2x2 (40gsm)", "consumables", 39.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_36_cfcb7f82-af12-4933-8fec-dc2ef1634ec5_533x.png?v=1653358559"],
  ["Medicom® SafeMask Premier Elite Earloop Mask Level 3 - PINK", "ppe", 24.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_13_533x.png?v=1653358501"],
  ["D2D SafeFit Premium Surgical Masks - ASTM Level 3", "ppe", 12.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Screenshot2026-04-02at12.10.48PM_533x.png?v=1775146261"],
  ["Monoject™ 401 Dental Needle Metal Hub (100 Pieces)", "consumables", 20.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_27_e9442c09-634a-4310-bc62-84818c53c69d_533x.png?v=1653358756"],
  ["D2D PLUS Gauze 4x4 (40gsm)", "consumables", 49.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/31t8mvbtTdL_533x.jpg?v=1653358561"],
  ["Medicom® SafeBasics Earloop Level 3 Mask - BLUE", "ppe", 69.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_13_8038c22a-1d45-44a8-8267-e65f6158aadb_533x.png?v=1653358589"],
  ["Medicom® DentiCare Pro-Polish Prophylaxis Paste", "preventive", 30.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign-2022-12-02T153627.797_533x.png?v=1713216907"],
  ["D2D SafeFit Thin Nitrile Gloves", "consumables", 159.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Untitleddesign_55_533x.png?v=1765925293"],
  ["CaviWipes Surface Disinfectant - CASE (12 Canisters)", "sterilization", 229.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_68_533x.png?v=1653358527"],
  ["Aurelia Transform™ Nitrile Gloves", "consumables", 11.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/900-9889A6__73207.1607925564_533x.jpg?v=1653358654"],
  ["D2D Air Water Syringe Cover", "consumables", 9.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/29-051_1_533x.jpg?v=1653358367"],
  ["D2D Autoclave Tape", "sterilization", 5.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/U21f5dabbab684000b87d985374c781bcc_533x.jpg?v=1653358616"],
  ["Aurelia Absolute® 100 Black Nitrile Gloves", "consumables", 11.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_88_b70258c5-1ba6-41b1-8a77-95fb4a2651b5_533x.png?v=1665213024"],
  ["D2D Mixing Wells", "restorative", 22.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_4_c8062312-3814-4a42-9095-5fbe250f8c0e_533x.png?v=1653358698"],
  ["Halyard Aquasoft Nitrile Gloves", "consumables", 199.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/KC43932__96249_533x.jpg?v=1717807432"],
  ["Aurelia Self Sealing Sterilization Pouches", "sterilization", 5.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Untitleddesign-2024-03-23T154224.020_533x.png?v=1711226548"],
  ["D2D Mixing Tip - Temporary Crown and Bridge Material 10:1", "restorative", 29.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/719203_533x.jpg?v=1653358612"],
  ["D2D Plastic Headrest Cover", "consumables", 16.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/1126527_01_WCOM_600x600_f1ea1727-41bb-490f-8413-bda7784d054b_533x.jpg?v=1653358591"],
  ["Medicom® SafeMask SofSkin Earloop Mask", "ppe", 24.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/JPG_902913_533x.jpg?v=1653358509"],
  ["D2D Biological Indicator for Steam Sterilization - 24 Hour", "sterilization", 109.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Untitleddesign-2024-06-17T211310.719_533x.png?v=1718673206"],
  ["D2D Disposable Shoe Covers - CASE (1,000 pieces)", "ppe", 89.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_31_533x.png?v=1653358440"],
  ["D2D Denture Boxes - Assorted Colors", "lab", 12.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_15_7802a0fd-5aee-446d-91fd-5a72af321617_533x.png?v=1653358598"],
  ["D2D Intra-oral Tips for Yellow Mixing Tip", "restorative", 11.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/download_bfde94ff-06d0-480d-a9aa-ddceac2854a1_533x.jpg?v=1653358632"],
  ["D2D Bib Clips - Silicone/Metal Clips", "consumables", 4.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_42_533x.png?v=1653358490"],
  ["Aurelia Blush® Pink Nitrile Gloves", "consumables", 22.75, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Untitleddesign-2023-09-17T220452.759_533x.png?v=1695002710"],
  ["Halyard Lavender Nitrile Gloves", "consumables", 179.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/files/Untitleddesign-2024-06-07T205808.471_533x.png?v=1717808295"],
  ["Monoject™ 400 Dental Needle Plastic Hub (100 Pieces)", "consumables", 20.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_27_e9bf7e2c-cf9e-494f-8d90-6a1624b67a27_533x.png?v=1653358668"],
  ["SS White® Revelation Diamond Burs", "burs", 79.99, "https://cdn.shopify.com/s/files/1/0422/9981/8139/products/Untitleddesign_73_533x.png?v=1664029693"],
];

/* deterministic helper (stable across SSR/CSR) */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildCatalog(): Product[] {
  return RAW.map(([rawName, cat, price, image], i) => {
    const idNum = String(i + 1).padStart(3, "0");
    const id = `mk-${idNum}`;
    const seed = hash(id);
    const seed2 = hash(id + "x");
    const seed3 = hash(id + "y");

    // "D2D" products are Mankind's own house brand.
    const name = rawName.replace(/\bD2D\b/g, "Mankind");
    const brand = "Mankind";
    const category = categoryById(cat);
    const unit = /\bcase\b/i.test(rawName)
      ? "case"
      : /roll|tape/i.test(rawName)
        ? "roll"
        : /paste|gel/i.test(rawName)
          ? "each"
          : "pack";

    return {
      id,
      sku: `MK-${idNum}`,
      name,
      slug: `${slugify(name)}-${idNum}`,
      categoryId: cat,
      industryId: "dental",
      brand,
      mrp: price,
      price,
      unit,
      image,
      rating: Math.round((3.9 + seed * 1.1) * 10) / 10,
      reviews: Math.floor(seed3 * 280) + 6,
      stock: seed2 > 0.05 ? Math.floor(seed2 * 180) + 12 : 0,
      tags: [cat],
      bestSeller: seed > 0.62,
      isNew: seed3 > 0.7,
      description: `${name} — supplied by Mankind Healthcare. Clinic-grade quality for professional dental practices, with competitive trade pricing and fast Canada-wide dispatch.`,
      specs: {
        Brand: brand,
        SKU: `MK-${idNum}`,
        Category: category?.name ?? cat,
      },
      seq: i + 1,
    };
  });
}

export const PRODUCTS: Product[] = buildCatalog();
export const PRODUCT_COUNT = PRODUCTS.length;
