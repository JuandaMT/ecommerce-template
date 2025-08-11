import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3F3F3', // Color principal
    },
    secondary: {
      main: '#1B1B1B', // Color secundario
    },
  },
  typography: {
    fontFamily: "'Red Hat Text', sans-serif",
  },
})

export default theme
