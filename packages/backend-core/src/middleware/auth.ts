import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createUserModel, IUser } from '../models/User.js'
import { ClientRequest } from '../utils/clientResolver.js'

export interface AuthRequest extends ClientRequest {
  user?: IUser
}

export const generateToken = (user: IUser, clientConfig: any): string => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      clientId: clientConfig.CLIENT_ID,
    },
    clientConfig.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req)

    if (!token) {
      res.status(401).json({
        message: 'Access token is required',
        error: 'MISSING_TOKEN',
      })
      return
    }

    // Verify token with client-specific secret
    const decoded = jwt.verify(token, req.clientConfig.JWT_SECRET) as any

    // Verify that token belongs to current client
    if (decoded.clientId !== req.clientId) {
      res.status(401).json({
        message: 'Invalid token for this client',
        error: 'INVALID_CLIENT_TOKEN',
      })
      return
    }

    // Get user from client database
    const User = createUserModel(req.db)
    const user = await User.findById(decoded.userId)

    if (!user) {
      res.status(401).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND',
      })
      return
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: 'Invalid token',
        error: 'INVALID_TOKEN',
      })
      return
    }

    console.error('Auth middleware error:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const requireRole = (roles: string | string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: 'Authentication required',
        error: 'NOT_AUTHENTICATED',
      })
      return
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: 'Insufficient permissions',
        error: 'INSUFFICIENT_PERMISSIONS',
      })
      return
    }

    next()
  }
}

export const requireAdmin = requireRole('admin')

function extractToken(req: Request): string | null {
  const authHeader = req.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Also check cookies for web applications
  const cookieToken = req.cookies?.token
  if (cookieToken) {
    return cookieToken
  }

  return null
}