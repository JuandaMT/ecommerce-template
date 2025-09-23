import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge,
	Box,
	Container,
	useMediaQuery,
	useTheme,
	Button,
} from '@mui/material'
import { Search, ShoppingBag, AccountCircle } from '@mui/icons-material'
import { Searchbar } from './Searchbar'
import { SearchModal } from './SearchModal'
import { SearchDropdown } from './SearchDropdown'
import { useCartMock } from '../../../hooks/useCartMock'


const logo = '/src/assets/images/terracotta-logo.png'

export const Navbar = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const [searchValue, setSearchValue] = useState('')
	const [searchModalOpen, setSearchModalOpen] = useState(false)
	const [searchDropdownOpen, setSearchDropdownOpen] = useState(false)
	const searchRef = useRef<HTMLDivElement>(null)
	const { cartSummary } = useCartMock()
	const navigate = useNavigate()

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
		if (!isMobile) {
			setSearchDropdownOpen(true)
		}
	}

	const handleSearchFocus = () => {
		if (!isMobile) {
			// Pequeño delay para evitar conflicto con ClickAwayListener
			setTimeout(() => {
				setSearchDropdownOpen(true)
			}, 50)
		}
	}

	const handleSearchDropdownClose = () => {
		setSearchDropdownOpen(false)
	}

	const handleTrendingClick = (trend: string) => {
		setSearchValue(trend)
		setSearchDropdownOpen(false)
	}

	const handleSearchModalOpen = () => {
		setSearchModalOpen(true)
	}

	const handleSearchModalClose = () => {
		setSearchModalOpen(false)
	}

	const handleSearchSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		setSearchDropdownOpen(false)
		if (searchValue.trim()) {
			navigate(`/productos?search=${encodeURIComponent(searchValue.trim())}`)
		} else {
			navigate('/productos')
		}
	}
	return (
		<>
			<AppBar position="sticky" sx={{ backgroundColor: '#ffffffd7', boxShadow: 'none', color: '#000' }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* Logo */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								mr: 2,
								cursor: 'pointer',
								transition: 'opacity 0.2s ease',
								'&:hover': {
									opacity: 0.8,
								}
							}}
							onClick={() => navigate('/')}
						>
							<img
								src={logo}
								alt="TerraCotta"
								style={{
									height: '40px',
									width: 'auto',
									marginRight: '8px',
								}}
								onError={(e) => {
									const target = e.target as HTMLImageElement
									target.style.display = 'none'
								}}
							/>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									fontWeight: 700,
									letterSpacing: '.1rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								TerraCotta
							</Typography>
						</Box>

						{/* Search bar - only on desktop */}
						{!isMobile && (
							<Box
								ref={searchRef}
								component="form"
								onSubmit={handleSearchSubmit}
								sx={{ mx: 3, maxWidth: '400px', position: 'relative' }}
							>
								<Searchbar
									name="search"
									value={searchValue}
									onChange={handleSearchChange}
									onFocus={handleSearchFocus}
								/>
							</Box>
						)}

						{/* Spacer to center navigation */}
						<Box sx={{ flexGrow: 1 }} />

						{/* Navigation Menu - Center */}
						<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
							<Button
								onClick={() => navigate('/productos')}
								sx={{
									color: '#332E29',
									fontWeight: 500,
									fontSize: '16px',
									textTransform: 'none',
									px: 3,
									py: 1,
									borderRadius: '8px',
									'&:hover': {
										backgroundColor: '#F8F6F3',
									}
								}}
							>
								Productos
							</Button>
							{/* Prepared for future navigation items */}
							{/*
							<Button
								onClick={() => navigate('/historia')}
								sx={{
									color: '#332E29',
									fontWeight: 500,
									fontSize: '16px',
									textTransform: 'none',
									px: 3,
									py: 1,
									borderRadius: '8px',
									'&:hover': {
										backgroundColor: '#F8F6F3',
									}
								}}
							>
								Historia
							</Button>
							<Button
								onClick={() => navigate('/contacto')}
								sx={{
									color: '#332E29',
									fontWeight: 500,
									fontSize: '16px',
									textTransform: 'none',
									px: 3,
									py: 1,
									borderRadius: '8px',
									'&:hover': {
										backgroundColor: '#F8F6F3',
									}
								}}
							>
								Contacto
							</Button>
							*/}
						</Box>

						{/* Spacer to push icons to the right */}
						<Box sx={{ flexGrow: 1 }} />

						{/* Right side icons */}
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{/* Search icon for mobile */}
							{isMobile && (
								<IconButton
									color="inherit"
									size="large"
									onClick={handleSearchModalOpen}
									sx={{
										transition: 'transform 0.2s ease',
										'&:hover': {
											transform: 'scale(1.1)',
										},
									}}
								>
									<Search />
								</IconButton>
							)}

							{/* User account */}
							<IconButton color="inherit" size="large">
								<AccountCircle />
							</IconButton>

							{/* Shopping cart */}
							<IconButton color="inherit" size="large">
								<Badge badgeContent={cartSummary.itemCount} color="error">
									<ShoppingBag />
								</Badge>
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			{/* Search Modal */}
			<SearchModal
				open={searchModalOpen}
				onClose={handleSearchModalClose}
			/>

			{/* Search Dropdown for Desktop */}
			{!isMobile && (
				<SearchDropdown
					searchQuery={searchValue}
					anchorEl={searchRef.current}
					open={searchDropdownOpen}
					onClose={handleSearchDropdownClose}
					onTrendingClick={handleTrendingClick}
				/>
			)}
		</>
	)
}
