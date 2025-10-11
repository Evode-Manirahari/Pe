import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Send, 
  Sparkles,
  Heart,
  Clock,
  CheckCircle,
  User,
  Calendar,
  FileText,
  TrendingUp,
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  FlaskConical,
  Brain,
  Cpu,
  CheckCircle2
} from 'lucide-react'

const ChatInterface = () => {
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Good morning, Dr. Martinez! I am Pe, your care companion. What would you like to do today?",
      suggestions: [
        'Draft notes from my last session',
        'Show me what needs follow-up',
        'How am I doing this week?',
        'Which patients need attention?'
      ]
    }
  ])

  const navigation = [
    { name: 'Dashboard', path: '/advanced/dashboard', icon: LayoutDashboard },
    { name: 'Insights', path: '/advanced/insights', icon: Sparkles, badge: 'NEW' },
    { name: 'PeNote', path: '/advanced/penote', icon: FileText },
    { name: 'PeLoop', path: '/advanced/peloop', icon: CheckCircle2 },
    { name: 'Patients', path: '/advanced/patients', icon: Users },
    { name: 'Metrics', path: '/advanced/metrics', icon: BarChart3 },
    { name: 'Experiments', path: '/advanced/experiments', icon: FlaskConical },
    { name: 'Predictions', path: '/advanced/predictions', icon: Brain },
    { name: 'Simulations', path: '/advanced/simulations', icon: Cpu },
  ]

  const quickStats = [
    { label: 'Time Saved', value: '120 min', icon: Clock, color: 'bg-blue-50 text-blue-700' },
    { label: 'Loops', value: '5', icon: CheckCircle, color: 'bg-green-50 text-green-700' },
    { label: 'Empathy', value: '10/10', icon: Heart, color: 'bg-red-50 text-red-700' },
    { label: 'Sessions', value: '6', icon: Calendar, color: 'bg-purple-50 text-purple-700' },
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { type: 'user', content: input }
    ]

    let response = {
      type: 'assistant',
      content: '',
      actions: []
    }

    if (input.toLowerCase().includes('note') || input.toLowerCase().includes('session')) {
      response.content = "I have drafted notes from your last 2 sessions:\n\n**Sarah Chen** (Oct 8) - Anxiety management\n**Marcus Johnson** (Oct 9) - Substance use counseling\n\nReady to review?"
      response.actions = [
        { label: 'Review notes', path: '/advanced/penote' }
      ]
    } else if (input.toLowerCase().includes('follow') || input.toLowerCase().includes('loop')) {
      response.content = "You have 5 care items:\n\n🔴 Urgent: Marcus - Medication check\n🟡 Today: Sarah - Anxiety log\n🟡 Tomorrow: David - Med review\n\nLet me help you close these."
      response.actions = [
        { label: 'View all loops', path: '/advanced/peloop' }
      ]
    } else if (input.toLowerCase().includes('doing') || input.toLowerCase().includes('score') || input.toLowerCase().includes('week')) {
      response.content = "Exceptional week! 🎉\n\n**Score:** 9.2/10 (up from 8.7)\n**Loops Closed:** 12\n**Engagement:** 100%\n\nTop 6% of all clinicians!"
      response.actions = [
        { label: 'See full insights', path: '/advanced/insights' }
      ]
    } else if (input.toLowerCase().includes('patient') || input.toLowerCase().includes('attention')) {
      response.content = "2 patients need attention:\n\n**Marcus Johnson** - 73% disengagement risk\n**David Patel** - Overdue med review"
      response.actions = [
        { label: 'View patients', path: '/advanced/patients' }
      ]
    } else {
      response.content = "I can help you:\n• Draft session notes\n• Track follow-ups\n• Review performance\n• Find patients needing attention\n\nWhat do you need?"
    }

    newMessages.push(response)
    setMessages(newMessages)
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestion = (suggestion) => {
    setInput(suggestion)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <div className="min-h-screen bg-beige-50 flex">
      {/* Sidebar (ChatGPT-style) */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-0'
      } bg-primary-950 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Pe</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-primary-300 hover:text-white transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 text-primary-200 hover:bg-primary-900 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
                {item.badge && (
                  <span className="badge bg-success-500 text-white border-0 text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-primary-800">
            <div className="text-primary-300 text-xs text-center">
              Pe v0.2.0 • All physicians
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-beige-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
                title="Menu"
              >
                <Menu className="w-5 h-5 text-dark-700" />
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary-900" />
                <span className="font-semibold text-dark-950">Pe</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-2">
              {quickStats.map((stat, idx) => (
                <div key={idx} className={`px-3 py-1.5 rounded-lg ${stat.color} flex items-center gap-2`}>
                  <stat.icon className="w-4 h-4" />
                  <div>
                    <p className="text-xs font-medium">{stat.label}</p>
                    <p className="text-sm font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-8 h-8 bg-beige-200 rounded-lg flex items-center justify-center text-dark-700 text-sm font-semibold">
              LM
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${
                  message.type === 'user' 
                    ? 'bg-primary-900 text-white rounded-2xl rounded-tr-md' 
                    : 'bg-white border border-beige-200 rounded-2xl rounded-tl-md shadow-soft'
                } px-6 py-4`}>
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent-500" />
                      <span className="text-xs font-semibold text-dark-600 uppercase tracking-wide">Pe</span>
                    </div>
                  )}
                  
                  <p className={`text-base leading-relaxed whitespace-pre-line ${
                    message.type === 'user' ? 'text-white' : 'text-dark-900'
                  }`}>
                    {message.content}
                  </p>

                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {message.actions.map((action, actionIdx) => (
                        <a
                          key={actionIdx}
                          href={action.path}
                          className="px-4 py-2 bg-primary-900 hover:bg-primary-950 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          {action.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {message.suggestions.map((suggestion, sugIdx) => (
                        <button
                          key={sugIdx}
                          onClick={() => handleSuggestion(suggestion)}
                          className="px-4 py-2 bg-beige-50 hover:bg-beige-100 text-dark-900 text-sm rounded-full border border-beige-300 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box (ChatGPT-style) */}
        <div className="bg-white border-t border-beige-200 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Pe anything... (e.g., 'Draft notes' or 'What needs follow-up?')"
                className="w-full px-6 py-4 pr-14 bg-beige-50 border border-beige-300 rounded-xl focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-none text-dark-950 placeholder-dark-500"
                rows="1"
                style={{ minHeight: '56px', maxHeight: '200px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-3 bottom-3 p-2.5 bg-primary-900 hover:bg-primary-950 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-dark-500 text-center mt-2">
              Press Enter to send • Click ☰ for full features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface

