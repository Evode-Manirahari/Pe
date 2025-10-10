import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
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
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penote" element={<PeNote />} />
          <Route path="/penote/:sessionId" element={<PeNote />} />
          <Route path="/peloop" element={<PeLoop />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/simulations" element={<Simulations />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

