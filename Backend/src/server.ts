import express from 'express'
import cors from 'cors'
import { apiRoutes } from './api/index.js'

const app = express()
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()) // Permite peticiones desde el frontend
app.use(express.json()) // Permite al servidor entender JSON

// Rutas
app.use('/api', apiRoutes)

app.listen(PORT, () => {
	console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
