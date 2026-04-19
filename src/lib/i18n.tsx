import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, string>;

const en: Dict = {
  // ── Nav ──
  "nav.features": "Features",
  "nav.howItWorks": "How it works",
  "nav.impact": "Impact",
  "nav.security": "Security",
  "nav.tryDemo": "Try Demo",
  "nav.dashboard": "Dashboard",
  "nav.home": "Home",
  "nav.forHospitals": "For hospitals",
  "nav.contact": "Contact",
  "nav.signOut": "Sign out",

  // ── Hero ──
  "hero.eyebrow": "AI-powered clinical assistant",
  "hero.title": "Healthcare needs to be faster, smarter, and fairer.",
  "hero.subtitle": "NivaranAI runs voice-based pre-consultations, generates SOAP notes, and triages patients — so doctors can focus on care, not paperwork.",
  "hero.cta.primary": "Try the live demo",
  "hero.cta.secondary": "Login / Dashboard",
  "hero.trust": "Trusted by clinicians across India",
  "hero.aes": "AES-256 encrypted",
  "hero.consultation": "CONSULTATION · LIVE",
  "hero.patientMsg": "I have had a sore throat and mild fever for two days.",
  "hero.aiMsg": "Any difficulty swallowing or body ache?",
  "hero.triage": "Triage",
  "hero.routine": "Routine",
  "hero.confidence": "Confidence",
  "hero.soap": "SOAP",
  "hero.drafted": "Drafted",

  // ── Problem ──
  "problem.eyebrow": "The reality",
  "problem.title": "Three quiet problems holding clinics back.",
  "problem.subtitle": "None of them are dramatic. All of them compound — and patients feel the difference every day.",
  "problem.doc.title": "Documentation overload",
  "problem.doc.body": "Doctors spend nearly a third of their day writing notes instead of caring for patients.",
  "problem.lang.title": "Language gap",
  "problem.lang.body": "Patients struggle to describe symptoms across dialects, leading to missed context.",
  "problem.queue.title": "Inefficient queues",
  "problem.queue.body": "Without smart triage, urgent cases wait while routine ones take prime time slots.",

  // ── Solution ──
  "solution.eyebrow": "The solution",
  "solution.title": "One quiet system that does the heavy lifting.",
  "solution.voice.title": "Voice intake",
  "solution.voice.body": "Patient describes symptoms naturally, in their language.",
  "solution.ai.title": "AI processing",
  "solution.ai.body": "SOAP notes, triage, and follow-up questions in seconds.",
  "solution.dash.title": "Smart dashboard",
  "solution.dash.body": "Doctors review, edit, and prescribe — quickly.",

  // ── How it works ──
  "how.eyebrow": "How it works",
  "how.title": "Five calm steps, start to finish.",
  "how.s1.title": "Patient speaks symptoms",
  "how.s1.body": "Natural voice input — English or Hindi, no forms to fill.",
  "how.s2.title": "AI asks smart questions",
  "how.s2.body": "Adaptive follow-ups uncover the full clinical picture.",
  "how.s3.title": "SOAP notes generated",
  "how.s3.body": "Subjective, Objective, Assessment, Plan — drafted automatically.",
  "how.s4.title": "Doctor reviews",
  "how.s4.body": "Edit in place, add nuance, approve in under a minute.",
  "how.s5.title": "Voice prescription sent",
  "how.s5.body": "Delivered to the patient on WhatsApp in plain language.",

  // ── Features ──
  "features.eyebrow": "Capabilities",
  "features.title": "Everything a clinic needs, nothing it doesn't.",
  "feat.voice.title": "Voice-based interview",
  "feat.voice.body": "Multilingual voice intake captures symptoms naturally — no typing required.",
  "feat.ai.title": "AI questioning",
  "feat.ai.body": "Adaptive follow-ups powered by Gemini.",
  "feat.soap.title": "SOAP notes",
  "feat.soap.body": "Structured clinical notes drafted automatically.",
  "feat.triage.title": "Smart triage",
  "feat.triage.body": "Priority ranking based on severity and history.",
  "feat.dashboard.title": "Doctor dashboard",
  "feat.dashboard.body": "Patient queue, history, drug interactions — one screen.",
  "feat.whatsapp.title": "WhatsApp prescription",
  "feat.whatsapp.body": "Plain-language summaries delivered instantly.",
  "feat.analytics.title": "Analytics",
  "feat.analytics.body": "Clinic-level insights into patient flow and outcomes.",

  // ── Impact ──
  "impact.eyebrow": "Impact",
  "impact.title": "Measured in time given back.",
  "impact.stat1": "Minutes saved per patient",
  "impact.stat2": "Hours saved per clinic, per week",
  "impact.stat3": "Documentation efficiency",

  // ── Trust ──
  "trust.eyebrow": "Trust & security",
  "trust.title": "Quiet by design. Secure by default.",
  "trust.enc.title": "AES-256 encryption",
  "trust.enc.body": "End-to-end protection for every consultation and record.",
  "trust.verified.title": "Verified doctors only",
  "trust.verified.body": "Every clinician is reviewed before joining the platform.",
  "trust.secure.title": "Secure data handling",
  "trust.secure.body": "Role-based access, audit logs, and zero-trust storage.",

  // ── Future ──
  "future.eyebrow": "Future ready",
  "future.title": "Built for what's next.",
  "future.abha.title": "ABHA integration",
  "future.abha.tag": "Coming soon",
  "future.abha.body": "Sync with India's Ayushman Bharat Health Account for unified patient records.",
  "future.offline.title": "Offline mode",
  "future.offline.tag": "On the roadmap",
  "future.offline.body": "For rural clinics where connectivity is intermittent — sync when online.",

  // ── CTA ──
  "cta.eyebrow": "A note from the team",
  "cta.title": "We are not just building software. We are improving healthcare outcomes.",
  "cta.primary": "Get started",
  "cta.secondary": "Register hospital / clinic",

  // ── Footer ──
  "footer.desc": "We are not just building software. We are improving healthcare outcomes.",
  "footer.product": "Product",
  "footer.account": "Account",
  "footer.login": "Login",
  "footer.patientSignup": "Patient signup",
  "footer.doctorSignup": "Doctor signup",
  "footer.registerHospital": "Register hospital / clinic",
  "footer.admin": "Admin",
  "footer.rights": "All rights reserved.",
  "footer.madeWith": "Made with care for clinicians and patients.",

  // ── Dashboard Shell ──
  "shell.clinician": "Clinician",
  "shell.patient": "Patient",
  "shell.backToSite": "Back to site",
  "shell.loading": "Loading…",

  // ── Header extras ──
  "header.forHospitals": "For hospitals",
  "header.contact": "Contact",

  // ── Patient Dashboard ──
  "pd.hello": "Hello",
  "pd.subtitle": "Describe symptoms by voice. AI triages, then we route you to the right doctor.",
  "pd.step1": "Step 1",
  "pd.aiInterviewer": "AI Interviewer",
  "pd.answerQuestions": "Answer a few questions by typing or speaking.",
  "pd.whereDoYouLive": "Where do you live? (e.g. 6-digit Pincode like 462001)",
  "pd.aiGreeting": "Hi! What brings you in today? Please describe your symptoms.",
  "pd.aiTyping": "AI is typing...",
  "pd.listening": "Listening... (or type here)",
  "pd.typeAnswer": "Type your answer...",
  "pd.skipAnalyze": "Skip remaining questions and analyze now",
  "pd.analyzing": "Analyzing responses...",
  "pd.urgentEmergency": "Urgent Emergency Bypass",
  "pd.emergencyDetected": "Emergency Detected",
  "pd.distressDetected": "Our system detected potential distress during your input session.",
  "pd.dispatchingAmbulance": "Dispatching Ambulance & GPS Alerts to Nearby Hospitals...",
  "pd.imOkay": "I'm Okay - Cancel SOS",
  "pd.urgentEmergencyTitle": "Urgent Emergency",
  "pd.describeEmergency": "Please describe the main problem in 1 sentence so we can immediately get you to the right department.",
  "pd.emergencyPlaceholder": "E.g. Heart attack, excessive bleeding...",
  "pd.cancel": "Cancel",
  "pd.routeImmediately": "Route Immediately",
  "pd.routing": "Routing...",
  "pd.kineticDistress": "🚨 Kinetic Distress Detected – Auto Priority Upgrade",
  "pd.analyzingBehavior": "Analyzing input behavior...",
  "pd.symptoms": "Symptoms",
  "pd.aiAnalysis": "AI Analysis",
  "pd.assignment": "Assignment",

  // ── Step 2 ──
  "pd.step2": "Step 2",
  "pd.chooseDoctor": "Choose your doctor",
  "pd.editSymptoms": "Edit symptoms",
  "pd.kineticOverride": "Kinetic Distress Detected – Priority Upgraded",
  "pd.aiAssessment": "AI assessment",
  "pd.criticalOverride": "CRITICAL (OVERRIDE)",
  "pd.suggestedDept": "Suggested department",
  "pd.autoAssign": "Auto-assign",
  "pd.autoAssignDesc": "AI picks the best doctor",
  "pd.manual": "Manual",
  "pd.manualDesc": "Pick hospital & doctor",
  "pd.autoAssignBtn": "Auto-assign me to a doctor",
  "pd.selectFacility": "Hospital / Clinic",
  "pd.selectDept": "Department",
  "pd.selectDoctor": "Doctor",
  "pd.selectFacilityPlaceholder": "Select facility",
  "pd.selectDeptPlaceholder": "Select department",
  "pd.pickFacilityFirst": "Pick facility first",
  "pd.selectDoctorPlaceholder": "Select doctor",
  "pd.pickDeptFirst": "Pick department first",
  "pd.confirmAssignment": "Confirm assignment",
  "pd.noApprovedFacilities": "No approved hospitals or clinics yet. Ask an admin to approve one.",

  // ── Step 3 ──
  "pd.assigned": "Assigned",
  "pd.youreBookedIn": "You're booked in",
  "pd.aiAutoAssigned": "AI auto-assigned",
  "pd.youChose": "You chose",
  "pd.bestFitDoctor": "the best-fit doctor based on your symptoms.",
  "pd.qrPassport": "QR Medical Passport",
  "pd.scanAtEntry": "Scan at Hospital Entry",
  "pd.startAnother": "Start another consultation",
  "pd.roomFloor": "Room / Floor",
  "pd.ground": "Ground",
  "pd.estimatedTime": "Estimated Time",

  // ── Queue Card ──
  "pd.queueStatus": "Queue status",
  "pd.patientsWaiting": "patients waiting",
  "pd.triagePriority": "Triage priority",
  "pd.noActiveConsultation": "No active consultation",
  "pd.speakToJoin": "Speak your symptoms to join the queue. The doctor will see your SOAP note instantly.",
  "pd.liveStatus": "Live status",
  "pd.submitted": "Submitted",
  "pd.doctorAccepted": "Doctor accepted",
  "pd.inConsultation": "In consultation",
  "pd.completed": "Completed",
  "pd.now": "now",
  "pd.rejected": "The doctor has declined this consultation. Please try another doctor.",
  "pd.prescriptionReceived": "Prescription received from",
  "pd.yourDoctor": "your doctor",
  "pd.estimatedWait": "Estimated Wait",
  "pd.minsApprox": "mins (approx)",
  "pd.room": "Room",
  "pd.floor": "Ground Floor",

  // ── Submissions ──
  "pd.myConsultations": "My consultations",
  "pd.nothingYet": "Nothing here yet — your past consultations will appear once you send symptoms to the doctor.",
  "pd.transcript": "Transcript",

  // ── Doctor Dashboard ──
  "dd.goodDay": "Good day, Dr.",
  "dd.yourQueue": "Your queue at",
  "dd.liveQueue": "Live patient queue — sorted by AI triage priority. Click a card to view the SOAP note.",
  "dd.verified": "● Verified · Approved",
  "dd.patientsToday": "Patients today",
  "dd.critical": "Critical",
  "dd.urgent": "Urgent",
  "dd.avgSeverity": "Avg severity",
  "dd.myQueue": "My queue",
  "dd.active": "active",
  "dd.all": "All",
  "dd.normal": "Normal",
  "dd.noPatients": "No patients assigned to you right now.",
  "dd.noQueue": "No patients in the queue yet.",
  "dd.selectPatient": "Select a patient from the queue to view their SOAP note.",
  "dd.soapNote": "SOAP note",
  "dd.dataProtected": "Data Protected",
  "dd.protected": "Protected",
  "dd.criticalCase": "Critical case — severity",
  "dd.prioritizeExam": "Prioritize immediate examination.",
  "dd.preExisting": "Pre-existing condition",
  "dd.considerDrug": "Consider drug interactions and comorbidity in your plan.",
  "dd.assignedMode": "Assigned",
  "dd.patientSaid": "Patient said",
  "dd.previousVisits": "Previous visits",
  "dd.aiDraftedSoap": "AI-drafted SOAP",
  "dd.subjective": "Subjective",
  "dd.objective": "Objective",
  "dd.assessment": "Assessment",
  "dd.plan": "Plan",
  "dd.downloadReport": "Download Report (PDF)",
  "dd.reject": "Reject",
  "dd.accept": "Accept",
  "dd.startConsultation": "Start consultation",
  "dd.prescriptionDelivered": "Prescription delivered to",
  "dd.consultationSummary": "Consultation Summary",
  "dd.addNotes": "Add clinical notes, update diagnosis...",
  "dd.prescribePlaceholder": "e.g. Paracetamol 500mg (Try 'Ibuprofen')",
  "dd.sendPrescription": "Send Prescription",
  "dd.markComplete": "Mark Complete",
  "dd.drugWarning": "Warning: may interact with patient's condition or allergies.",
  "dd.prescriptionSent": "Prescription sent to patient ✅",
  "dd.prescriptionSentDesc": "Delivered securely via SMS & Vault",
  "dd.whatsappPrescription": "WhatsApp Rx",

  // ── Hospital Dashboard ──
  "hd.hospitalPortal": "Hospital portal",
  "hd.facilityNotFound": "Facility not found",
  "hd.facilityRemoved": "Your facility record may have been removed. Please contact admin.",
  "hd.backToLogin": "Back to login",
  "hd.awaitingApproval": "Awaiting approval",
  "hd.logout": "Logout",

  // ── Family Profiles ──
  "family.title": "Family Health Profiles",
  "family.addMember": "Add Family Member",
  "family.name": "Name",
  "family.relation": "Relation",
  "family.age": "Age",
  "family.gender": "Gender",
  "family.bloodGroup": "Blood Group",
  "family.allergies": "Allergies",
  "family.preExisting": "Pre-existing Conditions",
  "family.self": "Self",
  "family.spouse": "Spouse",
  "family.child": "Child",
  "family.parent": "Parent",
  "family.sibling": "Sibling",
  "family.other": "Other",
  "family.noMembers": "No family members added yet.",
  "family.consultFor": "Consulting for",
  "family.remove": "Remove",
  "family.save": "Save Member",

  // ── Image Upload ──
  "img.upload": "Upload Report / Scan",
  "img.attached": "Reports attached",
  "img.preview": "View Reports",
  "img.dragDrop": "Drag & drop or click to upload",
  "img.formats": "JPG, PNG, PDF (max 5MB)",

  // ── AI Risk Prediction ──
  "risk.title": "AI Risk Prediction",
  "risk.probability": "Probability",
  "risk.reasoning": "Reasoning",
  "risk.recommendation": "Recommendation",
  "risk.noRisks": "No significant risk patterns detected.",
  "risk.high": "High Risk",
  "risk.medium": "Medium Risk",
  "risk.low": "Low Risk",

  // ── Offline Mode ──
  "offline.banner": "You are offline. Data is saved locally and will sync when connected.",
  "offline.synced": "Back online! Data synced.",
  "offline.pending": "pending actions",
};

