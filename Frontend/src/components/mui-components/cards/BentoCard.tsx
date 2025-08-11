import { Box, Card, Grid2 } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface BentoCardProps {
	src: string
	type?: 'big' | 'small' | undefined
	href?: string
}
export const BentoBigCard = ({ src, type, href }: BentoCardProps) => {
	const navigate = useNavigate()
  console.log(href)
	const handleClick = () => {
		if (href) navigate(href || '/')
	}
	return (
		<Grid2 container size={type == 'big' ? 12 : 6} height={450} onClick={handleClick}>
			<Card
				sx={{
					width: '100%',
					height: '100%',
					position: 'relative',
					backgroundImage: `url(${src})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					overflow: 'hidden',
					'&:hover .overlay': {
						opacity: 1,
						cursor: 'pointer',
					},
					'&:hover .text': {
						opacity: 1,
						transform: 'translate(-50%, -50%)',
						cursor: 'pointer',
						userSelect: 'none',
					},
				}}
			>
				{/* Capa oscura para que el texto resalte */}
				<Box
					className='overlay'
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						opacity: 0,
						transition: 'opacity 0.3s ease-in-out',
					}}
				/>

				{/* Texto centrado */}
				<Box
					className='text'
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -60%)', // animación empieza un poco arriba
						opacity: 0,
						transition: 'opacity 0.3s ease, transform 0.3s ease',
						color: 'white',
						fontWeight: 'bold',
						fontSize: '1.5rem',
						textAlign: 'center',
					}}
				>
					Visitar
				</Box>
			</Card>
		</Grid2>
	)
}
