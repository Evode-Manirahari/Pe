import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Command, Sparkles } from 'lucide-react'

const VoiceCommand = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [showCommands, setShowCommands] = useState(false)

  const availableCommands = [
    { command: "Go to dashboard", action: "/dashboard", category: "Navigation" },
    { command: "Go to insights", action: "/insights", category: "Navigation" },
    { command: "Show patients", action: "/patients", category: "Navigation" },
    { command: "Open care loops", action: "/peloop", category: "Navigation" },
    { command: "View metrics", action: "/metrics", category: "Navigation" },
    { command: "Show experiments", action: "/experiments", category: "Navigation" },
    { command: "Show predictions", action: "/predictions", category: "Navigation" },
    { command: "Run simulation", action: "/simulations", category: "Navigation" },
    { command: "Save note", action: "save", category: "Action" },
    { command: "Copy note", action: "copy", category: "Action" },
    { command: "Mark complete", action: "complete", category: "Action" },
    { command: "Show help", action: "help", category: "System" },
  ]

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition (in production, use Web Speech API)
      setTranscript('Listening for commands...')
    } else {
      setTranscript('')
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Command Button */}
      <div className="relative">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full shadow-large transition-all duration-200 ${
            isListening 
              ? 'bg-accent-400 text-dark-950 animate-pulse-soft shadow-accent' 
              : 'bg-primary-900 text-white hover:bg-primary-950'
          }`}
          title="Voice Commands (⌘K)"
        >
          {isListening ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </button>

        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute -top-16 right-0 bg-white rounded-lg shadow-medium border border-accent-200 p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-dark-950">Listening...</span>
            </div>
            <p className="text-xs text-dark-600">{transcript}</p>
          </div>
        )}

        {/* Command Palette Toggle */}
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="absolute -top-14 right-0 p-2 bg-beige-100 hover:bg-beige-200 text-dark-700 rounded-lg shadow-soft transition-colors border border-beige-300"
          title="Show all commands"
        >
          <Command className="w-4 h-4" />
        </button>
      </div>

      {/* Command Palette */}
      {showCommands && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-large border border-beige-200 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-beige-200 bg-primary-950 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Voice Commands</h3>
            </div>
            <p className="text-xs text-primary-200 mt-1">Say any command or use keyboard shortcuts</p>
          </div>
          <div className="p-3">
            {['Navigation', 'Action', 'System'].map((category) => (
              <div key={category} className="mb-4">
                <p className="text-xs font-semibold text-dark-600 uppercase tracking-wide mb-2 px-2">
                  {category}
                </p>
                <div className="space-y-1">
                  {availableCommands
                    .filter(cmd => cmd.category === category)
                    .map((cmd, idx) => (
                      <div 
                        key={idx}
                        className="p-2 hover:bg-beige-50 rounded cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-dark-900">{cmd.command}</span>
                          <span className="text-xs font-mono bg-beige-100 px-2 py-0.5 rounded text-dark-600">
                            Say it
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceCommand

