import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material'
import { CarrouselCard } from '../components/mui-components/cards/CarrouselCard'
import './Home.css'
import { BentoComponent } from '../components/mui-components/cards/BentoComponent'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { ProductCard } from '../components/mui-components/cards/ProductCard'
import { fetchProducts } from '../services/productService'

const mainButton = {
	backgroundColor: '#FFF',
	padding: '10px 20px',
	borderRadius: '4px',
}
const Home = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchProducts()
			.then((data) => {
				setProducts(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		)
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
						<Button variant='contained' sx={{ mainButton, mt: 1 }}>
							SHOP NOW
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
			<Box component={'section'} className='carrousel'>
				<CarrouselCard src='/src/assets/images/Anillo1.webp' />
				<CarrouselCard src='/src/assets/images/Anillo2.webp' />
				<CarrouselCard src='/src/assets/images/Brazalete1.webp' />
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
					sx={{ color: '#FFF', textAlign: 'center' }} // Color en sx
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
				<Grid2 container spacing={4}>
					{products.map((product) => (
						<Grid2 key={product._id}>
							<ProductCard product={product} />
						</Grid2>
					))}
				</Grid2>
			</Grid2>
		</Box>
	)
}

export default Home
