import { Box, Button, Grid2, Typography } from '@mui/material'
import { ArrowForward, ShoppingBag } from '@mui/icons-material'
import { CarrouselCard } from '../../../shared/components/cards/CarrouselCard'
import { InfiniteCarousel } from '../../../shared/components/carousel/InfiniteCarousel'
import { AnimatedReviews } from '../../../shared/components/reviews/AnimatedReviews'
import './Home.css'
import { BentoComponent } from '../../../shared/components/cards/BentoComponent'

const modernButton = {
	background: 'linear-gradient(135deg, #FFF 0%, #F8F8F8 100%)',
	color: '#332E29',
	padding: { xs: '12px 24px', md: '16px 32px' },
	borderRadius: '50px',
	fontSize: { xs: '14px', sm: '16px', md: '18px' },
	fontWeight: 700,
	letterSpacing: '0.5px',
	textTransform: 'uppercase',
	border: '2px solid transparent',
	boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
	backdropFilter: 'blur(10px)',
	position: 'relative',
	overflow: 'hidden',
	transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
	'&:hover': {
		background: 'linear-gradient(135deg, #332E29 0%, #4A453E 100%)',
		color: '#FFF',
		transform: 'translateY(-4px) scale(1.05)',
		boxShadow: '0 20px 40px rgba(51, 46, 41, 0.4), 0 8px 24px rgba(0, 0, 0, 0.2)',
		border: '2px solid rgba(255, 255, 255, 0.2)',
	},
	'&:active': {
		transform: 'translateY(-2px) scale(1.02)',
	},
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: '-100%',
		width: '100%',
		height: '100%',
		background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
		transition: 'left 0.6s ease',
	},
	'&:hover::before': {
		left: '100%',
	},
}

export const HomePage = () => {
	return (
		<Box component={'main'}>
			<Box
				component={'section'}
				overflow={'hidden'}
				sx={{
					backgroundImage: 'linear-gradient(to right,#968679, #FCF7F1)',
				}}
			>
				<Grid2 container minHeight={{ md: '400px' }} flexWrap={'nowrap'}>
					<Grid2 size={6} display={'flex'} flexDirection={'column'} alignItems={{ xs: 'start', md: 'center' }} justifyContent={'center'} p={{ xs: 3, md: 5 }} gap={{ xs: 1, md: 2 }}>
						<Typography variant='h5' sx={{ color: '#FFF', fontSize: { xs: '30px', sm: '35px', md: '50px' } }}>
							NEW ARRIVALS
						</Typography>
						<Typography variant='h5' sx={{ fontSize: { xs: '14px', sm: '23px', md: '25px' } }}>
							Create Your Clay Art & Print
						</Typography>
						<Button
							variant='contained'
							sx={{ ...modernButton, mt: { xs: 2, md: 3 } }}
							startIcon={<ShoppingBag />}
							endIcon={<ArrowForward />}
						>
							Shop Now
						</Button>
					</Grid2>
					<Grid2 size={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} maxHeight={'400px'}>
						<Grid2 container justifyContent={'center'} alignItems={'center'} p={{ md: 15 }}>
							<img src='/src/assets/images/Model1.webp' alt='Anillo1' width='100%' height={'100%'}></img>
						</Grid2>
					</Grid2>
				</Grid2>
			</Box>
			<Box display={'flex'} flexDirection={'column'} component={'section'} bgcolor={'#F5F5F5'} p={5} textAlign={'center'} gap={{ xs: 1, md: 2 }}>
				<Typography variant='h4' fontSize={{ xs: '30px', md: '50px' }}>
					Exclusive Category
				</Typography>
				<Typography variant='h6' fontSize={{ xs: '13px', md: '30px' }} color='#616161'>
					Discover our fantastic early booking discounts & <br /> start planning your journey.
				</Typography>
			</Box>
			<Box component={'section'}>
				<InfiniteCarousel speed={100}>
					<CarrouselCard src='/src/assets/images/Anillo1.webp' />
					<CarrouselCard src='/src/assets/images/Anillo2.webp' />
					<CarrouselCard src='/src/assets/images/Brazalete1.webp' />
					<CarrouselCard src='/src/assets/images/Anillo1.webp' />
					<CarrouselCard src='/src/assets/images/Anillo2.webp' />
				</InfiniteCarousel>
			</Box>
			<Box component={'section'} bgcolor={'#F5F5F5'} p={5} textAlign={'center'}>
				<Typography variant='h4'>Our Products</Typography>
				<Typography variant='h6'>
					Discover our fantastic early booking discounts & <br /> start planning your journey.
				</Typography>
			</Box>
			<Box component={'section'} className='products-bento'>
				<BentoComponent />
			</Box>
			<Grid2
				container
				height={'300px'}
				style={{
					width: '100%',
					height: '300px',
					backgroundColor: '#332E29',
				}}
			>
				<Grid2
					container
					width={'100%'}
					justifyContent='center'
					alignItems='center'
					flexDirection={'column'}
					gap={8}
					sx={{ color: '#FFF', textAlign: 'center' }}
				>
					<Typography component={'h3'}>Why TerraCotta?</Typography>
					<Typography variant='h6' component='h6'>
						Discover our fantastic early booking discounts & start planning your journey
					</Typography>
					<Grid2 container width={'100%'}>
						<Grid2 size={3}>
							<Box>Icono</Box>
							<Typography sx={{ fontSize: '29px' }}>Free delivery Worldwide</Typography>
						</Grid2>
						<Grid2 size={3}>
							<Box>Icono</Box>
							<Typography sx={{ fontSize: '29px' }}>Free delivery Worldwide</Typography>
						</Grid2>
						<Grid2 size={3}>
							<Box>Icono</Box>
							<Typography sx={{ fontSize: '29px' }}>Free delivery Worldwide</Typography>
						</Grid2>
						<Grid2 size={3}>
							<Box>Icono</Box>
							<Typography sx={{ fontSize: '29px' }}>Free delivery Worldwide</Typography>
						</Grid2>
					</Grid2>
				</Grid2>
			</Grid2>

			{/* Sección de Reseñas */}
			<AnimatedReviews />
		</Box>
	)
}