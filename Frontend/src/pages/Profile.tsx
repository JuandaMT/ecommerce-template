import { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  IconButton,
  InputAdornment
} from '@mui/material'
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  LocationOn,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/authService'

const Profile = () => {
  const { authState, updateProfile } = useAuth()
  const { user } = authState

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    isDefault: false,
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setAddressData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      await updateProfile(profileData)
      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente' })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message || 'Error al actualizar perfil' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres' })
      return
    }

    setIsSubmitting(true)

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setMessage({ type: 'success', text: 'Contraseña cambiada exitosamente' })
      setIsChangingPassword(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message || 'Error al cambiar contraseña' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      await authService.addAddress(addressData)
      setMessage({ type: 'success', text: 'Dirección agregada exitosamente' })
      setIsAddingAddress(false)
      setAddressData({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Colombia',
        isDefault: false,
      })
      // Actualizar el usuario para mostrar la nueva dirección
      const { user: updatedUser } = await authService.getProfile()
      updateProfile(updatedUser)
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message || 'Error al agregar dirección' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#968679', textAlign: 'center' }}>
        Mi Perfil
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Información Personal */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#968679' }}>
                Información Personal
              </Typography>
              {!isEditing && (
                <IconButton onClick={() => setIsEditing(true)} sx={{ color: '#968679' }}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>

            {isEditing ? (
              <Box component="form" onSubmit={handleUpdateProfile}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Nombre completo"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Correo electrónico"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Teléfono"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: '#968679',
                      '&:hover': { backgroundColor: '#7a6f64' },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={20} /> : 'Guardar'}
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outlined">
                    Cancelar
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 1, color: '#968679' }} />
                  <Typography variant="body1">{user?.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1, color: '#968679' }} />
                  <Typography variant="body1">{user?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, color: '#968679' }} />
                  <Typography variant="body1">{user?.phone || 'No especificado'}</Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Cambiar Contraseña */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#968679' }}>
                Seguridad
              </Typography>
              {!isChangingPassword && (
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: '#968679', color: '#968679' }}
                >
                  Cambiar Contraseña
                </Button>
              )}
            </Box>

            {isChangingPassword ? (
              <Box component="form" onSubmit={handleChangePassword}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="currentPassword"
                  label="Contraseña actual"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('current')} edge="end">
                          {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="Nueva contraseña"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('new')} edge="end">
                          {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar nueva contraseña"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('confirm')} edge="end">
                          {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: '#968679',
                      '&:hover': { backgroundColor: '#7a6f64' },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={20} /> : 'Cambiar'}
                  </Button>
                  <Button onClick={() => setIsChangingPassword(false)} variant="outlined">
                    Cancelar
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Tu contraseña fue actualizada por última vez hace algunos días.
                Haz clic en "Cambiar Contraseña" para actualizar tu contraseña.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Direcciones */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#968679' }}>
                Direcciones de Envío
              </Typography>
              <Button
                onClick={() => setIsAddingAddress(true)}
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{ borderColor: '#968679', color: '#968679' }}
              >
                Agregar Dirección
              </Button>
            </Box>

            {user?.addresses && user.addresses.length > 0 ? (
              <Grid container spacing={2}>
                {user.addresses.map((address, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <LocationOn sx={{ mr: 1, color: '#968679', mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2">
                              {address.street}
                            </Typography>
                            <Typography variant="body2">
                              {address.city}, {address.state} {address.zipCode}
                            </Typography>
                            <Typography variant="body2">
                              {address.country}
                            </Typography>
                            {address.isDefault && (
                              <Typography variant="caption" sx={{ color: '#968679', fontWeight: 'bold' }}>
                                Dirección principal
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No tienes direcciones guardadas. Agrega una dirección para facilitar tus compras.
              </Typography>
            )}

            {isAddingAddress && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Nueva Dirección
                </Typography>
                <Box component="form" onSubmit={handleAddAddress}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="street"
                        label="Dirección"
                        value={addressData.street}
                        onChange={handleAddressChange}
                        placeholder="Calle 123 #45-67"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="city"
                        label="Ciudad"
                        value={addressData.city}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="state"
                        label="Departamento"
                        value={addressData.state}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="zipCode"
                        label="Código Postal"
                        value={addressData.zipCode}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="country"
                        label="País"
                        value={addressData.country}
                        onChange={handleAddressChange}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        backgroundColor: '#968679',
                        '&:hover': { backgroundColor: '#7a6f64' },
                      }}
                    >
                      {isSubmitting ? <CircularProgress size={20} /> : 'Guardar Dirección'}
                    </Button>
                    <Button onClick={() => setIsAddingAddress(false)} variant="outlined">
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile