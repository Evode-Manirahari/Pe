import React from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Heart,
  CheckCircle,
  Users,
  AlertCircle,
  Sparkles,
  Award
} from 'lucide-react'
import { mockMetrics } from '../data/mockData'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const Metrics = () => {
  // Data for charts
  const documentationTimeData = [
    { name: 'Mon', before: 125, after: 78 },
    { name: 'Tue', before: 130, after: 80 },
    { name: 'Wed', before: 118, after: 72 },
    { name: 'Thu', before: 122, after: 76 },
    { name: 'Fri', before: 115, after: 70 },
  ]

  const careLoopsData = [
    { name: 'Week 1', closed: 8, missed: 3 },
    { name: 'Week 2', closed: 10, missed: 2 },
    { name: 'Week 3', closed: 12, missed: 1 },
    { name: 'Week 4', closed: 12, missed: 1 },
  ]

  const engagementData = [
    { name: 'Jan', score: 72 },
    { name: 'Feb', score: 74 },
    { name: 'Mar', score: 75 },
    { name: 'Apr', score: 76 },
    { name: 'May', score: 77 },
    { name: 'Jun', score: 79 },
  ]

  const emotionDistribution = [
    { name: 'Anxiety', value: 28, color: '#fbbf24' },
    { name: 'Sadness', value: 22, color: '#60a5fa' },
    { name: 'Hope', value: 18, color: '#a78bfa' },
    { name: 'Relief', value: 16, color: '#4ade80' },
    { name: 'Anger', value: 10, color: '#f87171' },
    { name: 'Other', value: 6, color: '#94a3b8' },
  ]

  const impactMetrics = [
    {
      title: 'Documentation Time',
      before: mockMetrics.documentationTime.before,
      after: mockMetrics.documentationTime.after,
      improvement: mockMetrics.documentationTime.percentReduction,
      unit: 'min/day',
      icon: Clock,
      color: 'primary',
      description: 'Average time spent on clinical notes'
    },
    {
      title: 'Care Loops Closed',
      before: mockMetrics.careLoopsClosed.lastWeek,
      after: mockMetrics.careLoopsClosed.thisWeek,
      improvement: mockMetrics.careLoopsClosed.percentIncrease,
      unit: 'per week',
      icon: CheckCircle,
      color: 'calm',
      description: 'Follow-ups successfully completed'
    },
    {
      title: 'Missed Follow-Ups',
      before: mockMetrics.missedFollowUps.before,
      after: mockMetrics.missedFollowUps.after,
      improvement: mockMetrics.missedFollowUps.percentReduction,
      unit: '%',
      icon: AlertCircle,
      color: 'warning',
      description: 'Reduction in dropped care tasks',
      isReduction: true
    },
    {
      title: 'Burnout Rate',
      before: mockMetrics.burnoutReduction.baseline,
      after: mockMetrics.burnoutReduction.current,
      improvement: mockMetrics.burnoutReduction.improvement,
      unit: '%',
      icon: Heart,
      color: 'empathy',
      description: 'Clinicians reporting burnout symptoms',
      isReduction: true
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary-500" />
          Impact Metrics & Analytics
        </h1>
        <p className="text-slate-600 mt-1">Measuring the impact of presence-driven care</p>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric) => {
          const isImprovement = metric.isReduction ? metric.before > metric.after : metric.after > metric.before
          return (
            <div key={metric.title} className="card hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <span className={`badge ${isImprovement ? 'badge-success' : 'badge-danger'}`}>
                  {isImprovement ? '↓' : '↑'} {metric.improvement.toFixed(1)}%
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">{metric.title}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-slate-900">{metric.after}</span>
                <span className="text-sm text-slate-500">{metric.unit}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="line-through">was {metric.before}</span>
              </div>
              <p className="text-xs text-slate-600 mt-3">{metric.description}</p>
            </div>
          )
        })}
      </div>

      {/* Empathy Score Highlight */}
      <div className="card bg-gradient-to-br from-empathy-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Empathy Score</h2>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-bold">{mockMetrics.empathyScore.current}</span>
              <span className="text-2xl opacity-90">/ {mockMetrics.empathyScore.scale}</span>
            </div>
            <p className="text-empathy-100 text-lg">
              +{(mockMetrics.empathyScore.current - mockMetrics.empathyScore.baseline).toFixed(1)} improvement from baseline ({mockMetrics.empathyScore.baseline})
            </p>
            <p className="text-sm text-empathy-200 mt-2">
              Based on patient feedback and emotional cue analysis
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="w-32 h-32 opacity-20" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documentation Time Chart */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Documentation Time Savings</h3>
              <p className="text-sm text-slate-500">Before vs. After Pe (minutes/day)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={documentationTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="before" fill="#94a3b8" name="Before Pe" radius={[8, 8, 0, 0]} />
              <Bar dataKey="after" fill="#0ea5e9" name="With Pe" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-primary-700">37.5% reduction</span> in daily documentation time
            </p>
          </div>
        </div>

        {/* Care Loops Performance */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-calm-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-calm-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Care Loop Performance</h3>
              <p className="text-sm text-slate-500">Closed vs. Missed (weekly)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={careLoopsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="closed" fill="#22c55e" name="Closed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="missed" fill="#f87171" name="Missed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-calm-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-calm-700">50% increase</span> in completed follow-ups
            </p>
          </div>
        </div>

        {/* Patient Engagement Trend */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-empathy-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-empathy-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Patient Engagement Trend</h3>
              <p className="text-sm text-slate-500">Average engagement score over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[60, 85]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#d946ef" 
                strokeWidth={3}
                name="Engagement %"
                dot={{ fill: '#d946ef', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-empathy-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-empathy-700">+5% improvement</span> in 6 months
            </p>
          </div>
        </div>

        {/* Emotional Cues Distribution */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Emotional Cues Detected</h3>
              <p className="text-sm text-slate-500">Distribution across all sessions</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {emotionDistribution.map((emotion) => (
              <div key={emotion.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: emotion.color }}
                ></div>
                <span className="text-slate-700">{emotion.name}: {emotion.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="card bg-gradient-to-br from-calm-50 to-primary-50 border-2 border-calm-300">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <Award className="w-12 h-12 text-calm-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Pe Impact Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">TIME SAVED</h4>
                <p className="text-3xl font-bold text-primary-600 mb-1">45 min</p>
                <p className="text-sm text-slate-600">Per clinician per day</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">IMPROVED CONTINUITY</h4>
                <p className="text-3xl font-bold text-calm-600 mb-1">53%</p>
                <p className="text-sm text-slate-600">Fewer missed follow-ups</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">REDUCED BURNOUT</h4>
                <p className="text-3xl font-bold text-empathy-600 mb-1">13 pts</p>
                <p className="text-sm text-slate-600">Decrease in burnout rate</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-slate-700 leading-relaxed">
                Pe's presence-first architecture has demonstrably reduced administrative burden, 
                improved care continuity, and enhanced clinician well-being. These metrics represent 
                real improvements in both clinical outcomes and human experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Metrics

