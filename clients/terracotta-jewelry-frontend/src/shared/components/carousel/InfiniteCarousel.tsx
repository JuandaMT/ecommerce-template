import { Box, styled, keyframes } from '@mui/material'
import { ReactNode } from 'react'

// Animación de desplazamiento infinito
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`

const CarouselContainer = styled(Box)({
	width: '100%',
	overflow: 'hidden',
	position: 'relative',
	padding: '40px 0',
	background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
	'&::before, &::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		width: '100px',
		height: '100%',
		zIndex: 2,
		pointerEvents: 'none',
	},
	'&::before': {
		left: 0,
		background: 'linear-gradient(to right, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0))',
	},
	'&::after': {
		right: 0,
		background: 'linear-gradient(to left, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0))',
	},
})

const CarouselTrack = styled(Box)({
	display: 'flex',
	width: 'max-content',
	animation: `${scroll} 20s linear infinite`,
	'&:hover': {
		animationPlayState: 'paused',
	},
})

const CarouselItem = styled(Box)({
	minWidth: '300px',
	marginRight: '40px',
	transition: 'transform 0.3s ease, filter 0.3s ease',
	'&:hover': {
		transform: 'scale(1.05) translateY(-10px)',
		filter: 'brightness(1.1)',
		zIndex: 1,
	},
})

interface InfiniteCarouselProps {
	children: ReactNode[]
	speed?: number
}

export const InfiniteCarousel = ({ children, speed = 20 }: InfiniteCarouselProps) => {
	// Duplicamos los items para crear el efecto infinito
	const duplicatedChildren = [...children, ...children, ...children]

	return (
		<CarouselContainer>
			<CarouselTrack
				sx={{
					animation: `${scroll} ${speed}s linear infinite`,
				}}
			>
				{duplicatedChildren.map((child, index) => (
					<CarouselItem key={index}>
						{child}
					</CarouselItem>
				))}
			</CarouselTrack>
		</CarouselContainer>
	)
}