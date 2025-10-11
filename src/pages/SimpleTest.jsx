import React from 'react'

const SimpleTest = () => {
  return (
    <div className="min-h-screen bg-beige-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-dark-950 mb-4">
          ✅ Pe is Working!
        </h1>
        <p className="text-xl text-dark-700 mb-8">
          If you can see this message, your Pe app is running correctly.
        </p>
        
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold text-dark-950 mb-4">Quick Navigation</h2>
          <div className="space-y-3">
            <a 
              href="/advanced/dashboard" 
              className="block p-4 bg-primary-900 hover:bg-primary-950 text-white rounded-lg transition-colors"
            >
              → Go to Full Dashboard (All 9 Pages)
            </a>
            <a 
              href="/simple" 
              className="block p-4 bg-accent-400 hover:bg-accent-500 text-dark-950 rounded-lg transition-colors"
            >
              → Try ChatGPT-Style Interface
            </a>
          </div>
        </div>

        <div className="card bg-success-50 border-success-200">
          <h3 className="text-lg font-semibold text-dark-950 mb-2">🎉 Your Pe Platform Includes:</h3>
          <ul className="space-y-2 text-dark-700">
            <li>✅ Dashboard with 100% perfect metrics</li>
            <li>✅ Weekly Insights reports</li>
            <li>✅ AI note generation (PeNote)</li>
            <li>✅ Care loop tracking (PeLoop)</li>
            <li>✅ Patient management</li>
            <li>✅ Analytics & metrics</li>
            <li>✅ Experiments manager</li>
            <li>✅ Predictive risk detection</li>
            <li>✅ What-if simulations</li>
            <li>✅ Voice commands & smart navigation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SimpleTest

