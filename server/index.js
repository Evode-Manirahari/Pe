import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Pe Backend API',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  })
})

// API Routes (placeholder for FHIR integration)
app.get('/api/v1/patients', (req, res) => {
  res.json({ 
    message: 'FHIR Patient endpoint - to be implemented',
    resourceType: 'Bundle',
    type: 'searchset'
  })
})

app.get('/api/v1/sessions', (req, res) => {
  res.json({ 
    message: 'Session notes endpoint - to be implemented',
    resourceType: 'Bundle',
    type: 'searchset'
  })
})

app.get('/api/v1/care-loops', (req, res) => {
  res.json({ 
    message: 'Care loop tracking endpoint - to be implemented',
    resourceType: 'Bundle',
    type: 'searchset'
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 Pe Backend API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔒 HIPAA-compliant security headers enabled`)
})

