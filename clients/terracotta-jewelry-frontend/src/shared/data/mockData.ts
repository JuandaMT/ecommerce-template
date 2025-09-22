import { Product } from '@ecommerce/shared-services'

// Datos mock específicos para Terracotta Jewelry
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Anillo de Terracota Artesanal',
    description: 'Hermoso anillo hecho a mano con técnicas tradicionales de terracota. Cada pieza es única y refleja la maestría artesanal.',
    price: 45.99,
    imageUrl: '/src/assets/images/Anillo1.webp',
    stock: 12,
    category: 'anillos',
    tags: ['artesanal', 'terracota', 'único', 'hecho a mano'],
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z'
  },
  {
    _id: '2',
    name: 'Collar de Cerámica Pintado',
    description: 'Elegante collar de cerámica pintado a mano con motivos florales. Perfecto para ocasiones especiales.',
    price: 75.50,
    imageUrl: '/src/assets/images/Anillo2.webp',
    stock: 8,
    category: 'collares',
    tags: ['cerámica', 'pintado a mano', 'elegante', 'flores'],
    isActive: true,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    _id: '3',
    name: 'Brazalete Tribal de Arcilla',
    description: 'Brazalete único con diseños tribales tradicionales. Hecho con arcilla natural y pigmentos orgánicos.',
    price: 60.25,
    imageUrl: '/src/assets/images/Brazalete1.webp',
    stock: 15,
    category: 'brazaletes',
    tags: ['tribal', 'arcilla', 'natural', 'tradicional'],
    isActive: true,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-15T12:30:00Z'
  },
  {
    _id: '4',
    name: 'Pendientes de Terracota Esculpidos',
    description: 'Delicados pendientes esculpidos en terracota con acabado mate. Livianos y cómodos para uso diario.',
    price: 35.99,
    imageUrl: '/src/assets/images/Anillo1.webp',
    stock: 20,
    category: 'pendientes',
    tags: ['esculpidos', 'mate', 'livianos', 'diario'],
    isActive: true,
    createdAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-22T09:10:00Z'
  },
  {
    _id: '5',
    name: 'Pulsera de Cerámica Esmaltada',
    description: 'Hermosa pulsera con esmalte brillante en tonos tierra. Resistente al agua y perfecta para cualquier ocasión.',
    price: 52.75,
    imageUrl: '/src/assets/images/Anillo2.webp',
    stock: 10,
    category: 'pulseras',
    tags: ['esmaltada', 'brillante', 'resistente', 'tierra'],
    isActive: true,
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-19T15:20:00Z'
  },
  {
    _id: '6',
    name: 'Conjunto de Anillos Minimalistas',
    description: 'Set de 3 anillos minimalistas en diferentes tonos de terracota. Perfectos para combinar y crear looks únicos.',
    price: 89.99,
    imageUrl: '/src/assets/images/Brazalete1.webp',
    stock: 6,
    category: 'anillos',
    tags: ['conjunto', 'minimalista', 'combinable', 'set'],
    isActive: true,
    createdAt: '2024-01-03T07:30:00Z',
    updatedAt: '2024-01-17T18:00:00Z'
  },
  {
    _id: '7',
    name: 'Collar Gargantilla de Arcilla',
    description: 'Moderna gargantilla de arcilla con textura rugosa. Diseño contemporáneo que combina tradición y modernidad.',
    price: 68.00,
    imageUrl: '/src/assets/images/Anillo1.webp',
    stock: 9,
    category: 'collares',
    tags: ['gargantilla', 'moderna', 'textura', 'contemporáneo'],
    isActive: true,
    createdAt: '2024-01-07T14:15:00Z',
    updatedAt: '2024-01-21T10:45:00Z'
  },
  {
    _id: '8',
    name: 'Brazalete de Terracota Grabado',
    description: 'Espectacular brazalete con grabados geométricos. Pieza statement perfecta para destacar cualquier outfit.',
    price: 95.50,
    imageUrl: '/src/assets/images/Anillo2.webp',
    stock: 4,
    category: 'brazaletes',
    tags: ['grabado', 'geométrico', 'statement', 'destacar'],
    isActive: true,
    createdAt: '2024-01-02T16:00:00Z',
    updatedAt: '2024-01-16T13:25:00Z'
  },
  {
    _id: '9',
    name: 'Pendientes Colgantes de Cerámica',
    description: 'Elegantes pendientes colgantes con formas orgánicas. Inspirados en la naturaleza y hechos con cerámica de alta calidad.',
    price: 42.25,
    imageUrl: '/src/assets/images/Brazalete1.webp',
    stock: 14,
    category: 'pendientes',
    tags: ['colgantes', 'orgánico', 'naturaleza', 'calidad'],
    isActive: true,
    createdAt: '2024-01-11T12:30:00Z',
    updatedAt: '2024-01-23T08:15:00Z'
  },
  {
    _id: '10',
    name: 'Anillo de Compromiso de Terracota',
    description: 'Exclusivo anillo de compromiso hecho en terracota con incrustaciones de oro de 24k. Una pieza única para momentos especiales.',
    price: 245.00,
    imageUrl: '/src/assets/images/Anillo1.webp',
    stock: 2,
    category: 'anillos',
    tags: ['compromiso', 'exclusivo', 'oro', 'especial'],
    isActive: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-20T17:30:00Z'
  }
]

// Categorías disponibles
export const mockCategories = [
  { id: 'anillos', name: 'Anillos', count: 3 },
  { id: 'collares', name: 'Collares', count: 2 },
  { id: 'brazaletes', name: 'Brazaletes', count: 2 },
  { id: 'pendientes', name: 'Pendientes', count: 2 },
  { id: 'pulseras', name: 'Pulseras', count: 1 }
]

// Tags más populares
export const mockTags = [
  'artesanal', 'terracota', 'hecho a mano', 'cerámica',
  'natural', 'tradicional', 'único', 'minimalista',
  'elegante', 'moderno', 'statement'
]

// Simulación de delay de red
export const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}