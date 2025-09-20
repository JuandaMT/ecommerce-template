import { Request, Response, NextFunction } from 'express'
import { getClientConfig } from '../config/clients.js'
import { getConnection } from '../config/database.js'

export interface ClientRequest extends Request {
  clientId: string
  clientConfig: any
  db: any
}

export const resolveClient = async (
  req: ClientRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract client ID from subdomain, header, or query parameter
    let clientId = extractClientId(req)

    if (!clientId) {
      res.status(400).json({
        message: 'Client ID is required',
        error: 'MISSING_CLIENT_ID'
      })
      return
    }

    // Load client configuration
    try {
      const clientConfig = getClientConfig(clientId)
      req.clientId = clientId
      req.clientConfig = clientConfig

      // Get database connection for this client
      req.db = await getConnection(clientId)

      next()
    } catch (error) {
      res.status(404).json({
        message: `Client not found: ${clientId}`,
        error: 'CLIENT_NOT_FOUND'
      })
      return
    }
  } catch (error) {
    console.error('Error resolving client:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR'
    })
  }
}

function extractClientId(req: Request): string | null {
  // Method 1: From X-Client-ID header
  const headerClientId = req.get('X-Client-ID')
  if (headerClientId) {
    return headerClientId
  }

  // Method 2: From subdomain (e.g., client1.api.example.com)
  const host = req.get('Host') || ''
  const hostParts = host.split('.')
  if (hostParts.length >= 3) {
    const potentialClientId = hostParts[0]
    // Validate that it's not a common subdomain
    const commonSubdomains = ['www', 'api', 'admin', 'app']
    if (!commonSubdomains.includes(potentialClientId)) {
      return potentialClientId
    }
  }

  // Method 3: From query parameter
  const queryClientId = req.query.clientId as string
  if (queryClientId) {
    return queryClientId
  }

  // Method 4: From path parameter (if route is defined with /:clientId)
  const pathClientId = req.params.clientId
  if (pathClientId) {
    return pathClientId
  }

  return null
}

export const requireClient = (req: ClientRequest, res: Response, next: NextFunction): void => {
  if (!req.clientId || !req.clientConfig) {
    res.status(400).json({
      message: 'Client context is required',
      error: 'MISSING_CLIENT_CONTEXT'
    })
    return
  }
  next()
}