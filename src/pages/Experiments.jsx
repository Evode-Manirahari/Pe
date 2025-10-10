import React, { useState } from 'react'
import { 
  FlaskConical, 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle2,
  Play,
  Pause,
  BarChart3,
  ArrowRight,
  Lightbulb,
  AlertCircle
} from 'lucide-react'
import { activeExperiments } from '../data/relationalGraph'

const Experiments = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(activeExperiments[0])

  const getSignificanceColor = (p) => {
    if (p < 0.01) return 'text-success-700 bg-success-50'
    if (p < 0.05) return 'text-accent-700 bg-accent-50'
    return 'text-dark-600 bg-beige-100'
  }

  const getSignificanceLabel = (p) => {
    if (p < 0.01) return 'Highly Significant'
    if (p < 0.05) return 'Significant'
    return 'Not Significant'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-dark-950 tracking-tight flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-primary-900" />
            Experiment Manager
          </h1>
          <p className="text-dark-600 mt-2">Test, measure, and optimize care interventions with data</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Play className="w-4 h-4" />
          Create New Experiment
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <FlaskConical className="w-5 h-5 text-primary-900" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">{activeExperiments.length}</p>
          <p className="text-sm text-dark-600 mt-1">Active Experiments</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">
            {activeExperiments.filter(e => e.significance < 0.05).length}
          </p>
          <p className="text-sm text-dark-600 mt-1">Significant Results</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Users className="w-5 h-5 text-accent-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">48</p>
          <p className="text-sm text-dark-600 mt-1">Total Participants</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">+18%</p>
          <p className="text-sm text-dark-600 mt-1">Avg Improvement</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Experiments List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-dark-700 uppercase tracking-wide mb-4">
            Running Experiments
          </h3>
          {activeExperiments.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExperiment(exp)}
              className={`card cursor-pointer transition-all ${
                selectedExperiment?.id === exp.id
                  ? 'ring-2 ring-primary-900 bg-primary-50'
                  : 'hover:shadow-medium'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-success-100 rounded">
                    <Play className="w-4 h-4 text-success-700" />
                  </div>
                  <span className="badge badge-success text-xs">Running</span>
                </div>
                <span className={`badge text-xs ${getSignificanceColor(exp.significance)}`}>
                  p = {exp.significance.toFixed(3)}
                </span>
              </div>
              <h4 className="font-semibold text-dark-950 mb-2">{exp.name}</h4>
              <p className="text-xs text-dark-600 mb-3">{exp.hypothesis}</p>
              <div className="flex items-center gap-2 text-xs text-dark-500">
                <Users className="w-3 h-3" />
                {exp.cohorts.reduce((sum, c) => sum + c.size, 0)} participants
              </div>
            </div>
          ))}
        </div>

        {/* Experiment Details */}
        {selectedExperiment && (
          <div className="lg:col-span-2 space-y-6">
            {/* Experiment Header */}
            <div className="card bg-primary-950 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedExperiment.name}</h2>
                  <p className="text-primary-200">{selectedExperiment.hypothesis}</p>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                  <Pause className="w-4 h-4 inline mr-2" />
                  Pause
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-primary-300">Started:</span>{' '}
                  <span className="font-medium">{selectedExperiment.startDate}</span>
                </div>
                <div className="h-4 w-px bg-primary-700"></div>
                <div>
                  <span className="text-primary-300">Status:</span>{' '}
                  <span className="font-medium">Running</span>
                </div>
              </div>
            </div>

            {/* Cohorts */}
            <div className="card">
              <h3 className="text-lg font-semibold text-dark-950 mb-4">Cohorts</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedExperiment.cohorts.map((cohort, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-beige-50 rounded-lg border border-beige-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {idx === 0 ? (
                        <Target className="w-4 h-4 text-dark-600" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-accent-600" />
                      )}
                      <span className="font-semibold text-dark-950">{cohort.name}</span>
                    </div>
                    <p className="text-2xl font-bold text-dark-950">{cohort.size}</p>
                    <p className="text-xs text-dark-600 mt-1">participants</p>
                    <div className="mt-3 px-2 py-1 bg-white rounded text-xs font-mono text-dark-700">
                      {cohort.noteStyle || cohort.timing}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark-950">Results</h3>
                <span className={`badge ${getSignificanceColor(selectedExperiment.significance)}`}>
                  {getSignificanceLabel(selectedExperiment.significance)}
                </span>
              </div>
              <div className="space-y-4">
                {selectedExperiment.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-dark-950">{metric.name}</span>
                      <span className={`badge ${
                        metric.change.startsWith('+') ? 'badge-success' : 'badge-danger'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-dark-600 mb-1">Control</p>
                        <p className="text-2xl font-bold text-dark-900">{metric.control}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-600 mb-1">Treatment</p>
                        <p className="text-2xl font-bold text-success-700">{metric.treatment}</p>
                      </div>
                    </div>
                    {/* Visual bar comparison */}
                    <div className="mt-3 h-2 bg-beige-200 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-dark-400"
                        style={{ width: `${(metric.control / Math.max(metric.control, metric.treatment)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-success-500"
                        style={{ width: `${(metric.treatment / Math.max(metric.control, metric.treatment)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="card bg-accent-50 border-accent-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-400 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-dark-950" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-dark-950 mb-2">Recommendation</h3>
                  <p className="text-dark-700 mb-4">{selectedExperiment.recommendation}</p>
                  <button className="btn-primary">
                    Implement Changes
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Experiments

