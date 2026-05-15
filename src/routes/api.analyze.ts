import { createFileRoute } from "@tanstack/react-router";

const SYSTEM = `You are a careful clinical assistant supporting a triage workflow in India.
A patient describes their symptoms in plain English or Hindi. Extract structured data, draft a SOAP note, and pick the most appropriate hospital department.

Severity guide (1-10):
- 1-4: routine (mild discomfort, no red flags)
- 5-7: urgent (significant symptoms, no immediate danger)
- 8-10: critical (chest pain, breathlessness, severe bleeding, stroke signs, syncope, anaphylaxis)

Be conservative: when in doubt about red flags, score higher.
For department, ALWAYS pick exactly one from the provided list of available departments. If none fit well, pick "General Medicine" (or the closest equivalent in the list).

You MUST respond with valid JSON only. No markdown, no explanation. Use this exact schema:
{
  "main_symptom": "string",
  "duration": "string",
  "severity": number,
  "suggested_department": "string",
  "soap": {
    "subjective": "string",
    "objective": "string",
    "assessment": "string",
    "plan": "string"
  }
}`;

const fallback = (transcript: string) => {
  const t = transcript.toLowerCase();
  
  // Basic duration extraction
  let duration = "Recent onset";
  const durationMatch = t.match(/(\d+)\s*(day|week|month|hr|hour|din|hafta)/);
  if (durationMatch) duration = `${durationMatch[1]} ${durationMatch[2]}(s)`;

  if (/chest|breath|saans|seene|dil|heart/.test(t)) {
    return {
      main_symptom: "Chest discomfort / Breathlessness",
      duration,
      severity: 8,
      soap: {
        subjective: `Patient reports: "${transcript}". Symptoms suggestive of cardiac or respiratory distress.`,
        objective: "Awaiting vitals (BP, SpO2, Heart Rate).",
        assessment: "Potential Acute Coronary Syndrome or Pulmonary distress.",
        plan: "Immediate clinical triage. Oxygen support if SpO2 < 92%. ECG and Troponin/D-dimer as needed.",
      },
    };
  }
  if (/fever|bukhar|temperature|thanda|garm/.test(t)) {
    return {
      main_symptom: "Febrile illness",
      duration,
      severity: 5,
      soap: {
        subjective: `Patient reports: "${transcript}". Fever noted with associated discomfort.`,
        objective: "Temperature check pending.",
        assessment: "Viral fever or infection (URI/UTI/Malaria/Dengue per local prevalence).",
        plan: "Paracetamol 650mg, hydration, sponging. Labs if fever persists > 48hrs.",
      },
    };
  }
  if (/cough|khansi|balgam|throat|gala/.test(t)) {
    return {
      main_symptom: "Respiratory / Throat discomfort",
      duration,
      severity: 4,
      soap: {
        subjective: `Patient reports: "${transcript}". Irritation in throat or persistent cough.`,
        objective: "Chest auscultation and throat inspection pending.",
        assessment: "Upper Respiratory Infection (URI) or Pharyngitis.",
        plan: "Steam inhalation, salt water gargles, cough suppressant. Review if breathlessness develops.",
      },
    };
  }
  if (/stomach|pet|pain|dard|nausea|vomit|ultee/.test(t)) {
    return {
      main_symptom: "Abdominal discomfort",
      duration,
      severity: 4,
      soap: {
        subjective: `Patient reports: "${transcript}". Pain or nausea in abdominal region.`,
        objective: "Abdominal palpation pending.",
        assessment: "Gastritis, Dyspepsia, or Mild Food Poisoning.",
        plan: "Antacids, light diet, plenty of oral fluids. Review if pain localizes to RLQ.",
      },
    };
  }
  if (/cancer|tumor|growth|lump|gaanth/.test(t)) {
    return {
      main_symptom: "Unexplained growth/lump (Potential Oncology)",
      duration,
      severity: 7,
      soap: {
        subjective: `Patient reports: "${transcript}". Concerns about a lump or potential growth.`,
        objective: "Visual inspection and palpation required.",
        assessment: "Suspicious lesion or growth. Rule out malignancy.",
        plan: "Urgent biopsy or imaging (CT/MRI). Referral to Oncology or Specialist Surgeon.",
      },
    };
  }
  if (/mouth|oral|teeth|tooth|jeebh|muh/.test(t)) {
    return {
      main_symptom: "Oral/Dental discomfort",
      duration,
      severity: 4,
      soap: {
        subjective: `Patient reports: "${transcript}". Discomfort in the oral cavity.`,
        objective: "Intraoral examination pending.",
        assessment: "Dental issue, Oral ulcer, or Stomatitis.",
        plan: "Dental consultation. Warm saline rinses. Review if lesion doesn't heal in 14 days.",
      },
    };
  }
  if (/head|sir|dard|headache|migraine/.test(t)) {
    return {
      main_symptom: "Headache / Cephalgia",
      duration,
      severity: 4,
      soap: {
        subjective: `Patient reports: "${transcript}". Pain in head region.`,
        objective: "Neurological screening pending.",
        assessment: "Tension headache or Migraine. Rule out secondary causes if severe.",
        plan: "Rest in dark room, NSAIDs. Monitor for red flags (vomiting, vision loss).",
      },
    };
  }
  if (/skin|rash|itch|danne|daag/.test(t)) {
    return {
      main_symptom: "Skin / Dermatological issue",
      duration,
      severity: 3,
      soap: {
        subjective: `Patient reports: "${transcript}". Skin irritation or visible rash.`,
        objective: "Dermatological inspection required.",
        assessment: "Contact dermatitis or localized allergy.",
        plan: "Avoid irritants, topical calamine or mild steroid. Antihistamines if itchy.",
      },
    };
  }
  if (/injury|chot|accident|fall|blood|khoon/.test(t)) {
    return {
      main_symptom: "Physical Injury / Trauma",
      duration,
      severity: 6,
      soap: {
        subjective: `Patient reports: "${transcript}". History of trauma or visible injury.`,
        objective: "Wound inspection and stability check pending.",
        assessment: "Soft tissue injury or potential fracture.",
        plan: "Clean wound, dressing. X-ray if bony tenderness present. Tetanus prophylaxis.",
      },
    };
  }
  // Generic dynamic fallback
  return {
    main_symptom: transcript.length > 40 ? transcript.slice(0, 37) + "..." : transcript,
    duration,
    severity: 3,
    soap: {
      subjective: `Patient mentions: "${transcript}".`,
      objective: "General physical examination pending.",
      assessment: "Symptomatic presentation for evaluation.",
      plan: "General consultation. Base further tests on clinical findings.",
    },
  };
};

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let transcript = "";
        let availableDepartments: string[] = [];
        try {
          const body = await request.json();
          transcript = String(body?.transcript ?? "").slice(0, 2000);
          if (Array.isArray(body?.availableDepartments)) {
            availableDepartments = body.availableDepartments
              .filter((d: unknown) => typeof d === "string")
              .slice(0, 30);
          }
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        if (!transcript.trim()) {
          return Response.json({ error: "Empty transcript" }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY || (import.meta as any).env?.VITE_GROQ_API_KEY;
        if (!apiKey) {
          const fb = fallback(transcript);
          return Response.json({
            ...fb,
            suggested_department: pickFallbackDept(transcript, availableDepartments),
            source: "fallback",
          });
        }

        try {
          const userContent =
            `Patient transcript:\n"""${transcript}"""\n\n` +
            (availableDepartments.length
              ? `Available departments (pick one): ${availableDepartments.join(", ")}\n\n`
              : "") +
            "Return a SOAP triage assessment as JSON only.";

          const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [
                { role: "system", content: SYSTEM },
                { role: "user", content: userContent },
              ],
              temperature: 0.3,
              max_tokens: 800,
              response_format: { type: "json_object" },
            }),
          });

          if (resp.status === 429) {
            return Response.json({ error: "Rate limited. Please wait a moment." }, { status: 429 });
          }
          if (!resp.ok) {
            console.error("Groq API error", resp.status, await resp.text());
            const fb = fallback(transcript);
            return Response.json({
              ...fb,
              suggested_department: pickFallbackDept(transcript, availableDepartments),
              source: "fallback",
            });
          }

          const data = await resp.json();
          const content = data.choices?.[0]?.message?.content;
          if (!content) {
            const fb = fallback(transcript);
            return Response.json({
              ...fb,
              suggested_department: pickFallbackDept(transcript, availableDepartments),
              source: "fallback",
            });
          }

          const parsed = JSON.parse(content);

          // Snap AI's suggestion onto the available list (case-insensitive) when possible.
          if (availableDepartments.length && parsed.suggested_department) {
            const match = availableDepartments.find(
              (d) => d.toLowerCase() === String(parsed.suggested_department).toLowerCase(),
            );
            parsed.suggested_department =
              match ?? pickFallbackDept(transcript, availableDepartments);
          }
          return Response.json({ ...parsed, source: "ai" });
        } catch (e) {
          console.error("analyze error", e);
          const fb = fallback(transcript);
          return Response.json({
            ...fb,
            suggested_department: pickFallbackDept(transcript, availableDepartments),
            source: "fallback",
          });
        }
      },
    },
  },
});

/** Keyword-based department fallback when the AI is unavailable. */
function pickFallbackDept(text: string, available: string[]): string {
  const t = text.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/cancer|tumor|growth|lump|oncology/, "Oncology"],
    [/mouth|oral|teeth|tooth|dental/, "Dental"],
    [/chest|breath|saans|seene|heart|cardiac/, "Cardiology"],
    [/headache|migraine|stroke|seizure|neuro/, "Neurology"],
    [/stomach|abdomen|pet|nausea|vomit|diarr/, "Gastroenterology"],
    [/skin|rash|allergy|itch/, "Dermatology"],
    [/bone|fracture|joint|knee|back/, "Orthopedics"],
    [/child|baby|paed|pediatric/, "Pediatrics"],
  ];
  for (const [re, dept] of rules) {
    if (re.test(t)) {
      const match = available.find((d) => d.toLowerCase() === dept.toLowerCase());
      if (match) return match;
    }
  }
  const general = available.find((d) => /general/i.test(d));
  return general ?? available[0] ?? "General Medicine";
}
