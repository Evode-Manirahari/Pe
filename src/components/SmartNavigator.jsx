import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Command,
  ArrowRight,
  FileText,
  Users,
  CheckCircle2,
  BarChart3,
  FlaskConical,
  Brain,
  Cpu,
  Sparkles,
  Clock
} from 'lucide-react'

const SmartNavigator = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const quickActions = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: BarChart3, 
      keywords: ['home', 'overview', 'main'],
      category: 'Navigate'
    },
    { 
      name: 'Weekly Insights', 
      path: '/insights', 
      icon: Sparkles, 
      keywords: ['report', 'weekly', 'performance'],
      category: 'Navigate',
      badge: 'NEW'
    },
    { 
      name: 'View Session Notes', 
      path: '/penote', 
      icon: FileText, 
      keywords: ['notes', 'documentation', 'soap'],
      category: 'Navigate'
    },
    { 
      name: 'Care Loops', 
      path: '/peloop', 
      icon: CheckCircle2, 
      keywords: ['tasks', 'followup', 'loops'],
      category: 'Navigate'
    },
    { 
      name: 'Patient List', 
      path: '/patients', 
      icon: Users, 
      keywords: ['patients', 'roster', 'caseload'],
      category: 'Navigate'
    },
    { 
      name: 'Experiments', 
      path: '/experiments', 
      icon: FlaskConical, 
      keywords: ['test', 'ab', 'experiments'],
      category: 'Advanced'
    },
    { 
      name: 'Risk Predictions', 
      path: '/predictions', 
      icon: Brain, 
      keywords: ['risk', 'ai', 'predictions', 'alerts'],
      category: 'Advanced'
    },
    { 
      name: 'Simulations', 
      path: '/simulations', 
      icon: Cpu, 
      keywords: ['whatif', 'simulate', 'scenario'],
      category: 'Advanced'
    },
  ]

  const recentActions = [
    { name: 'Marcus Johnson - Session Note', path: '/penote/session-002', icon: FileText, time: '5m ago' },
    { name: 'Close medication review loop', action: 'complete-loop', icon: CheckCircle2, time: '15m ago' },
    { name: 'Sarah Chen - Patient Chart', path: '/patients', icon: Users, time: '1h ago' },
  ]

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const filteredActions = quickActions.filter(action =>
    action.name.toLowerCase().includes(search.toLowerCase()) ||
    action.keywords.some(kw => kw.includes(search.toLowerCase()))
  )

  const handleAction = (path) => {
    navigate(path)
    setIsOpen(false)
    setSearch('')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 p-3 bg-beige-100 hover:bg-beige-200 text-dark-700 rounded-lg shadow-medium border border-beige-300 transition-all hover:shadow-large flex items-center gap-2"
        title="Quick Navigation (⌘K)"
      >
        <Command className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:block">Quick Actions</span>
        <span className="text-xs font-mono bg-beige-200 px-1.5 py-0.5 rounded text-dark-600">⌘K</span>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark-950/20 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Palette */}
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 animate-slide-up">
        <div className="bg-white rounded-lg shadow-large border border-beige-200 mx-4">
          {/* Search Input */}
          <div className="p-4 border-b border-beige-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search actions, pages, or commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-beige-50 border border-beige-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent text-dark-950 placeholder-dark-500"
                autoFocus
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-2">
            {search === '' && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-dark-600 uppercase tracking-wide px-3 py-2">
                  Recent
                </p>
                {recentActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => action.path && handleAction(action.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-beige-50 rounded-lg transition-colors text-left"
                  >
                    <action.icon className="w-4 h-4 text-dark-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-dark-950 truncate">{action.name}</p>
                      <p className="text-xs text-dark-500">{action.time}</p>
                    </div>
                    <Clock className="w-3 h-3 text-dark-400" />
                  </button>
                ))}
              </div>
            )}

            {['Navigate', 'Advanced'].map(category => {
              const categoryActions = filteredActions.filter(a => a.category === category)
              if (categoryActions.length === 0) return null

              return (
                <div key={category} className="mb-3">
                  <p className="text-xs font-semibold text-dark-600 uppercase tracking-wide px-3 py-2">
                    {category}
                  </p>
                  {categoryActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAction(action.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-beige-50 rounded-lg transition-colors text-left group"
                    >
                      <div className="p-2 bg-beige-100 group-hover:bg-accent-100 rounded transition-colors">
                        <action.icon className="w-4 h-4 text-dark-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-dark-950 font-medium">{action.name}</p>
                        <p className="text-xs text-dark-500">{action.path}</p>
                      </div>
                      {action.badge && (
                        <span className="badge badge-success text-xs">{action.badge}</span>
                      )}
                      <ArrowRight className="w-4 h-4 text-dark-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )
            })}

            {filteredActions.length === 0 && search !== '' && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-dark-300 mx-auto mb-3" />
                <p className="text-dark-600">No results found for "{search}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-beige-200 bg-beige-50 text-xs text-dark-600 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-beige-300 rounded font-mono text-dark-700">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-beige-300 rounded font-mono text-dark-700">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-beige-300 rounded font-mono text-dark-700">esc</kbd>
                Close
              </span>
            </div>
            <span className="text-dark-500">⌘K to toggle</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmartNavigator

