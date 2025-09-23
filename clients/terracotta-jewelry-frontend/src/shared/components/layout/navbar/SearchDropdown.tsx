import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Typography,
	Fade,
	CircularProgress,
	Popper,
	Paper,
	ClickAwayListener,
	Divider,
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	List,
} from '@mui/material'
import { TrendingUp } from '@mui/icons-material'
import { useProductsIntegration } from '../../../../domains/products/hooks/useProductsIntegration'
import { Product } from '@ecommerce/shared-services'

interface SearchDropdownProps {
	searchQuery: string
	anchorEl: HTMLElement | null
	open: boolean
	onClose: () => void
	onTrendingClick: (trend: string) => void
}

export const SearchDropdown = ({
	searchQuery,
	anchorEl,
	open,
	onClose,
	onTrendingClick,
}: SearchDropdownProps) => {
	const [searchResults, setSearchResults] = useState<Product[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const { products } = useProductsIntegration()
	const containerRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

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
			setSearchResults(filtered.slice(0, 6)) // Limitar a 6 resultados para dropdown
			setIsSearching(false)
		}, 300)

		return () => clearTimeout(searchTimeout)
	}, [searchQuery, products])

	return (
		<Popper
			open={open}
			anchorEl={anchorEl}
			placement="bottom-start"
			style={{ zIndex: 1300 }}
			modifiers={[
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
			]}
		>
			<ClickAwayListener onClickAway={onClose}>
				<Paper
					ref={containerRef}
					elevation={8}
					sx={{
						width: anchorEl?.offsetWidth || 400,
						maxWidth: '90vw',
						maxHeight: '70vh',
						overflow: 'auto',
						borderRadius: '12px',
						border: '1px solid #e0e0e0',
					}}
				>
					<Box sx={{ p: 2 }}>
						{/* Búsquedas trending - solo cuando no hay búsqueda */}
						{searchQuery.trim() === '' && (
							<Fade in timeout={300}>
								<Box>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<TrendingUp sx={{ color: '#968679', mr: 1, fontSize: '20px' }} />
										<Typography variant="subtitle1" sx={{ color: '#332E29', fontWeight: 500 }}>
											Búsquedas populares
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
										{trendingSearches.map((trend, index) => (
											<Box
												key={index}
												onClick={() => onTrendingClick(trend)}
												sx={{
													p: 1.5,
													backgroundColor: '#f9f9f9',
													borderRadius: '8px',
													cursor: 'pointer',
													transition: 'all 0.2s ease',
													'&:hover': {
														backgroundColor: '#968679',
														color: '#fff',
														transform: 'translateX(3px)',
													},
												}}
											>
												<Typography variant="body2">{trend}</Typography>
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
									py: 3,
								}}
							>
								<CircularProgress size={24} sx={{ color: '#968679' }} />
							</Box>
						)}

						{/* Resultados de búsqueda */}
						{searchQuery.trim() !== '' && !isSearching && (
							<Fade in timeout={300}>
								<Box>
									<Typography
										variant="subtitle1"
										sx={{ mb: 2, color: '#332E29', fontWeight: 500 }}
									>
										{searchResults.length > 0
											? `${searchResults.length > 6 ? '6+' : searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''}`
											: 'Sin resultados'
										}
									</Typography>

									{searchResults.length > 0 && (
										<>
											<Divider sx={{ mb: 1 }} />
											<List sx={{ p: 0 }}>
												{searchResults.map((product, index) => (
													<Fade
														in
														key={product._id}
														timeout={200}
														style={{ transitionDelay: `${index * 50}ms` }}
													>
														<ListItem
															sx={{
																cursor: 'pointer',
																borderRadius: '8px',
																mb: 0.5,
																transition: 'background-color 0.2s ease',
																'&:hover': {
																	backgroundColor: '#f5f5f5',
																},
															}}
															onClick={() => {
																navigate(`/productos/${product._id}`)
																onClose()
															}}
														>
															<ListItemAvatar>
																<Avatar
																	src={product.images?.[0] || '/placeholder-image.png'}
																	alt={product.name}
																	sx={{
																		width: 48,
																		height: 48,
																		borderRadius: '8px',
																		backgroundColor: '#f5f5f5',
																	}}
																>
																	{!product.images?.[0] && product.name.charAt(0).toUpperCase()}
																</Avatar>
															</ListItemAvatar>
															<ListItemText
																primary={
																	<Typography
																		variant="body1"
																		sx={{
																			fontWeight: 500,
																			fontSize: '0.95rem',
																			color: '#332E29',
																			mb: 0.5,
																		}}
																	>
																		{product.name}
																	</Typography>
																}
																secondary={
																	<Box>
																		<Typography
																			variant="body2"
																			sx={{
																				color: '#666',
																				fontSize: '0.85rem',
																				mb: 0.5,
																			}}
																		>
																			{product.category}
																		</Typography>
																		<Typography
																			variant="body2"
																			sx={{
																				color: '#968679',
																				fontWeight: 600,
																				fontSize: '0.9rem',
																			}}
																		>
																			${product.price}
																		</Typography>
																	</Box>
																}
															/>
														</ListItem>
													</Fade>
												))}
											</List>
											{products.filter(product =>
												product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
												product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
												product.category.toLowerCase().includes(searchQuery.toLowerCase())
											).length > 6 && (
												<Box sx={{ textAlign: 'center', mt: 1, pt: 1, borderTop: '1px solid #f0f0f0' }}>
													<Typography
														variant="body2"
														sx={{
															color: '#968679',
															cursor: 'pointer',
															fontSize: '0.85rem',
															'&:hover': {
																textDecoration: 'underline',
															},
														}}
														onClick={() => {
															navigate(`/productos?search=${encodeURIComponent(searchQuery)}`)
															onClose()
														}}
													>
														Ver todos los resultados
													</Typography>
												</Box>
											)}
										</>
									)}

									{searchResults.length === 0 && (
										<Box
											sx={{
												textAlign: 'center',
												py: 3,
												color: '#666',
											}}
										>
											<Typography variant="body2">
												No encontramos productos que coincidan con "{searchQuery}"
											</Typography>
											<Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
												Intenta con otros términos
											</Typography>
										</Box>
									)}
								</Box>
							</Fade>
						)}
					</Box>
				</Paper>
			</ClickAwayListener>
		</Popper>
	)
}