import { Box, Grid2, IconButton, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NewsLetterInput } from '../../inputs/NewsLetterInput'
import CloseIcon from '@mui/icons-material/Close'

interface PopupContent {
  title: string
  subtitle: string
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [isListenerActive, setIsListenerActive] = useState(false)
  const location = useLocation()

  const commercialPages = ['/', '/productos', '/categorias']
  const shouldShowOnCurrentPage = commercialPages.includes(location.pathname)

  const getPopupContent = (pathname: string): PopupContent => {
    switch (pathname) {
      case '/productos':
        return {
          title: '¡No te vayas! Tienes productos increíbles esperándote',
          subtitle: 'Suscríbete y obtén descuentos exclusivos en nuestra colección'
        }
      case '/categorias':
        return {
          title: '¡Espera! Descubre nuestras categorías especiales',
          subtitle: 'Recibe ofertas personalizadas según tus intereses'
        }
      default:
        return {
          title: 'Join Our Newsletter And Get Discount',
          subtitle: 'Subscribe to the newsletter to receive updates about new products.'
        }
    }
  }

  const popupContent = getPopupContent(location.pathname)

  useEffect(() => {
    if (!shouldShowOnCurrentPage) return

    const hasShownInSession = sessionStorage.getItem('exitIntentShown') === 'true'
    if (hasShownInSession) return

    // Activar el listener después de 30 segundos
    const timer = setTimeout(() => {
      setIsListenerActive(true)
    }, 30000)

    return () => {
      clearTimeout(timer)
      setIsListenerActive(false)
    }
  }, [shouldShowOnCurrentPage, location.pathname])

  useEffect(() => {
    if (!isListenerActive) return

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setOpen(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isListenerActive])
  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem('exitIntentShown', 'true')
  }

  return (
    <div>
      <Backdrop sx={(theme) => ({ color: '#F2F2F2', zIndex: theme.zIndex.drawer + 1 })} open={open} /* onClick={handleClose} */>
        <Grid2
          container
          flexDirection={'row'}
          justifyContent={'center'}
          position={'absolute'}
          bottom={0}
          bgcolor={'#F5F5F5'}
          width={'100%'}
          height={'250px'}
          gap={5}
        >
          <Grid2 maxWidth={'700px'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} boxSizing={'content-box'}>
            <Grid2 container maxWidth={'100%'} height={'100%'} justifyContent="center" alignItems="center">
              <Box component="img" src="/src/assets/banners/Banner01.png" maxHeight="100%" />
            </Grid2>
          </Grid2>
          <Grid2 display={'flex'} justifyContent={'center'} gap={2} sx={{ color: 'black' }} flexDirection={'column'}>
            <Typography component={'h6'} variant='h6' fontWeight={'bold'} >
              {popupContent.title}
            </Typography>
            <Typography >
              {popupContent.subtitle}
            </Typography>
          </Grid2>
          <Grid2 container alignContent={'center'} justifyContent={'center'} flexDirection={'column'} gap={2}>
            <Grid2>
              <NewsLetterInput />
            </Grid2>
            <Grid2 sx={{ color: 'black' }} textAlign={'center'}>
              SocialMedia
            </Grid2>
          </Grid2>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 5 }} size="small">
            <CloseIcon />
          </IconButton>
        </Grid2>
      </Backdrop>
    </div>
  )
}
