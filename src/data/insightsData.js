// Weekly Insights Data - Automated presence reports for clinicians

export const weeklyInsights = {
  reportDate: "2025-10-10",
  weekRange: "Oct 4 - Oct 10, 2025",
  
  // Overall presence score
  presenceScore: {
    current: 9.2,
    previous: 8.7,
    change: "+0.5",
    trend: "up",
    percentile: 94 // Top 6% of clinicians
  },
  
  // Empathy trend over weeks
  empathyTrend: [
    { week: "Sep 20", score: 8.1, sessions: 18 },
    { week: "Sep 27", score: 8.4, sessions: 20 },
    { week: "Oct 4", score: 8.7, sessions: 19 },
    { week: "Oct 11", score: 9.2, sessions: 22 }
  ],
  
  // Care loop performance
  careLoopPerformance: {
    closed: 12,
    opened: 7,
    overdue: 1,
    onTime: 11,
    avgCloseTime: "2.3 days"
  },
  
  // Patient attention needed
  patientsNeedingAttention: [
    {
      id: "patient-002",
      name: "Marcus Johnson",
      reason: "High disengagement risk (73%)",
      priority: "urgent",
      action: "Schedule second weekly session",
      daysAgo: 2
    },
    {
      id: "patient-004",
      name: "David Patel",
      reason: "Overdue medication review",
      priority: "high",
      action: "Complete med review this week",
      daysAgo: 5
    }
  ],
  
  // Wins this week
  wins: [
    {
      id: "win-1",
      icon: "trophy",
      title: "Closed 5 Care Loops",
      description: "Your fastest week yet! 3 days faster than average.",
      impact: "High"
    },
    {
      id: "win-2",
      icon: "heart",
      title: "Perfect Empathy Week",
      description: "All 6 sessions scored 9.0+ on empathy. Exceptional!",
      impact: "High"
    },
    {
      id: "win-3",
      icon: "users",
      title: "100% Patient Engagement",
      description: "All patients responded to check-ins within 24 hours.",
      impact: "Medium"
    },
    {
      id: "win-4",
      icon: "clock",
      title: "Zero Documentation Time",
      description: "Pe saved you 8.5 hours of note-writing this week.",
      impact: "High"
    }
  ],
  
  // Key insights
  insights: [
    {
      type: "success",
      title: "Emotional Connection Deepening",
      description: "Your patients are showing 28% more positive emotional shifts (relief, hope) compared to last month. This indicates stronger therapeutic alliance.",
      recommendation: "Continue your current empathic approach. Consider documenting your techniques for future training."
    },
    {
      type: "warning",
      title: "Mid-Week Energy Dip",
      description: "Your empathy scores are 12% lower on Wednesdays. This might indicate mid-week fatigue.",
      recommendation: "Consider scheduling lighter sessions on Wednesdays or taking a midday break."
    },
    {
      type: "info",
      title: "High-Risk Patient Alert",
      description: "Marcus Johnson's engagement dropped 31% this week. His relapse disclosure may indicate need for increased support.",
      recommendation: "Already scheduled: second weekly session. Consider coordinating with his substance use counselor."
    }
  ],
  
  // Session highlights
  sessionHighlights: {
    total: 22,
    avgDuration: 48, // minutes
    emotionalCuesDetected: 67,
    mostCommonEmotion: "anxiety",
    positiveShifts: 18, // sessions ending on positive note
    difficultSessions: 2
  },
  
  // Comparative stats
  comparative: {
    yourEmpathy: 9.2,
    networkAverage: 7.8,
    yourCareLoops: 12,
    networkAverage: 8,
    yourEngagement: 100,
    networkAverage: 79
  }
}

// Historical reports for archive
export const historicalReports = [
  {
    id: "report-2025-10-10",
    date: "2025-10-10",
    weekRange: "Oct 4 - Oct 10",
    presenceScore: 9.2,
    highlight: "Perfect empathy week - all sessions 9.0+"
  },
  {
    id: "report-2025-10-03",
    date: "2025-10-03",
    weekRange: "Sep 27 - Oct 3",
    presenceScore: 8.7,
    highlight: "Closed 12 care loops - personal best"
  },
  {
    id: "report-2025-09-26",
    date: "2025-09-26",
    weekRange: "Sep 20 - Sep 26",
    presenceScore: 8.4,
    highlight: "Zero missed follow-ups achieved"
  }
]

