# Prompt para Claude Code: Reestructuración E-commerce Modular

## Contexto Actual
Tengo un proyecto con estructura `/frontend` y `/backend` separadas. Quiero transformarlo en una arquitectura modular de 3 repositorios para automatizar la creación de sitios e-commerce.

## Objetivo Final
Crear una arquitectura con:
1. **Frontend Individual** (React + Vite) - UI/UX específica por cliente
2. **Backend Compartido** (Node.js + TypeScript) - Un repo, múltiples BD por cliente
3. **Servicios Compartidos** (NPM Package) - Lógica de negocio, estados, auth, pagos

## Estructura Objetivo

```
ecommerce-ecosystem/
├── packages/
│   ├── shared-services/           # NPM Package para servicios
│   ├── backend-core/              # Backend compartido
│   └── frontend-template/         # Template base frontend
├── clients/
│   ├── client-a-frontend/         # Frontend específico cliente A
│   ├── client-b-frontend/         # Frontend específico cliente B
│   └── ...
└── tools/
    └── project-generator/         # CLI para generar nuevos proyectos
```

## Tareas Específicas

### 1. Crear el Package de Servicios Compartidos (`packages/shared-services/`)

**Estructura esperada:**
```
packages/shared-services/
├── src/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── usePayments.ts
│   │   ├── useProducts.ts
│   │   └── useOrders.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── authService.ts
│   │   │   ├── cartService.ts
│   │   │   ├── paymentService.ts
│   │   │   └── productService.ts
│   │   ├── storage/
│   │   │   ├── localStorage.ts
│   │   │   └── sessionStorage.ts
│   │   └── validation/
│   │       ├── authValidation.ts
│   │       └── orderValidation.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   ├── productStore.ts
│   │   ├── orderStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── cart.types.ts
│   │   ├── product.types.ts
│   │   └── order.types.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── rollup.config.js
└── README.md
```

**Funcionalidades requeridas:**
- **Stores Zustand** para manejo de estado global
- Hooks personalizados que integren stores con lógica de negocio
- Servicios API configurables por endpoint
- Validaciones de formularios con Zod
- Utilidades de formateo y constantes
- Tipos TypeScript compartidos
- Integración con pasarelas de pago (Stripe, PayPal)
- Sistema de autenticación JWT
- Manejo de errores centralizado
- Persistencia opcional en stores (localStorage/sessionStorage)

### 2. Reestructurar Backend (`packages/backend-core/`)

**Migrar mi `/backend` actual a:**
```
packages/backend-core/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── clients.ts        # Configuración por cliente
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── payment/
│   │   ├── email/
│   │   └── storage/
│   ├── utils/
│   │   └── clientResolver.ts  # Resolver BD por cliente
│   └── app.ts
├── database/
│   ├── migrations/
│   └── seeds/
└── clients/
    ├── client-a.env
    ├── client-b.env
    └── template.env
```

**Características requeridas:**
- Sistema multi-tenant (una BD por cliente)
- Middleware de resolución de cliente
- Variables de entorno por cliente
- API RESTful genérica
- Integración con servicios de pago
- Sistema de autenticación modular

### 3. Crear Template Frontend (`packages/frontend-template/`)

**Migrar mi `/frontend` actual a template base con arquitectura por dominios:**
```
packages/frontend-template/
├── src/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/              # Componentes UI base (Button, Input, Modal)
│   │   │   ├── layout/          # Header, Footer, Sidebar
│   │   │   ├── forms/           # Componentes de formularios
│   │   │   └── feedback/        # Loading, Error, Success
│   │   ├── hooks/               # Hooks compartidos
│   │   ├── utils/               # Utilidades compartidas
│   │   ├── constants/           # Constantes globales
│   │   └── types/               # Tipos compartidos
│   ├── domains/
│   │   ├── auth/
│   │   │   ├── components/      # Login, Register, Profile
│   │   │   ├── pages/           # LoginPage, RegisterPage
│   │   │   ├── hooks/           # useAuth, useLogin
│   │   │   └── types/           # AuthTypes específicos
│   │   ├── products/
│   │   │   ├── components/      # ProductCard, ProductList, ProductDetail
│   │   │   ├── pages/           # ProductsPage, ProductDetailPage
│   │   │   ├── hooks/           # useProducts, useProductFilters
│   │   │   └── types/           # ProductTypes específicos
│   │   ├── cart/
│   │   │   ├── components/      # CartItem, CartSummary, CartDrawer
│   │   │   ├── pages/           # CartPage, CheckoutPage
│   │   │   ├── hooks/           # useCart, useCheckout
│   │   │   └── types/           # CartTypes específicos
│   │   ├── orders/
│   │   │   ├── components/      # OrderItem, OrderHistory, OrderStatus
│   │   │   ├── pages/           # OrdersPage, OrderDetailPage
│   │   │   ├── hooks/           # useOrders, useOrderTracking
│   │   │   └── types/           # OrderTypes específicos
│   │   ├── admin/
│   │   │   ├── components/      # ProductForm, UserList, Dashboard
│   │   │   ├── pages/           # AdminPage, ProductsManagePage
│   │   │   ├── hooks/           # useAdminData, useProductManagement
│   │   │   └── types/           # AdminTypes específicos
│   │   └── payments/
│   │       ├── components/      # PaymentForm, PaymentMethods
│   │       ├── hooks/           # usePayments, useStripe
│   │       └── types/           # PaymentTypes específicos
│   ├── app/
│   │   ├── router/              # Configuración de rutas
│   │   ├── providers/           # Providers globales
│   │   └── App.tsx
│   ├── styles/
│   │   ├── base/
│   │   └── themes/
│   └── config/
│       ├── client.config.ts     # Configuración por cliente
│       └── api.config.ts
├── public/
├── templates/                   # Plantillas personalizables
│   ├── colors.template.css
│   ├── fonts.template.css
│   └── layout.template.tsx
└── generator/
    ├── generate-client.js       # Script generador
    └── config-schema.json
```

### 4. Crear Generador de Proyectos (`tools/project-generator/`)

**CLI que genere:**
```bash
npx create-ecommerce-client client-name
```

Debe crear:
- Nuevo directorio en `/clients/`
- Copiar template frontend
- Generar archivos de configuración
- Instalar dependencias
- Configurar variables de entorno
- Crear entrada en backend para nuevo cliente

## Instrucciones para Claude Code

1. **Analiza mi estructura actual** en `/frontend` y `/backend`
2. **Migra el código existente** a la nueva arquitectura preservando funcionalidad
3. **Crea el package de servicios compartidos** con stores Zustand y arquitectura por dominios
4. **Implementa el sistema multi-tenant** en el backend
5. **Convierte el frontend en template** configurable con estructura por dominios
6. **Crea el CLI generador** de proyectos
7. **Configura monorepo** con Lerna o Nx
8. **Genera documentación** de uso y arquitectura

## Detalles de Implementación Zustand

### Ejemplo de Store (authStore.ts):
```typescript
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { AuthUser, LoginCredentials } from '../types/auth.types'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  updateUser: (user: Partial<AuthUser>) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        login: async (credentials) => {
          set({ isLoading: true, error: null })
          try {
            // Lógica de login usando servicios
            const user = await authService.login(credentials)
            set({ user, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ error: error.message, isLoading: false })
          }
        },
        
        logout: () => {
          authService.logout()
          set({ user: null, isAuthenticated: false })
        },
        
        clearError: () => set({ error: null }),
        updateUser: (userData) => set((state) => ({ 
          user: state.user ? { ...state.user, ...userData } : null 
        }))
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
      }
    ),
    { name: 'AuthStore' }
  )
)
```

### Estructura por Dominios - Reglas:

1. **Shared Components**: Solo componentes 100% reutilizables
2. **Domain Components**: Específicos de funcionalidad, pueden usar shared
3. **Domain Hooks**: Combinan stores con lógica específica del dominio
4. **Cross-Domain Communication**: Solo a través de stores compartidos

## Configuración Técnica

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Estado:** Zustand + Zustand middleware (persist, devtools)
- **Validación:** Zod para validaciones de formularios y APIs
- **Backend:** Node.js + Express + TypeScript + Prisma/TypeORM
- **Package Manager:** npm/yarn workspaces
- **Monorepo:** Lerna o Nx
- **Build:** Turbo para builds optimizados
- **Testing:** Jest + React Testing Library

## Criterios de Éxito

✅ Un package NPM reutilizable con toda la lógica de negocio  
✅ Backend que soporte múltiples clientes con BDs separadas  
✅ Template frontend fácilmente personalizable  
✅ CLI funcional para generar nuevos proyectos  
✅ Documentación clara de arquitectura y uso  
✅ Código existente migrado sin pérdida de funcionalidad

---

**Pregunta específica:** ¿Quieres que empiece con algún módulo específico o prefieres que analice primero toda tu estructura actual para crear un plan de migración detallado?