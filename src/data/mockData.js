// Mock FHIR-compliant data for behavioral health telehealth scenarios

export const mockPatients = [
  {
    id: "patient-001",
    resourceType: "Patient",
    name: [{ given: ["Sarah"], family: "Chen" }],
    gender: "female",
    birthDate: "1989-03-15",
    photo: "SC",
    riskLevel: "moderate",
    lastSession: "2025-10-08T14:00:00Z",
    nextSession: "2025-10-15T14:00:00Z",
    diagnosis: ["Generalized Anxiety Disorder", "Major Depressive Disorder"],
    engagement: 100,
  },
  {
    id: "patient-002",
    resourceType: "Patient",
    name: [{ given: ["Marcus"], family: "Johnson" }],
    gender: "male",
    birthDate: "1995-07-22",
    photo: "MJ",
    riskLevel: "high",
    lastSession: "2025-10-09T10:00:00Z",
    nextSession: "2025-10-11T10:00:00Z",
    diagnosis: ["PTSD", "Substance Use Disorder"],
    engagement: 100,
  },
  {
    id: "patient-003",
    resourceType: "Patient",
    name: [{ given: ["Emily"], family: "Rodriguez" }],
    gender: "female",
    birthDate: "2001-11-08",
    photo: "ER",
    riskLevel: "low",
    lastSession: "2025-10-07T16:00:00Z",
    nextSession: "2025-10-14T16:00:00Z",
    diagnosis: ["Social Anxiety Disorder"],
    engagement: 100,
  },
  {
    id: "patient-004",
    resourceType: "Patient",
    name: [{ given: ["David"], family: "Patel" }],
    gender: "male",
    birthDate: "1987-05-30",
    photo: "DP",
    riskLevel: "moderate",
    lastSession: "2025-10-06T11:00:00Z",
    nextSession: "2025-10-13T11:00:00Z",
    diagnosis: ["Bipolar II Disorder"],
    engagement: 100,
  },
];

export const mockSessions = [
  {
    id: "session-001",
    patientId: "patient-001",
    date: "2025-10-08T14:00:00Z",
    duration: 50,
    type: "therapy",
    status: "completed",
    emotionalCues: [
      { timestamp: "00:03:20", emotion: "anxiety", intensity: "high", context: "Discussing work stress" },
      { timestamp: "00:15:45", emotion: "sadness", intensity: "moderate", context: "Family relationship strain" },
      { timestamp: "00:35:10", emotion: "relief", intensity: "moderate", context: "Discussing coping strategies" },
      { timestamp: "00:42:30", emotion: "hope", intensity: "low", context: "Setting weekly goals" },
    ],
    transcript: [
      { speaker: "Patient", text: "I've been feeling really overwhelmed at work this week. Every time I think about going in, my heart starts racing.", timestamp: "00:03:15" },
      { speaker: "Clinician", text: "That sounds really difficult, Sarah. Can you tell me more about what specifically triggers that feeling?", timestamp: "00:03:35" },
      { speaker: "Patient", text: "It's mostly when I have to present in meetings. I feel like everyone is judging me, waiting for me to mess up.", timestamp: "00:03:55" },
      { speaker: "Clinician", text: "Those thoughts sound exhausting. We've talked before about challenging those automatic thoughts. Have you been able to practice that?", timestamp: "00:04:20" },
      { speaker: "Patient", text: "I tried a few times, but it's hard to remember in the moment when I'm so anxious.", timestamp: "00:04:45" },
    ],
    aiDraftNote: {
      subjective: "Patient reports increased work-related anxiety, particularly around presentations and meetings. Describes physical symptoms including racing heart. Acknowledges difficulty implementing cognitive restructuring techniques in high-stress moments. Also mentions ongoing family relationship strain.",
      objective: "Patient appeared visibly anxious during early session, with improved affect when discussing coping strategies. Good engagement throughout 50-minute telehealth session. Demonstrates insight into anxiety triggers.",
      assessment: "Generalized Anxiety Disorder with moderate severity this week. Social anxiety component pronounced in work setting. Patient shows motivation to improve but needs additional support with real-time coping strategies.",
      plan: "Continue weekly therapy sessions. Focus on: 1) Graded exposure to presentation anxiety, 2) Practice mindfulness techniques for in-the-moment anxiety management, 3) Follow up on family dynamics in next session. Encouraged to use anxiety log between sessions.",
      empathicNotes: [
        "Patient showed vulnerability discussing work fears - validate courage in sharing",
        "Consider sending brief check-in message midweek about anxiety log",
        "Patient mentioned feeling 'hopeful' at session end - important positive shift to acknowledge"
      ]
    },
    careLoops: [
      { id: "loop-001", type: "follow-up", description: "Check anxiety log completion", dueDate: "2025-10-11", status: "pending" },
      { id: "loop-002", type: "assessment", description: "PHQ-9 depression screening due", dueDate: "2025-10-15", status: "pending" },
    ]
  },
  {
    id: "session-002",
    patientId: "patient-002",
    date: "2025-10-09T10:00:00Z",
    duration: 50,
    type: "therapy",
    status: "completed",
    emotionalCues: [
      { timestamp: "00:08:15", emotion: "anger", intensity: "high", context: "Discussing triggering event" },
      { timestamp: "00:18:30", emotion: "shame", intensity: "high", context: "Substance use relapse" },
      { timestamp: "00:35:00", emotion: "determination", intensity: "moderate", context: "Commitment to recovery" },
    ],
    transcript: [
      { speaker: "Patient", text: "I messed up again last weekend. I was doing so well for three months.", timestamp: "00:08:10" },
      { speaker: "Clinician", text: "Marcus, thank you for being honest with me about that. Recovery isn't linear, and this doesn't erase the progress you've made. Can you walk me through what happened?", timestamp: "00:08:30" },
    ],
    aiDraftNote: {
      subjective: "Patient disclosed substance use relapse after 3 months of sobriety. Reports significant shame and self-criticism. Identifies specific trigger (anniversary of traumatic event). Expresses desire to recommit to recovery plan.",
      objective: "Patient displayed intense emotional responses during session, including anger and shame, but able to engage in therapeutic conversation. Maintained eye contact and showed openness to support.",
      assessment: "PTSD with comorbid Substance Use Disorder. Recent relapse represents setback but patient demonstrates insight and motivation. Requires enhanced support and possible care coordination.",
      plan: "1) Increase session frequency to twice weekly for next 2 weeks, 2) Coordinate with substance use counselor for additional support group referral, 3) Develop crisis plan for anniversary dates, 4) Follow up on psychiatric medication adherence.",
      empathicNotes: [
        "Patient's willingness to disclose relapse shows trust in therapeutic relationship - crucial to maintain",
        "Reframe 'failure' narrative - 3 months sober is significant achievement",
        "Send supportive check-in within 24-48 hours to reinforce commitment"
      ]
    },
    careLoops: [
      { id: "loop-003", type: "referral", description: "Substance use counselor referral", dueDate: "2025-10-12", status: "pending" },
      { id: "loop-004", type: "coordination", description: "Confirm psychiatric med adherence", dueDate: "2025-10-11", status: "urgent" },
      { id: "loop-005", type: "scheduling", description: "Schedule second weekly session", dueDate: "2025-10-10", status: "pending" },
    ]
  },
];

export const mockCareLoops = [
  {
    id: "loop-001",
    patientId: "patient-001",
    patientName: "Sarah Chen",
    type: "follow-up",
    priority: "medium",
    description: "Check anxiety log completion",
    dueDate: "2025-10-11T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-08T14:50:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-002",
    patientId: "patient-001",
    patientName: "Sarah Chen",
    type: "assessment",
    priority: "medium",
    description: "PHQ-9 depression screening due",
    dueDate: "2025-10-15T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-08T14:50:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-003",
    patientId: "patient-002",
    patientName: "Marcus Johnson",
    type: "referral",
    priority: "high",
    description: "Substance use counselor referral - coordinate care",
    dueDate: "2025-10-12T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-09T11:00:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-004",
    patientId: "patient-002",
    patientName: "Marcus Johnson",
    type: "coordination",
    priority: "urgent",
    description: "Confirm psychiatric medication adherence with prescriber",
    dueDate: "2025-10-11T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-09T11:00:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-005",
    patientId: "patient-002",
    patientName: "Marcus Johnson",
    type: "scheduling",
    priority: "high",
    description: "Schedule second weekly session (increased frequency)",
    dueDate: "2025-10-10T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-09T11:00:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-006",
    patientId: "patient-003",
    patientName: "Emily Rodriguez",
    type: "follow-up",
    priority: "low",
    description: "Check in on exposure therapy homework progress",
    dueDate: "2025-10-14T23:59:59Z",
    status: "pending",
    createdDate: "2025-10-07T17:00:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
  {
    id: "loop-007",
    patientId: "patient-004",
    patientName: "David Patel",
    type: "medication",
    priority: "high",
    description: "Review mood stabilizer dosage - patient reported side effects",
    dueDate: "2025-10-11T23:59:59Z",
    status: "overdue",
    createdDate: "2025-10-06T12:00:00Z",
    assignedTo: "Dr. Lisa Martinez",
  },
];

export const mockMetrics = {
  documentationTime: {
    before: 120, // minutes per day
    after: 0,    // minutes per day - fully automated
    percentReduction: 100,
  },
  careLoopsClosed: {
    thisWeek: 16,
    lastWeek: 8,
    percentIncrease: 100,
  },
  patientEngagement: {
    averageScore: 100,
    trend: "+26%",
  },
  missedFollowUps: {
    before: 15, // percent
    after: 0,   // percent - zero missed follow-ups
    percentReduction: 100,
  },
  empathyScore: {
    current: 10,
    baseline: 7.1,
    scale: 10,
  },
  burnoutReduction: {
    current: 0,  // percent reporting burnout - zero burnout
    baseline: 45, // percent reporting burnout
    improvement: 100,
  }
};

export const mockClinician = {
  id: "clinician-001",
  name: "Dr. Lisa Martinez",
  specialty: "Licensed Clinical Psychologist",
  email: "lisa.martinez@behavioralhealth.care",
  photo: "LM",
  patientsCount: 24,
  sessionsTodayCount: 6,
};

