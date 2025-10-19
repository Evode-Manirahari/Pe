import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Heart } from 'lucide-react'

const EssentialPe = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi! I'm Pe. How can I help you care for your patients today?",
      suggestions: [
        'Help with notes',
        'Check follow-ups',
        'See my patients'
      ]
    }
  ])

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

    if (input.toLowerCase().includes('note')) {
      response.content = "I've prepared notes from your recent sessions. Ready to review?"
      response.actions = [
        { label: 'Review notes', path: '/advanced/penote' }
      ]
    } else if (input.toLowerCase().includes('follow')) {
      response.content = "You have 3 follow-ups:\n\n• Marcus - Medication check\n• Sarah - Anxiety check-in\n• David - Medication review"
      response.actions = [
        { label: 'View follow-ups', path: '/advanced/peloop' }
      ]
    } else if (input.toLowerCase().includes('patient')) {
      response.content = "Here are your patients:\n\n• Marcus Johnson - Needs attention\n• Sarah Chen - Doing well\n• David Patel - Overdue appointment"
      response.actions = [
        { label: 'View patients', path: '/advanced/patients' }
      ]
    } else {
      response.content = "I can help you with:\n• Notes\n• Follow-ups\n• Patients\n\nWhat do you need?"
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
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-gray-900" />
            <span className="text-xl font-semibold text-gray-900">Pe</span>
          </Link>
          <Link 
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Chat Area */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${
                message.type === 'user' 
                  ? 'bg-gray-900 text-white rounded-2xl rounded-tr-md' 
                  : 'bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-md'
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
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 text-sm rounded-full border border-gray-300 transition-colors"
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

        {/* Input */}
        <div className="mt-8">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="How can I help you care for your patients?"
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
        </div>
      </div>
    </div>
  )
}

export default EssentialPe
