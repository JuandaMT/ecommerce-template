import { Router } from 'express'
import { register, login, getProfile, updateProfile, changePassword, logout } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/register', register as any)
router.post('/login', login as any)
router.post('/logout', logout as any)

// Protected routes
router.use(verifyToken as any)
router.get('/profile', getProfile as any)
router.put('/profile', updateProfile as any)
router.post('/change-password', changePassword as any)

export { router as authRoutes }