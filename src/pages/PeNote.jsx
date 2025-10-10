import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  FileText, 
  Heart, 
  Clock, 
  User,
  Calendar,
  Play,
  Pause,
  AlertCircle,
  CheckCircle2,
  Edit3,
  Save,
  Copy,
  Sparkles,
  ArrowLeft,
  MessageCircle
} from 'lucide-react'
import { mockSessions, mockPatients } from '../data/mockData'
import { format } from 'date-fns'

const PeNote = () => {
  const { sessionId } = useParams()
  const [selectedSession, setSelectedSession] = useState(
    sessionId ? mockSessions.find(s => s.id === sessionId) : mockSessions[0]
  )
  const [editMode, setEditMode] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [noteData, setNoteData] = useState(selectedSession?.aiDraftNote || {})

  if (!selectedSession) {
    return (
      <div className="card text-center py-12">
        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">No session selected</h2>
        <p className="text-slate-600 mb-6">Select a session from the list to view AI-drafted notes</p>
        <Link to="/dashboard" className="btn-primary">
          Go to Dashboard
        </Link>
      </div>
    )
  }

  const patient = mockPatients.find(p => p.id === selectedSession.patientId)

  const emotionColors = {
    anxiety: 'bg-warning-100 text-warning-800 border-warning-200',
    sadness: 'bg-blue-100 text-blue-800 border-blue-200',
    relief: 'bg-calm-100 text-calm-800 border-calm-200',
    hope: 'bg-empathy-100 text-empathy-800 border-empathy-200',
    anger: 'bg-red-100 text-red-800 border-red-200',
    shame: 'bg-purple-100 text-purple-800 border-purple-200',
    determination: 'bg-green-100 text-green-800 border-green-200',
  }

  const intensityIndicator = (intensity) => {
    const dots = intensity === 'high' ? 3 : intensity === 'moderate' ? 2 : 1
    return (
      <div className="flex gap-0.5">
        {[...Array(dots)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-current"></div>
        ))}
      </div>
    )
  }

  const handleSaveNote = () => {
    // In a real app, this would save to the backend
    setEditMode(false)
    // Show success notification
    alert('Note saved successfully!')
  }

  const handleCopyNote = () => {
    const noteText = `SUBJECTIVE:\n${noteData.subjective}\n\nOBJECTIVE:\n${noteData.objective}\n\nASSESSMENT:\n${noteData.assessment}\n\nPLAN:\n${noteData.plan}`
    navigator.clipboard.writeText(noteText)
    alert('Note copied to clipboard!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-empathy-500" />
              PeNote: Empathic Documentation
            </h1>
            <p className="text-slate-600 mt-1">AI-powered clinical notes with emotional intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="btn-secondary"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </button>
          <button
            onClick={handleCopyNote}
            className="btn-secondary"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Note
          </button>
          {editMode ? (
            <button
              onClick={handleSaveNote}
              className="btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="btn-primary"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Note
            </button>
          )}
        </div>
      </div>

      {/* Session Selection */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Recent Sessions</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockSessions.map((session) => {
            const sessionPatient = mockPatients.find(p => p.id === session.patientId)
            const isSelected = session.id === selectedSession.id
            return (
              <button
                key={session.id}
                onClick={() => {
                  setSelectedSession(session)
                  setNoteData(session.aiDraftNote)
                  setEditMode(false)
                }}
                className={`flex-shrink-0 p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-primary-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-empathy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {sessionPatient?.photo}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-slate-900 text-sm">
                      {sessionPatient?.name[0].given[0]} {sessionPatient?.name[0].family}
                    </p>
                    <p className="text-xs text-slate-500">
                      {format(new Date(session.date), 'MMM dd, h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {session.emotionalCues.slice(0, 2).map((cue, idx) => (
                    <span key={idx} className="badge badge-empathy text-xs">
                      {cue.emotion}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Note Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient & Session Info */}
          <div className="card bg-gradient-to-br from-primary-50 to-empathy-50 border-primary-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-empathy-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {patient?.photo}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {patient?.name[0].given[0]} {patient?.name[0].family}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(selectedSession.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {format(new Date(selectedSession.date), 'h:mm a')} ({selectedSession.duration} min)
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedSession.type}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {patient?.diagnosis.map((dx, idx) => (
                      <span key={idx} className="badge badge-info text-xs">
                        {dx}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="badge badge-success">
                {selectedSession.status}
              </span>
            </div>
          </div>

          {/* AI-Drafted Clinical Note */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-empathy-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-empathy-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">AI-Drafted Clinical Note</h3>
                <p className="text-sm text-slate-500">Review and edit as needed</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Subjective */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Subjective
                </label>
                {editMode ? (
                  <textarea
                    value={noteData.subjective}
                    onChange={(e) => setNoteData({ ...noteData, subjective: e.target.value })}
                    className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{noteData.subjective}</p>
                  </div>
                )}
              </div>

              {/* Objective */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Objective
                </label>
                {editMode ? (
                  <textarea
                    value={noteData.objective}
                    onChange={(e) => setNoteData({ ...noteData, objective: e.target.value })}
                    className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{noteData.objective}</p>
                  </div>
                )}
              </div>

              {/* Assessment */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Assessment
                </label>
                {editMode ? (
                  <textarea
                    value={noteData.assessment}
                    onChange={(e) => setNoteData({ ...noteData, assessment: e.target.value })}
                    className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{noteData.assessment}</p>
                  </div>
                )}
              </div>

              {/* Plan */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Plan
                </label>
                {editMode ? (
                  <textarea
                    value={noteData.plan}
                    onChange={(e) => setNoteData({ ...noteData, plan: e.target.value })}
                    className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{noteData.plan}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Session Transcript (Conditional) */}
          {showTranscript && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Session Transcript</h3>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedSession.transcript.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      line.speaker === 'Clinician'
                        ? 'bg-primary-50 border-l-4 border-primary-500'
                        : 'bg-slate-50 border-l-4 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-slate-900">{line.speaker}</span>
                      <span className="text-xs text-slate-500">{line.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emotional Cues */}
          <div className="card bg-gradient-to-br from-empathy-50 to-purple-50 border-empathy-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-empathy-100 rounded-lg">
                <Heart className="w-5 h-5 text-empathy-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Emotional Cues</h3>
            </div>
            <div className="space-y-3">
              {selectedSession.emotionalCues.map((cue, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${emotionColors[cue.emotion] || 'bg-slate-100 text-slate-800 border-slate-200'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm capitalize">{cue.emotion}</span>
                    {intensityIndicator(cue.intensity)}
                  </div>
                  <p className="text-xs opacity-90 mb-1">{cue.context}</p>
                  <span className="text-xs font-mono opacity-75">{cue.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Empathic Notes */}
          <div className="card bg-gradient-to-br from-calm-50 to-green-50 border-calm-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-calm-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-calm-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Empathic Insights</h3>
            </div>
            <div className="space-y-3">
              {noteData.empathicNotes?.map((note, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-calm-200">
                  <p className="text-sm text-slate-700 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Care Loops from This Session */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-warning-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Care Loops Created</h3>
            </div>
            <div className="space-y-2">
              {selectedSession.careLoops?.map((loop) => (
                <div key={loop.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{loop.type}</span>
                    <span className={`badge ${
                      loop.status === 'urgent' ? 'badge-danger' :
                      loop.status === 'pending' ? 'badge-warning' :
                      'badge-success'
                    }`}>
                      {loop.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{loop.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Due: {format(new Date(loop.dueDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeNote

