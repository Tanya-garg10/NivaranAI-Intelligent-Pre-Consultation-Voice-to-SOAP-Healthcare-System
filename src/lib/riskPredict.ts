/**
 * AI Risk Prediction Engine
 * Analyzes patient data to predict health risks based on symptoms,
 * history, age, pre-existing conditions, and location patterns.
 */

import type { PatientRecord } from "./triage";

export interface RiskPrediction {
    disease: string;
    probability: number; // 0-100
    severity: "low" | "medium" | "high";
    reasoning: string;
    recommendation: string;
}

const RISK_RULES: Array<{
    pattern: RegExp;
    conditions?: RegExp;
    ageRange?: [number, number];
    disease: string;
    baseProbability: number;
    severity: "low" | "medium" | "high";
    reasoning: string;
    recommendation: string;
}> = [
        {
            pattern: /fever|bukhar|temperature|chills/i,
            disease: "Dengue Fever",
            baseProbability: 35,
            severity: "medium",
            reasoning: "Fever with potential mosquito-borne illness pattern in endemic region",
            recommendation: "CBC with platelet count, NS1 antigen test. Monitor for warning signs.",
        },
        {
            pattern: /fever.*cough|cough.*fever|breathless|saans/i,
            disease: "Pneumonia / LRTI",
            baseProbability: 30,
            severity: "medium",
            reasoning: "Combination of fever and respiratory symptoms suggests lower respiratory infection",
            recommendation: "Chest X-ray, SpO2 monitoring, sputum culture if productive cough.",
        },
        {
            pattern: /chest.*pain|seene.*dard|heart|cardiac/i,
            conditions: /hypertension|diabetes|cholesterol/i,
            ageRange: [40, 100],
            disease: "Acute Coronary Syndrome",
            baseProbability: 45,
            severity: "high",
            reasoning: "Chest symptoms with cardiovascular risk factors and age > 40",
            recommendation: "Immediate ECG, troponin, aspirin 300mg. Cardiology consult.",
        },
        {
            pattern: /headache|migraine|sir.*dard/i,
            conditions: /hypertension/i,
            disease: "Hypertensive Crisis",
            baseProbability: 40,
            severity: "high",
            reasoning: "Headache in known hypertensive patient — risk of end-organ damage",
            recommendation: "Urgent BP check, fundoscopy, renal function. IV antihypertensives if BP > 180/120.",
        },
        {
            pattern: /stomach|abdomen|pet.*dard|vomit|diarr/i,
            disease: "Gastroenteritis / Food Poisoning",
            baseProbability: 45,
            severity: "low",
            reasoning: "GI symptoms consistent with infectious gastroenteritis",
            recommendation: "ORS, antiemetics, stool examination. Watch for dehydration signs.",
        },
        {
            pattern: /joint.*pain|body.*ache|haddi/i,
            conditions: /diabetes/i,
            ageRange: [50, 100],
            disease: "Diabetic Neuropathy",
            baseProbability: 30,
            severity: "medium",
            reasoning: "Musculoskeletal pain in diabetic patient — neuropathic component likely",
            recommendation: "HbA1c, nerve conduction study, foot examination. Gabapentin consideration.",
        },
        {
            pattern: /skin|rash|allergy|kharish|itch/i,
            disease: "Allergic Dermatitis",
            baseProbability: 50,
            severity: "low",
            reasoning: "Skin symptoms suggest allergic or contact dermatitis",
            recommendation: "Identify allergen, antihistamines, topical corticosteroids if needed.",
        },
        {
            pattern: /fever|weakness|fatigue|thakan/i,
            disease: "Typhoid Fever",
            baseProbability: 25,
            severity: "medium",
            reasoning: "Prolonged fever with weakness in endemic area — typhoid consideration",
            recommendation: "Widal test, blood culture, CBC. Empirical antibiotics if clinical suspicion high.",
        },
    ];

export function predictRisks(patient: PatientRecord): RiskPrediction[] {
    const text = `${patient.main_symptom} ${patient.transcript} ${patient.soap.subjective}`.toLowerCase();
    const predictions: RiskPrediction[] = [];

    for (const rule of RISK_RULES) {
        if (!rule.pattern.test(text)) continue;

        let probability = rule.baseProbability;

        // Boost if pre-existing condition matches
        if (rule.conditions && patient.pre_existing && rule.conditions.test(patient.pre_existing)) {
            probability += 20;
        }

        // Boost if age is in risk range
        if (rule.ageRange && patient.patient_age) {
            if (patient.patient_age >= rule.ageRange[0] && patient.patient_age <= rule.ageRange[1]) {
                probability += 15;
            }
        }

        // Boost based on severity
        if (patient.severity >= 7) probability += 10;
        if (patient.severity >= 9) probability += 10;

        // Boost if repeat visits with similar symptoms
        if (patient.history && patient.history.length > 0) {
            const similar = patient.history.filter((h) =>
                rule.pattern.test(h.main_symptom.toLowerCase())
            );
            if (similar.length > 0) probability += 10;
        }

        probability = Math.min(95, probability);

        predictions.push({
            disease: rule.disease,
            probability,
            severity: probability >= 60 ? "high" : probability >= 35 ? "medium" : "low",
            reasoning: rule.reasoning,
            recommendation: rule.recommendation,
        });
    }

    // Sort by probability descending
    predictions.sort((a, b) => b.probability - a.probability);
    return predictions.slice(0, 3); // Top 3 predictions
}
