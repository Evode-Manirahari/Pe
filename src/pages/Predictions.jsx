import React, { useState } from 'react'
import { 
  Brain, 
  AlertTriangle, 
  TrendingDown,
  Shield,
  Zap,
  Target,
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { riskPredictions } from '../data/relationalGraph'

const Predictions = () => {
  const [selectedPrediction, setSelectedPrediction] = useState(riskPredictions[0])

  const getRiskColor = (probability) => {
    if (probability >= 0.7) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'badge-danger' }
    if (probability >= 0.5) return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'badge-warning' }
    return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'badge-warning' }
  }

  const getRiskLabel = (probability) => {
    if (probability >= 0.7) return 'High Risk'
    if (probability >= 0.5) return 'Moderate Risk'
    return 'Low Risk'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'badge-danger',
      high: 'badge-warning',
      medium: 'badge-info'
    }
    return colors[priority] || 'badge-info'
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: 'badge-success',
      pending: 'badge-warning',
      overdue: 'badge-danger'
    }
    return colors[status] || 'badge-info'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-dark-950 tracking-tight flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary-900" />
            Predictive Analytics
          </h1>
          <p className="text-dark-600 mt-2">AI-powered risk detection and proactive intervention recommendations</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Model Performance
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">{riskPredictions.length}</p>
          <p className="text-sm text-dark-600 mt-1">Active Risk Alerts</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Shield className="w-5 h-5 text-success-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">89%</p>
          <p className="text-sm text-dark-600 mt-1">Prevention Success Rate</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Zap className="w-5 h-5 text-accent-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">8</p>
          <p className="text-sm text-dark-600 mt-1">Interventions Triggered</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">92%</p>
          <p className="text-sm text-dark-600 mt-1">Model Confidence</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Alerts List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-dark-700 uppercase tracking-wide mb-4">
            Risk Predictions
          </h3>
          {riskPredictions.map((prediction) => {
            const riskColors = getRiskColor(prediction.probability)
            return (
              <div
                key={prediction.patientId}
                onClick={() => setSelectedPrediction(prediction)}
                className={`card cursor-pointer transition-all ${
                  selectedPrediction?.patientId === prediction.patientId
                    ? 'ring-2 ring-primary-900'
                    : 'hover:shadow-medium'
                } ${riskColors.bg}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${riskColors.text}`} />
                    <span className={`badge ${riskColors.badge} text-xs`}>
                      {getRiskLabel(prediction.probability)}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-dark-950">
                    {Math.round(prediction.probability * 100)}%
                  </span>
                </div>
                <h4 className="font-semibold text-dark-950 mb-1">{prediction.patientName}</h4>
                <p className="text-xs text-dark-600 mb-3 capitalize">{prediction.riskType.replace('-', ' ')}</p>
                <div className="flex items-center gap-2 text-xs text-dark-500">
                  <Target className="w-3 h-3" />
                  {prediction.confidence.toFixed(0)}% confidence
                </div>
              </div>
            )
          })}
        </div>

        {/* Prediction Details */}
        {selectedPrediction && (
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Header */}
            <div className={`card ${getRiskColor(selectedPrediction.probability).bg} border-2 ${getRiskColor(selectedPrediction.probability).border}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {selectedPrediction.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-dark-950 mb-1">{selectedPrediction.patientName}</h2>
                    <p className="text-dark-600 capitalize mb-2">{selectedPrediction.riskType.replace('-', ' ')} Risk</p>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${getRiskColor(selectedPrediction.probability).badge}`}>
                        {Math.round(selectedPrediction.probability * 100)}% probability
                      </span>
                      <span className="badge badge-info">
                        {Math.round(selectedPrediction.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="card">
              <h3 className="text-lg font-semibold text-dark-950 mb-4">Risk Factors Analysis</h3>
              <div className="space-y-3">
                {selectedPrediction.factors.map((factor, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-dark-900">{factor.factor}</span>
                      <span className="text-sm font-semibold text-dark-950">
                        {Math.round(factor.weight * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-beige-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-400 to-red-600"
                        style={{ width: `${factor.weight * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="card bg-primary-950 text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">AI Recommendation</h3>
                  <p className="text-primary-200">{selectedPrediction.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Interventions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-dark-950 mb-4">Recommended Interventions</h3>
              <div className="space-y-3">
                {selectedPrediction.interventions.map((intervention, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      intervention.status === 'overdue' 
                        ? 'bg-red-50 border-red-200' 
                        : intervention.status === 'completed'
                        ? 'bg-success-50 border-success-200'
                        : 'bg-beige-50 border-beige-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {intervention.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-success-700" />
                          ) : intervention.status === 'overdue' ? (
                            <AlertTriangle className="w-4 h-4 text-red-700" />
                          ) : (
                            <Clock className="w-4 h-4 text-accent-700" />
                          )}
                          <span className="font-medium text-dark-950">{intervention.action}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`badge ${getPriorityColor(intervention.priority)}`}>
                            {intervention.priority}
                          </span>
                          <span className={`badge ${getStatusColor(intervention.status)}`}>
                            {intervention.status}
                          </span>
                        </div>
                      </div>
                      {intervention.status !== 'completed' && (
                        <button className="btn-primary ml-4">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Take Action */}
            <div className="flex gap-3">
              <button className="btn-primary flex-1">
                Execute All Interventions
              </button>
              <button className="btn-secondary">
                Adjust Recommendations
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Model Info Banner */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Activity className="w-6 h-6 text-blue-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-950 mb-2">Prediction Model Performance</h3>
            <p className="text-dark-700 text-sm mb-3">
              Current model accuracy: 92% | Trained on 2,847 patient interactions | Last updated: Oct 2025
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-dark-600">Precision</p>
                <p className="text-xl font-bold text-dark-950">91%</p>
              </div>
              <div>
                <p className="text-xs text-dark-600">Recall</p>
                <p className="text-xl font-bold text-dark-950">88%</p>
              </div>
              <div>
                <p className="text-xs text-dark-600">F1 Score</p>
                <p className="text-xl font-bold text-dark-950">0.895</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions

