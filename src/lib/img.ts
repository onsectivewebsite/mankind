/** Build a sized Unsplash URL from a photo id (all ids verified to return 200). */
export const unsplash = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70${h ? `&h=${h}` : ""}`;

/** Curated, spot-checked photo ids. */
export const PHOTO = {
  dentalA: "1588776814546-1ffcf47267a5", // dentist reviewing x-rays
  dentalB: "1606811841689-23dfddce3e95", // dentist & patient
  dentalC: "1609840114035-3c981b782dfe", // clear aligner (coral bg)
  medicalA: "1631815589968-fdb09a223b1e", // blood pressure check
  medicalB: "1576091160550-2173dba999ef", // stethoscope + laptop
  medicalC: "1559757148-5c350d0d3c56", // brain model
  vetA: "1576201836106-db1758fd1c97", // golden retriever puppy
  vetB: "1628009368231-7bb7cfcb0def", // vet with cat
  hero: "1612277795421-9bc7706a4a34", // clinician with patient
} as const;

/** Per-industry primary imagery. */
export const INDUSTRY_PHOTO = {
  dental: PHOTO.dentalA,
  medical: PHOTO.medicalA,
  veterinary: PHOTO.vetA,
} as const;

/** Secondary imagery used in showcases (keyed loosely). */
export const SHOWCASE = {
  dental: [PHOTO.dentalB, PHOTO.dentalC],
  medical: [PHOTO.medicalB, PHOTO.medicalC],
  veterinary: [PHOTO.vetB, PHOTO.vetA],
} as const;
