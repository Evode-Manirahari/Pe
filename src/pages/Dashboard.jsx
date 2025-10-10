import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Heart,
  AlertCircle,
  Calendar,
  FileText,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { mockPatients, mockCareLoops, mockSessions, mockMetrics } from '../data/mockData'
import { format } from 'date-fns'

const Dashboard = () => {
  const urgentLoops = mockCareLoops.filter(loop => loop.priority === 'urgent' || loop.status === 'overdue')
  const todaySessions = mockSessions.filter(session => {
    const sessionDate = new Date(session.date)
    const today = new Date()
    return sessionDate.toDateString() === today.toDateString()
  })

  const stats = [
    {
      name: 'Time Saved Today',
      value: '120 min',
      change: '-100%',
      icon: Clock,
      color: 'primary',
      description: 'Fully automated documentation'
    },
    {
      name: 'Care Loops Closed',
      value: '16',
      change: '+100%',
      icon: CheckCircle,
      color: 'calm',
      description: 'This week'
    },
    {
      name: 'Patient Engagement',
      value: '100%',
      change: '+26%',
      icon: TrendingUp,
      color: 'empathy',
      description: 'Perfect engagement'
    },
    {
      name: 'Empathy Score',
      value: '10/10',
      change: '+2.9',
      icon: Heart,
      color: 'warning',
      description: 'vs. baseline 7.1'
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-primary-950 rounded-lg shadow-medium p-8 text-white border border-primary-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">Welcome back, Dr. Martinez</h1>
            <p className="text-primary-200 text-base">
              You have {todaySessions.length} sessions today and {urgentLoops.length} urgent care loops to address
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-primary-900/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-primary-800">
            <Calendar className="w-7 h-7 text-primary-300" />
            <div>
              <p className="text-xs text-primary-300 font-medium">Today</p>
              <p className="text-lg font-semibold">{format(new Date(), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect Impact Banner */}
      <div className="card bg-accent-50 border-accent-200 shadow-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent-400 rounded-lg shadow-soft">
              <Sparkles className="w-10 h-10 text-dark-950" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-dark-950 mb-1">Perfect Impact Achievement</h2>
              <p className="text-dark-700 text-base">
                100% improvement across all core metrics — Zero documentation time, Zero missed follow-ups, 100% engagement
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6 bg-white rounded-lg px-6 py-4 border border-accent-200 shadow-subtle">
            <div className="text-center">
              <p className="text-3xl font-bold text-dark-950">100%</p>
              <p className="text-xs text-dark-600 font-medium mt-1">Time Saved</p>
            </div>
            <div className="h-12 w-px bg-beige-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-dark-950">100%</p>
              <p className="text-xs text-dark-600 font-medium mt-1">Loops Closed</p>
            </div>
            <div className="h-12 w-px bg-beige-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-dark-950">10/10</p>
              <p className="text-xs text-dark-600 font-medium mt-1">Empathy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card group hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg group-hover:bg-${stat.color}-200 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`badge badge-${stat.color === 'primary' ? 'info' : stat.color === 'calm' ? 'success' : stat.color === 'empathy' ? 'empathy' : 'warning'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-700">{stat.name}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Care Loops */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Urgent Care Loops</h2>
            </div>
            <Link to="/peloop" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {urgentLoops.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-calm-500 mx-auto mb-3" />
                <p className="text-slate-600">No urgent care loops - great job!</p>
              </div>
            ) : (
              urgentLoops.slice(0, 4).map((loop) => (
                <div
                  key={loop.id}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
                >
                  <div className={`mt-1 p-2 rounded-lg ${
                    loop.status === 'overdue' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      loop.status === 'overdue' ? 'text-red-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-900">{loop.patientName}</p>
                        <p className="text-sm text-slate-600 mt-1">{loop.description}</p>
                      </div>
                      <span className={`badge whitespace-nowrap ${
                        loop.status === 'overdue' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {loop.status === 'overdue' ? 'Overdue' : 'Urgent'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-slate-500">
                        Due: {format(new Date(loop.dueDate), 'MMM dd, yyyy')}
                      </span>
                      <span className="text-xs text-slate-500">
                        Type: {loop.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Today's Sessions</h2>
          </div>
          <div className="space-y-3">
            {todaySessions.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No sessions scheduled today</p>
            ) : (
              todaySessions.map((session) => {
                const patient = mockPatients.find(p => p.id === session.patientId)
                return (
                  <div
                    key={session.id}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-empathy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {patient?.photo || 'P'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900">
                          {patient?.name[0].given[0]} {patient?.name[0].family}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {format(new Date(session.date), 'h:mm a')} • {session.duration} min
                        </p>
                        <span className="badge badge-success mt-2">
                          {session.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Recent Session Notes */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-empathy-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-empathy-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">AI-Drafted Notes Ready</h2>
          </div>
          <Link to="/penote" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Review all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSessions.slice(0, 3).map((session) => {
            const patient = mockPatients.find(p => p.id === session.patientId)
            const emotionCounts = session.emotionalCues.reduce((acc, cue) => {
              acc[cue.emotion] = (acc[cue.emotion] || 0) + 1
              return acc
            }, {})
            
            return (
              <Link
                key={session.id}
                to={`/penote/${session.id}`}
                className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:border-empathy-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-empathy-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {patient?.photo || 'P'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {patient?.name[0].given[0]} {patient?.name[0].family}
                      </p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(session.date), 'MMM dd, h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {Object.entries(emotionCounts).slice(0, 3).map(([emotion, count]) => (
                    <span key={emotion} className="badge badge-empathy text-xs">
                      {emotion} ({count})
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <FileText className="w-4 h-4" />
                  <span>Draft note ready for review</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/patients" className="card hover:scale-105 transition-transform group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{mockPatients.length}</p>
              <p className="text-sm text-slate-600">Active Patients</p>
            </div>
          </div>
        </Link>
        
        <Link to="/penote" className="card hover:scale-105 transition-transform group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-empathy-100 rounded-lg group-hover:bg-empathy-200 transition-colors">
              <FileText className="w-6 h-6 text-empathy-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{mockSessions.length}</p>
              <p className="text-sm text-slate-600">Session Notes</p>
            </div>
          </div>
        </Link>
        
        <Link to="/peloop" className="card hover:scale-105 transition-transform group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-calm-100 rounded-lg group-hover:bg-calm-200 transition-colors">
              <CheckCircle className="w-6 h-6 text-calm-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{mockCareLoops.length}</p>
              <p className="text-sm text-slate-600">Open Care Loops</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

