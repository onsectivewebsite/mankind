import type { Category, Industry, IndustryId, Product } from "@/lib/types";
import { INDUSTRY_PHOTO, keywordFor, productImageUrl } from "@/lib/img";

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

// Own-brand only — MCare product lines (no competitor brand names).
export const BRANDS = [
  "MCare",
  "MCare Pro",
  "MCare Elite",
  "MCare Select",
] as const;

/* ============================================================
   Catalogue blueprints  →  bases × variants × brands = SKUs
   ============================================================ */
type Blueprint = {
  cat: string;
  industry: IndustryId;
  unit: string;
  priceRange: [number, number];
  bases: string[];
  variants: string[];
  specKeys: [string, string][];
  /** force a specific MCare line for this blueprint (e.g. lasers → MCare Pro) */
  brand?: string;
};

const DENTAL: Blueprint[] = [
  { cat: "instruments", industry: "dental", unit: "each", priceRange: [9, 89],
    bases: ["Mouth Mirror", "Dental Explorer", "Periodontal Probe", "College Tweezers", "Sickle Scaler", "Gracey Curette", "Extraction Forceps", "Periosteal Elevator", "Amalgam Carrier", "Composite Instrument", "Cement Spatula", "Crown Remover", "Elevator Straight", "Root Tip Pick"],
    variants: ["Standard", "#23", "#5", "Premium Satin", "Cone Socket", "Ergo Grip", "Mini Head", "Anterior", "Posterior", "Titanium-Coated"],
    specKeys: [["Material", "Surgical Steel|Titanium|Stainless 420"], ["Handle", "Hollow|Solid|Silicone Grip"], ["Sterilizable", "Yes, autoclavable 134°C"]] },
  { cat: "consumables", industry: "dental", unit: "box of 100", priceRange: [4, 39],
    bases: ["Nitrile Exam Gloves", "Latex Gloves", "Earloop Face Masks", "Cotton Rolls", "Gauze Sponges", "Patient Bibs", "Saliva Ejectors", "Surface Wipes", "Micro Applicators", "Tray Covers", "Barrier Film", "Air-Water Tips"],
    variants: ["Small", "Medium", "Large", "X-Large", "Blue", "Lavender", "2-Ply", "3-Ply", "Non-Sterile", "Powder-Free"],
    specKeys: [["Quantity", "100/box|50/pack|2000/case"], ["Compliance", "ASTM D6319"], ["Type", "Single-use disposable"]] },
  { cat: "restorative", industry: "dental", unit: "syringe", priceRange: [19, 159],
    bases: ["Nano-Hybrid Composite", "Flowable Composite", "Universal Bonding Agent", "Glass Ionomer Cement", "Resin Cement", "Cavity Liner", "Etchant Gel 37%", "Sectional Matrix Kit", "Core Build-Up Material", "Temporary Cement", "Pit & Fissure Sealant"],
    variants: ["Shade A1", "Shade A2", "Shade A3", "Shade B1", "Shade OA2", "Refill", "Intro Kit", "Light-Cure", "Dual-Cure", "Bulk-Fill"],
    specKeys: [["Cure", "Light-cure|Dual-cure|Self-cure"], ["Volume", "4g|2.5ml|5ml"], ["Radiopaque", "Yes"]] },
  { cat: "endodontics", industry: "dental", unit: "pack of 6", priceRange: [12, 199],
    bases: ["Rotary NiTi Files", "Hand K-Files", "Gutta-Percha Points", "Paper Points", "Root Canal Sealer", "Apex Locator Tips", "Obturation Pellets", "Irrigation Needles", "EDTA Solution", "Endo Motor Files"],
    variants: ["Size 15", "Size 20", "Size 25", "Size 04 Taper", "Size 06 Taper", "Assorted", "21mm", "25mm", "31mm", "Sterile"],
    specKeys: [["Length", "21mm|25mm|31mm"], ["Taper", ".04|.06|.02"], ["Material", "NiTi|Stainless Steel"]] },
  { cat: "orthodontics", industry: "dental", unit: "pack", priceRange: [14, 249],
    bases: ["Metal Brackets Kit", "Ceramic Brackets", "NiTi Arch Wire", "Stainless Arch Wire", "Molar Bands", "Elastomeric Ligatures", "Power Chain", "Buccal Tubes", "Bonding Adhesive", "Inter-Arch Elastics"],
    variants: ["Roth .022", "MBT .018", "Upper", "Lower", "Round 016", "Rect 019x025", "Clear", "Assorted Colors", "Pack of 10", "Pack of 50"],
    specKeys: [["Slot", ".022|.018"], ["Prescription", "Roth|MBT|Damon"], ["Pack", "10/pk|50/pk"]] },
  { cat: "sterilization", industry: "dental", unit: "each", priceRange: [9, 4900],
    bases: ["Class B Autoclave", "Sterilization Pouches", "Chemical Indicator Strips", "Biological Indicators", "Ultrasonic Cleaner", "Instrument Cassette", "Surface Disinfectant", "Enzymatic Cleaner", "Hand Sanitizer Gel", "Distilled Water Unit"],
    variants: ["18L", "23L", "90x230mm", "200/box", "1L Spray", "5L Refill", "Small", "Medium", "Large", "Digital"],
    specKeys: [["Standard", "EN13060|ISO 11140"], ["Capacity", "18L|23L|1L"], ["Cycle", "B-class vacuum"]] },
  { cat: "imaging", industry: "dental", unit: "each", priceRange: [29, 7900],
    bases: ["Intraoral Sensor", "Phosphor Plate", "X-Ray Film", "Sensor Holder Kit", "Lead Apron", "Pano Phosphor Plate", "Bite Wing Tabs", "Film Mounts", "Processing Solution", "Sensor Sleeves"],
    variants: ["Size 0", "Size 1", "Size 2", "Adult", "Child", "USB", "Wireless", "100/box", "Refill", "Thyroid Collar"],
    specKeys: [["Resolution", "20+ lp/mm"], ["Size", "0|1|2"], ["Connection", "USB|Wireless"]] },
  { cat: "equipment", industry: "dental", unit: "each", priceRange: [89, 14900],
    bases: ["High-Speed Handpiece", "Low-Speed Handpiece", "LED Curing Light", "Ultrasonic Scaler", "Dental Chair Unit", "Air Compressor", "Suction Unit", "Amalgamator", "Apex Locator", "Electric Micromotor", "Intraoral Camera", "Operating Light LED"],
    variants: ["Push-Button", "Fiber-Optic", "Cordless", "Standard", "Premium", "4-Hole", "2-Hole", "Wireless", "Oil-Free", "Touch Panel"],
    specKeys: [["Speed", "Up to 400,000 rpm"], ["Warranty", "1 Year|2 Years"], ["Power", "Mains|Rechargeable"]] },
  { cat: "impression", industry: "dental", unit: "pack", priceRange: [11, 129],
    bases: ["Alginate Powder", "PVS Light Body", "PVS Heavy Body", "Bite Registration Paste", "Impression Trays Metal", "Impression Trays Plastic", "Tray Adhesive", "Wax Bite Sheets", "Putty Soft Set", "Monophase Impression"],
    variants: ["Fast Set", "Regular Set", "Mint", "Cartridge 50ml", "Bulk 500g", "Upper", "Lower", "Assorted", "Refill", "Intro Kit"],
    specKeys: [["Set Time", "Fast|Regular"], ["Volume", "50ml|500g"], ["Type", "VPS|Alginate"]] },
  { cat: "preventive", industry: "dental", unit: "each", priceRange: [6, 79],
    bases: ["Fluoride Varnish", "Prophy Paste Cups", "Prophy Angles", "Pit & Fissure Sealant", "Topical Fluoride Gel", "Disclosing Tablets", "Polishing Strips", "Dental Floss Bulk", "Fluoride Foam", "Remineralizing Paste"],
    variants: ["Mint", "Bubblegum", "Coarse", "Medium", "Fine", "5% NaF", "Unit Dose", "100/box", "Refill", "Cherry"],
    specKeys: [["Flavor", "Mint|Bubblegum|Cherry"], ["Grit", "Coarse|Medium|Fine"], ["Fluoride", "5% NaF|1.23% APF"]] },
  { cat: "surgical", industry: "dental", unit: "pack", priceRange: [9, 299],
    bases: ["Surgical Sutures", "Scalpel Blades", "Scalpel Handle", "Bone Graft Granules", "Collagen Membrane", "Aspirator Tips", "Hemostatic Gauze", "Suture Removal Kit", "Bone Scraper", "Tissue Punch"],
    variants: ["3-0", "4-0", "5-0", "#11", "#15", "0.5cc", "1.0cc", "Resorbable", "Non-Resorbable", "Sterile"],
    specKeys: [["Gauge", "3-0|4-0|5-0"], ["Type", "Resorbable|Non-resorbable"], ["Sterile", "Yes, single-use"]] },
  { cat: "implants", industry: "dental", unit: "each", priceRange: [49, 499],
    bases: ["Titanium Implant Fixture", "Healing Abutment", "Cover Screw", "Straight Abutment", "Angled Abutment", "Impression Coping", "Implant Analog", "Surgical Drill Kit", "Torque Wrench", "Implant Scan Body"],
    variants: ["Ø3.5", "Ø4.0", "Ø4.5", "8mm", "10mm", "12mm", "Internal Hex", "Conical", "Regular", "Wide"],
    specKeys: [["Diameter", "3.5mm|4.0mm|4.5mm"], ["Length", "8|10|12mm"], ["Connection", "Internal Hex|Conical"]] },
  { cat: "whitening", industry: "dental", unit: "kit", priceRange: [14, 399],
    bases: ["Take-Home Whitening Gel", "In-Office Whitening Kit", "Whitening Trays", "LED Whitening Lamp", "Desensitizing Gel", "Whitening Pen", "Gingival Barrier", "Carbamide Peroxide Gel", "Hydrogen Peroxide Gel", "Whitening Strips Pro"],
    variants: ["10%", "16%", "22%", "35%", "Mint", "4-Syringe", "Single", "Patient Kit", "Refill", "Cool Light"],
    specKeys: [["Concentration", "10%|16%|22%|35%"], ["Type", "Carbamide|Hydrogen Peroxide"], ["Flavor", "Mint|Neutral"]] },
  { cat: "lab", industry: "dental", unit: "each", priceRange: [19, 899],
    bases: ["Zirconia Block", "PMMA Disc", "Milling Bur Set", "Articulator", "Model Plaster", "Wax-Up Kit", "Sintering Crucible", "Lab Polishing Kit", "Die Stone", "CAD/CAM Wax Disc"],
    variants: ["98mm", "71mm", "Type IV", "Multilayer", "Shade A2", "HT", "ST", "Semi-Adjustable", "Fine", "Coarse"],
    specKeys: [["Diameter", "98mm|71mm"], ["Material", "Zirconia|PMMA|Wax"], ["Translucency", "HT|ST|Multilayer"]] },
  { cat: "burs", industry: "dental", unit: "pack of 5", priceRange: [7, 69],
    bases: ["Diamond Bur Round", "Diamond Bur Flat-End", "Diamond Bur Tapered", "Carbide Bur Round", "Carbide Bur Fissure", "Surgical Length Bur", "Composite Polisher", "Zirconia Bur", "Trimming Bur", "Endo-Z Bur"],
    variants: ["Coarse", "Medium", "Fine", "Extra-Fine", "FG", "RA", "Short Shank", "Long Shank", "Football", "Wheel"],
    specKeys: [["Shank", "FG|RA|HP"], ["Grit", "Coarse|Medium|Fine"], ["Pack", "5/pk|10/pk"]] },
  { cat: "ppe", industry: "dental", unit: "pack", priceRange: [5, 89],
    bases: ["Isolation Gowns", "Face Shields", "Surgical Caps", "Shoe Covers", "Scrub Tops", "Scrub Pants", "Protective Eyewear", "N95 Respirators", "Lab Coats", "Reusable Goggles"],
    variants: ["Level 1", "Level 2", "Level 3", "Small", "Medium", "Large", "X-Large", "Blue", "Anti-Fog", "10/pack"],
    specKeys: [["Level", "AAMI Level 1|2|3"], ["Size", "S|M|L|XL"], ["Reusable", "Single-use|Reusable"]] },
];

