import { useState, useEffect } from 'react'
import {
	Modal,
	Box,
	IconButton,
	Typography,
	TextField,
	InputAdornment,
	Fade,
	Slide,
	Grid2,
	Divider,
	CircularProgress,
} from '@mui/material'
import { Search, Close, TrendingUp } from '@mui/icons-material'
import { useProductsIntegration } from '../../../../domains/products/hooks/useProductsIntegration'
import { ProductCard } from '../../cards/ProductCard'
import { Product } from '@ecommerce/shared-services'

interface SearchModalProps {
	open: boolean
	onClose: () => void
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Product[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const { products } = useProductsIntegration()

	// Búsquedas trending/populares
	const trendingSearches = [
		'Anillos de terracota',
		'Brazaletes artesanales',
		'Collares únicos',
		'Pendientes bohemios',
	]

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setSearchResults([])
			setIsSearching(false)
			return
		}

		setIsSearching(true)

		// Simular delay de búsqueda para mejor UX
		const searchTimeout = setTimeout(() => {
			const filtered = products.filter(product =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.category.toLowerCase().includes(searchQuery.toLowerCase())
			)
			setSearchResults(filtered)
			setIsSearching(false)
		}, 300)

		return () => clearTimeout(searchTimeout)
	}, [searchQuery, products])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const handleTrendingClick = (trend: string) => {
		setSearchQuery(trend)
	}

	const handleClose = () => {
		setSearchQuery('')
		setSearchResults([])
		onClose()
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'center',
			}}
		>
			<Fade in={open} timeout={300}>
				<Slide direction="down" in={open} timeout={400}>
					<Box
						sx={{
							width: '100%',
							height: '100vh',
							backgroundColor: '#fff',
							outline: 'none',
							position: 'relative',
							overflow: 'auto',
						}}
					>
						{/* Header con barra de búsqueda */}
						<Box
							sx={{
								position: 'sticky',
								top: 0,
								backgroundColor: '#fff',
								borderBottom: '1px solid #e0e0e0',
								zIndex: 10,
								p: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<TextField
									fullWidth
									autoFocus
									placeholder="Buscar productos..."
									value={searchQuery}
									onChange={handleSearchChange}
									variant="outlined"
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: '25px',
											backgroundColor: '#f5f5f5',
											'&:hover': {
												backgroundColor: '#eeeeee',
											},
											'&.Mui-focused': {
												backgroundColor: '#fff',
											},
										},
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Search sx={{ color: '#968679' }} />
											</InputAdornment>
										),
									}}
								/>
								<IconButton
									onClick={handleClose}
									sx={{
										backgroundColor: '#f5f5f5',
										'&:hover': {
											backgroundColor: '#e0e0e0',
										},
									}}
								>
									<Close />
								</IconButton>
							</Box>
						</Box>

						{/* Contenido */}
						<Box sx={{ p: 2 }}>
							{/* Búsquedas trending - solo cuando no hay búsqueda */}
							{searchQuery.trim() === '' && (
								<Fade in timeout={500}>
									<Box>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
											<TrendingUp sx={{ color: '#968679', mr: 1 }} />
											<Typography variant="h6" sx={{ color: '#332E29' }}>
												Búsquedas populares
											</Typography>
										</Box>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
											{trendingSearches.map((trend, index) => (
												<Box
													key={index}
													onClick={() => handleTrendingClick(trend)}
													sx={{
														p: 2,
														backgroundColor: '#f9f9f9',
														borderRadius: '12px',
														cursor: 'pointer',
														transition: 'all 0.2s ease',
														'&:hover': {
															backgroundColor: '#968679',
															color: '#fff',
															transform: 'translateX(5px)',
														},
													}}
												>
													<Typography variant="body1">{trend}</Typography>
												</Box>
											))}
										</Box>
									</Box>
								</Fade>
							)}

							{/* Indicador de carga */}
							{isSearching && (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										py: 4,
									}}
								>
									<CircularProgress sx={{ color: '#968679' }} />
								</Box>
							)}

							{/* Resultados de búsqueda */}
							{searchQuery.trim() !== '' && !isSearching && (
								<Fade in timeout={400}>
									<Box>
										<Typography
											variant="h6"
											sx={{ mb: 2, color: '#332E29' }}
										>
											{searchResults.length > 0
												? `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} encontrado${searchResults.length !== 1 ? 's' : ''}`
												: 'No se encontraron resultados'
											}
										</Typography>

										{searchResults.length > 0 && (
											<>
												<Divider sx={{ mb: 2 }} />
												<Grid2 container spacing={2}>
													{searchResults.map((product, index) => (
														<Fade
															in
															key={product._id}
															timeout={300}
															style={{ transitionDelay: `${index * 100}ms` }}
														>
															<Grid2 size={6}>
																<ProductCard product={product} />
															</Grid2>
														</Fade>
													))}
												</Grid2>
											</>
										)}

										{searchResults.length === 0 && (
											<Box
												sx={{
													textAlign: 'center',
													py: 4,
													color: '#666',
												}}
											>
												<Typography variant="body1">
													No encontramos productos que coincidan con "{searchQuery}"
												</Typography>
												<Typography variant="body2" sx={{ mt: 1 }}>
													Intenta con otros términos de búsqueda
												</Typography>
											</Box>
										)}
									</Box>
								</Fade>
							)}
						</Box>
					</Box>
				</Slide>
			</Fade>
		</Modal>
	)
}