import { Box, Grid2, IconButton, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import { useEffect, useState } from 'react'
import { NewsLetterInput } from '../../inputs/NewsLetterInput'
import CloseIcon from '@mui/icons-material/Close'
export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setOpen(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  const handleClose = () => {
    setOpen(false)
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
              Join Our Newsletter And <br />
              Get Discount Join Our Newsletter And
            </Typography>
            <Typography >
              Subscribe to the newsletter to receive updates <br /> about new products.
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