const MEDICAL: Blueprint[] = [
  { cat: "med-diagnostics", industry: "medical", unit: "each", priceRange: [12, 899],
    bases: ["Digital BP Monitor", "Pulse Oximeter", "Infrared Thermometer", "Stethoscope", "Otoscope Set", "Diagnostic Penlight", "ECG Electrodes", "Glucometer Kit", "Doppler Fetal Monitor", "Clinical Thermometer"],
    variants: ["Adult", "Pediatric", "Pro", "Fingertip", "Dual-Head", "Rechargeable", "Bluetooth", "Cuff M", "Cuff L", "100/box"],
    specKeys: [["Power", "Battery|Rechargeable|Mains"], ["Accuracy", "±0.2°C|±3 mmHg"], ["Display", "LED|LCD"]] },
  { cat: "med-consumables", industry: "medical", unit: "box of 100", priceRange: [5, 79],
    bases: ["Disposable Syringes", "Hypodermic Needles", "IV Cannula", "Alcohol Swabs", "Cotton Wool Rolls", "Sterile Gauze", "Adhesive Plasters", "Tongue Depressors", "Specimen Containers", "Examination Couch Roll"],
    variants: ["1ml", "5ml", "10ml", "21G", "23G", "Sterile", "Non-Sterile", "100/box", "200/box", "Latex-Free"],
    specKeys: [["Sterile", "Yes, EO sterilized"], ["Quantity", "100/box|200/box"], ["Material", "Medical-grade PP"]] },
  { cat: "med-surgical", industry: "medical", unit: "each", priceRange: [9, 349],
    bases: ["Surgical Scissors", "Tissue Forceps", "Needle Holder", "Artery Forceps", "Retractor Set", "Scalpel Handle", "Sponge Holding Forceps", "Towel Clamp", "Dissecting Kit", "Suture Scissors"],
    variants: ["Mayo", "Metzenbaum", "Straight", "Curved", "Toothed", "Non-Toothed", "12cm", "16cm", "20cm", "Sterile"],
    specKeys: [["Material", "Surgical Stainless Steel"], ["Finish", "Satin|Mirror"], ["Length", "12|16|20 cm"]] },
  { cat: "med-ppe", industry: "medical", unit: "box of 100", priceRange: [4, 69],
    bases: ["Nitrile Exam Gloves", "Vinyl Gloves", "Isolation Gowns", "Surgical Masks", "N95 Respirators", "Face Shields", "Bouffant Caps", "Shoe Covers", "Protective Coveralls", "Safety Goggles"],
    variants: ["Small", "Medium", "Large", "X-Large", "Blue", "White", "Level 2", "Level 3", "50/box", "100/box"],
    specKeys: [["Standard", "ASTM|EN 14683"], ["Filtration", "BFE ≥98%"], ["Size", "S|M|L|XL"]] },
  { cat: "med-wound", industry: "medical", unit: "pack", priceRange: [4, 129],
    bases: ["Adhesive Wound Dressing", "Hydrocolloid Dressing", "Foam Dressing", "Transparent Film Dressing", "Surgical Sutures", "Antiseptic Solution", "Crepe Bandage", "Cohesive Bandage", "Wound Closure Strips", "Burn Gel Dressing"],
    variants: ["5x5cm", "10x10cm", "Small", "Medium", "Large", "3-0", "4-0", "Sterile", "10/pack", "Box"],
    specKeys: [["Sterile", "Yes"], ["Absorbency", "Low|Moderate|High"], ["Size", "5x5|10x10 cm"]] },
  { cat: "med-mobility", industry: "medical", unit: "each", priceRange: [29, 1299],
    bases: ["Folding Wheelchair", "Aluminium Walker", "Walking Crutches", "Quad Cane", "Transfer Board", "Bed Rail Support", "Commode Chair", "Overbed Table", "Patient Lift Sling", "Mobility Rollator"],
    variants: ["Standard", "Lightweight", "Bariatric", "Adjustable", "Foldable", "Padded", "Small", "Medium", "Large", "Deluxe"],
    specKeys: [["Capacity", "120kg|150kg"], ["Frame", "Aluminium|Steel"], ["Foldable", "Yes"]] },
  { cat: "med-respiratory", industry: "medical", unit: "each", priceRange: [9, 599],
    bases: ["Compressor Nebulizer", "Oxygen Mask", "Nasal Cannula", "Nebulizer Kit", "Peak Flow Meter", "Spacer Device", "Suction Catheter", "Oxygen Tubing", "Ambu Resuscitator Bag", "Humidifier Bottle"],
    variants: ["Adult", "Pediatric", "Standard", "2m", "Reusable", "Disposable", "Small", "Large", "Sterile", "Kit"],
    specKeys: [["Use", "Single-use|Reusable"], ["Size", "Adult|Pediatric"], ["Sterile", "Yes"]] },
  { cat: "med-emergency", industry: "medical", unit: "each", priceRange: [9, 449],
    bases: ["First Aid Kit", "Emergency Blanket", "Triangular Bandage", "Instant Cold Pack", "CPR Face Shield", "Trauma Dressing", "Splint Roll", "Burn Care Kit", "Tourniquet", "Eye Wash Solution"],
    variants: ["Workplace", "Vehicle", "Travel", "Compact", "Large", "Foil", "10-Pack", "Sterile", "Refill", "Pro"],
    specKeys: [["Contents", "Sealed kit"], ["Compliance", "CSA|OSHA"], ["Size", "Compact|Large"]] },
  { cat: "med-ortho", industry: "medical", unit: "each", priceRange: [9, 199],
    bases: ["Knee Support Brace", "Ankle Stabilizer", "Wrist Splint", "Lumbar Support Belt", "Cervical Collar", "Arm Sling", "Elbow Support", "Compression Stockings", "Finger Splint", "Shoulder Immobilizer"],
    variants: ["Small", "Medium", "Large", "X-Large", "Left", "Right", "Universal", "Hinged", "Neoprene", "Breathable"],
    specKeys: [["Size", "S|M|L|XL"], ["Material", "Neoprene|Elastic"], ["Support", "Mild|Firm"]] },
  { cat: "med-infusion", industry: "medical", unit: "box", priceRange: [6, 159],
    bases: ["IV Administration Set", "IV Cannula Set", "Three-Way Stopcock", "Extension Line", "Infusion Pump Set", "Blood Transfusion Set", "Burette Set", "IV Pole", "Tourniquet Strap", "Catheter Fixation"],
    variants: ["18G", "20G", "22G", "24G", "Vented", "Non-Vented", "Sterile", "50/box", "Single", "Y-Site"],
    specKeys: [["Gauge", "18|20|22|24 G"], ["Sterile", "Yes"], ["Type", "Vented|Non-vented"]] },
  { cat: "med-lab", industry: "medical", unit: "pack", priceRange: [5, 699],
    bases: ["Vacutainer Tubes", "Urine Test Strips", "Microscope Slides", "Pipette Tips", "Centrifuge Tubes", "Glucose Test Strips", "Rapid Antigen Tests", "Specimen Swabs", "Petri Dishes", "Lab Gloves"],
    variants: ["EDTA", "Plain", "50/box", "100/box", "10-Param", "Sterile", "1.5ml", "15ml", "Pack of 25", "Pack of 50"],
    specKeys: [["Quantity", "50/box|100/box"], ["Sterile", "Yes|No"], ["Type", "EDTA|Plain|Heparin"]] },
  { cat: "med-sterilization", industry: "medical", unit: "each", priceRange: [9, 5900],
    bases: ["Bench-Top Autoclave", "Sterilization Pouches", "Chemical Indicators", "Biological Indicators", "Instrument Tray", "Surface Disinfectant", "Hand Rub Sanitizer", "Ultrasonic Bath", "Sterile Wrap", "Indicator Tape"],
    variants: ["18L", "23L", "90x250mm", "200/box", "1L", "5L", "Small", "Medium", "Large", "Digital"],
    specKeys: [["Standard", "EN13060|ISO 11140"], ["Capacity", "18L|23L"], ["Cycle", "B-class"]] },
];

