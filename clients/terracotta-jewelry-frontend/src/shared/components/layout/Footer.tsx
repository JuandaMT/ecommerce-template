import React from 'react'
import {
  Box,
  Container,
  Grid2,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Link,
  Chip
} from '@mui/material'
import {
  Facebook,
  Instagram,
  Twitter,
  Email,
  Phone,
  LocationOn,
  Send,
  Security,
  LocalShipping,
  CreditCard,
  Verified
} from '@mui/icons-material'
import { clientConfig } from '../../../config/client.config'

const navigationLinks = {
  products: [
    { name: 'Collares', href: '/collares' },
    { name: 'Anillos', href: '/anillos' },
    { name: 'Pulseras', href: '/pulseras' },
    { name: 'Pendientes', href: '/pendientes' },
    { name: 'Nuevos Productos', href: '/nuevos' }
  ],
  company: [
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Proceso Artesanal', href: '/proceso' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Blog', href: '/blog' },
    { name: 'Reseñas', href: '/reseñas' }
  ],
  support: [
    { name: 'Guía de Tallas', href: '/guia-tallas' },
    { name: 'Cuidados', href: '/cuidados' },
    { name: 'Envíos y Devoluciones', href: '/envios' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Garantía', href: '/garantia' }
  ]
}

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{
      backgroundColor: '#332E29',
      color: '#FFF',
      mt: 'auto'
    }}>
      {/* Main Footer Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid2 container spacing={{ xs: 3, md: 4 }}>
          {/* Brand Section */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{
                fontWeight: 900,
                mb: 2,
                background: 'linear-gradient(45deg, #FCF7F1, #D4A574)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {clientConfig.branding.companyName}
              </Typography>
              <Typography variant="body2" sx={{
                color: '#968679',
                mb: 3,
                lineHeight: 1.6
              }}>
                {clientConfig.branding.tagline}
              </Typography>

              {/* Social Media */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <IconButton
                  sx={{
                    color: '#D4A574',
                    backgroundColor: 'rgba(212, 165, 116, 0.1)',
                    '&:hover': {
                      backgroundColor: '#D4A574',
                      color: '#332E29'
                    }
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#D4A574',
                    backgroundColor: 'rgba(212, 165, 116, 0.1)',
                    '&:hover': {
                      backgroundColor: '#D4A574',
                      color: '#332E29'
                    }
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#D4A574',
                    backgroundColor: 'rgba(212, 165, 116, 0.1)',
                    '&:hover': {
                      backgroundColor: '#D4A574',
                      color: '#332E29'
                    }
                  }}
                >
                  <Twitter />
                </IconButton>
              </Box>

              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: '18px', color: '#D4A574' }} />
                  <Typography variant="body2" sx={{ color: '#968679' }}>
                    hola@terracottajewelry.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: '18px', color: '#D4A574' }} />
                  <Typography variant="body2" sx={{ color: '#968679' }}>
                    +34 123 456 789
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: '18px', color: '#D4A574' }} />
                  <Typography variant="body2" sx={{ color: '#968679' }}>
                    Madrid, España
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid2>

          {/* Products Links */}
          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 2,
              color: '#FCF7F1'
            }}>
              Productos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigationLinks.products.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: '#968679',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      color: '#D4A574',
                      textDecoration: 'underline'
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Company Links */}
          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 2,
              color: '#FCF7F1'
            }}>
              Empresa
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigationLinks.company.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: '#968679',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      color: '#D4A574',
                      textDecoration: 'underline'
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Support Links */}
          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 2,
              color: '#FCF7F1'
            }}>
              Soporte
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigationLinks.support.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: '#968679',
                    textDecoration: 'none',
                    fontSize: '14px',
                    '&:hover': {
                      color: '#D4A574',
                      textDecoration: 'underline'
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Newsletter */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 2,
              color: '#FCF7F1'
            }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{
              color: '#968679',
              mb: 2,
              lineHeight: 1.6
            }}>
              Suscríbete para recibir ofertas exclusivas y conocer nuestras últimas creaciones artesanales.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField
                placeholder="Tu email"
                variant="outlined"
                size="small"
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(252, 247, 241, 0.1)',
                    color: '#FCF7F1',
                    '& fieldset': {
                      borderColor: 'rgba(212, 165, 116, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D4A574',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#D4A574',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#968679',
                    opacity: 1,
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#D4A574',
                  color: '#332E29',
                  fontWeight: 700,
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#FCF7F1',
                  }
                }}
                startIcon={<Send />}
              >
                Enviar
              </Button>
            </Box>

            {/* Trust Badges */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<Security />}
                label="Compra Segura"
                size="small"
                sx={{
                  backgroundColor: 'rgba(212, 165, 116, 0.2)',
                  color: '#FCF7F1',
                  border: '1px solid rgba(212, 165, 116, 0.3)'
                }}
              />
              <Chip
                icon={<LocalShipping />}
                label="Envío Gratis"
                size="small"
                sx={{
                  backgroundColor: 'rgba(212, 165, 116, 0.2)',
                  color: '#FCF7F1',
                  border: '1px solid rgba(212, 165, 116, 0.3)'
                }}
              />
              <Chip
                icon={<Verified />}
                label="Artesanal"
                size="small"
                sx={{
                  backgroundColor: 'rgba(212, 165, 116, 0.2)',
                  color: '#FCF7F1',
                  border: '1px solid rgba(212, 165, 116, 0.3)'
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      {/* Bottom Bar */}
      <Box sx={{
        borderTop: '1px solid rgba(212, 165, 116, 0.2)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" sx={{
              color: '#968679',
              textAlign: { xs: 'center', md: 'left' }
            }}>
              © {new Date().getFullYear()} {clientConfig.branding.companyName}. Todos los derechos reservados.
            </Typography>

            <Box sx={{
              display: 'flex',
              gap: { xs: 1, md: 3 },
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Link href="/privacidad" sx={{
                color: '#968679',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { color: '#D4A574' }
              }}>
                Política de Privacidad
              </Link>
              <Link href="/terminos" sx={{
                color: '#968679',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { color: '#D4A574' }
              }}>
                Términos y Condiciones
              </Link>
              <Link href="/cookies" sx={{
                color: '#968679',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { color: '#D4A574' }
              }}>
                Política de Cookies
              </Link>
            </Box>

            {/* Payment Methods */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              opacity: 0.7
            }}>
              <CreditCard sx={{ color: '#D4A574', fontSize: '20px' }} />
              <Typography variant="caption" sx={{ color: '#968679' }}>
                Visa, Mastercard, PayPal
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}