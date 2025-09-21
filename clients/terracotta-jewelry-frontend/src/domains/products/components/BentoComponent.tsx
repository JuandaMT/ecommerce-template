import React from 'react'
import { Box, Grid2, Typography } from '@mui/material'

export const BentoComponent: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{
            height: 200,
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6">Featured Product 1</Typography>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{
            height: 200,
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6">Featured Product 2</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}