const VETERINARY: Blueprint[] = [
  { cat: "vet-instruments", industry: "veterinary", unit: "each", priceRange: [9, 299],
    bases: ["Spay Pack Kit", "Tissue Forceps", "Mosquito Forceps", "Needle Holder", "Surgical Scissors", "Castration Instrument", "Teat Cannula", "Hoof Knife", "Dehorner", "Retractor Set"],
    variants: ["Small Animal", "Large Animal", "Straight", "Curved", "12cm", "16cm", "Toothed", "Premium", "Sterile", "Set"],
    specKeys: [["Material", "Surgical Stainless Steel"], ["Use", "Small Animal|Large Animal"], ["Finish", "Satin|Mirror"]] },
  { cat: "vet-diagnostics", industry: "veterinary", unit: "each", priceRange: [12, 699],
    bases: ["Veterinary Stethoscope", "Digital Vet Thermometer", "Vet Pulse Oximeter", "Otoscope Set", "Refractometer", "Vet Glucometer", "Ultrasound Gel", "ECG Clip Electrodes", "Microchip Scanner", "Diagnostic Penlight"],
    variants: ["Canine", "Feline", "Equine", "Pro", "Rechargeable", "Dual-Head", "Pediatric", "Standard", "Kit", "Bluetooth"],
    specKeys: [["Species", "Canine|Feline|Equine"], ["Power", "Battery|Rechargeable"], ["Display", "LCD"]] },
  { cat: "vet-consumables", industry: "veterinary", unit: "box of 100", priceRange: [5, 79],
    bases: ["Vet Syringes", "Hypodermic Needles", "Exam Gloves", "Cohesive Bandage", "Cotton Wool", "Vet Gauze Swabs", "Elizabethan Collar", "Identification Bands", "Feeding Tubes", "Vet Wrap Tape"],
    variants: ["1ml", "5ml", "12ml", "18G", "20G", "Small", "Medium", "Large", "Assorted Colors", "100/box"],
    specKeys: [["Sterile", "Yes|No"], ["Quantity", "100/box"], ["Use", "Single-use"]] },
  { cat: "vet-surgical", industry: "veterinary", unit: "pack", priceRange: [6, 199],
    bases: ["Vet Surgical Sutures", "Scalpel Blades", "Skin Stapler", "Staple Remover", "Wound Spray", "Surgical Drape", "Hemostatic Powder", "Antiseptic Scrub", "Suture Removal Kit", "Bone Pin Set"],
    variants: ["2-0", "3-0", "4-0", "#10", "#15", "Resorbable", "Non-Resorbable", "Sterile", "10/pack", "Box"],
    specKeys: [["Gauge", "2-0|3-0|4-0"], ["Type", "Resorbable|Non-resorbable"], ["Sterile", "Yes"]] },
  { cat: "vet-dental", industry: "veterinary", unit: "each", priceRange: [9, 449],
    bases: ["Veterinary Dental Scaler", "Tooth Extraction Forceps", "Dental Elevator Set", "Ultrasonic Vet Scaler", "Polishing Paste", "Mouth Gag", "Dental Mirror", "Luxator Set", "Prophy Angles", "Curette Set"],
    variants: ["Canine", "Feline", "Small", "Medium", "Large", "Set", "Cordless", "Standard", "Premium", "Refill"],
    specKeys: [["Species", "Canine|Feline"], ["Material", "Stainless Steel"], ["Use", "Veterinary dental"]] },
  { cat: "vet-anesthesia", industry: "veterinary", unit: "each", priceRange: [12, 1499],
    bases: ["Anaesthesia Circuit", "Vet Anaesthesia Mask", "Endotracheal Tube", "Vaporizer", "Capnograph Sensor", "Rebreathing Bag", "Oxygen Flow Meter", "Soda Lime Absorbent", "Induction Chamber", "Monitor Multiparameter"],
    variants: ["Small Animal", "Large Animal", "Size 3", "Size 5", "Size 7", "Reusable", "Disposable", "1L", "2L", "Kit"],
    specKeys: [["Species", "Small|Large Animal"], ["Use", "Reusable|Disposable"], ["Size", "3|5|7"]] },
  { cat: "vet-grooming", industry: "veterinary", unit: "each", priceRange: [9, 599],
    bases: ["Professional Clippers", "Clipper Blade Set", "Grooming Table", "Restraint Muzzle", "Nail Trimmer", "Slicker Brush", "Grooming Scissors", "Bathing Tub", "Drying Blaster", "Restraint Bag"],
    variants: ["Small", "Medium", "Large", "Cordless", "Adjustable", "Stainless", "#10 Blade", "#40 Blade", "Pro", "Set"],
    specKeys: [["Power", "Cordless|Mains"], ["Size", "S|M|L"], ["Material", "Stainless|Nylon"]] },
  { cat: "vet-pharmacy", industry: "veterinary", unit: "pack", priceRange: [4, 149],
    bases: ["Dosing Syringe", "Glass Vials", "Pill Splitter", "Oral Dispenser", "Drench Gun", "Multi-Dose Bottle", "Pill Pockets", "Dispensing Bags", "Measuring Cups", "Pour-On Applicator"],
    variants: ["5ml", "10ml", "20ml", "30ml", "100/pack", "Amber", "Clear", "Reusable", "Calibrated", "Box"],
    specKeys: [["Volume", "5|10|20|30 ml"], ["Material", "PP|Glass"], ["Calibrated", "Yes"]] },
  { cat: "vet-largeanimal", industry: "veterinary", unit: "each", priceRange: [9, 899],
    bases: ["Equine Stethoscope", "Calving Aid", "Drench Gun", "Balling Gun", "Hoof Trimmer", "Ear Tag Applicator", "Livestock Thermometer", "Stomach Tube", "Castration Bands", "Backpack Sprayer"],
    variants: ["Standard", "Heavy-Duty", "Large", "Stainless", "Automatic", "Adjustable", "Bovine", "Equine", "Ovine", "Kit"],
    specKeys: [["Use", "Bovine|Equine|Ovine"], ["Material", "Stainless|Polymer"], ["Type", "Manual|Automatic"]] },
  { cat: "vet-imaging", industry: "veterinary", unit: "each", priceRange: [29, 6900],
    bases: ["Veterinary X-Ray Sensor", "Phosphor Plate", "Vet Ultrasound Probe", "Lead Apron", "Positioning Foam Set", "X-Ray Film", "Cassette Holder", "Ultrasound Gel", "Sensor Sleeves", "Thyroid Collar"],
    variants: ["Size 1", "Size 2", "Small", "Medium", "Large", "USB", "Wireless", "5L", "100/box", "Refill"],
    specKeys: [["Resolution", "High"], ["Connection", "USB|Wireless"], ["Use", "Veterinary imaging"]] },
];

/* ----- Dental: more instruments + operatory equipment + diode lasers ----- */
const DENTAL_PLUS: Blueprint[] = [
  { cat: "instruments", industry: "dental", unit: "each", priceRange: [9, 129],
    bases: ["Bone Curette", "Periotome", "Luxator", "Surgical Elevator", "Dental Chisel", "Hemostat Forceps", "Needle Holder", "Tissue Scissors", "Crown Scissors", "Bone Rongeur", "Bone File", "Root Elevator", "Apical Elevator", "Gingival Cord Packer"],
    variants: ["Standard", "Angled", "Straight", "Micro", "Serrated", "Ergo Grip", "Titanium", "Mini", "Anterior", "Posterior"],
    specKeys: [["Material", "Surgical Steel|Titanium"], ["Finish", "Satin|Mirror"], ["Sterilizable", "Yes, autoclavable 134°C"]] },
  { cat: "equipment", industry: "dental", unit: "each", priceRange: [299, 14900], brand: "MCare Elite",
    bases: ["Radius Patient Chair", "Operatory Chair System", "LED Operatory Light", "Ambidextrous Delivery Unit", "Doctor Stool", "Assistant Stool", "Wireless Intraoral Camera", "Operatory Cuspidor", "Continental Delivery System", "Hydraulic Patient Chair"],
    variants: ["Standard", "Deluxe", "Left-Hand", "Right-Hand", "LED", "Premium", "Hybrid", "Compact"],
    specKeys: [["Warranty", "2 Years|3 Years"], ["Mount", "Chair-mounted|Cart"], ["Power", "Electric|Hydraulic"]] },
  { cat: "equipment", industry: "dental", unit: "each", priceRange: [49, 6900], brand: "MCare Pro",
    bases: ["3W Soft-Tissue Diode Laser", "10W Diode Laser", "Advanced Diode Laser", "Advanced Diode Laser Plus", "Laser Whitening System", "Disposable Laser Tips", "Laser Safety Glasses", "Laser Handpiece Kit"],
    variants: ["810nm", "980nm", "Starter Kit", "Pro Kit", "Refill", "Standard", "Portable"],
    specKeys: [["Wavelength", "810nm|980nm"], ["Presets", "20+|25+"], ["Use", "Soft-tissue surgery"]] },
];

/* ----- Veterinary: MCare diode lasers ----- */
const VET_PLUS: Blueprint[] = [
  { cat: "vet-surgical", industry: "veterinary", unit: "each", priceRange: [39, 5900], brand: "MCare Pro",
    bases: ["Veterinary Diode Laser", "Veterinary Therapy Laser", "Vet Laser Disposable Tips", "Vet Laser Safety Glasses", "Surgical Laser Handpiece", "Therapy Laser Applicator"],
    variants: ["Canine", "Feline", "Equine", "Therapy", "Surgical", "Kit", "Refill"],
    specKeys: [["Wavelength", "810nm|980nm"], ["Use", "Surgery|Therapy"], ["Species", "Companion|Equine"]] },
];

/* ----- Medical: aesthetic, nursing, cardiology ----- */
const MEDICAL_PLUS: Blueprint[] = [
  { cat: "med-aesthetic", industry: "medical", unit: "box", priceRange: [12, 299],
    bases: ["Dermal Filler Cannula", "Mesotherapy Needles", "Microneedling Pen", "Aesthetic Marking Pen", "Hyaluron Pen", "Topical Numbing Cream", "Cooling Roller", "PRP Tubes", "Micro-Cannula", "Aesthetic Gauze"],
    variants: ["25G", "27G", "30G", "Fine", "Standard", "10/box", "50/box", "Sterile", "Refill", "Kit"],
    specKeys: [["Gauge", "25G|27G|30G"], ["Sterile", "Yes"], ["Use", "Aesthetic / cosmetic"]] },
  { cat: "med-nursing", industry: "medical", unit: "pack", priceRange: [6, 149],
    bases: ["Patient Gown", "Bed Pan", "Incontinence Pads", "Wash Basin", "Patient Transfer Sheet", "Nursing Apron", "Pill Organizer", "Urinal Bottle", "Disposable Bed Sheet", "Slide Sheet"],
    variants: ["Small", "Medium", "Large", "Adult", "Bariatric", "10/pack", "Disposable", "Reusable", "Blue", "White"],
    specKeys: [["Size", "S|M|L"], ["Use", "Single-use|Reusable"], ["Material", "Nonwoven|PE"]] },
  { cat: "med-cardiology", industry: "medical", unit: "box", priceRange: [9, 1299],
    bases: ["ECG Electrodes", "Holter Monitor", "ECG Paper Roll", "Defibrillator Pads", "ECG Lead Wires", "Cardiac Stethoscope", "Stress Test Electrodes", "Telemetry Pouch", "12-Lead ECG Cable", "Pulse Oximeter Sensor"],
    variants: ["Adult", "Pediatric", "Pre-Gelled", "50/box", "100/box", "Reusable", "Disposable", "Universal", "Snap", "Tab"],
    specKeys: [["Type", "Disposable|Reusable"], ["Compatibility", "Universal"], ["Quantity", "50/box|100/box"]] },
];

/* ----- Physiotherapy modalities & rehab ----- */
const PHYSIO: Blueprint[] = [
  { cat: "physio-electro", industry: "physiotherapy", unit: "each", priceRange: [9, 899],
    bases: ["TENS Unit", "EMS Muscle Stimulator", "Interferential Therapy Unit", "Combination Therapy Unit", "Self-Adhesive Electrode Pads", "Lead Wires", "Conductive Gel", "Russian Stim Unit", "Microcurrent Device", "NMES Stimulator"],
    variants: ["Dual-Channel", "4-Channel", "Portable", "Clinical", "5x5cm", "Refill", "Rechargeable", "Digital", "Pack of 4", "Kit"],
    specKeys: [["Channels", "2|4"], ["Power", "Battery|Mains"], ["Use", "Pain relief / rehab"]] },
  { cat: "physio-ultrasound", industry: "physiotherapy", unit: "each", priceRange: [12, 1499],
    bases: ["Therapeutic Ultrasound Unit", "Ultrasound Transducer", "Ultrasound Gel", "Combo Ultrasound / Stim Unit", "Sound Head Applicator", "Coupling Pad"],
    variants: ["1MHz", "3MHz", "1 & 3MHz", "5cm²", "1cm²", "5L", "Clinical", "Portable", "Refill", "Kit"],
    specKeys: [["Frequency", "1MHz|3MHz"], ["Head", "1cm²|5cm²"], ["Use", "Deep tissue therapy"]] },
  { cat: "physio-exercise", industry: "physiotherapy", unit: "set", priceRange: [6, 249],
    bases: ["Resistance Band Set", "Exercise Ball", "Balance Board", "Wobble Cushion", "Hand Therapy Putty", "Overhead Pulley System", "Shoulder Wheel", "Pedal Exerciser", "Resistance Tubing", "Stability Trainer"],
    variants: ["Light", "Medium", "Heavy", "55cm", "65cm", "75cm", "Set of 5", "Soft", "Firm", "Pro"],
    specKeys: [["Resistance", "Light|Medium|Heavy"], ["Material", "Latex-free TPE"], ["Use", "Strength & ROM"]] },
  { cat: "physio-hotcold", industry: "physiotherapy", unit: "each", priceRange: [5, 699],
    bases: ["Moist Hot Pack", "Reusable Cold Pack", "Hydrocollator Unit", "Paraffin Bath", "Gel Cold Compress", "Cryotherapy Cuff", "Reusable Ice Wrap", "Heat Therapy Wrap"],
    variants: ["Standard", "Cervical", "Knee", "Shoulder", "Back", "Oversize", "Refill", "Clinical", "6-Pack", "Kit"],
    specKeys: [["Type", "Hot|Cold"], ["Reusable", "Yes"], ["Use", "Thermotherapy"]] },
  { cat: "physio-tables", industry: "physiotherapy", unit: "each", priceRange: [149, 3900],
    bases: ["Electric Treatment Table", "Adjustable Plinth", "Tilt Table", "Traction Table", "Massage Table", "Bobath Table", "Hi-Lo Treatment Table", "Treatment Stool"],
    variants: ["2-Section", "3-Section", "Electric", "Hydraulic", "Portable", "Wide", "Standard", "Deluxe"],
    specKeys: [["Sections", "2|3|4"], ["Lift", "Electric|Hydraulic"], ["Capacity", "200kg|250kg"]] },
  { cat: "physio-shockwave", industry: "physiotherapy", unit: "each", priceRange: [199, 6900],
    bases: ["Radial Shockwave Unit", "Class IV Laser Therapy Unit", "Low-Level Laser Unit", "Shockwave Applicator", "Laser Therapy Probe", "Shockwave Handpiece"],
    variants: ["Clinical", "Portable", "Pro", "Standard", "Refill", "High-Power", "Compact"],
    specKeys: [["Type", "Radial|Laser"], ["Class", "IV|IIIb"], ["Use", "Tendon & soft tissue"]] },
  { cat: "physio-supports", industry: "physiotherapy", unit: "each", priceRange: [6, 199],
    bases: ["Knee Brace", "Ankle Support", "Lumbar Support", "Wrist Splint", "Cervical Collar", "Kinesiology Tape", "Compression Sleeve", "Walking Boot", "Finger Splint", "Elbow Support"],
    variants: ["Small", "Medium", "Large", "X-Large", "Hinged", "Neoprene", "Left", "Right", "Universal", "Roll"],
    specKeys: [["Size", "S|M|L|XL"], ["Material", "Neoprene|Elastic"], ["Support", "Mild|Firm"]] },
  { cat: "physio-massage", industry: "physiotherapy", unit: "each", priceRange: [9, 449],
    bases: ["Percussion Massage Gun", "Foam Roller", "Massage Oil", "Trigger Point Tool", "Cupping Therapy Set", "Massage Roller Stick", "Acupressure Mat", "Manual Therapy Wedge"],
    variants: ["Standard", "Pro", "Mini", "30cm", "45cm", "1L", "Set", "Firm", "Soft", "Kit"],
    specKeys: [["Use", "Myofascial release"], ["Power", "Cordless|Manual"], ["Material", "EVA|Silicone"]] },
];

