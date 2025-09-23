import { Button, Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  src: string
}
export const CarrouselCard = ({ src }: Props) => {
  const navigate = useNavigate()

  const handleGoToProducts = () => {
    navigate('/productos')
  }

  return (
    <Card
      sx={{
        width: 300,
        height: 350,
        display: 'flex',
        alignItems: 'end',
        padding: 4,
        justifyContent: 'center',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
      onClick={handleGoToProducts}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#D4A574',
          color: '#332E29',
          padding: '12px 24px',
          borderRadius: '25px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          '&:hover': {
            backgroundColor: '#FCF7F1',
            transform: 'translateY(-2px)',
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          handleGoToProducts()
        }}
      >
        Ver Productos
      </Button>
    </Card>
  )
}
