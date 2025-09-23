# 🛍️ Ecommerce Ecosystem - Monorepo

Un ecosistema modular de e-commerce construido con React, TypeScript y Node.js, diseñado para crear tiendas online personalizadas de manera rápida y escalable.

## 🌟 Proyecto Destacado: TerraCotta Jewelry

**🏺 [TerraCotta Jewelry Store](./clients/terracotta-jewelry-frontend/)** - Tienda online elegante especializada en joyería artesanal de terracota con diseño minimalista de lujo.

### ✨ Características Principales de TerraCotta

- **🎨 Diseño Premium**: UI minimalista inspirada en joyerías de lujo
- **🔍 Búsqueda Avanzada**: Dropdown inteligente en desktop, modal fullscreen en móvil
- **📱 Responsive**: Experiencia optimizada para todos los dispositivos
- **🛒 Carrito Inteligente**: Gestión de estado persistente con Zustand
- **⚡ Performance**: Deploy automático en Netlify con optimizaciones

**🌐 [Ver Demo Live](https://terracotta-jewelry.netlify.app)**

## 🏗️ Arquitectura del Proyecto

Este monorepo utiliza **Turbo** para gestionar múltiples paquetes y aplicaciones de manera eficiente.

### 📂 Estructura

```
ecommerce-ecosystem/
├── 📦 packages/                 # Paquetes compartidos
│   ├── shared-services/         # Servicios y tipos compartidos
│   ├── frontend-template/       # Template base para frontends
│   └── backend-core/           # API backend centralizada
├── 👥 clients/                  # Aplicaciones cliente específicas
│   └── terracotta-jewelry-frontend/  # Tienda TerraCotta
├── 🛠️ tools/                   # Herramientas de desarrollo
│   └── project-generator/       # CLI para generar nuevos clientes
└── 📜 scripts/                  # Scripts de automatización
```

## 🚀 Quick Start

### Prerrequisitos
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/ecommerce-ecosystem.git
cd ecommerce-ecosystem

# Instalar dependencias
npm install

# Construir servicios compartidos
npm run shared:build
```

### Desarrollo

```bash
# 🏺 Ejecutar TerraCotta (recomendado para ver funcionalidades)
npm run dev:client:terracotta

# 🖥️ Ejecutar template frontend
npm run dev:frontend

# ⚙️ Ejecutar backend
npm run dev:backend

# 🔄 Ejecutar todo el stack
npm run dev:full-stack
```

## 🎯 Casos de Uso

### Para Emprendedores
- **Rápida implementación** de tienda online personalizada
- **Diseño profesional** listo para producción
- **Funcionalidades e-commerce** completas desde día 1

### Para Desarrolladores
- **Arquitectura escalable** con separación de responsabilidades
- **Componentes reutilizables** y sistema de diseño consistente
- **TypeScript** para desarrollo type-safe
- **Herramientas modernas** (Vite, Turbo, Material-UI)

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** con TypeScript
- **Material-UI v6** para componentes
- **Vite** para build ultra-rápido
- **Zustand** para gestión de estado
- **React Router v7** para navegación

### Backend
- **Node.js** con Express
- **TypeScript** para type safety
- **MongoDB** como base de datos
- **JWT** para autenticación

### DevOps & Tools
- **Turbo** para monorepo management
- **Netlify** para deployment frontend
- **ESLint** para calidad de código
- **Concurrent** para desarrollo multi-proceso

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev:client:terracotta    # TerraCotta store
npm run dev:frontend             # Template frontend
npm run dev:backend              # API backend
npm run dev:full-stack          # Full stack development

# Construcción
npm run build                    # Build todos los paquetes
npm run shared:build            # Build solo servicios compartidos

# Utilidades
npm run create-client           # Generar nuevo cliente
npm run kill:all               # Detener todos los procesos
npm run lint                   # Linting
npm run test                   # Testing
```

## 🎨 Características del Sistema de Diseño

### Paleta de Colores TerraCotta
- **Primary**: #968679 (Terracotta)
- **Secondary**: #332E29 (Dark Brown)
- **Background**: #FEFEFE (Pure White)
- **Accent**: #F8F6F3 (Light Cream)

### Componentes Base
- **Cards elegantes** con sombras suaves
- **Botones con micro-interacciones**
- **Forms con validación visual**
- **Layouts responsive** con breakpoints optimizados

## 🚀 Deployment

### TerraCotta (Netlify)
```bash
cd clients/terracotta-jewelry-frontend
npm run deploy:simple
```

### Otros Clientes
Cada cliente puede tener su propia estrategia de deployment configurada.

## 🔧 Crear Nuevo Cliente

```bash
# Usar el generador CLI
npm run create-client

# Seguir las instrucciones interactivas
# El generador creará una nueva aplicación en /clients/
```

## 📊 Estructura de Datos

### Productos
```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
}
```

### Carrito
```typescript
interface CartItem {
  product: Product
  quantity: number
}
```

## 🧪 Testing

```bash
# Ejecutar tests en todos los paquetes
npm run test

# Tests específicos
npm run test --workspace=@ecommerce/shared-services
```

## 📈 Roadmap

### ✅ Completado
- [x] Arquitectura monorepo con Turbo
- [x] Template frontend base
- [x] TerraCotta store completa
- [x] Sistema de búsqueda avanzada
- [x] Carrito de compras funcional
- [x] Deployment automatizado

### 🔄 En Desarrollo
- [ ] Backend API completa
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Procesamiento de pagos

### 🎯 Futuro
- [ ] Más templates de tienda
- [ ] Sistema de reviews
- [ ] Analytics integradas
- [ ] PWA capabilities

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Juan David Mayorga**
- GitHub: [@JuandaMT](https://github.com/JuandaMT)
- Email: juanda@example.com

---

## 🎯 Casos de Éxito

### TerraCotta Jewelry
> "Una tienda online profesional creada en tiempo record con funcionalidades avanzadas de búsqueda y UX de nivel empresarial"

**Funcionalidades destacadas:**
- Búsqueda inteligente con dropdown/modal responsive
- Carrito persistente con gestión de estado
- Diseño minimalista de lujo
- Performance optimizada
- SEO ready

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub**

**🚀 Desarrollado para crear experiencias e-commerce excepcionales**