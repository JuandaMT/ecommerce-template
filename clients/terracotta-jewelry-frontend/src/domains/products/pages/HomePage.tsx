import React from 'react'
import { Typography, Box } from '@mui/material'

export const HomePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        🏠 HomePage Funcionando
      </Typography>
      <Typography variant="body1">
        Si ves esto, el monorepo funciona correctamente.
      </Typography>
    </Box>
  )
}