
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
