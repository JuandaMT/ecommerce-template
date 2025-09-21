import { Request, Response } from 'express'
import { createUserModel } from '../models/User.js'
import { AuthRequest, generateToken } from '../middleware/auth.js'
import { validateUserInput, validateLoginInput } from '../utils/validation.js'

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body

    // Validate input
    const validation = validateUserInput({ name, email, password, phone })
    if (!validation.isValid) {
      res.status(400).json({
        message: 'Invalid input data',
        error: 'VALIDATION_ERROR',
        details: validation.errors,
      })
    }

    const User = createUserModel(req.db)

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      res.status(400).json({
        message: 'User already exists with this email',
        error: 'USER_EXISTS',
      })
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone?.trim(),
    })

    await user.save()

    // Generate token
    const token = generateToken(user, req.clientConfig)

    // Response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Invalid user data',
        error: 'VALIDATION_ERROR',
        details: error.message,
      })
    }

    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate input
    const validation = validateLoginInput({ email, password })
    if (!validation.isValid) {
      res.status(400).json({
        message: 'Invalid input data',
        error: 'VALIDATION_ERROR',
        details: validation.errors,
      })
    }

    const User = createUserModel(req.db)

    // Find user with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      res.status(401).json({
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS',
      })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS',
      })
    }

    // Generate token
    const token = generateToken(user, req.clientConfig)

    // Response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    }

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user
    if (!user) {
      res.status(401).json({
        message: 'User not authenticated',
        error: 'NOT_AUTHENTICATED',
      })
    }

    // Response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.json({
      message: 'Profile retrieved successfully',
      user: userResponse,
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user
    if (!user) {
      res.status(401).json({
        message: 'User not authenticated',
        error: 'NOT_AUTHENTICATED',
      })
    }

    const { name, phone } = req.body

    // Update only allowed fields
    if (name !== undefined) user.name = name.trim()
    if (phone !== undefined) user.phone = phone?.trim()

    await user.save()

    // Response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.json({
      message: 'Profile updated successfully',
      user: userResponse,
    })
  } catch (error) {
    console.error('Update profile error:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Invalid data',
        error: 'VALIDATION_ERROR',
        details: error.message,
      })
    }

    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user
    if (!user) {
      res.status(401).json({
        message: 'User not authenticated',
        error: 'NOT_AUTHENTICATED',
      })
    }

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        message: 'Current password and new password are required',
        error: 'MISSING_PASSWORDS',
      })
    }

    const User = createUserModel(req.db)

    // Get user with password
    const userWithPassword = await User.findById(user._id).select('+password')
    if (!userWithPassword) {
      res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND',
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await userWithPassword.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        message: 'Current password is incorrect',
        error: 'INVALID_CURRENT_PASSWORD',
      })
    }

    // Update password
    userWithPassword.password = newPassword
    await userWithPassword.save()

    res.json({
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Change password error:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Invalid new password',
        error: 'VALIDATION_ERROR',
        details: error.message,
      })
    }

    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // For stateless JWT, logout is handled on client side
    // You could implement token blacklisting here if needed

    res.json({
      message: 'Logout successful',
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    })
  }
}