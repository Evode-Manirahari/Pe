import React, { useState } from 'react'
import { Brain, AlertCircle, CheckCircle2, Info, TrendingUp, Book, ExternalLink } from 'lucide-react'

const ClinicalDecisionSupport = ({ patientContext, sessionContext }) => {
  const [expanded, setExpanded] = useState(true)

  // AI-generated clinical decision support suggestions
  const suggestions = [
    {
      type: 'assessment',
      priority: 'high',
      title: 'Consider PHQ-9 Depression Screening',
      reason: 'Patient mentions of "feeling overwhelmed" and "hopelessness" suggest moderate depression symptoms',
      evidence: 'APA Guidelines recommend screening when multiple depressive symptoms present',
      action: 'Administer PHQ-9 at next session',
      confidence: 0.87,
      source: 'DSM-5 / APA Practice Guidelines'
    },
    {
      type: 'intervention',
      priority: 'medium',
      title: 'CBT Technique: Thought Records',
      reason: 'Patient struggles with automatic negative thoughts in work situations',
      evidence: 'CBT thought records show 68% reduction in anxiety symptoms (Beck et al.)',
      action: 'Introduce daily thought record homework',
      confidence: 0.92,
      source: 'NICE Guidelines for Anxiety'
    },
    {
      type: 'safety',
      priority: 'urgent',
      title: 'Safety Assessment Recommended',
      reason: 'Relapse disclosure + high shame emotion detected in Marcus Johnson session',
      evidence: 'SAMHSA protocols recommend safety check after relapse',
      action: 'Complete suicide risk assessment; coordinate with crisis team if needed',
      confidence: 0.94,
      source: 'SAMHSA Treatment Guidelines'
    },
    {
      type: 'medication',
      priority: 'medium',
      title: 'Psychiatric Consultation',
      reason: 'Patient symptoms not improving despite 8 weeks of therapy',
      evidence: 'Combined therapy + medication shows 73% better outcomes for moderate-severe cases',
      action: 'Refer to psychiatrist for medication evaluation',
      confidence: 0.81,
      source: 'APA Depression Treatment Guidelines'
    }
  ]

  const getPriorityColor = (priority) => {
    if (priority === 'urgent') return 'border-red-300 bg-red-50'
    if (priority === 'high') return 'border-accent-300 bg-accent-50'
    return 'border-blue-300 bg-blue-50'
  }

  const getPriorityBadge = (priority) => {
    if (priority === 'urgent') return 'badge-danger'
    if (priority === 'high') return 'badge-warning'
    return 'badge-info'
  }

  const getTypeIcon = (type) => {
    if (type === 'safety') return AlertCircle
    if (type === 'assessment') return CheckCircle2
    if (type === 'intervention') return TrendingUp
    return Info
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-24 right-6 p-3 bg-primary-900 text-white rounded-lg shadow-large hover:bg-primary-950 transition-colors flex items-center gap-2"
      >
        <Brain className="w-5 h-5" />
        <span className="text-sm font-medium">Show AI Suggestions</span>
        <span className="badge bg-accent-400 text-dark-950 border-0">{suggestions.length}</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 max-h-[600px] bg-white rounded-lg shadow-large border border-beige-200 overflow-hidden">
      {/* Header */}
      <div className="bg-primary-950 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            <h3 className="font-semibold">Clinical Decision Support</h3>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="text-primary-200 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-primary-200 mt-1">
          AI-powered evidence-based recommendations
        </p>
      </div>

      {/* Suggestions List */}
      <div className="overflow-y-auto max-h-[500px] p-3 space-y-3">
        {suggestions.map((suggestion, idx) => {
          const TypeIcon = getTypeIcon(suggestion.type)
          return (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${getPriorityColor(suggestion.priority)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-2">
                  <TypeIcon className="w-4 h-4 mt-1 text-dark-700" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-dark-950 text-sm mb-1">
                      {suggestion.title}
                    </h4>
                    <span className={`badge ${getPriorityBadge(suggestion.priority)} text-xs`}>
                      {suggestion.priority}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-dark-600">
                  {Math.round(suggestion.confidence * 100)}%
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white rounded border border-beige-200">
                  <p className="text-dark-600 font-medium mb-1">Why:</p>
                  <p className="text-dark-800">{suggestion.reason}</p>
                </div>

                <div className="p-2 bg-white rounded border border-beige-200">
                  <p className="text-dark-600 font-medium mb-1">Evidence:</p>
                  <p className="text-dark-800">{suggestion.evidence}</p>
                </div>

                <div className="p-2 bg-accent-100 rounded border border-accent-200">
                  <p className="text-dark-600 font-medium mb-1">Recommended Action:</p>
                  <p className="text-dark-900 font-medium">{suggestion.action}</p>
                </div>

                <div className="flex items-center gap-2 text-dark-500">
                  <Book className="w-3 h-3" />
                  <span>{suggestion.source}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 px-3 py-1.5 bg-primary-900 hover:bg-primary-950 text-white text-xs font-medium rounded transition-colors">
                  Apply
                </button>
                <button className="flex-1 px-3 py-1.5 bg-beige-100 hover:bg-beige-200 text-dark-900 text-xs font-medium rounded transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-beige-200 bg-beige-50">
        <p className="text-xs text-dark-600 text-center">
          Powered by Pe AI • Evidence-based suggestions
        </p>
      </div>
    </div>
  )
}

export default ClinicalDecisionSupport

