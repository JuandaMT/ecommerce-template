import { useState, useEffect, useRef } from 'react'
import {
	Box,
	Typography,
	Avatar,
	Rating,
	Card,
	Container,
	Grid2,
	Chip,
} from '@mui/material'
import { Verified, Star } from '@mui/icons-material'

interface Review {
	id: number
	name: string
	avatar: string
	rating: number
	comment: string
	product: string
	date: string
	verified: boolean
	location: string
}

const reviewsData: Review[] = [
	{
		id: 1,
		name: "María González",
		avatar: "https://i.pravatar.cc/150?img=1",
		rating: 5,
		comment: "¡Absolutamente hermoso! La calidad de la terracota es excepcional y el diseño es único. Lo uso todos los días.",
		product: "Collar Ancestral",
		date: "Hace 2 días",
		verified: true,
		location: "Madrid, España"
	},
	{
		id: 2,
		name: "Ana Rodríguez",
		avatar: "https://i.pravatar.cc/150?img=2",
		rating: 5,
		comment: "Increíble trabajo artesanal. Cada detalle está perfectamente cuidado. ¡Súper recomendado!",
		product: "Pulsera Bohemia",
		date: "Hace 1 semana",
		verified: true,
		location: "Barcelona, España"
	},
	{
		id: 3,
		name: "Carmen López",
		avatar: "https://i.pravatar.cc/150?img=3",
		rating: 5,
		comment: "Me encanta la textura y el color. Es exactamente lo que buscaba para completar mi look boho.",
		product: "Pendientes Luna",
		date: "Hace 3 días",
		verified: true,
		location: "Valencia, España"
	},
	{
		id: 4,
		name: "Isabella Martín",
		avatar: "https://i.pravatar.cc/150?img=4",
		rating: 4,
		comment: "Muy bonito y de buena calidad. El packaging también es precioso. Llegó muy rápido.",
		product: "Anillo Tierra",
		date: "Hace 5 días",
		verified: true,
		location: "Sevilla, España"
	},
	{
		id: 5,
		name: "Laura Jiménez",
		avatar: "https://i.pravatar.cc/150?img=5",
		rating: 5,
		comment: "¡Una obra de arte! El proceso artesanal se nota en cada detalle. Volveré a comprar seguro.",
		product: "Brazalete Origen",
		date: "Hace 1 día",
		verified: true,
		location: "Bilbao, España"
	},
	{
		id: 6,
		name: "Sofía Torres",
		avatar: "https://i.pravatar.cc/150?img=6",
		rating: 5,
		comment: "Perfecto para regalo. La persona que lo recibió quedó encantada. Calidad premium.",
		product: "Set Primavera",
		date: "Hace 4 días",
		verified: true,
		location: "Málaga, España"
	}
]

interface ReviewCardProps {
	review: Review
	isVisible: boolean
	animationDelay: number
}

const ReviewCard = ({ review, isVisible, animationDelay }: ReviewCardProps) => {
	return (
		<Card
			sx={{
				p: 3,
				height: '100%',
				position: 'relative',
				backgroundColor: '#fff',
				borderRadius: '16px',
				boxShadow: isVisible ? '0 8px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.08)',
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
				transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
				transitionDelay: `${animationDelay}ms`,
				cursor: 'pointer',
				'&:hover': {
					transform: isVisible ? 'translateY(-8px) scale(1.02)' : 'translateY(40px) scale(0.95)',
					boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
				},
			}}
		>
			{/* Header con usuario */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
				<Avatar
					src={review.avatar}
					sx={{
						width: 48,
						height: 48,
						mr: 2,
						border: '2px solid #D4A574',
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
							{review.name}
						</Typography>
						{review.verified && (
							<Verified sx={{ color: '#4CAF50', fontSize: '16px' }} />
						)}
					</Box>
					<Typography variant="caption" color="text.secondary">
						{review.location} • {review.date}
					</Typography>
				</Box>
			</Box>

			{/* Rating */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
				<Rating
					value={review.rating}
					readOnly
					size="small"
					icon={<Star sx={{ color: '#D4A574' }} />}
					emptyIcon={<Star sx={{ color: '#e0e0e0' }} />}
				/>
				<Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
					{review.rating}.0
				</Typography>
			</Box>

			{/* Comentario */}
			<Typography
				variant="body2"
				sx={{
					mb: 2,
					lineHeight: 1.6,
					color: '#333',
					fontStyle: 'italic',
				}}
			>
				"{review.comment}"
			</Typography>

			{/* Producto */}
			<Chip
				label={review.product}
				size="small"
				sx={{
					backgroundColor: '#FCF7F1',
					color: '#968679',
					fontWeight: 600,
					border: '1px solid #D4A574',
				}}
			/>
		</Card>
	)
}

export const AnimatedReviews = () => {
	const [isVisible, setIsVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.2 }
		)

		if (containerRef.current) {
			observer.observe(containerRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<Box
			ref={containerRef}
			sx={{
				backgroundColor: '#F8F9FA',
				py: { xs: 6, md: 8 },
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Background Pattern */}
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					opacity: 0.05,
					backgroundImage: `
						radial-gradient(circle at 25% 25%, #D4A574 2px, transparent 2px),
						radial-gradient(circle at 75% 75%, #968679 2px, transparent 2px)
					`,
					backgroundSize: '60px 60px',
					backgroundPosition: '0 0, 30px 30px',
				}}
			/>

			<Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
				{/* Título de la sección */}
				<Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
					<Typography
						variant="h3"
						sx={{
							fontSize: { xs: '2rem', md: '3rem' },
							fontWeight: 900,
							mb: 2,
							background: 'linear-gradient(45deg, #332E29, #968679, #D4A574)',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Lo que dicen nuestros clientes
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						sx={{ maxWidth: '600px', mx: 'auto' }}
					>
						Más de 1,200 clientes satisfechos confían en nuestra calidad artesanal
					</Typography>
				</Box>

				{/* Grid de reseñas */}
				<Grid2 container spacing={{ xs: 2, md: 3 }}>
					{reviewsData.map((review, index) => (
						<Grid2 key={review.id} size={{ xs: 12, sm: 6, md: 4 }}>
							<ReviewCard
								review={review}
								isVisible={isVisible}
								animationDelay={index * 150}
							/>
						</Grid2>
					))}
				</Grid2>

				{/* Estadísticas finales */}
				<Box
					sx={{
						mt: { xs: 4, md: 6 },
						textAlign: 'center',
						p: 4,
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						borderRadius: '20px',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(212, 165, 116, 0.2)',
					}}
				>
					<Grid2 container spacing={4}>
						<Grid2 size={{ xs: 6, md: 3 }}>
							<Typography variant="h4" sx={{ fontWeight: 900, color: '#332E29' }}>
								4.9
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Puntuación promedio
							</Typography>
						</Grid2>
						<Grid2 size={{ xs: 6, md: 3 }}>
							<Typography variant="h4" sx={{ fontWeight: 900, color: '#332E29' }}>
								1,200+
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Reseñas verificadas
							</Typography>
						</Grid2>
						<Grid2 size={{ xs: 6, md: 3 }}>
							<Typography variant="h4" sx={{ fontWeight: 900, color: '#332E29' }}>
								98%
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Recomendarían
							</Typography>
						</Grid2>
						<Grid2 size={{ xs: 6, md: 3 }}>
							<Typography variant="h4" sx={{ fontWeight: 900, color: '#332E29' }}>
								24h
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Tiempo de respuesta
							</Typography>
						</Grid2>
					</Grid2>
				</Box>
			</Container>
		</Box>
	)
}