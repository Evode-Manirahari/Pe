import React, { useState } from 'react'
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Filter,
  Search,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  MoreVertical,
  ArrowRight
} from 'lucide-react'
import { mockCareLoops, mockPatients } from '../data/mockData'
import { format, isPast, differenceInDays } from 'date-fns'

const PeLoop = () => {
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')
  const [expandedLoop, setExpandedLoop] = useState(null)

  // Filter and sort loops
  let filteredLoops = mockCareLoops.filter(loop => {
    const matchesPriority = filterPriority === 'all' || loop.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || loop.status === filterStatus
    const matchesSearch = loop.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loop.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPriority && matchesStatus && matchesSearch
  })

  // Sort loops
  filteredLoops = filteredLoops.sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate)
    } else if (sortBy === 'priority') {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return 0
  })

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200',
  }

  const priorityIcons = {
    urgent: <AlertCircle className="w-4 h-4" />,
    high: <AlertCircle className="w-4 h-4" />,
    medium: <Clock className="w-4 h-4" />,
    low: <Clock className="w-4 h-4" />,
  }

  const typeColors = {
    'follow-up': 'badge-info',
    'assessment': 'badge-empathy',
    'referral': 'badge-warning',
    'coordination': 'badge-success',
    'scheduling': 'badge-info',
    'medication': 'badge-danger',
  }

  const getDaysUntilDue = (dueDate) => {
    const days = differenceInDays(new Date(dueDate), new Date())
    return days
  }

  const getDueDateDisplay = (dueDate, status) => {
    const days = getDaysUntilDue(dueDate)
    
    if (status === 'overdue' || days < 0) {
      return { text: `${Math.abs(days)} days overdue`, color: 'text-red-600', bgColor: 'bg-red-50' }
    } else if (days === 0) {
      return { text: 'Due today', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    } else if (days === 1) {
      return { text: 'Due tomorrow', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    } else if (days <= 3) {
      return { text: `Due in ${days} days`, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    } else {
      return { text: `Due in ${days} days`, color: 'text-slate-600', bgColor: 'bg-slate-50' }
    }
  }

  const handleCompleteLoop = (loopId) => {
    // In a real app, this would update the backend
    alert(`Loop ${loopId} marked as completed!`)
  }

  const handleSnoozeLoop = (loopId) => {
    // In a real app, this would update the backend
    alert(`Loop ${loopId} snoozed for 24 hours`)
  }

  // Calculate stats
  const stats = {
    total: mockCareLoops.length,
    urgent: mockCareLoops.filter(l => l.priority === 'urgent' || l.status === 'overdue').length,
    dueToday: mockCareLoops.filter(l => getDaysUntilDue(l.dueDate) === 0).length,
    completed: 0, // In a real app, this would track completed loops
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-calm-500" />
          PeLoop: Care Continuity Tracker
        </h1>
        <p className="text-slate-600 mt-1">Never let a patient fall through the cracks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Open Loops</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-slate-200 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 mb-1">Urgent / Overdue</p>
              <p className="text-3xl font-bold text-red-900">{stats.urgent}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 mb-1">Due Today</p>
              <p className="text-3xl font-bold text-orange-900">{stats.dueToday}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-700" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-calm-50 to-calm-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-calm-700 mb-1">Completed This Week</p>
              <p className="text-3xl font-bold text-calm-900">12</p>
            </div>
            <div className="p-3 bg-calm-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-calm-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients or tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-500" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Care Loops List */}
      <div className="space-y-3">
        {filteredLoops.length === 0 ? (
          <div className="card text-center py-12">
            <CheckCircle className="w-16 h-16 text-calm-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No care loops found</h3>
            <p className="text-slate-600">
              {searchQuery || filterPriority !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'All care loops are closed - great work!'}
            </p>
          </div>
        ) : (
          filteredLoops.map((loop) => {
            const isExpanded = expandedLoop === loop.id
            const dueDateInfo = getDueDateDisplay(loop.dueDate, loop.status)
            const patient = mockPatients.find(p => p.id === loop.patientId)

            return (
              <div
                key={loop.id}
                className={`card hover:shadow-lg transition-all ${
                  loop.status === 'overdue' ? 'border-2 border-red-300 bg-red-50/30' :
                  loop.priority === 'urgent' ? 'border-2 border-orange-300 bg-orange-50/30' :
                  ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Priority Indicator */}
                  <div className={`mt-1 p-3 rounded-lg border ${priorityColors[loop.priority]}`}>
                    {priorityIcons[loop.priority]}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {loop.patientName}
                          </h3>
                          <span className={`badge ${typeColors[loop.type]}`}>
                            {loop.type}
                          </span>
                          <span className={`badge ${
                            loop.status === 'overdue' ? 'badge-danger' :
                            loop.priority === 'urgent' ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {loop.priority}
                          </span>
                        </div>
                        <p className="text-slate-700 mb-2">{loop.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {loop.assignedTo}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {format(new Date(loop.dueDate), 'MMM dd, yyyy')}
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded ${dueDateInfo.bgColor} ${dueDateInfo.color} font-medium`}>
                            <Clock className="w-4 h-4" />
                            {dueDateInfo.text}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCompleteLoop(loop.id)}
                          className="p-2 text-calm-600 hover:bg-calm-50 rounded-lg transition-colors"
                          title="Mark as complete"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleSnoozeLoop(loop.id)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Snooze for 24h"
                        >
                          <Clock className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setExpandedLoop(isExpanded ? null : loop.id)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Patient Info */}
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Patient Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-empathy-400 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                  {patient?.photo}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900">{loop.patientName}</p>
                                  <p className="text-xs text-slate-500">Last session: {format(new Date(patient?.lastSession || new Date()), 'MMM dd, yyyy')}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {patient?.diagnosis.map((dx, idx) => (
                                  <span key={idx} className="badge badge-info text-xs">{dx}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Loop Details */}
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Loop Details</h4>
                            <div className="space-y-2 text-sm text-slate-600">
                              <div className="flex justify-between">
                                <span>Created:</span>
                                <span className="font-medium text-slate-900">
                                  {format(new Date(loop.createdDate), 'MMM dd, yyyy')}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Type:</span>
                                <span className={`badge ${typeColors[loop.type]}`}>{loop.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Assigned to:</span>
                                <span className="font-medium text-slate-900">{loop.assignedTo}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="font-medium text-slate-900">{loop.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button className="btn-primary flex-1">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Take Action
                          </button>
                          <button className="btn-secondary">
                            View Patient Chart
                          </button>
                          <button className="btn-secondary">
                            Add Note
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default PeLoop

