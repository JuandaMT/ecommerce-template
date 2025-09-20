import { Router } from 'express'
import { register, login, getProfile, updateProfile, changePassword, logout } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

// Protected routes
router.use(verifyToken)
router.get('/profile', getProfile)
router.put('/profile', updateProfile)
router.post('/change-password', changePassword)

export { router as authRoutes }