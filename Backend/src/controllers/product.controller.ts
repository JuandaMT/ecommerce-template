import type { Request, Response } from "express"

// Datos de ejemplo hasta que conectemos la BD
const mockProducts = [
	{
		_id: '1',
		name: 'Anillo Terracota Clásico',
		description: 'Elegante anillo artesanal en terracota con acabado mate. Diseño minimalista perfecto para el uso diario.',
		price: 24.99,
		imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
		stock: 15
	},
	{
		_id: '2',
		name: 'Brazalete Bohemio Terra',
		description: 'Brazalete con patrones geométricos inspirados en el arte ancestral. Hecho a mano con técnicas tradicionales.',
		price: 32.50,
		imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center',
		stock: 8
	},
	{
		_id: '3',
		name: 'Collar Medallón Azteca',
		description: 'Impresionante collar con medallón grabado con motivos aztecas. Pieza única de colección.',
		price: 45.75,
		imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center',
		stock: 12
	},
	{
		_id: '4',
		name: 'Aretes Gota Natural',
		description: 'Delicados aretes en forma de gota con textura natural. Livianos y cómodos para uso prolongado.',
		price: 18.99,
		imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center',
		stock: 22
	},
	{
		_id: '5',
		name: 'Pulsera Espiral Ancestral',
		description: 'Pulsera con diseño en espiral que evoca la sabiduría ancestral. Acabado pulido brillante.',
		price: 28.00,
		imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&crop=center',
		stock: 18
	},
	{
		_id: '6',
		name: 'Conjunto Maya Completo',
		description: 'Set de collar, aretes y pulsera con motivos mayas. Ideal para ocasiones especiales.',
		price: 89.99,
		imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
		stock: 5
	},
	{
		_id: '7',
		name: 'Anillo Sello Imperial',
		description: 'Anillo tipo sello con grabados imperiales. Diseño imponente para personalidades fuertes.',
		price: 38.50,
		imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center',
		stock: 10
	},
	{
		_id: '8',
		name: 'Collar Cuentas Rústicas',
		description: 'Collar largo con cuentas rústicas de diferentes tamaños. Estilo bohemio contemporáneo.',
		price: 42.25,
		imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
		stock: 14
	},
	{
		_id: '9',
		name: 'Aretes Mandala Sagrada',
		description: 'Aretes con diseño de mandala sagrada. Símbolo de armonía y equilibrio espiritual.',
		price: 26.75,
		imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center',
		stock: 16
	},
	{
		_id: '10',
		name: 'Brazalete Guerrero Inca',
		description: 'Brazalete inspirado en los guerreros incas. Diseño robusto con detalles tallados a mano.',
		price: 52.00,
		imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center',
		stock: 7
	},
	{
		_id: '11',
		name: 'Pendientes Luna Creciente',
		description: 'Elegantes pendientes en forma de luna creciente. Perfectos para looks nocturnos elegantes.',
		price: 21.99,
		imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center',
		stock: 20
	},
	{
		_id: '12',
		name: 'Collar Torque Vikingo',
		description: 'Collar tipo torque inspirado en la cultura vikinga. Diseño masculino y poderoso.',
		price: 65.99,
		imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center',
		stock: 6
	}
]

export const getProducts = async (req: Request, res: Response) => {
	try {
		// En un futuro, aquí iría: const products = await Product.find();
		res.status(200).json(mockProducts)
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener los productos' })
	}
}