const hi: Dict = {
  // ── Nav ──
  "nav.features": "सुविधाएँ",
  "nav.howItWorks": "यह कैसे काम करता है",
  "nav.impact": "प्रभाव",
  "nav.security": "सुरक्षा",
  "nav.tryDemo": "डेमो आज़माएँ",
  "nav.dashboard": "डैशबोर्ड",
  "nav.home": "होम",
  "nav.forHospitals": "अस्पतालों के लिए",
  "nav.contact": "संपर्क",
  "nav.signOut": "लॉग आउट",

  // ── Hero ──
  "hero.eyebrow": "एआई-संचालित क्लिनिकल सहायक",
  "hero.title": "स्वास्थ्य सेवा तेज़, स्मार्ट और निष्पक्ष होनी चाहिए।",
  "hero.subtitle": "NivaranAI आवाज़-आधारित परामर्श-पूर्व बातचीत करता है, SOAP नोट्स तैयार करता है और मरीज़ों को प्राथमिकता देता है — ताकि डॉक्टर देखभाल पर ध्यान दें, कागज़ी काम पर नहीं।",
  "hero.cta.primary": "लाइव डेमो आज़माएँ",
  "hero.cta.secondary": "लॉगिन / डैशबोर्ड",
  "hero.trust": "भारत भर के चिकित्सकों द्वारा भरोसेमंद",
  "hero.aes": "AES-256 एन्क्रिप्टेड",
  "hero.consultation": "परामर्श · लाइव",
  "hero.patientMsg": "मुझे दो दिनों से गले में खराश और हल्का बुखार है।",
  "hero.aiMsg": "क्या निगलने में कठिनाई या शरीर में दर्द है?",
  "hero.triage": "ट्राइएज",
  "hero.routine": "सामान्य",
  "hero.confidence": "विश्वसनीयता",
  "hero.soap": "SOAP",
  "hero.drafted": "तैयार",

  // ── Problem ──
  "problem.eyebrow": "वास्तविकता",
  "problem.title": "तीन शांत समस्याएँ जो क्लीनिकों को रोक रही हैं।",
  "problem.subtitle": "इनमें से कोई भी नाटकीय नहीं है। लेकिन सब मिलकर बड़ा असर डालती हैं — और मरीज़ हर दिन फ़र्क महसूस करते हैं।",
  "problem.doc.title": "दस्तावेज़ीकरण का बोझ",
  "problem.doc.body": "डॉक्टर अपने दिन का लगभग एक तिहाई हिस्सा नोट्स लिखने में बिताते हैं, मरीज़ों की देखभाल में नहीं।",
  "problem.lang.title": "भाषा की बाधा",
  "problem.lang.body": "मरीज़ अलग-अलग बोलियों में लक्षण बताने में कठिनाई महसूस करते हैं, जिससे महत्वपूर्ण जानकारी छूट जाती है।",
  "problem.queue.title": "अक्षम कतारें",
  "problem.queue.body": "स्मार्ट ट्राइएज के बिना, गंभीर मामले इंतज़ार करते हैं जबकि सामान्य मामले प्राइम टाइम लेते हैं।",

  // ── Solution ──
  "solution.eyebrow": "समाधान",
  "solution.title": "एक शांत प्रणाली जो भारी काम करती है।",
  "solution.voice.title": "आवाज़ इनपुट",
  "solution.voice.body": "मरीज़ अपनी भाषा में स्वाभाविक रूप से लक्षण बताता है।",
  "solution.ai.title": "एआई प्रोसेसिंग",
  "solution.ai.body": "SOAP नोट्स, ट्राइएज, और फॉलो-अप प्रश्न सेकंडों में।",
  "solution.dash.title": "स्मार्ट डैशबोर्ड",
  "solution.dash.body": "डॉक्टर समीक्षा करें, संपादित करें, और प्रिस्क्रिप्शन दें — तेज़ी से।",

  // ── How it works ──
  "how.eyebrow": "यह कैसे काम करता है",
  "how.title": "पाँच सरल चरण, शुरू से अंत तक।",
  "how.s1.title": "मरीज़ लक्षण बोलता है",
  "how.s1.body": "प्राकृतिक आवाज़ इनपुट — अंग्रेज़ी या हिंदी, कोई फॉर्म नहीं भरना।",
  "how.s2.title": "एआई स्मार्ट सवाल पूछता है",
  "how.s2.body": "अनुकूली फॉलो-अप पूरी क्लिनिकल तस्वीर उजागर करते हैं।",
  "how.s3.title": "SOAP नोट्स तैयार",
  "how.s3.body": "सब्जेक्टिव, ऑब्जेक्टिव, असेसमेंट, प्लान — स्वचालित रूप से तैयार।",
  "how.s4.title": "डॉक्टर समीक्षा करता है",
  "how.s4.body": "जगह पर संपादित करें, बारीकियाँ जोड़ें, एक मिनट में स्वीकृत करें।",
  "how.s5.title": "वॉइस प्रिस्क्रिप्शन भेजा गया",
  "how.s5.body": "सरल भाषा में WhatsApp पर मरीज़ को तुरंत भेजा गया।",

  // ── Features ──
  "features.eyebrow": "क्षमताएँ",
  "features.title": "क्लीनिक को जो चाहिए वो सब, जो नहीं चाहिए वो नहीं।",
  "feat.voice.title": "आवाज़-आधारित साक्षात्कार",
  "feat.voice.body": "बहुभाषी आवाज़ इनपुट स्वाभाविक रूप से लक्षण कैप्चर करता है — टाइपिंग की ज़रूरत नहीं।",
  "feat.ai.title": "एआई प्रश्न",
  "feat.ai.body": "Gemini द्वारा संचालित अनुकूली फॉलो-अप।",
  "feat.soap.title": "SOAP नोट्स",
  "feat.soap.body": "संरचित क्लिनिकल नोट्स स्वचालित रूप से तैयार।",
  "feat.triage.title": "स्मार्ट ट्राइएज",
  "feat.triage.body": "गंभीरता और इतिहास के आधार पर प्राथमिकता रैंकिंग।",
  "feat.dashboard.title": "डॉक्टर डैशबोर्ड",
  "feat.dashboard.body": "मरीज़ कतार, इतिहास, दवा इंटरैक्शन — एक स्क्रीन।",
  "feat.whatsapp.title": "WhatsApp प्रिस्क्रिप्शन",
  "feat.whatsapp.body": "सरल भाषा में सारांश तुरंत भेजे गए।",
  "feat.analytics.title": "एनालिटिक्स",
  "feat.analytics.body": "मरीज़ प्रवाह और परिणामों पर क्लीनिक-स्तरीय अंतर्दृष्टि।",

  // ── Impact ──
  "impact.eyebrow": "प्रभाव",
  "impact.title": "वापस दिए गए समय में मापा गया।",
  "impact.stat1": "प्रति मरीज़ बचाए गए मिनट",
  "impact.stat2": "प्रति क्लीनिक, प्रति सप्ताह बचाए गए घंटे",
  "impact.stat3": "दस्तावेज़ीकरण दक्षता",

  // ── Trust ──
  "trust.eyebrow": "विश्वास और सुरक्षा",
  "trust.title": "डिज़ाइन से शांत। डिफ़ॉल्ट से सुरक्षित।",
  "trust.enc.title": "AES-256 एन्क्रिप्शन",
  "trust.enc.body": "हर परामर्श और रिकॉर्ड के लिए एंड-टू-एंड सुरक्षा।",
  "trust.verified.title": "केवल सत्यापित डॉक्टर",
  "trust.verified.body": "प्लेटफ़ॉर्म पर शामिल होने से पहले हर चिकित्सक की समीक्षा की जाती है।",
  "trust.secure.title": "सुरक्षित डेटा हैंडलिंग",
  "trust.secure.body": "भूमिका-आधारित पहुँच, ऑडिट लॉग, और ज़ीरो-ट्रस्ट स्टोरेज।",

  // ── Future ──
  "future.eyebrow": "भविष्य के लिए तैयार",
  "future.title": "आगे जो आने वाला है उसके लिए बनाया गया।",
  "future.abha.title": "ABHA एकीकरण",
  "future.abha.tag": "जल्द आ रहा है",
  "future.abha.body": "एकीकृत मरीज़ रिकॉर्ड के लिए भारत के आयुष्मान भारत हेल्थ अकाउंट के साथ सिंक।",
  "future.offline.title": "ऑफ़लाइन मोड",
  "future.offline.tag": "रोडमैप पर",
  "future.offline.body": "ग्रामीण क्लीनिकों के लिए जहाँ कनेक्टिविटी रुक-रुक कर आती है — ऑनलाइन होने पर सिंक।",

  // ── CTA ──
  "cta.eyebrow": "टीम की ओर से एक संदेश",
  "cta.title": "हम सिर्फ़ सॉफ़्टवेयर नहीं बना रहे। हम स्वास्थ्य परिणामों में सुधार कर रहे हैं।",
  "cta.primary": "शुरू करें",
  "cta.secondary": "अस्पताल / क्लीनिक पंजीकृत करें",

  // ── Footer ──
  "footer.desc": "हम सिर्फ़ सॉफ़्टवेयर नहीं बना रहे। हम स्वास्थ्य परिणामों में सुधार कर रहे हैं।",
  "footer.product": "उत्पाद",
  "footer.account": "खाता",
  "footer.login": "लॉगिन",
  "footer.patientSignup": "मरीज़ साइनअप",
  "footer.doctorSignup": "डॉक्टर साइनअप",
  "footer.registerHospital": "अस्पताल / क्लीनिक पंजीकृत करें",
  "footer.admin": "एडमिन",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "footer.madeWith": "चिकित्सकों और मरीज़ों के लिए प्यार से बनाया गया।",

  // ── Dashboard Shell ──
  "shell.clinician": "चिकित्सक",
  "shell.patient": "मरीज़",
  "shell.backToSite": "साइट पर वापस",
  "shell.loading": "लोड हो रहा है…",

  // ── Header extras ──
  "header.forHospitals": "अस्पतालों के लिए",
  "header.contact": "संपर्क",

  // ── Patient Dashboard ──
  "pd.hello": "नमस्ते",
  "pd.subtitle": "आवाज़ से लक्षण बताएँ। एआई ट्राइएज करेगा, फिर हम आपको सही डॉक्टर तक पहुँचाएँगे।",
  "pd.step1": "चरण 1",
  "pd.aiInterviewer": "एआई साक्षात्कारकर्ता",
  "pd.answerQuestions": "टाइप करके या बोलकर कुछ सवालों के जवाब दें।",
  "pd.whereDoYouLive": "आप कहाँ रहते हैं? (जैसे 6-अंकीय पिनकोड 462001)",
  "pd.aiGreeting": "नमस्ते! आज आप यहाँ क्यों आए हैं? कृपया अपने लक्षण बताएँ।",
  "pd.aiTyping": "एआई टाइप कर रहा है...",
  "pd.listening": "सुन रहा है... (या यहाँ टाइप करें)",
  "pd.typeAnswer": "अपना जवाब टाइप करें...",
  "pd.skipAnalyze": "बाकी सवाल छोड़ें और अभी विश्लेषण करें",
  "pd.analyzing": "जवाबों का विश्लेषण हो रहा है...",
  "pd.urgentEmergency": "तत्काल आपातकालीन बाईपास",
  "pd.emergencyDetected": "आपातकाल का पता चला",
  "pd.distressDetected": "हमारे सिस्टम ने आपके इनपुट सत्र के दौरान संभावित तनाव का पता लगाया।",
  "pd.dispatchingAmbulance": "एम्बुलेंस और GPS अलर्ट नज़दीकी अस्पतालों को भेजे जा रहे हैं...",
  "pd.imOkay": "मैं ठीक हूँ - SOS रद्द करें",
  "pd.urgentEmergencyTitle": "तत्काल आपातकाल",
  "pd.describeEmergency": "कृपया मुख्य समस्या 1 वाक्य में बताएँ ताकि हम आपको तुरंत सही विभाग में भेज सकें।",
  "pd.emergencyPlaceholder": "जैसे दिल का दौरा, अत्यधिक रक्तस्राव...",
  "pd.cancel": "रद्द करें",
  "pd.routeImmediately": "तुरंत भेजें",
  "pd.routing": "भेजा जा रहा है...",
  "pd.kineticDistress": "🚨 काइनेटिक तनाव का पता चला – स्वचालित प्राथमिकता अपग्रेड",
  "pd.analyzingBehavior": "इनपुट व्यवहार का विश्लेषण हो रहा है...",
  "pd.symptoms": "लक्षण",
  "pd.aiAnalysis": "एआई विश्लेषण",
  "pd.assignment": "नियुक्ति",

  // ── Step 2 ──
  "pd.step2": "चरण 2",
  "pd.chooseDoctor": "अपना डॉक्टर चुनें",
  "pd.editSymptoms": "लक्षण संपादित करें",
  "pd.kineticOverride": "काइनेटिक तनाव का पता चला – प्राथमिकता अपग्रेड",
  "pd.aiAssessment": "एआई मूल्यांकन",
  "pd.criticalOverride": "गंभीर (ओवरराइड)",
  "pd.suggestedDept": "सुझाया गया विभाग",
  "pd.autoAssign": "स्वचालित नियुक्ति",
  "pd.autoAssignDesc": "एआई सबसे अच्छा डॉक्टर चुनता है",
  "pd.manual": "मैनुअल",
  "pd.manualDesc": "अस्पताल और डॉक्टर चुनें",
  "pd.autoAssignBtn": "मुझे स्वचालित रूप से डॉक्टर को नियुक्त करें",
  "pd.selectFacility": "अस्पताल / क्लीनिक",
  "pd.selectDept": "विभाग",
  "pd.selectDoctor": "डॉक्टर",
  "pd.selectFacilityPlaceholder": "सुविधा चुनें",
  "pd.selectDeptPlaceholder": "विभाग चुनें",
  "pd.pickFacilityFirst": "पहले सुविधा चुनें",
  "pd.selectDoctorPlaceholder": "डॉक्टर चुनें",
  "pd.pickDeptFirst": "पहले विभाग चुनें",
  "pd.confirmAssignment": "नियुक्ति की पुष्टि करें",
  "pd.noApprovedFacilities": "अभी कोई स्वीकृत अस्पताल या क्लीनिक नहीं है। एडमिन से स्वीकृति के लिए कहें।",

  // ── Step 3 ──
  "pd.assigned": "नियुक्त",
  "pd.youreBookedIn": "आपकी बुकिंग हो गई",
  "pd.aiAutoAssigned": "एआई ने स्वचालित नियुक्त किया",
  "pd.youChose": "आपने चुना",
  "pd.bestFitDoctor": "आपके लक्षणों के आधार पर सबसे उपयुक्त डॉक्टर।",
  "pd.qrPassport": "QR मेडिकल पासपोर्ट",
  "pd.scanAtEntry": "अस्पताल प्रवेश पर स्कैन करें",
  "pd.startAnother": "एक और परामर्श शुरू करें",
  "pd.roomFloor": "कमरा / मंज़िल",
  "pd.ground": "ग्राउंड",
  "pd.estimatedTime": "अनुमानित समय",

  // ── Queue Card ──
  "pd.queueStatus": "कतार की स्थिति",
  "pd.patientsWaiting": "मरीज़ इंतज़ार कर रहे हैं",
  "pd.triagePriority": "ट्राइएज प्राथमिकता",
  "pd.noActiveConsultation": "कोई सक्रिय परामर्श नहीं",
  "pd.speakToJoin": "कतार में शामिल होने के लिए अपने लक्षण बोलें। डॉक्टर तुरंत आपका SOAP नोट देखेगा।",
  "pd.liveStatus": "लाइव स्थिति",
  "pd.submitted": "जमा किया गया",
  "pd.doctorAccepted": "डॉक्टर ने स्वीकार किया",
  "pd.inConsultation": "परामर्श में",
  "pd.completed": "पूर्ण",
  "pd.now": "अभी",
  "pd.rejected": "डॉक्टर ने इस परामर्श को अस्वीकार कर दिया है। कृपया दूसरे डॉक्टर को आज़माएँ।",
  "pd.prescriptionReceived": "से प्रिस्क्रिप्शन प्राप्त हुआ",
  "pd.yourDoctor": "आपके डॉक्टर",
  "pd.estimatedWait": "अनुमानित प्रतीक्षा",
  "pd.minsApprox": "मिनट (लगभग)",
  "pd.room": "कमरा",
  "pd.floor": "ग्राउंड फ्लोर",

  // ── Submissions ──
  "pd.myConsultations": "मेरे परामर्श",
  "pd.nothingYet": "अभी कुछ नहीं — जब आप डॉक्टर को लक्षण भेजेंगे तो आपके पिछले परामर्श यहाँ दिखेंगे।",
  "pd.transcript": "ट्रांसक्रिप्ट",

  // ── Doctor Dashboard ──
  "dd.goodDay": "शुभ दिन, डॉ.",
  "dd.yourQueue": "आपकी कतार",
  "dd.liveQueue": "लाइव मरीज़ कतार — एआई ट्राइएज प्राथमिकता से क्रमबद्ध। SOAP नोट देखने के लिए कार्ड पर क्लिक करें।",
  "dd.verified": "● सत्यापित · स्वीकृत",
  "dd.patientsToday": "आज के मरीज़",
  "dd.critical": "गंभीर",
  "dd.urgent": "तत्काल",
  "dd.avgSeverity": "औसत गंभीरता",
  "dd.myQueue": "मेरी कतार",
  "dd.active": "सक्रिय",
  "dd.all": "सभी",
  "dd.normal": "सामान्य",
  "dd.noPatients": "अभी आपको कोई मरीज़ नियुक्त नहीं है।",
  "dd.noQueue": "कतार में अभी कोई मरीज़ नहीं है।",
  "dd.selectPatient": "SOAP नोट देखने के लिए कतार से एक मरीज़ चुनें।",
  "dd.soapNote": "SOAP नोट",
  "dd.dataProtected": "डेटा सुरक्षित",
  "dd.protected": "सुरक्षित",
  "dd.criticalCase": "गंभीर मामला — गंभीरता",
  "dd.prioritizeExam": "तत्काल जाँच को प्राथमिकता दें।",
  "dd.preExisting": "पहले से मौजूद स्थिति",
  "dd.considerDrug": "अपनी योजना में दवा इंटरैक्शन और सहरुग्णता पर विचार करें।",
  "dd.assignedMode": "नियुक्त",
  "dd.patientSaid": "मरीज़ ने कहा",
  "dd.previousVisits": "पिछली विज़िट",
  "dd.aiDraftedSoap": "एआई-ड्राफ्टेड SOAP",
  "dd.subjective": "सब्जेक्टिव",
  "dd.objective": "ऑब्जेक्टिव",
  "dd.assessment": "असेसमेंट",
  "dd.plan": "प्लान",
  "dd.downloadReport": "रिपोर्ट डाउनलोड करें (PDF)",
  "dd.reject": "अस्वीकार",
  "dd.accept": "स्वीकार",
  "dd.startConsultation": "परामर्श शुरू करें",
  "dd.prescriptionDelivered": "प्रिस्क्रिप्शन भेजा गया",
  "dd.consultationSummary": "परामर्श सारांश",
  "dd.addNotes": "क्लिनिकल नोट्स जोड़ें, निदान अपडेट करें...",
  "dd.prescribePlaceholder": "जैसे पैरासिटामोल 500mg ('इबुप्रोफेन' आज़माएँ)",
  "dd.sendPrescription": "प्रिस्क्रिप्शन भेजें",
  "dd.markComplete": "पूर्ण चिह्नित करें",
  "dd.drugWarning": "चेतावनी: मरीज़ की स्थिति या एलर्जी के साथ इंटरैक्ट कर सकता है।",
  "dd.prescriptionSent": "मरीज़ को प्रिस्क्रिप्शन भेजा गया ✅",
  "dd.prescriptionSentDesc": "SMS और वॉल्ट के माध्यम से सुरक्षित रूप से भेजा गया",
  "dd.whatsappPrescription": "WhatsApp Rx",

  // ── Hospital Dashboard ──
  "hd.hospitalPortal": "अस्पताल पोर्टल",
  "hd.facilityNotFound": "सुविधा नहीं मिली",
  "hd.facilityRemoved": "आपका सुविधा रिकॉर्ड हटा दिया गया हो सकता है। कृपया एडमिन से संपर्क करें।",
  "hd.backToLogin": "लॉगिन पर वापस",
  "hd.awaitingApproval": "स्वीकृति की प्रतीक्षा",
  "hd.logout": "लॉग आउट",

  // ── Family Profiles ──
  "family.title": "पारिवारिक स्वास्थ्य प्रोफ़ाइल",
  "family.addMember": "परिवार का सदस्य जोड़ें",
  "family.name": "नाम",
  "family.relation": "संबंध",
  "family.age": "उम्र",
  "family.gender": "लिंग",
  "family.bloodGroup": "रक्त समूह",
  "family.allergies": "एलर्जी",
  "family.preExisting": "पहले से मौजूद स्थितियाँ",
  "family.self": "स्वयं",
  "family.spouse": "पति/पत्नी",
  "family.child": "बच्चा",
  "family.parent": "माता-पिता",
  "family.sibling": "भाई-बहन",
  "family.other": "अन्य",
  "family.noMembers": "अभी कोई परिवार का सदस्य नहीं जोड़ा गया।",
  "family.consultFor": "के लिए परामर्श",
  "family.remove": "हटाएँ",
  "family.save": "सदस्य सहेजें",

  // ── Image Upload ──
  "img.upload": "रिपोर्ट / स्कैन अपलोड करें",
  "img.attached": "रिपोर्ट संलग्न",
  "img.preview": "रिपोर्ट देखें",
  "img.dragDrop": "अपलोड करने के लिए खींचें और छोड़ें या क्लिक करें",
  "img.formats": "JPG, PNG, PDF (अधिकतम 5MB)",

  // ── AI Risk Prediction ──
  "risk.title": "एआई जोखिम भविष्यवाणी",
  "risk.probability": "संभावना",
  "risk.reasoning": "तर्क",
  "risk.recommendation": "सिफ़ारिश",
  "risk.noRisks": "कोई महत्वपूर्ण जोखिम पैटर्न नहीं मिला।",
  "risk.high": "उच्च जोखिम",
  "risk.medium": "मध्यम जोखिम",
  "risk.low": "कम जोखिम",

  // ── Offline Mode ──
  "offline.banner": "आप ऑफ़लाइन हैं। डेटा स्थानीय रूप से सहेजा गया है और कनेक्ट होने पर सिंक होगा।",
  "offline.synced": "वापस ऑनलाइन! डेटा सिंक हो गया।",
  "offline.pending": "लंबित कार्य",
};

const dicts: Record<Lang, Dict> = { en, hi };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("nivaran.lang") as Lang | null;
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("nivaran.lang", l);
  };

  const t = (key: string) => dicts[lang][key] ?? dicts.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
