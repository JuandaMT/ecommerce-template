import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	Typography,
	useTheme,
} from '@mui/material'
import {
	Home,
	Category,
	ShoppingBag,
	AccountCircle,
	Info,
	Phone,
	LocalShipping,
	Help,
} from '@mui/icons-material'
import { useCartMock } from '../../../hooks/useCartMock'

interface NavbarDrawerProps {
	open: boolean
	onToggle: () => void
}

const navigationItems = [
	{ text: 'Inicio', icon: <Home />, path: '/' },
	{ text: 'Productos', icon: <Category />, path: '/products' },
	{ text: 'Sobre Nosotros', icon: <Info />, path: '/about' },
	{ text: 'Contacto', icon: <Phone />, path: '/contact' },
]

const accountItems = [
	{ text: 'Mi Cuenta', icon: <AccountCircle />, path: '/account' },
	{ text: 'Mis Pedidos', icon: <LocalShipping />, path: '/orders' },
	{ text: 'Ayuda', icon: <Help />, path: '/help' },
]

export const NavbarDrawer = ({ open, onToggle }: NavbarDrawerProps) => {
	const theme = useTheme()
	const { cartSummary } = useCartMock()

	const handleNavigation = (path: string) => {
		// TODO: Implement navigation
		console.log('Navigate to:', path)
		onToggle()
	}

	const drawerContent = (
		<Box sx={{ width: 280 }} role="presentation">
			{/* Header */}
			<Box
				sx={{
					p: 2,
					backgroundColor: '#332E29',
					color: 'white',
					textAlign: 'center',
				}}
			>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>
					TerraCotta
				</Typography>
				<Typography variant="body2" sx={{ opacity: 0.8 }}>
					Joyería Artesanal
				</Typography>
			</Box>

			{/* Navigation Items */}
			<List>
				{navigationItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton onClick={() => handleNavigation(item.path)}>
							<ListItemIcon sx={{ color: '#968679' }}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Divider />

			{/* Cart Summary */}
			<Box sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
				<ListItemButton onClick={() => handleNavigation('/cart')}>
					<ListItemIcon>
						<ShoppingBag sx={{ color: '#968679' }} />
					</ListItemIcon>
					<Box>
						<Typography variant="body2" sx={{ fontWeight: 600 }}>
							Mi Carrito
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{cartSummary.itemCount} items - ${cartSummary.total.toFixed(2)}
						</Typography>
					</Box>
				</ListItemButton>
			</Box>

			<Divider />

			{/* Account Items */}
			<List>
				{accountItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton onClick={() => handleNavigation(item.path)}>
							<ListItemIcon sx={{ color: '#968679' }}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			{/* Footer */}
			<Box sx={{ p: 2, mt: 'auto', textAlign: 'center' }}>
				<Typography variant="caption" color="text.secondary">
					© 2024 TerraCotta Jewelry
				</Typography>
			</Box>
		</Box>
	)

	return (
		<Drawer
			variant="temporary"
			anchor="left"
			open={open}
			onClose={onToggle}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile
			}}
			sx={{
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: 280,
				},
			}}
		>
			{drawerContent}
		</Drawer>
	)
}