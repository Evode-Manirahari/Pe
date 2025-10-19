import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-semibold text-black">
            Pe
          </div>
          <Link 
            to="/chat"
            className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-7xl md:text-8xl font-bold text-black leading-tight mb-8">
              Health OS for<br />
              clinicians.
            </h1>
            <Link 
              to="/chat"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-semibold text-black">
            Pe
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
