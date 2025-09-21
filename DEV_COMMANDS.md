# Comandos de Desarrollo - Monorepo E-commerce

## 🚀 Comandos Específicos (Recomendados)

### Desarrollo Individual
```bash
# Solo el backend
npm run dev:backend

# Solo el frontend template
npm run dev:frontend

# Solo el cliente Terracotta Jewelry
npm run dev:client:terracotta
```

### Desarrollo Full-Stack
```bash
# Backend + Frontend Template (simultáneo)
npm run dev:full-stack
```

### Desarrollo Completo (⚠️ Usar con cuidado)
```bash
# Todos los servicios a la vez - MUCHOS PROCESOS
npm run dev:all
```

## ❌ Comando Deshabilitado
```bash
# Este comando ahora muestra ayuda en lugar de ejecutar
npm run dev
```

## 🚨 COMANDO DE EMERGENCIA
```bash
# PARAR TODOS LOS PROCESOS DE DESARROLLO (EMERGENCIA)
npm run emergency:stop
# o alternativamente:
npm run kill:all
```
**¿Cuándo usar?** Cuando tienes procesos que no responden, conflictos de puertos o quieres limpiar todo de una vez.

## 🛠️ Otros Comandos Útiles
```bash
# Build todos los proyectos
npm run build

# Linting
npm run lint

# Tests
npm run test

# Limpiar builds
npm run clean

# Solo build de shared services
npm run shared:build
```

## 📝 Notas Importantes

1. **Procesos Únicos**: Cada comando `dev:*` ejecuta solo el componente específico
2. **Sin Duplicados**: Ya no se ejecutan procesos paralelos no deseados
3. **Control Total**: Puedes elegir exactamente qué servicios ejecutar
4. **Recursos**: Los comandos individuales consumen menos recursos del sistema

## 🔧 Puertos por Defecto
- Backend: `http://localhost:3000`
- Frontend Template: `http://localhost:5173`
- Terracotta Jewelry: `http://localhost:5174` (si se ejecuta después del template)