import { Button, Card } from '@mui/material'

interface Props {
  src: string
}
export const CarrouselCard = ({ src }: Props) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 350,
        display: 'flex',
        alignItems: 'end',
        padding:4,
        justifyContent: 'center',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}
    >
      <Button variant="contained" style={{ backgroundColor: '#FFF', padding: '10px 20px', borderRadius: '4px' }}>
        Go now
      </Button>
    </Card>
  )
}
