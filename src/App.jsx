import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SimpleDashboard from './pages/SimpleDashboard'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import PeNote from './pages/PeNote'
import PeLoop from './pages/PeLoop'
import Patients from './pages/Patients'
import Metrics from './pages/Metrics'
import Experiments from './pages/Experiments'
import Predictions from './pages/Predictions'
import Simulations from './pages/Simulations'

function App() {
  return (
    <Router>
      <Routes>
        {/* Simple ChatGPT-style interface (default) */}
        <Route path="/" element={<SimpleDashboard />} />
        <Route path="/simple" element={<SimpleDashboard />} />
        
        {/* Advanced dashboard with full navigation (optional) */}
        <Route path="/advanced/*" element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="penote" element={<PeNote />} />
              <Route path="penote/:sessionId" element={<PeNote />} />
              <Route path="peloop" element={<PeLoop />} />
              <Route path="patients" element={<Patients />} />
              <Route path="metrics" element={<Metrics />} />
              <Route path="experiments" element={<Experiments />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="simulations" element={<Simulations />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App

