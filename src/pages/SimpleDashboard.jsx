import React, { useState } from 'react'
import { 
  Send, 
  Sparkles,
  Heart,
  Clock,
  CheckCircle,
  User,
  Calendar,
  FileText,
  TrendingUp
} from 'lucide-react'

const SimpleDashboard = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Good morning, Dr. Martinez! I'm Pe, your care companion. What would you like to do today?",
      suggestions: [
        'Draft notes from my last session',
        'Show me what needs follow-up',
        'How am I doing this week?',
        'Which patients need attention?'
      ]
    }
  ])

  const quickStats = [
    { label: 'Time Saved Today', value: '120 min', icon: Clock, color: 'bg-blue-50 text-blue-700' },
    { label: 'Loops to Close', value: '5', icon: CheckCircle, color: 'bg-green-50 text-green-700' },
    { label: 'Empathy Score', value: '10/10', icon: Heart, color: 'bg-red-50 text-red-700' },
    { label: 'Sessions', value: '6 today', icon: Calendar, color: 'bg-purple-50 text-purple-700' },
  ]

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const newMessages = [
      ...messages,
      { type: 'user', content: input }
    ]

    // Simulate AI response based on input
    let response = {
      type: 'assistant',
      content: '',
      actions: []
    }

    if (input.toLowerCase().includes('note') || input.toLowerCase().includes('session')) {
      response.content = "I've drafted notes from your last 2 sessions:\n\n**Sarah Chen** (Oct 8) - Anxiety management session\n**Marcus Johnson** (Oct 9) - Substance use counseling\n\nWould you like to review or edit them?"
      response.actions = [
        { label: 'Review Sarah\'s note', icon: FileText },
        { label: 'Review Marcus\'s note', icon: FileText }
      ]
    } else if (input.toLowerCase().includes('follow') || input.toLowerCase().includes('loop')) {
      response.content = "You have 5 care items that need attention:\n\n🔴 **Urgent:** Marcus Johnson - Medication check (overdue)\n🟡 **Today:** Sarah Chen - Anxiety log review\n🟡 **Tomorrow:** David Patel - Med review\n\nWant me to help you close these?"
      response.actions = [
        { label: 'Close urgent items first', icon: CheckCircle },
        { label: 'Show full list', icon: FileText }
      ]
    } else if (input.toLowerCase().includes('doing') || input.toLowerCase().includes('score') || input.toLowerCase().includes('week')) {
      response.content = "You're having an exceptional week! 🎉\n\n**Presence Score:** 9.2/10 (up from 8.7)\n**Care Loops Closed:** 12 (best week yet!)\n**Patient Engagement:** 100%\n\nYou're in the top 6% of all Pe clinicians. Keep it up!"
      response.actions = [
        { label: 'See full insights', icon: TrendingUp },
        { label: 'Compare to peers', icon: User }
      ]
    } else if (input.toLowerCase().includes('patient') || input.toLowerCase().includes('attention')) {
      response.content = "2 patients need your attention:\n\n**Marcus Johnson** - High disengagement risk (73%). Recent relapse, showing shame. Recommend: Schedule 2nd weekly session.\n\n**David Patel** - Overdue medication review (5 days). Action needed this week."
      response.actions = [
        { label: 'Schedule Marcus session', icon: Calendar },
        { label: 'Complete David review', icon: CheckCircle }
      ]
    } else {
      response.content = "I can help you with:\n• Draft session notes\n• Track care follow-ups\n• Review your performance\n• Find patients needing attention\n• Schedule appointments\n\nWhat would you like to do?"
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
    <div className="min-h-screen bg-beige-50 flex flex-col">
      {/* Simple Top Bar */}
      <div className="bg-white border-b border-beige-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-white">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-dark-950">Pe</h1>
              <p className="text-xs text-dark-600">Your care companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-beige-100 rounded-lg flex items-center justify-center text-dark-700">
              LM
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-beige-200 px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-3">
            {quickStats.map((stat, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${stat.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${
                message.type === 'user' 
                  ? 'bg-primary-900 text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white border border-beige-200 rounded-2xl rounded-tl-sm shadow-soft'
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

                {/* Action Buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {message.actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        className="px-4 py-2 bg-primary-900 hover:bg-primary-950 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <action.icon className="w-4 h-4" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
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

      {/* Input Bar (ChatGPT-style) */}
      <div className="bg-white border-t border-beige-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Pe anything... (e.g., 'Draft notes from my last session' or 'What needs follow-up?')"
              className="w-full px-6 py-4 pr-14 bg-beige-50 border border-beige-300 rounded-xl focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-none text-dark-950 placeholder-dark-500"
              rows="1"
              style={{ minHeight: '60px', maxHeight: '200px' }}
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
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimpleDashboard

