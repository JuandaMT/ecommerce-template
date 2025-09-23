import { Box, Button, Grid2, Typography } from '@mui/material'
import { ArrowForward, ShoppingBag, LocalShipping, Security, Star, SupportAgent } from '@mui/icons-material'
import { CarrouselCard } from '../../../shared/components/cards/CarrouselCard'
import { InfiniteCarousel } from '../../../shared/components/carousel/InfiniteCarousel'
import { AnimatedReviews } from '../../../shared/components/reviews/AnimatedReviews'
import './Home.css'
import { BentoComponent } from '../../../shared/components/cards/BentoComponent'
import { useNavigate } from 'react-router-dom'

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
	const navigate = useNavigate()

	const handleShopNowClick = () => {
		navigate('/productos')
	}

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
							onClick={handleShopNowClick}
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
			<Box
				component={'section'}
				sx={{
					backgroundColor: '#FEFEFE',
					py: { xs: 8, md: 12 },
					px: { xs: 3, md: 5 },
				}}
			>
				<Box
					sx={{
						maxWidth: '1200px',
						margin: '0 auto',
						textAlign: 'center',
					}}
				>
					<Typography
						variant='h2'
						component={'h3'}
						sx={{
							color: '#1A1A1A',
							fontSize: { xs: '28px', md: '36px' },
							fontWeight: 300,
							letterSpacing: '0.02em',
							mb: 3,
							fontFamily: '"Playfair Display", serif',
						}}
					>
						Why Choose TerraCotta
					</Typography>
					<Typography
						variant='body1'
						component='p'
						sx={{
							color: '#666666',
							fontSize: { xs: '16px', md: '18px' },
							mb: { xs: 8, md: 10 },
							maxWidth: '520px',
							margin: '0 auto 64px',
							lineHeight: 1.7,
							fontWeight: 300,
						}}
					>
						Exceptional craftsmanship meets timeless elegance in every piece
					</Typography>

					<Grid2 container spacing={{ xs: 6, md: 8 }} justifyContent="center">
						<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 3,
									p: 4,
									borderRadius: '12px',
									border: '1px solid #E5DDD4',
									transition: 'transform 0.2s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
									}
								}}
							>
								<Box
									sx={{
										width: '64px',
										height: '64px',
										borderRadius: '50%',
										backgroundColor: '#F8F6F3',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mb: 1,
									}}
								>
									<LocalShipping sx={{ fontSize: '28px', color: '#8B7355' }} />
								</Box>
								<Typography
									variant='h6'
									sx={{
										fontSize: '18px',
										fontWeight: 400,
										color: '#1A1A1A',
										textAlign: 'center',
										mb: 1,
									}}
								>
									Complimentary Shipping
								</Typography>
								<Typography
									variant='body2'
									sx={{
										fontSize: '14px',
										color: '#888888',
										textAlign: 'center',
										lineHeight: 1.5,
									}}
								>
									Worldwide delivery on orders above $75
								</Typography>
							</Box>
						</Grid2>

						<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 3,
									p: 4,
									borderRadius: '12px',
									border: '1px solid #E5DDD4',
									transition: 'transform 0.2s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
									}
								}}
							>
								<Box
									sx={{
										width: '64px',
										height: '64px',
										borderRadius: '50%',
										backgroundColor: '#F8F6F3',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mb: 1,
									}}
								>
									<Security sx={{ fontSize: '28px', color: '#8B7355' }} />
								</Box>
								<Typography
									variant='h6'
									sx={{
										fontSize: '18px',
										fontWeight: 400,
										color: '#1A1A1A',
										textAlign: 'center',
										mb: 1,
									}}
								>
									Secure Transactions
								</Typography>
								<Typography
									variant='body2'
									sx={{
										fontSize: '14px',
										color: '#888888',
										textAlign: 'center',
										lineHeight: 1.5,
									}}
								>
									Bank-level security for all payments
								</Typography>
							</Box>
						</Grid2>

						<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 3,
									p: 4,
									borderRadius: '12px',
									border: '1px solid #E5DDD4',
									transition: 'transform 0.2s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
									}
								}}
							>
								<Box
									sx={{
										width: '64px',
										height: '64px',
										borderRadius: '50%',
										backgroundColor: '#F8F6F3',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mb: 1,
									}}
								>
									<Star sx={{ fontSize: '28px', color: '#8B7355' }} />
								</Box>
								<Typography
									variant='h6'
									sx={{
										fontSize: '18px',
										fontWeight: 400,
										color: '#1A1A1A',
										textAlign: 'center',
										mb: 1,
									}}
								>
									Artisan Crafted
								</Typography>
								<Typography
									variant='body2'
									sx={{
										fontSize: '14px',
										color: '#888888',
										textAlign: 'center',
										lineHeight: 1.5,
									}}
								>
									Each piece individually handmade
								</Typography>
							</Box>
						</Grid2>

						<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 3,
									p: 4,
									borderRadius: '12px',
									border: '1px solid #E5DDD4',
									transition: 'transform 0.2s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
									}
								}}
							>
								<Box
									sx={{
										width: '64px',
										height: '64px',
										borderRadius: '50%',
										backgroundColor: '#F8F6F3',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mb: 1,
									}}
								>
									<SupportAgent sx={{ fontSize: '28px', color: '#8B7355' }} />
								</Box>
								<Typography
									variant='h6'
									sx={{
										fontSize: '18px',
										fontWeight: 400,
										color: '#1A1A1A',
										textAlign: 'center',
										mb: 1,
									}}
								>
									Personal Service
								</Typography>
								<Typography
									variant='body2'
									sx={{
										fontSize: '14px',
										color: '#888888',
										textAlign: 'center',
										lineHeight: 1.5,
									}}
								>
									Dedicated support specialists
								</Typography>
							</Box>
						</Grid2>
					</Grid2>
				</Box>
			</Box>

			{/* Sección de Reseñas */}
			<AnimatedReviews />
		</Box>
	)
}