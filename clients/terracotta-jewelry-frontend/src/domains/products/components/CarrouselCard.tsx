import React from 'react'
import { Card, CardMedia } from '@mui/material'

interface Props {
  src: string
  alt?: string
}

export const CarrouselCard: React.FC<Props> = ({ src, alt = 'Product image' }) => {
  return (
    <Card sx={{
      maxWidth: 300,
      margin: 1,
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={src}
        alt={alt}
        sx={{ objectFit: 'cover' }}
      />
    </Card>
  )
}