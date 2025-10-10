// Multi-specialty mock data - Pe works for ALL physicians

export const multiSpecialtyPatients = [
  // Behavioral Health (existing)
  {
    id: "patient-001",
    resourceType: "Patient",
    name: [{ given: ["Sarah"], family: "Chen" }],
    gender: "female",
    birthDate: "1989-03-15",
    photo: "SC",
    specialty: "Behavioral Health",
    riskLevel: "moderate",
    lastVisit: "2025-10-08T14:00:00Z",
    nextVisit: "2025-10-15T14:00:00Z",
    diagnosis: ["Generalized Anxiety Disorder", "Major Depressive Disorder"],
    engagement: 100,
  },
  
  // Oncology
  {
    id: "patient-005",
    resourceType: "Patient",
    name: [{ given: ["Robert"], family: "Williams" }],
    gender: "male",
    birthDate: "1968-08-12",
    photo: "RW",
    specialty: "Oncology",
    riskLevel: "high",
    lastVisit: "2025-10-09T11:00:00Z",
    nextVisit: "2025-10-16T11:00:00Z",
    diagnosis: ["Stage II Colorectal Cancer", "Post-Chemotherapy"],
    engagement: 100,
  },

  // Cardiology
  {
    id: "patient-006",
    resourceType: "Patient",
    name: [{ given: ["Maria"], family: "Garcia" }],
    gender: "female",
    birthDate: "1955-04-22",
    photo: "MG",
    specialty: "Cardiology",
    riskLevel: "moderate",
    lastVisit: "2025-10-07T09:00:00Z",
    nextVisit: "2025-10-21T09:00:00Z",
    diagnosis: ["Congestive Heart Failure", "Hypertension", "Type 2 Diabetes"],
    engagement: 100,
  },

  // Primary Care
  {
    id: "patient-007",
    resourceType: "Patient",
    name: [{ given: ["James"], family: "Thompson" }],
    gender: "male",
    birthDate: "1992-11-30",
    photo: "JT",
    specialty: "Primary Care",
    riskLevel: "low",
    lastVisit: "2025-10-05T15:00:00Z",
    nextVisit: "2025-11-05T15:00:00Z",
    diagnosis: ["Annual Physical", "Pre-Diabetes Monitoring"],
    engagement: 100,
  },

  // Pediatrics
  {
    id: "patient-008",
    resourceType: "Patient",
    name: [{ given: ["Emma"], family: "Lee" }],
    gender: "female",
    birthDate: "2018-02-14",
    photo: "EL",
    specialty: "Pediatrics",
    riskLevel: "low",
    lastVisit: "2025-10-06T10:00:00Z",
    nextVisit: "2025-10-20T10:00:00Z",
    diagnosis: ["Well Child Visit", "Asthma (Mild)"],
    engagement: 100,
    guardian: "Lisa Lee (Mother)"
  },

  // OB/GYN
  {
    id: "patient-009",
    resourceType: "Patient",
    name: [{ given: ["Priya"], family: "Sharma" }],
    gender: "female",
    birthDate: "1991-07-18",
    photo: "PS",
    specialty: "OB/GYN",
    riskLevel: "moderate",
    lastVisit: "2025-10-08T13:00:00Z",
    nextVisit: "2025-10-15T13:00:00Z",
    diagnosis: ["Pregnancy - 28 weeks", "Gestational Diabetes"],
    engagement: 100,
  },
]

export const multiSpecialtySessions = [
  // Oncology session
  {
    id: "session-003",
    patientId: "patient-005",
    specialty: "Oncology",
    date: "2025-10-09T11:00:00Z",
    duration: 30,
    type: "follow-up",
    status: "completed",
    emotionalCues: [
      { timestamp: "00:05:30", emotion: "anxiety", intensity: "high", context: "Discussing scan results" },
      { timestamp: "00:12:15", emotion: "relief", intensity: "high", context: "Good news - tumor shrinking" },
      { timestamp: "00:20:00", emotion: "determination", intensity: "moderate", context: "Committing to treatment plan" },
    ],
    transcript: [
      { speaker: "Patient", text: "I've been really anxious waiting for these scan results. I couldn't sleep last night.", timestamp: "00:05:20" },
      { speaker: "Physician", text: "I understand how stressful this waiting period can be. Let me share the good news - your scans show the tumor has shrunk by 40%.", timestamp: "00:05:45" },
      { speaker: "Patient", text: "Oh thank God. That's amazing. So the chemo is working?", timestamp: "00:06:10" },
      { speaker: "Physician", text: "Yes, Robert. The treatment is working very well. I know the side effects have been tough, but this shows it's worth it.", timestamp: "00:06:25" },
    ],
    aiDraftNote: {
      subjective: "Patient reports significant pre-appointment anxiety regarding scan results, with sleep disturbance. Expressed relief upon learning of positive response to chemotherapy. Continues to experience fatigue and nausea from treatment but states symptoms are manageable with anti-emetics.",
      objective: "Patient appears well-nourished and in no acute distress. Vital signs stable. Recent CT scan shows 40% reduction in tumor size. Tolerating chemotherapy regimen with expected side effects managed by supportive care.",
      assessment: "Stage II colorectal cancer with excellent response to FOLFOX chemotherapy. Tumor shrinkage indicates sensitivity to current regimen. Patient demonstrates strong treatment adherence and positive coping despite challenging side effects.",
      plan: "Continue current chemotherapy protocol for 3 more cycles. Schedule follow-up CT in 6 weeks. Maintain supportive care for nausea. Discussed positive prognosis and importance of completing full treatment course. Patient verbalized understanding and commitment.",
      empathicNotes: [
        "Patient's anxiety about scan results was palpable - validate this normal fear",
        "Relief and joy at good news - take time to celebrate this milestone with him",
        "Acknowledge courage in tolerating difficult treatment - reinforces adherence"
      ]
    },
    careLoops: [
      { id: "loop-008", type: "imaging", description: "Schedule follow-up CT scan in 6 weeks", dueDate: "2025-11-20", status: "pending" },
      { id: "loop-009", type: "medication", description: "Review anti-nausea medication effectiveness", dueDate: "2025-10-16", status: "pending" },
    ]
  },

  // Cardiology session
  {
    id: "session-004",
    patientId: "patient-006",
    specialty: "Cardiology",
    date: "2025-10-07T09:00:00Z",
    duration: 20,
    type: "chronic-care",
    status: "completed",
    emotionalCues: [
      { timestamp: "00:03:00", emotion: "concern", intensity: "moderate", context: "Weight gain discussion" },
      { timestamp: "00:08:45", emotion: "frustration", intensity: "moderate", context: "Medication side effects" },
      { timestamp: "00:15:20", emotion: "acceptance", intensity: "moderate", context: "Agreeing to lifestyle changes" },
    ],
    transcript: [
      { speaker: "Patient", text: "Doctor, I've gained 5 pounds this month even though I'm trying to watch what I eat.", timestamp: "00:02:50" },
      { speaker: "Physician", text: "I see that, Maria. Let's talk about this. With heart failure, water retention can cause weight gain. Have you been taking your diuretic every day?", timestamp: "00:03:10" },
      { speaker: "Patient", text: "Most days, yes. But sometimes I forget because it makes me go to the bathroom so much.", timestamp: "00:03:35" },
    ],
    aiDraftNote: {
      subjective: "Patient reports 5-pound weight gain over past month despite dietary efforts. Admits inconsistent diuretic compliance due to urinary frequency concerns. Denies increased shortness of breath or edema. Some frustration with medication side effects.",
      objective: "BP 142/88, HR 78, Weight 168 lbs (+5 from last visit). Trace bilateral pedal edema. Lungs clear to auscultation. S3 gallop present. JVP mildly elevated.",
      assessment: "CHF (NYHA Class II) with suboptimal control secondary to medication non-adherence. Hypertension not at goal. Type 2 diabetes with acceptable HbA1c. Patient requires education on importance of diuretic compliance and fluid management.",
      plan: "1) Emphasized critical importance of daily diuretic for heart failure management. 2) Recommend taking furosemide in morning to minimize sleep disruption. 3) Instructed on daily weights and when to call if >3lb gain in 2 days. 4) Referred to dietitian for low-sodium diet education. 5) Recheck in 2 weeks with labs (BMP, BNP).",
      empathicNotes: [
        "Patient's frustration with medication side effects is valid - acknowledge the burden",
        "Weight gain causes her visible concern - address emotional impact, not just clinical",
        "She's trying her best with diet - celebrate efforts, don't criticize"
      ]
    },
    careLoops: [
      { id: "loop-010", type: "lab", description: "Order BMP and BNP labs", dueDate: "2025-10-14", status: "pending" },
      { id: "loop-011", type: "referral", description: "Dietitian referral for low-sodium counseling", dueDate: "2025-10-12", status: "pending" },
      { id: "loop-012", type: "follow-up", description: "2-week follow-up visit with labs review", dueDate: "2025-10-21", status: "pending" },
    ]
  },
]

export const specialtyMetrics = {
  "Behavioral Health": {
    avgSessionTime: 50,
    documentationTime: 25,
    empathyImportance: 10, // 1-10 scale
    commonEmotions: ["anxiety", "sadness", "hope"]
  },
  "Oncology": {
    avgSessionTime: 30,
    documentationTime: 15,
    empathyImportance: 10,
    commonEmotions: ["fear", "relief", "determination"]
  },
  "Cardiology": {
    avgSessionTime: 20,
    documentationTime: 12,
    empathyImportance: 8,
    commonEmotions: ["concern", "frustration", "acceptance"]
  },
  "Primary Care": {
    avgSessionTime: 15,
    documentationTime: 10,
    empathyImportance: 7,
    commonEmotions: ["curiosity", "concern", "satisfaction"]
  },
  "Pediatrics": {
    avgSessionTime: 20,
    documentationTime: 10,
    empathyImportance: 9,
    commonEmotions: ["fear", "comfort", "playfulness"]
  },
  "OB/GYN": {
    avgSessionTime: 25,
    documentationTime: 12,
    empathyImportance: 9,
    commonEmotions: ["anxiety", "excitement", "concern"]
  }
}

export const universalClinicians = [
  {
    id: "clinician-001",
    name: "Dr. Lisa Martinez",
    specialty: "Clinical Psychology",
    patients: 24,
    primarySpecialty: "Behavioral Health"
  },
  {
    id: "clinician-002",
    name: "Dr. Michael Chen",
    specialty: "Medical Oncology",
    patients: 32,
    primarySpecialty: "Oncology"
  },
  {
    id: "clinician-003",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    patients: 45,
    primarySpecialty: "Cardiology"
  },
  {
    id: "clinician-004",
    name: "Dr. James Miller",
    specialty: "Family Medicine",
    patients: 180,
    primarySpecialty: "Primary Care"
  }
]

