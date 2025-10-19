import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FriendlyChat from './pages/FriendlyChat'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PeNote from './pages/PeNote'
import PeLoop from './pages/PeLoop'
import Patients from './pages/Patients'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page (default) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Friendly chat interface */}
        <Route path="/chat" element={<FriendlyChat />} />
        
        {/* Simple dashboard pages */}
        <Route path="/advanced/*" element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="penote" element={<PeNote />} />
              <Route path="penote/:sessionId" element={<PeNote />} />
              <Route path="peloop" element={<PeLoop />} />
              <Route path="patients" element={<Patients />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App

