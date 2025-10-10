import React, { useState } from 'react'
import { 
  Cpu, 
  Play, 
  TrendingUp,
  Layers,
  Target,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  Sparkles
} from 'lucide-react'
import { simulationScenarios } from '../data/relationalGraph'

const Simulations = () => {
  const [selectedScenario, setSelectedScenario] = useState(simulationScenarios[0])
  const [isRunning, setIsRunning] = useState(false)

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-success-700'
    if (change.startsWith('-') && change.includes('missed')) return 'text-success-700'
    if (change.startsWith('-')) return 'text-red-700'
    return 'text-dark-700'
  }

  const getEffortColor = (effort) => {
    const colors = {
      low: 'badge-success',
      medium: 'badge-warning',
      high: 'badge-danger'
    }
    return colors[effort] || 'badge-info'
  }

  const handleRunSimulation = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-dark-950 tracking-tight flex items-center gap-3">
            <Cpu className="w-8 h-8 text-primary-900" />
            What-If Simulations
          </h1>
          <p className="text-dark-600 mt-2">Model and visualize the impact of interventions before implementation</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Create Scenario
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Layers className="w-5 h-5 text-primary-900" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">{simulationScenarios.length}</p>
          <p className="text-sm text-dark-600 mt-1">Active Scenarios</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">+15%</p>
          <p className="text-sm text-dark-600 mt-1">Avg Predicted Gain</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Target className="w-5 h-5 text-accent-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">91%</p>
          <p className="text-sm text-dark-600 mt-1">Avg Confidence</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-700" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dark-950">3</p>
          <p className="text-sm text-dark-600 mt-1">Ready to Deploy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-dark-700 uppercase tracking-wide mb-4">
            Simulation Scenarios
          </h3>
          {simulationScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`card cursor-pointer transition-all ${
                selectedScenario?.id === scenario.id
                  ? 'ring-2 ring-primary-900 bg-primary-50'
                  : 'hover:shadow-medium'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-1.5 bg-primary-100 rounded">
                  <Cpu className="w-4 h-4 text-primary-900" />
                </div>
                <span className="badge badge-info text-xs">
                  {Math.round(scenario.confidence * 100)}% confidence
                </span>
              </div>
              <h4 className="font-semibold text-dark-950 mb-2">{scenario.name}</h4>
              <p className="text-xs text-dark-600 mb-3">{scenario.description}</p>
              <div className="flex items-center gap-2">
                <span className={`badge ${getEffortColor(scenario.implementation.effort)} text-xs`}>
                  {scenario.implementation.effort} effort
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scenario Details */}
        {selectedScenario && (
          <div className="lg:col-span-2 space-y-6">
            {/* Scenario Header */}
            <div className="card bg-primary-950 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">{selectedScenario.name}</h2>
                  <p className="text-primary-200 mb-4">{selectedScenario.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="badge bg-white/10 text-white border-white/20">
                      Confidence: {Math.round(selectedScenario.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="w-full px-4 py-3 bg-accent-400 hover:bg-accent-500 text-dark-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play className="w-5 h-5" />
                {isRunning ? 'Running Simulation...' : 'Run Simulation'}
              </button>
            </div>

            {/* Projected Impact */}
            <div className="card">
              <h3 className="text-lg font-semibold text-dark-950 mb-4">Projected Impact</h3>
              <div className="space-y-4">
                {Object.entries(selectedScenario.projectedImpact).map(([key, values]) => (
                  <div key={key} className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-dark-950 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`badge badge-success font-semibold`}>
                        {values.change}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-dark-600 mb-1">Current</p>
                        <p className="text-2xl font-bold text-dark-900">{values.current}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-600 mb-1">Projected</p>
                        <p className="text-2xl font-bold text-success-700">{values.projected}</p>
                      </div>
                    </div>
                    {/* Progress visualization */}
                    <div className="mt-3">
                      <div className="h-2 bg-beige-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-dark-400 to-success-500 transition-all duration-1000"
                          style={{ 
                            width: isRunning ? '100%' : `${(values.projected / Math.max(values.current, values.projected)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-dark-950 mb-4">Implementation Plan</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-dark-600" />
                    <span className="text-xs font-semibold text-dark-700 uppercase">Effort</span>
                  </div>
                  <p className="text-xl font-bold text-dark-950 capitalize">{selectedScenario.implementation.effort}</p>
                </div>
                <div className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-dark-600" />
                    <span className="text-xs font-semibold text-dark-700 uppercase">Timeframe</span>
                  </div>
                  <p className="text-xl font-bold text-dark-950">{selectedScenario.implementation.timeframe}</p>
                </div>
                <div className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-dark-600" />
                    <span className="text-xs font-semibold text-dark-700 uppercase">Cost</span>
                  </div>
                  <p className="text-xl font-bold text-dark-950 capitalize">{selectedScenario.implementation.cost}</p>
                </div>
              </div>
            </div>

            {/* Visual Impact Chart */}
            <div className="card bg-accent-50 border-accent-200">
              <h3 className="text-lg font-semibold text-dark-950 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Impact Visualization
              </h3>
              <div className="bg-white p-6 rounded-lg">
                <div className="space-y-4">
                  {Object.entries(selectedScenario.projectedImpact).map(([key, values], idx) => {
                    const maxValue = Math.max(values.current, values.projected)
                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-dark-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className={`text-sm font-semibold ${getChangeColor(values.change)}`}>
                            {values.change}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="h-8 bg-dark-200 rounded flex items-center justify-end pr-3" style={{ width: `${(values.current / maxValue) * 100}%` }}>
                              <span className="text-xs font-semibold text-dark-950">{values.current}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="h-8 bg-success-500 rounded flex items-center justify-end pr-3" style={{ width: `${(values.projected / maxValue) * 100}%` }}>
                              <span className="text-xs font-semibold text-white">{values.projected}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-beige-200">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-dark-200 rounded"></div>
                    <span className="text-xs text-dark-600">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success-500 rounded"></div>
                    <span className="text-xs text-dark-600">Projected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="btn-primary flex-1">
                Deploy Scenario
              </button>
              <button className="btn-secondary">
                Export Report
              </button>
              <button className="btn-secondary">
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Simulations

