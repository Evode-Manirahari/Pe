// Relational Memory Graph - Advanced data structure for Pe Phase 2+

// Graph nodes: patients, clinicians, emotional states, interactions
export const relationalGraphNodes = {
  patients: [
    {
      id: "patient-001",
      name: "Sarah Chen",
      type: "patient",
      metadata: {
        engagementScore: 100,
        trustLevel: 9.2,
        communicationPreference: "text-heavy",
        emotionalBaseline: "anxious-optimistic"
      },
      connections: ["clinician-001", "emotion-anxiety", "emotion-hope"]
    },
    {
      id: "patient-002",
      name: "Marcus Johnson",
      type: "patient",
      metadata: {
        engagementScore: 100,
        trustLevel: 8.7,
        communicationPreference: "direct-brief",
        emotionalBaseline: "guarded-determined"
      },
      connections: ["clinician-001", "emotion-shame", "emotion-determination"]
    }
  ],
  clinicians: [
    {
      id: "clinician-001",
      name: "Dr. Lisa Martinez",
      type: "clinician",
      metadata: {
        specialty: "Clinical Psychology",
        empathyScore: 10,
        communicationStyle: "warm-structured",
        activePatients: 24
      }
    }
  ],
  emotions: [
    { id: "emotion-anxiety", label: "Anxiety", category: "distress", intensity: "moderate" },
    { id: "emotion-hope", label: "Hope", category: "positive", intensity: "growing" },
    { id: "emotion-shame", label: "Shame", category: "distress", intensity: "high" },
    { id: "emotion-determination", label: "Determination", category: "positive", intensity: "moderate" }
  ]
}

// Graph edges: interactions over time with context
export const relationalGraphEdges = [
  {
    id: "edge-001",
    source: "patient-001",
    target: "clinician-001",
    type: "therapy-session",
    timestamp: "2025-10-08T14:00:00Z",
    context: {
      emotionalShift: { from: "high-anxiety", to: "moderate-relief" },
      keyTopics: ["work stress", "coping strategies"],
      therapeuticAlliance: 9.1
    }
  },
  {
    id: "edge-002",
    source: "patient-002",
    target: "clinician-001",
    type: "crisis-intervention",
    timestamp: "2025-10-09T10:00:00Z",
    context: {
      emotionalShift: { from: "shame-anger", to: "determination" },
      keyTopics: ["relapse disclosure", "recovery commitment"],
      therapeuticAlliance: 8.9
    }
  }
]

// Multi-variant note generation templates
export const noteVariants = {
  "session-001": [
    {
      id: "variant-clinical",
      style: "clinical-formal",
      tone: "professional",
      subjective: "Patient reports elevated anxiety related to workplace performance concerns, particularly anticipatory anxiety before presentations. Describes physiological symptoms including tachycardia. Reports difficulty implementing previously learned CBT techniques in high-stress situations. Also mentions ongoing family relationship strain.",
      empathyLevel: 6,
      readability: 8
    },
    {
      id: "variant-empathic",
      style: "empathic-warm",
      tone: "compassionate",
      subjective: "Sarah shared feeling genuinely overwhelmed at work this week—her heart races just thinking about going in. She's particularly struggling with presentations, describing that familiar fear of being judged or making mistakes. While she's tried the thought-challenging we practiced, it's been hard to remember those tools when anxiety hits. She also opened up about family tensions that are weighing on her.",
      empathyLevel: 9,
      readability: 9
    },
    {
      id: "variant-balanced",
      style: "balanced-humanistic",
      tone: "warm-professional",
      subjective: "Patient reports increased work-related anxiety this week, especially around presentations. She describes physical symptoms (racing heart) and difficulty accessing cognitive restructuring skills in the moment. Sarah showed vulnerability in sharing these challenges and also mentioned ongoing family relationship concerns that contribute to her stress.",
      empathyLevel: 8,
      readability: 9
    }
  ]
}

// Experimentation framework data
export const activeExperiments = [
  {
    id: "exp-001",
    name: "Empathic vs. Clinical Note Style",
    status: "running",
    startDate: "2025-10-01",
    hypothesis: "More empathic note styles improve patient perceived care quality without sacrificing clinical accuracy",
    cohorts: [
      { name: "Control (Clinical)", size: 12, noteStyle: "clinical-formal" },
      { name: "Treatment (Empathic)", size: 12, noteStyle: "empathic-warm" }
    ],
    metrics: [
      { name: "Patient satisfaction", control: 7.8, treatment: 9.2, change: "+18%" },
      { name: "Therapeutic alliance", control: 8.1, treatment: 9.4, change: "+16%" },
      { name: "Clinician time", control: 8.5, treatment: 8.2, change: "-4%" }
    ],
    significance: 0.03,
    recommendation: "Strong evidence to adopt empathic style"
  },
  {
    id: "exp-002",
    name: "Follow-up Message Timing",
    status: "running",
    startDate: "2025-09-15",
    hypothesis: "Midweek check-ins (Wed) have higher engagement than Monday messages",
    cohorts: [
      { name: "Monday messages", size: 15, timing: "monday-9am" },
      { name: "Wednesday messages", size: 15, timing: "wednesday-2pm" }
    ],
    metrics: [
      { name: "Response rate", control: 68, treatment: 89, change: "+31%" },
      { name: "Session attendance", control: 87, treatment: 96, change: "+10%" },
      { name: "Perceived support", control: 7.9, treatment: 8.8, change: "+11%" }
    ],
    significance: 0.007,
    recommendation: "Switch to Wednesday afternoon messaging"
  }
]

// Predictive analytics models
export const riskPredictions = [
  {
    patientId: "patient-002",
    patientName: "Marcus Johnson",
    riskType: "disengagement",
    probability: 0.73,
    confidence: 0.89,
    factors: [
      { factor: "Recent relapse event", weight: 0.35 },
      { factor: "High shame emotion detected", weight: 0.25 },
      { factor: "Decreased message response rate", weight: 0.13 }
    ],
    recommendation: "Increase session frequency to 2x/week; proactive outreach within 48h",
    interventions: [
      { action: "Schedule second weekly session", priority: "high", status: "pending" },
      { action: "Send supportive check-in message", priority: "high", status: "completed" },
      { action: "Coordinate with substance use counselor", priority: "medium", status: "pending" }
    ]
  },
  {
    patientId: "patient-004",
    patientName: "David Patel",
    riskType: "care-fragmentation",
    probability: 0.68,
    confidence: 0.82,
    factors: [
      { factor: "Overdue medication review", weight: 0.40 },
      { factor: "Missed last check-in", weight: 0.18 },
      { factor: "Complex care coordination needed", weight: 0.10 }
    ],
    recommendation: "Complete medication review urgently; assign care coordinator",
    interventions: [
      { action: "Emergency med review", priority: "urgent", status: "overdue" },
      { action: "Assign dedicated care coordinator", priority: "high", status: "pending" }
    ]
  }
]

// Simulation scenarios for "what-if" analysis
export const simulationScenarios = [
  {
    id: "sim-001",
    name: "Universal Empathic Notes + Midweek Check-ins",
    description: "Apply empathic note style to all patients + Wednesday afternoon check-ins",
    projectedImpact: {
      patientSatisfaction: { current: 79, projected: 91, change: "+15%" },
      engagement: { current: 100, projected: 100, change: "0%" },
      missedFollowups: { current: 0, projected: 0, change: "0%" },
      therapeuticAlliance: { current: 8.7, projected: 9.5, change: "+9%" }
    },
    implementation: {
      effort: "low",
      timeframe: "1 week",
      cost: "minimal"
    },
    confidence: 0.91
  },
  {
    id: "sim-002",
    name: "Predictive Risk Intervention Protocol",
    description: "Implement proactive interventions for all patients above 65% disengagement risk",
    projectedImpact: {
      disengagementRate: { current: 5, projected: 1, change: "-80%" },
      crisisInterventions: { current: 3, projected: 1, change: "-67%" },
      overallOutcomes: { current: 8.2, projected: 9.1, change: "+11%" }
    },
    implementation: {
      effort: "medium",
      timeframe: "2 weeks",
      cost: "moderate"
    },
    confidence: 0.84
  }
]

