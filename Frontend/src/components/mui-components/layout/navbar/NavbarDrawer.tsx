import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import InventoryIcon from '@mui/icons-material/Inventory'
import CategoryIcon from '@mui/icons-material/Category'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const buttonStyle = {
  gap:{md:1},
}

const navigationItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/' },
  { text: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { text: 'Categorías', icon: <CategoryIcon />, path: '/categorias' },
]

const secondaryItems = [
  { text: 'Acerca de', icon: <InfoIcon />, path: '/acerca' },
  { text: 'Contacto', icon: <ContactMailIcon />, path: '/contacto' },
]

export default function NavbarDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Button sx={buttonStyle} color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
        <Typography variant="h6" fontSize={'14px'} display={{xs:'none', md:'flex'}}>
          Colecciones
        </Typography>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
