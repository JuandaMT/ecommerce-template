import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { apiRoutes } from './api/index.js'

const app = express()
const PORT = process.env.PORT || 5001;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/terracotta-ecommerce'

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('✅ Conectado a MongoDB')
	})
	.catch((error) => {
		console.error('❌ Error conectando a MongoDB:', error.message)
		// Para desarrollo, continuamos sin base de datos
		console.log('⚠️  Continuando sin conexión a MongoDB (solo para desarrollo)')
	})

// Middlewares
app.use(cors()) // Permite peticiones desde el frontend
app.use(express.json()) // Permite al servidor entender JSON

// Rutas
app.use('/api', apiRoutes)

app.listen(PORT, () => {
	console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
