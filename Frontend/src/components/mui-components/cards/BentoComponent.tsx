import { Grid2 } from '@mui/material'
import { BentoBigCard } from './BentoCard'

const cardData: { src: string; type: 'big' | 'small' | undefined; href?: string }[] = [
	{ src: '/src/assets/bento/image1.webp', type: 'big', href: '/hola' },
	{ src: '/src/assets/bento/image2.webp', type: 'small', href: '/hola' },
	{ src: '/src/assets/bento/image3.webp', type: 'small', href: '/hola' },
]
const cardData2: { src: string; type: 'big' | 'small' | undefined; href?: string }[] = [
	{ src: '/src/assets/bento/image4.webp', type: 'small', href: '/hola' },
	{ src: '/src/assets/bento/image5.webp', type: 'small', href: '/hola' },
	{ src: '/src/assets/bento/image6.webp', type: 'big', href: '/hola' },
]
export const BentoComponent = () => {
	return (
		<Grid2 container spacing={2} width={'100%'} justifyContent={'center'} alignContent={'center'}>
			<Grid2 container size={6} spacing={1}>
				{cardData.map((card, index) => {
					return <BentoBigCard src={card.src} type={card.type} key={index} href={card.href} />
				})}
			</Grid2>
			<Grid2 container size={6} spacing={1}>
				{cardData2.map((card, index) => {
					return <BentoBigCard src={card.src} type={card.type} key={index} href={card.href} />
				})}
			</Grid2>
		</Grid2>
	)
}
