import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Box, Grid2, Badge } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { Searchbar } from './Searchbar'
import { useState } from 'react'
import NavbarDrawer from './NavbarDrawer'
import { useCart } from '../../../../contexts/CartContext'

const iconStyle = {
  display: { xs: 'none', sm: 'flex' },
  height: { xs: '18px' },
}

export default function Navbar() {
  const [query, _setQuery] = useState('')
  const { cart, toggleCart } = useCart()

  const handleSearchChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Hola', query)
  }

  const navbarButtons = [
    { label: 'Mi cuenta', icon: <PersonOutlineIcon sx={iconStyle} />, onClick: () => {} },
    {
      label: 'Carrito',
      icon: (
        <Badge badgeContent={cart.totalItems} color="primary">
          <ShoppingBagIcon sx={iconStyle} />
        </Badge>
      ),
      onClick: toggleCart
    },
  ]
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
            {navbarButtons.map((button, index) => {
              return (
                <Button color="inherit" key={index} onClick={button.onClick}>
                  {button.icon}
                  <Typography fontSize={{ xs: '9px', sm: '14px' }}>{button.label}</Typography>
                </Button>
              )
            })}
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  )
}
