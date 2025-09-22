import { Card } from '@mui/material'
interface BentoCardProps {
	src: string
}
export const BentoSmallCard = ({ src }: BentoCardProps) => {
	return (
		<Card
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundImage: `url(${src})`, // Asegúrate de que 'src' sea una URL válida de una imagen.
				backgroundSize: 'cover', // Para asegurar que la imagen cubra el área del Card.
				backgroundPosition: 'center',
			}}
		/>
	)
}
