import { Box, CircularProgress, Grid2, Typography, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material'
import { Search, FilterList } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { ProductCard } from '../components/mui-components/cards/ProductCard'
import { fetchProducts } from '../services/productService'
import './Products.css'

const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('name')
	const [priceRange, setPriceRange] = useState('all')

	useEffect(() => {
		fetchProducts()
			.then((data) => {
				setProducts(data)
				setFilteredProducts(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		let filtered = [...products]

		if (searchQuery) {
			filtered = filtered.filter(product =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		if (priceRange !== 'all') {
			switch (priceRange) {
				case 'under50':
					filtered = filtered.filter(product => product.price < 50)
					break
				case '50to100':
					filtered = filtered.filter(product => product.price >= 50 && product.price <= 100)
					break
				case 'over100':
					filtered = filtered.filter(product => product.price > 100)
					break
			}
		}

		switch (sortBy) {
			case 'price-low':
				filtered.sort((a, b) => a.price - b.price)
				break
			case 'price-high':
				filtered.sort((a, b) => b.price - a.price)
				break
			case 'name':
				filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
		}

		setFilteredProducts(filtered)
	}, [products, searchQuery, sortBy, priceRange])

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box component={'main'}>
			<Box
				component={'section'}
				sx={{
					backgroundImage: 'linear-gradient(to right,#968679, #FCF7F1)',
					py: { xs: 4, md: 6 },
					textAlign: 'center'
				}}
			>
				<Typography
					variant='h3'
					sx={{
						color: '#FFF',
						fontSize: { xs: '35px', sm: '40px', md: '55px' },
						mb: 2
					}}
				>
					Nuestros Productos
				</Typography>
				<Typography
					variant='h6'
					sx={{
						fontSize: { xs: '16px', sm: '20px', md: '24px' },
						color: '#332E29'
					}}
				>
					Descubre nuestra colección completa de arte en terracota
				</Typography>
			</Box>

			<Box component={'section'} bgcolor={'#F5F5F5'} p={{ xs: 3, md: 5 }}>
				<Grid2 container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="space-between">
					<Grid2 size={{ xs: 12, md: 6 }}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Buscar productos..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
							sx={{
								backgroundColor: '#FFF',
								'& .MuiOutlinedInput-root': {
									borderRadius: '8px',
								}
							}}
						/>
					</Grid2>
					<Grid2 size={{ xs: 12, md: 6 }}>
						<Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
							<FormControl sx={{ minWidth: 120, backgroundColor: '#FFF', borderRadius: '8px' }}>
								<InputLabel>Ordenar por</InputLabel>
								<Select
									value={sortBy}
									label="Ordenar por"
									onChange={(e) => setSortBy(e.target.value)}
								>
									<MenuItem value="name">Nombre</MenuItem>
									<MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
									<MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
								</Select>
							</FormControl>
							<FormControl sx={{ minWidth: 120, backgroundColor: '#FFF', borderRadius: '8px' }}>
								<InputLabel>Precio</InputLabel>
								<Select
									value={priceRange}
									label="Precio"
									onChange={(e) => setPriceRange(e.target.value)}
								>
									<MenuItem value="all">Todos</MenuItem>
									<MenuItem value="under50">Menos de $50</MenuItem>
									<MenuItem value="50to100">$50 - $100</MenuItem>
									<MenuItem value="over100">Más de $100</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Grid2>
				</Grid2>

				<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
					<FilterList />
					<Typography variant="body2">
						{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
					</Typography>
					{searchQuery && (
						<Chip
							label={`"${searchQuery}"`}
							onDelete={() => setSearchQuery('')}
							size="small"
							sx={{ ml: 1 }}
						/>
					)}
				</Box>
			</Box>

			<Box component={'section'} className='products-grid' sx={{ p: { xs: 3, md: 5 } }}>
				{filteredProducts.length === 0 ? (
					<Box textAlign="center" py={4}>
						<Typography variant="h6" color="text.secondary">
							No se encontraron productos que coincidan con tu búsqueda
						</Typography>
					</Box>
				) : (
					<Grid2 container spacing={{ xs: 2, md: 3 }}>
						{filteredProducts.map((product) => (
							<Grid2 key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
								<ProductCard product={product} />
							</Grid2>
						))}
					</Grid2>
				)}
			</Box>

			<Box
				component={'section'}
				sx={{
					backgroundColor: '#332E29',
					py: { xs: 4, md: 6 },
					textAlign: 'center'
				}}
			>
				<Typography variant='h4' sx={{ color: '#FFF', mb: 2 }}>
					¿Por qué elegir TerraCotta?
				</Typography>
				<Typography variant='h6' sx={{ color: '#FFF', mb: 4 }}>
					Calidad artesanal y diseños únicos en cada pieza
				</Typography>
				<Grid2 container spacing={4} justifyContent="center">
					<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography sx={{ fontSize: '24px', color: '#FFF' }}>Envío gratuito mundial</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography sx={{ fontSize: '24px', color: '#FFF' }}>Garantía de calidad</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography sx={{ fontSize: '24px', color: '#FFF' }}>Diseños únicos</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
						<Typography sx={{ fontSize: '24px', color: '#FFF' }}>Soporte 24/7</Typography>
					</Grid2>
				</Grid2>
			</Box>
		</Box>
	)
}

export default Products