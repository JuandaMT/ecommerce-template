import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { config } from './config/environment.js'
import { resolveClient } from './utils/clientResolver.js'
import { authRoutes } from './routes/auth.routes.js'

const app = express()

// Security middleware
app.use(helmet())
app.use(compression())

// CORS configuration
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.API_VERSION,
  })
})

// Client resolution middleware for all API routes
app.use('/api', resolveClient)

// Routes
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error)

  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    error: 'INTERNAL_ERROR',
    ...(config.NODE_ENV === 'development' && { stack: error.stack }),
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    error: 'NOT_FOUND',
  })
})

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Multi-tenant backend server running on port ${config.PORT}`)
  console.log(`📝 Environment: ${config.NODE_ENV}`)
  console.log(`🔗 CORS origins: ${config.CORS_ORIGIN.join(', ')}`)
})

export default app