import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Search, 
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'
import { mockPatients, mockSessions, mockCareLoops } from '../data/mockData'
import { format, differenceInDays } from 'date-fns'

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRisk, setFilterRisk] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState(null)

  // Filter patients
  let filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      `${patient.name[0].given[0]} ${patient.name[0].family}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.some(dx => dx.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk
    return matchesSearch && matchesRisk
  })

  const riskColors = {
    low: 'bg-calm-100 text-calm-800 border-calm-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  }

  const engagementIcon = (score) => {
    if (score >= 80) return { icon: TrendingUp, color: 'text-calm-600' }
    if (score >= 60) return { icon: Minus, color: 'text-yellow-600' }
    return { icon: TrendingDown, color: 'text-red-600' }
  }

  const getPatientSessions = (patientId) => {
    return mockSessions.filter(s => s.patientId === patientId)
  }

  const getPatientCareLoops = (patientId) => {
    return mockCareLoops.filter(l => l.patientId === patientId)
  }

  const getDaysUntilNextSession = (nextSession) => {
    return differenceInDays(new Date(nextSession), new Date())
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Users className="w-8 h-8 text-primary-500" />
          Patient Overview
        </h1>
        <p className="text-slate-600 mt-1">Monitor patient engagement, risk levels, and care continuity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Patients</p>
              <p className="text-3xl font-bold text-slate-900">{mockPatients.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">High Risk</p>
              <p className="text-3xl font-bold text-red-900">
                {mockPatients.filter(p => p.riskLevel === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Avg Engagement</p>
              <p className="text-3xl font-bold text-calm-900">
                {Math.round(mockPatients.reduce((sum, p) => sum + p.engagement, 0) / mockPatients.length)}%
              </p>
            </div>
            <div className="p-3 bg-calm-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-calm-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Active Care Loops</p>
              <p className="text-3xl font-bold text-empathy-900">{mockCareLoops.length}</p>
            </div>
            <div className="p-3 bg-empathy-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-empathy-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients by name or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-500" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.length === 0 ? (
          <div className="col-span-2 card text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No patients found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const sessions = getPatientSessions(patient.id)
            const careLoops = getPatientCareLoops(patient.id)
            const urgentLoops = careLoops.filter(l => l.priority === 'urgent' || l.status === 'overdue')
            const EngagementIcon = engagementIcon(patient.engagement).icon
            const engagementColor = engagementIcon(patient.engagement).color
            const daysUntilNext = getDaysUntilNextSession(patient.nextSession)

            return (
              <div
                key={patient.id}
                className={`card hover:shadow-lg transition-all cursor-pointer ${
                  selectedPatient?.id === patient.id ? 'ring-2 ring-primary-500' : ''
                } ${urgentLoops.length > 0 ? 'border-l-4 border-l-red-500' : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-empathy-400 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {patient.photo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {patient.name[0].given[0]} {patient.name[0].family}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {patient.gender} • Born {format(new Date(patient.birthDate), 'MMM dd, yyyy')}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className={`badge border ${riskColors[patient.riskLevel]}`}>
                          {patient.riskLevel} risk
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {urgentLoops.length > 0 && (
                    <div className="p-2 bg-red-100 rounded-lg animate-pulse-soft">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                </div>

                {/* Diagnoses */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2">DIAGNOSES</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.diagnosis.map((dx, idx) => (
                      <span key={idx} className="badge badge-info text-xs">
                        {dx}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <div className={`flex items-center justify-center gap-1 ${engagementColor} mb-1`}>
                      <EngagementIcon className="w-4 h-4" />
                      <span className="text-2xl font-bold">{patient.engagement}%</span>
                    </div>
                    <p className="text-xs text-slate-600">Engagement</p>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <p className="text-2xl font-bold text-slate-900">{sessions.length}</p>
                    <p className="text-xs text-slate-600">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${urgentLoops.length > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                      {careLoops.length}
                    </p>
                    <p className="text-xs text-slate-600">Care Loops</p>
                  </div>
                </div>

                {/* Next Session */}
                <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      <div>
                        <p className="text-xs text-primary-700 font-medium">Next Session</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {format(new Date(patient.nextSession), 'MMM dd, yyyy, h:mm a')}
                        </p>
                      </div>
                    </div>
                    <span className={`badge ${
                      daysUntilNext === 0 ? 'badge-warning' :
                      daysUntilNext <= 3 ? 'badge-info' :
                      'badge-success'
                    }`}>
                      {daysUntilNext === 0 ? 'Today' :
                       daysUntilNext === 1 ? 'Tomorrow' :
                       `In ${daysUntilNext} days`}
                    </span>
                  </div>
                </div>

                {/* Urgent Care Loops */}
                {urgentLoops.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900 mb-1">
                          {urgentLoops.length} Urgent Care Loop{urgentLoops.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-red-700">
                          {urgentLoops[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                  <Link to={`/penote`} className="btn-secondary flex-1 text-center text-sm">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Notes
                  </Link>
                  <Link to={`/peloop`} className="btn-secondary flex-1 text-center text-sm">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Loops
                  </Link>
                  <button className="btn-primary flex-1 text-sm">
                    View Chart
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Selected Patient Detail (Optional Enhancement) */}
      {selectedPatient && (
        <div className="card bg-gradient-to-br from-primary-50 to-empathy-50 border-2 border-primary-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Selected: {selectedPatient.name[0].given[0]} {selectedPatient.name[0].family}
              </h3>
              <p className="text-sm text-slate-600">
                Last session: {format(new Date(selectedPatient.lastSession), 'MMM dd, yyyy')}
              </p>
            </div>
            <button
              onClick={() => setSelectedPatient(null)}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to={`/penote`} className="p-4 bg-white rounded-lg hover:shadow-md transition-all">
              <FileText className="w-6 h-6 text-empathy-600 mb-2" />
              <p className="font-semibold text-slate-900">View Session Notes</p>
              <p className="text-xs text-slate-600 mt-1">
                {getPatientSessions(selectedPatient.id).length} sessions recorded
              </p>
            </Link>
            <Link to={`/peloop`} className="p-4 bg-white rounded-lg hover:shadow-md transition-all">
              <CheckCircle className="w-6 h-6 text-calm-600 mb-2" />
              <p className="font-semibold text-slate-900">Manage Care Loops</p>
              <p className="text-xs text-slate-600 mt-1">
                {getPatientCareLoops(selectedPatient.id).length} open loops
              </p>
            </Link>
            <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer">
              <Heart className="w-6 h-6 text-red-500 mb-2" />
              <p className="font-semibold text-slate-900">Engagement History</p>
              <p className="text-xs text-slate-600 mt-1">
                Current score: {selectedPatient.engagement}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients

