# 🔐 Sistema de Autenticación - TerraCotta E-commerce

## 📋 Resumen General

El sistema de autenticación implementado en TerraCotta es una solución completa que incluye registro, login, gestión de sesiones, rutas protegidas y manejo de perfiles de usuario. Utiliza **JWT (JSON Web Tokens)** para la autenticación segura y **React Context** para el manejo de estado global.

---

## 🏗️ Arquitectura del Sistema

### **Backend (Node.js + Express + MongoDB)**
- **Modelo de Usuario** con validaciones y hash de contraseñas
- **JWT Middleware** para autenticación de rutas
- **Controladores Auth** para todas las operaciones de usuario
- **Seguridad** con bcryptjs y validaciones

### **Frontend (React + TypeScript + Material-UI)**
- **AuthContext** para estado global de autenticación
- **AuthService** para comunicación con API
- **Rutas Protegidas** con guards de autenticación
- **Formularios** con validación en tiempo real
- **Persistencia** con localStorage

---

## 🔧 Componentes del Sistema

### 1. **Backend - Modelo de Usuario**
`/Backend/src/models/User.ts`

```typescript
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, trim: true },
  addresses: [AddressSchema],
  createdAt: { type: Date, default: Date.now }
})

// Hash automático de contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
```

**Características:**
- Hash automático de contraseñas con **salt rounds = 12**
- Validación de email único
- Esquema de direcciones embebido
- Timestamps automáticos

### 2. **Backend - JWT Middleware**
`/Backend/src/middleware/auth.ts`

```typescript
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const user = await User.findById(decoded.userId).select('-password')
    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
```

**Funcionalidades:**
- Verifica tokens JWT en headers
- Decodifica y valida tokens
- Adjunta usuario a request
- Manejo de errores 401/403

### 3. **Backend - Controladores de Auth**
`/Backend/src/controllers/auth.controller.ts`

**Endpoints disponibles:**
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login con JWT
- `GET /api/auth/profile` - Perfil del usuario (protegida)
- `PUT /api/auth/profile` - Actualizar perfil (protegida)
- `POST /api/auth/addresses` - Agregar dirección (protegida)
- `PUT /api/auth/change-password` - Cambiar contraseña (protegida)

### 4. **Frontend - AuthContext**
`/Frontend/src/contexts/AuthContext.tsx`

```typescript
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    // ... otros casos
  }
}
```

**Funcionalidades del Context:**
- **Estado global** de autenticación
- **Reducer pattern** para manejo de estado
- **Persistencia automática** en localStorage
- **Verificación de token** al cargar la app
- **Auto-logout** en tokens expirados

### 5. **Frontend - AuthService**
`/Frontend/src/services/authService.ts`

```typescript
// Interceptor para agregar token automáticamente
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('terracotta-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar errores 401
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('terracotta-token')
      localStorage.removeItem('terracotta-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

**Características:**
- **Interceptors de Axios** para manejo automático de tokens
- **Auto-logout** en errores 401
- **Funciones de storage** para localStorage
- **Tipado completo** con TypeScript

### 6. **Frontend - Rutas Protegidas**
`/Frontend/src/components/auth/ProtectedRoute.tsx`

```typescript
const ProtectedRoute = ({ children, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { authState } = useAuth()
  const location = useLocation()

  if (authState.isLoading) {
    return <CircularProgress /> // Loading spinner
  }

  if (!authState.isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

**Funcionalidades:**
- **Loading states** durante verificación
- **Redirección automática** a login
- **Preservación de ruta** para después del login
- **Componente reutilizable** para cualquier ruta

---

## 🔄 Flujo de Autenticación

### **1. Registro de Usuario**
```
Usuario → Formulario → Validación Frontend → API Backend → Hash Password →
MongoDB → JWT Token → localStorage → Estado Global → Redirección
```

### **2. Login de Usuario**
```
Usuario → Credenciales → Validación → API Backend → Verificar Password →
JWT Token → localStorage → AuthContext → Navbar Update → Redirección
```

### **3. Verificación de Sesión (App Load)**
```
App Start → localStorage Check → Token Exists? → API Verify →
Valid? → Update AuthContext → Continue : Clear Storage → Public Routes
```

### **4. Acceso a Ruta Protegida**
```
Usuario → Ruta Protegida → ProtectedRoute Check → Authenticated? →
Allow Access : Redirect to Login → Save Target Route → After Login → Redirect Back
```

### **5. Auto-Logout (Token Expired)**
```
API Request → 401 Response → Axios Interceptor → Clear localStorage →
Update AuthContext → Redirect Login → Show Message
```

---

## 🛡️ Seguridad Implementada

### **1. Contraseñas**
- **Hash con bcryptjs** y salt rounds = 12
- **Validación mínima** 6 caracteres
- **No se almacenan** en texto plano
- **Verificación segura** en login

### **2. JWT Tokens**
- **Secreto robusto** en variables de entorno
- **Expiración configurable**
- **Verificación en cada request**
- **Auto-invalidación** en logout

### **3. Validaciones**
- **Email único** en base de datos
- **Campos requeridos** validados
- **Formato de datos** verificado
- **Sanitización** de inputs

### **4. Headers y CORS**
- **Authorization Bearer** para tokens
- **CORS configurado** para frontend
- **Headers seguros** en responses
- **Middleware de validación**

---

## 📱 Componentes de UI

### **1. Formulario de Login**
`/Frontend/src/pages/Login.tsx`
- Validación en tiempo real
- Estados de loading
- Manejo de errores
- Redirección post-login

### **2. Formulario de Registro**
`/Frontend/src/pages/Register.tsx`
- Validación completa de campos
- Confirmación de contraseña
- Validación de teléfono opcional
- Experiencia de usuario fluida

### **3. Página de Perfil**
`/Frontend/src/pages/Profile.tsx`
- Edición de información personal
- Cambio de contraseña seguro
- Gestión de direcciones
- Validación y feedback

### **4. Navbar Dinámico**
`/Frontend/src/components/mui-components/layout/navbar/Navbar.tsx`
- Menú de usuario autenticado
- Estados de loading
- Opciones de logout
- Navegación a perfil

---

## 💾 Persistencia de Datos

### **localStorage Keys:**
- `terracotta-token` - JWT token del usuario
- `terracotta-user` - Información básica del usuario

### **Funciones de Storage:**
```typescript
storage: {
  setToken: (token: string) => localStorage.setItem('terracotta-token', token),
  getToken: (): string | null => localStorage.getItem('terracotta-token'),
  removeToken: () => localStorage.removeItem('terracotta-token'),
  setUser: (user: User) => localStorage.setItem('terracotta-user', JSON.stringify(user)),
  getUser: (): User | null => {
    const user = localStorage.getItem('terracotta-user')
    return user ? JSON.parse(user) : null
  },
  clear: () => {
    localStorage.removeItem('terracotta-token')
    localStorage.removeItem('terracotta-user')
  }
}
```

---

## 🔍 Estados de la Aplicación

### **AuthState Interface:**
```typescript
interface AuthState {
  user: User | null           // Información del usuario actual
  token: string | null        // JWT token
  isAuthenticated: boolean    // Estado de autenticación
  isLoading: boolean         // Estado de carga
}
```

### **Posibles Estados:**
1. **Loading** - Verificando autenticación inicial
2. **Authenticated** - Usuario logueado con token válido
3. **Unauthenticated** - Usuario no logueado o token inválido
4. **Error** - Error en proceso de autenticación

---

## 🚀 Uso en Componentes

### **Hook useAuth:**
```typescript
const { authState, login, register, logout, updateProfile } = useAuth()

// Verificar si está logueado
if (authState.isAuthenticated) {
  console.log(`Bienvenido ${authState.user?.name}`)
}

// Hacer login
await login({ email, password })

// Hacer logout
logout()
```

### **Proteger Rutas:**
```typescript
<Route
  path="/ruta-privada"
  element={
    <ProtectedRoute>
      <ComponentePrivado />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 Próximas Mejoras Sugeridas

### **1. Refresh Tokens**
- Implementar refresh tokens para sesiones más largas
- Auto-renovación de tokens antes de expirar
- Mejor experiencia de usuario

### **2. Verificación de Email**
- Email de confirmación en registro
- Estado de "email verificado" en usuario
- Flujo de reenvío de confirmación

### **3. Recuperación de Contraseña**
- Endpoint "forgot password"
- Email con token temporal
- Formulario de reset password

### **4. Autenticación Social**
- Login con Google/Facebook
- Integración con OAuth providers
- Unificación de cuentas

### **5. Auditoría y Logs**
- Log de intentos de login
- Tracking de sesiones activas
- Detección de actividad sospechosa

---

## 📝 Comandos Útiles

```bash
# Iniciar Backend
cd Backend && npm run dev

# Iniciar Frontend
cd Frontend && npm run dev

# Verificar linting
cd Frontend && npm run lint

# Build de producción
cd Frontend && npm run build
```

---

## 🔗 Archivos Relacionados

### **Backend:**
- `src/models/User.ts` - Modelo de usuario
- `src/controllers/auth.controller.ts` - Controladores de auth
- `src/middleware/auth.ts` - Middleware de autenticación
- `src/api/index.ts` - Rutas de API

### **Frontend:**
- `src/contexts/AuthContext.tsx` - Context de autenticación
- `src/services/authService.ts` - Servicio de API
- `src/pages/Login.tsx` - Página de login
- `src/pages/Register.tsx` - Página de registro
- `src/pages/Profile.tsx` - Página de perfil
- `src/components/auth/ProtectedRoute.tsx` - Componente de rutas protegidas

---

*Última actualización: ${new Date().toLocaleDateString('es-ES')} - Sistema de autenticación completo*