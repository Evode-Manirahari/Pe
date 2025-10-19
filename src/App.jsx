import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EssentialPe from './pages/EssentialPe'
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
        
        {/* Essential Pe interface */}
        <Route path="/chat" element={<EssentialPe />} />
        
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

