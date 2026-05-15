import { PatientRecord } from "./triage";

export interface Outbreak {
  loc: string;
  symptom: string;
  count: number;
  patients: PatientRecord[];
}

export function detectOutbreaks(patients: PatientRecord[], threshold = 5): Outbreak[] {
  const clusters: Record<string, PatientRecord[]> = {};

  patients.forEach((p) => {
    let loc = p.location || "Bhopal";
    const pincodeMatch = String(loc).match(/\b\d{6}\b/);
    if (pincodeMatch) loc = pincodeMatch[0];

    const title = p.main_symptom?.toLowerCase() || "";
    
    // Improved categorization logic
    let symptom = null;
    if (title.includes("fever") || title.includes("bukhar") || title.includes("temp")) symptom = "Fever";
    else if (title.includes("cough") || title.includes("breath") || title.includes("resp")) symptom = "Respiratory";
    else if (title.includes("stomach") || title.includes("pain") || title.includes("nausea")) symptom = "Gastric";
    else if (title.includes("skin") || title.includes("rash") || title.includes("itch")) symptom = "Dermatological";
    else if (title.includes("back") || title.includes("joint") || title.includes("bone")) symptom = "Orthopedic";
    else if (title.includes("cancer") || title.includes("tumor") || title.includes("growth")) symptom = "Oncology Concerns";
    
    if (symptom) {
      const key = `${loc}|${symptom}`;
      if (!clusters[key]) clusters[key] = [];
      clusters[key].push(p);
    }
  });

  return Object.entries(clusters)
    .filter(([_, list]) => list.length >= threshold)
    .map(([key, list]) => {
      const [loc, symptom] = key.split("|");
      return { loc, symptom, count: list.length, patients: list };
    });
}
