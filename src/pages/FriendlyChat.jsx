import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Send, 
  Heart,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  Users,
  Menu,
  X,
  Home,
  UserCheck,
  MessageCircle
} from 'lucide-react'

const FriendlyChat = () => {
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi there! I'm Pe, your caring companion. I'm here to help you stay connected with your patients and remember what matters most. How can I help you today?",
      suggestions: [
        'Help me with my notes',
        'Show me who needs follow-up',
        'How are my patients doing?',
        'What should I focus on today?'
      ]
    }
  ])

  const navigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'My Notes', path: '/advanced/penote', icon: FileText },
    { name: 'Follow-ups', path: '/advanced/peloop', icon: CheckCircle },
    { name: 'My Patients', path: '/advanced/patients', icon: Users },
    { name: 'Today\'s Schedule', path: '/advanced/dashboard', icon: Calendar },
  ]

  const quickStats = [
    { label: 'Time Saved', value: '2 hours', icon: Clock, color: 'bg-blue-50 text-blue-700' },
    { label: 'Follow-ups', value: '3', icon: CheckCircle, color: 'bg-green-50 text-green-700' },
    { label: 'Patients', value: '12', icon: Users, color: 'bg-purple-50 text-purple-700' },
    { label: 'Sessions Today', value: '5', icon: Calendar, color: 'bg-orange-50 text-orange-700' },
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
      response.content = "I've prepared notes from your recent sessions:\n\n**Sarah Chen** (Oct 8) - Anxiety management\n**Marcus Johnson** (Oct 9) - Counseling session\n\nWould you like to review them?"
      response.actions = [
        { label: 'Review notes', path: '/advanced/penote' }
      ]
    } else if (input.toLowerCase().includes('follow') || input.toLowerCase().includes('follow-up')) {
      response.content = "Here are your follow-up items:\n\n🔴 Urgent: Marcus - Check on medication\n🟡 Today: Sarah - Anxiety check-in\n🟡 Tomorrow: David - Medication review\n\nI can help you stay on top of these!"
      response.actions = [
        { label: 'View all follow-ups', path: '/advanced/peloop' }
      ]
    } else if (input.toLowerCase().includes('doing') || input.toLowerCase().includes('patients') || input.toLowerCase().includes('how')) {
      response.content = "You're doing great! 🌟\n\n**This week:** 8 patients seen\n**Follow-ups completed:** 12\n**Patient satisfaction:** 9.2/10\n\nYour patients really appreciate your care!"
      response.actions = [
        { label: 'See patient details', path: '/advanced/patients' }
      ]
    } else if (input.toLowerCase().includes('focus') || input.toLowerCase().includes('today')) {
      response.content = "Here's what I think you should focus on today:\n\n1. **Marcus Johnson** - Needs medication check\n2. **Sarah Chen** - Anxiety follow-up\n3. **David Patel** - Overdue appointment\n\nYour patients are counting on you!"
    } else {
      response.content = "I'm here to help you:\n• Keep track of your notes\n• Remember follow-ups\n• Stay connected with patients\n• Focus on what matters most\n\nWhat would you like to do?"
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-0'
      } bg-gray-900 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Pe</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-300 hover:text-white transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-700">
            <div className="text-gray-300 text-xs text-center">
              Pe • Your caring companion
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Menu"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gray-900" />
                <span className="font-semibold text-gray-900">Pe</span>
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

            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 text-sm font-semibold">
              Dr. M
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
                    ? 'bg-gray-900 text-white rounded-2xl rounded-tr-md' 
                    : 'bg-white border border-gray-200 rounded-2xl rounded-tl-md shadow-sm'
                } px-6 py-4`}>
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Pe</span>
                    </div>
                  )}
                  
                  <p className={`text-base leading-relaxed whitespace-pre-line ${
                    message.type === 'user' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {message.content}
                  </p>

                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {message.actions.map((action, actionIdx) => (
                        <a
                          key={actionIdx}
                          href={action.path}
                          className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
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
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm rounded-full border border-gray-300 transition-colors"
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

        {/* Input Box */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you care for your patients today?"
                className="w-full px-6 py-4 pr-14 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                rows="1"
                style={{ minHeight: '56px', maxHeight: '200px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-3 bottom-3 p-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send • Click ☰ for more features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendlyChat
