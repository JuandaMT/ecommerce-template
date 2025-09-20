import mongoose from 'mongoose'
import { getClientConfig } from './clients.js'

interface DatabaseConfig {
  uri: string
  options?: mongoose.ConnectOptions
}

const connections: Map<string, mongoose.Connection> = new Map()

export const getDatabaseConfig = (clientId: string): DatabaseConfig => {
  const clientConfig = getClientConfig(clientId)

  return {
    uri: clientConfig.DATABASE_URL || `mongodb://localhost:27017/${clientId}-ecommerce`,
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  }
}

export const getConnection = async (clientId: string): Promise<mongoose.Connection> => {
  if (connections.has(clientId)) {
    const connection = connections.get(clientId)!
    if (connection.readyState === 1) {
      return connection
    }
  }

  const config = getDatabaseConfig(clientId)
  const connection = mongoose.createConnection(config.uri, config.options)

  await new Promise((resolve, reject) => {
    connection.once('open', resolve)
    connection.once('error', reject)
  })

  connections.set(clientId, connection)
  console.log(`✅ Connected to database for client: ${clientId}`)

  return connection
}

export const closeConnection = async (clientId: string): Promise<void> => {
  const connection = connections.get(clientId)
  if (connection) {
    await connection.close()
    connections.delete(clientId)
    console.log(`🔌 Disconnected from database for client: ${clientId}`)
  }
}

export const closeAllConnections = async (): Promise<void> => {
  const closePromises = Array.from(connections.keys()).map(clientId =>
    closeConnection(clientId)
  )
  await Promise.all(closePromises)
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeAllConnections()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await closeAllConnections()
  process.exit(0)
})