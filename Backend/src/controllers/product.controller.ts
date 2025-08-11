import type { Request, Response } from "express"

// Datos de ejemplo hasta que conectemos la BD
const mockProducts = [
	{ _id: '1', name: 'Laptop Pro', description: 'Potente laptop para desarrolladores.', price: 1499.99, imageUrl: 'https://via.placeholder.com/300', stock: 10 },
	{ _id: '2', name: 'Teclado Mecánico', description: 'Experiencia de tecleo inigualable.', price: 120.0, imageUrl: 'https://via.placeholder.com/300', stock: 25 },
	{ _id: '3', name: 'Monitor 4K', description: 'Resolución y colores vibrantes.', price: 450.5, imageUrl: 'https://via.placeholder.com/300', stock: 15 },
]

export const getProducts = async (req: Request, res: Response) => {
	try {
		// En un futuro, aquí iría: const products = await Product.find();
		res.status(200).json(mockProducts)
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener los productos' })
	}
}
