import React, { useState } from 'react'
import { 
  Sparkles, 
  TrendingUp, 
  Award,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Mail,
  Download,
  Calendar,
  Trophy,
  Zap,
  Target,
  Info
} from 'lucide-react'
import { weeklyInsights, historicalReports } from '../data/insightsData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Insights = () => {
  const [selectedReport, setSelectedReport] = useState('current')

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-success-700 bg-success-50'
    if (score >= 8) return 'text-accent-700 bg-accent-50'
    if (score >= 7) return 'text-blue-700 bg-blue-50'
    return 'text-dark-700 bg-beige-100'
  }

  const getInsightIcon = (type) => {
    if (type === 'success') return { icon: CheckCircle2, color: 'text-success-700 bg-success-100' }
    if (type === 'warning') return { icon: AlertTriangle, color: 'text-accent-700 bg-accent-100' }
    return { icon: Info, color: 'text-blue-700 bg-blue-100' }
  }

  const getWinIcon = (icon) => {
    const icons = {
      trophy: Trophy,
      heart: Heart,
      users: Users,
      clock: Clock,
      zap: Zap
    }
    return icons[icon] || Award
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-dark-950 tracking-tight flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-accent-500" />
            Weekly Insights
          </h1>
          <p className="text-dark-600 mt-2">Your presence performance report for {weeklyInsights.weekRange}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Presence Score Hero Card */}
      <div className="card bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 text-dark-950 border-0 shadow-accent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Your Presence Score</p>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-7xl font-bold">{weeklyInsights.presenceScore.current}</span>
              <div>
                <span className="text-3xl font-semibold">/10</span>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xl font-semibold">{weeklyInsights.presenceScore.change}</span>
                  <span className="text-sm opacity-90">from last week</span>
                </div>
              </div>
            </div>
            <div className="inline-block px-4 py-2 bg-dark-950 text-white rounded-lg">
              <span className="font-semibold">Top {100 - weeklyInsights.presenceScore.percentile}%</span> of all clinicians on Pe
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="p-8 bg-dark-950/10 rounded-2xl backdrop-blur-sm">
              <Award className="w-32 h-32 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">{weeklyInsights.careLoopPerformance.closed}</p>
          <p className="text-sm text-dark-600 mt-1">Care Loops Closed</p>
          <p className="text-xs text-success-700 mt-2 font-medium">+{weeklyInsights.careLoopPerformance.closed - 7} from last week</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Heart className="w-5 h-5 text-accent-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">{weeklyInsights.sessionHighlights.total}</p>
          <p className="text-sm text-dark-600 mt-1">Sessions This Week</p>
          <p className="text-xs text-dark-500 mt-2">{weeklyInsights.sessionHighlights.positiveShifts} ended on positive note</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">8.5h</p>
          <p className="text-sm text-dark-600 mt-1">Time Saved on Notes</p>
          <p className="text-xs text-dark-500 mt-2">100% automation this week</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">100%</p>
          <p className="text-sm text-dark-600 mt-1">Patient Engagement</p>
          <p className="text-xs text-success-700 mt-2 font-medium">All patients active</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Trends & Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Empathy Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-950">Empathy Score Trend</h3>
              <span className={`badge ${getScoreColor(weeklyInsights.presenceScore.current)}`}>
                Excellent Performance
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyInsights.empathyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis domain={[7, 10]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #f5f1ea',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#facc15" 
                  strokeWidth={3}
                  dot={{ fill: '#facc15', r: 6 }}
                  name="Empathy Score"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-accent-50 rounded-lg">
              <p className="text-sm text-dark-700">
                <span className="font-semibold text-accent-700">📈 Upward trend:</span> Your empathy score increased by 13% over the last 4 weeks. Keep up the excellent work!
              </p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="card">
            <h3 className="text-lg font-semibold text-dark-950 mb-4">Key Insights</h3>
            <div className="space-y-4">
              {weeklyInsights.insights.map((insight, idx) => {
                const IconInfo = getInsightIcon(insight.type)
                return (
                  <div key={idx} className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${IconInfo.color}`}>
                        <IconInfo.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-950 mb-2">{insight.title}</h4>
                        <p className="text-sm text-dark-700 mb-3">{insight.description}</p>
                        <div className="p-3 bg-white rounded border border-beige-200">
                          <p className="text-xs font-semibold text-dark-600 uppercase tracking-wide mb-1">Recommendation</p>
                          <p className="text-sm text-dark-900">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comparative Performance */}
          <div className="card bg-primary-950 text-white">
            <h3 className="text-lg font-semibold mb-4">How You Compare</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{weeklyInsights.comparative.yourEmpathy}</p>
                <p className="text-sm text-primary-200 mb-2">Your Empathy</p>
                <div className="text-xs bg-white/10 rounded px-2 py-1">
                  Network: {weeklyInsights.comparative.networkAverage}
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{weeklyInsights.comparative.yourCareLoops}</p>
                <p className="text-sm text-primary-200 mb-2">Loops Closed</p>
                <div className="text-xs bg-white/10 rounded px-2 py-1">
                  Network: {weeklyInsights.comparative.networkAverage}
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{weeklyInsights.comparative.yourEngagement}%</p>
                <p className="text-sm text-primary-200 mb-2">Engagement</p>
                <div className="text-xs bg-white/10 rounded px-2 py-1">
                  Network: {weeklyInsights.comparative.networkAverage}%
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-200 mt-4 text-center">
              🎉 You're outperforming the network average across all metrics!
            </p>
          </div>
        </div>

        {/* Right Column - Wins & Actions */}
        <div className="space-y-6">
          {/* This Week's Wins */}
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-success-700" />
              <h3 className="text-lg font-semibold text-dark-950">This Week's Wins</h3>
            </div>
            <div className="space-y-3">
              {weeklyInsights.wins.map((win) => {
                const WinIcon = getWinIcon(win.icon)
                return (
                  <div key={win.id} className="p-3 bg-white rounded-lg border border-success-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-success-100 rounded-lg">
                        <WinIcon className="w-4 h-4 text-success-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-950 text-sm mb-1">{win.title}</h4>
                        <p className="text-xs text-dark-600">{win.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Patients Needing Attention */}
          <div className="card border-2 border-accent-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-accent-700" />
              <h3 className="text-lg font-semibold text-dark-950">Needs Your Attention</h3>
            </div>
            <div className="space-y-3">
              {weeklyInsights.patientsNeedingAttention.map((patient) => (
                <div key={patient.id} className={`p-4 rounded-lg ${
                  patient.priority === 'urgent' ? 'bg-red-50 border-2 border-red-200' : 'bg-accent-50 border-2 border-accent-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-dark-950">{patient.name}</h4>
                    <span className={`badge ${
                      patient.priority === 'urgent' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {patient.priority}
                    </span>
                  </div>
                  <p className="text-sm text-dark-700 mb-2">{patient.reason}</p>
                  <div className="p-2 bg-white rounded text-xs">
                    <span className="font-semibold">Action:</span> {patient.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report History */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-dark-600" />
              <h3 className="text-lg font-semibold text-dark-950">Past Reports</h3>
            </div>
            <div className="space-y-2">
              {historicalReports.map((report) => (
                <button
                  key={report.id}
                  className="w-full p-3 bg-beige-50 hover:bg-beige-100 rounded-lg border border-beige-200 transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-dark-950">{report.weekRange}</span>
                    <span className="text-lg font-bold text-dark-950">{report.presenceScore}</span>
                  </div>
                  <p className="text-xs text-dark-600">{report.highlight}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Subscription CTA */}
      <div className="card bg-gradient-to-r from-primary-950 to-primary-900 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Get This Report Every Monday</h3>
            <p className="text-primary-200 mb-4">
              Receive your weekly insights automatically. Stay motivated and track your growth.
            </p>
            <button className="px-6 py-3 bg-accent-400 hover:bg-accent-500 text-dark-950 font-semibold rounded-lg transition-colors flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Enable Weekly Email
            </button>
          </div>
          <div className="hidden md:block">
            <Mail className="w-24 h-24 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insights