const BLUEPRINTS: Blueprint[] = [
  ...DENTAL, ...DENTAL_PLUS,
  ...MEDICAL, ...MEDICAL_PLUS,
  ...VETERINARY, ...VET_PLUS,
  ...PHYSIO,
];

/* ----- deterministic helpers (stable across SSR/CSR) ----- */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
const pick = <T,>(arr: T[], seed: number) => arr[Math.floor(seed * arr.length) % arr.length];
const round99 = (n: number) => Math.max(1, Math.round(n) - 0.01);

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

        const brand = bp.brand ?? pick([...BRANDS], seed);
        const [lo, hi] = bp.priceRange;
        const rawMrp = lo + seed2 * (hi - lo);
        const mrp = round99(rawMrp);
        const hasDeal = seed3 > 0.55;
        const price = hasDeal ? round99(rawMrp * (0.7 + seed * 0.18)) : mrp;

        const name = `${brand} ${base} — ${variant}`;
        // Unique per-SKU stock photo: keyword from base/category, lock = the
        // product's globally-unique seq so no two SKUs ever share a photo.
        const image = productImageUrl(keywordFor(base, bp.cat, bp.industry), seq);
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
          industryId: bp.industry,
          brand,
          mrp,
          price,
          unit: bp.unit,
          image,
          rating: Math.round((3.6 + seed2 * 1.4) * 10) / 10,
          reviews: Math.floor(seed3 * 480) + 3,
          stock: seed > 0.08 ? Math.floor(seed2 * 240) + 4 : 0,
          tags: [variant, bp.cat],
          bestSeller: seed > 0.86,
          isNew: seed3 > 0.9,
          description: `Professional-grade ${base.toLowerCase()} (${variant}) from ${brand}. Engineered for ${bp.industry} professionals to clinical standards, with reliable performance and consistent quality. Supplied by Mankind Healthcare with fast Canada-wide dispatch.`,
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
export const categoriesByIndustry = (industry: IndustryId) =>
  CATEGORIES.filter((c) => c.industry === industry);
