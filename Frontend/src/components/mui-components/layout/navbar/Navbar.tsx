import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Box, Grid2, Badge, Menu, MenuItem, Divider, CircularProgress } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { AccountCircle, Logout, Person, Settings } from '@mui/icons-material'
import { Searchbar } from './Searchbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarDrawer from './NavbarDrawer'
import { useCart } from '../../../../contexts/CartContext'
import { useAuth } from '../../../../contexts/AuthContext'

const iconStyle = {
  display: { xs: 'none', sm: 'flex' },
  height: { xs: '18px' },
}

export default function Navbar() {
  const [query] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { cart, toggleCart } = useCart()
  const { authState, logout } = useAuth()
  const navigate = useNavigate()

  const handleSearchChange = () => {
    console.log('Hola', query)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/perfil')
    handleMenuClose()
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  // Renderizar botones según estado de autenticación
  const renderAuthButton = () => {
    if (authState.isLoading) {
      return (
        <Button color="inherit" disabled>
          <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
          <Typography fontSize={{ xs: '9px', sm: '14px' }}>Cargando...</Typography>
        </Button>
      )
    }

    if (authState.isAuthenticated && authState.user) {
      return (
        <Button color="inherit" onClick={handleMenuOpen}>
          <AccountCircle sx={iconStyle} />
          <Typography fontSize={{ xs: '9px', sm: '14px' }}>
            {authState.user.name.split(' ')[0]}
          </Typography>
        </Button>
      )
    }

    return (
      <Button color="inherit" onClick={handleLoginClick}>
        <PersonOutlineIcon sx={iconStyle} />
        <Typography fontSize={{ xs: '9px', sm: '14px' }}>Iniciar Sesión</Typography>
      </Button>
    )
  }

  const cartButton = {
    label: 'Carrito',
    icon: (
      <Badge badgeContent={cart.totalItems} color="primary">
        <ShoppingBagIcon sx={iconStyle} />
      </Badge>
    ),
    onClick: toggleCart
  }
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        top: 0,
      }}
    >
      <Toolbar disableGutters sx={{ my: { xs: 0, xl: 1 }, px: { xs: 0, sm: 2, md: 3 } }}>
        <Grid2 container flexDirection={'row'} width={'100%'} alignItems={'center'}>
          <Grid2 display={'flex'} alignItems={'center'} flexDirection={'row'} flexWrap={'nowrap'} size={4} gap={{  md: 4 }}>
            <NavbarDrawer />
            <Grid2 maxWidth={'200px'} display={{ xs: 'none', md: 'flex' }}>
              <Searchbar value={query} onChange={handleSearchChange} name="" />
            </Grid2>
          </Grid2>
          <Grid2 size={4} display={'flex'} justifyContent={'center'}>
            <Box component={'img'} maxHeight={{ xs: '25px', md: '40px' }} src="/src/assets/Logo.png" />
          </Grid2>
          <Grid2 size={4} gap={{ xs: 0, xl: 3 }} display={'flex'} justifyContent={'end'}>
            {renderAuthButton()}
            <Button color="inherit" onClick={cartButton.onClick}>
              {cartButton.icon}
              <Typography fontSize={{ xs: '9px', sm: '14px' }}>{cartButton.label}</Typography>
            </Button>
          </Grid2>
        </Grid2>
      </Toolbar>

      {/* Menu desplegable del usuario */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 200,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authState.user && (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {authState.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {authState.user.email}
            </Typography>
          </Box>
        )}
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <Person sx={{ mr: 2 }} />
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 2 }} />
          Configuración
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 2 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </AppBar>
  )
}
