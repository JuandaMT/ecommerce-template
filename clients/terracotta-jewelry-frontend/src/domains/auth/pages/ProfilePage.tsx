import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  Person,
  Edit,
  Save,
  Cancel,
  Email,
  Phone,
  LocationOn,
  Notifications,
  Security,
  ShoppingBag
} from '@mui/icons-material'

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [userProfile, setUserProfile] = useState({
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@email.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
    postalCode: '110111',
    country: 'Colombia'
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    newsletter: true
  })

  const [editedProfile, setEditedProfile] = useState(userProfile)

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(userProfile) // Reset changes
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setUserProfile(editedProfile)
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: value
    }))
  }

  // Mock user stats
  const userStats = {
    totalOrders: 12,
    totalSpent: 890000,
    memberSince: '2023-06-15',
    favoriteProducts: 8
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Perfil actualizado exitosamente
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Información Personal
              </Typography>
              <Button
                startIcon={isEditing ? <Cancel /> : <Edit />}
                onClick={handleEditToggle}
                variant={isEditing ? "outlined" : "contained"}
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={isEditing ? editedProfile.firstName : userProfile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  value={isEditing ? editedProfile.lastName : userProfile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={isEditing ? editedProfile.email : userProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={isEditing ? editedProfile.phone : userProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="País"
                  value={isEditing ? editedProfile.country : userProfile.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={isEditing ? editedProfile.address : userProfile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  value={isEditing ? editedProfile.city : userProfile.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  value={isEditing ? editedProfile.postalCode : userProfile.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Guardar Cambios
                </Button>
              </Box>
            )}
          </Paper>

          {/* Preferences */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
              Preferencias de Notificaciones
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemText
                  primary="Notificaciones por Email"
                  secondary="Recibir notificaciones de pedidos por email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.emailNotifications}
                      onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Notificaciones SMS"
                  secondary="Recibir actualizaciones de envío por SMS"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.smsNotifications}
                      onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Emails Promocionales"
                  secondary="Recibir ofertas y descuentos especiales"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.promotionalEmails}
                      onChange={(e) => handlePreferenceChange('promotionalEmails', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Newsletter"
                  secondary="Recibir noticias y novedades de productos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.newsletter}
                      onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Profile Summary and Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {userProfile.firstName[0]}{userProfile.lastName[0]}
              </Avatar>
              <Typography variant="h6">
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Cliente desde {new Date(userStats.memberSince).toLocaleDateString('es-CO')}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ShoppingBag sx={{ mr: 1, verticalAlign: 'middle' }} />
                Estadísticas
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Total de Pedidos"
                    secondary={userStats.totalOrders}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Total Gastado"
                    secondary={`$${userStats.totalSpent.toLocaleString()}`}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Productos Favoritos"
                    secondary={userStats.favoriteProducts}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                Acciones de Cuenta
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" fullWidth>
                  Cambiar Contraseña
                </Button>
                <Button variant="outlined" fullWidth>
                  Descargar Datos
                </Button>
                <Button variant="outlined" color="error" fullWidth>
                  Eliminar Cuenta
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}