#!/bin/bash

# 🚨 EMERGENCY SHUTDOWN SCRIPT
# Mata todos los procesos de desarrollo del monorepo e-commerce

echo "🚨 PARANDO TODOS LOS PROCESOS DE DESARROLLO..."
echo "================================================"

# Función para matar procesos con logging
kill_processes() {
    local pattern="$1"
    local description="$2"

    echo "🔍 Buscando procesos: $description"

    # Buscar PIDs
    pids=$(pgrep -f "$pattern" 2>/dev/null || true)

    if [ -z "$pids" ]; then
        echo "   ✅ No se encontraron procesos: $description"
    else
        echo "   🎯 Encontrados PIDs: $pids"
        echo "$pids" | xargs kill -TERM 2>/dev/null || true
        sleep 2

        # Verificar si siguen vivos y usar SIGKILL
        still_alive=$(echo "$pids" | xargs ps -p 2>/dev/null | grep -v PID || true)
        if [ -n "$still_alive" ]; then
            echo "   💀 Forzando cierre con SIGKILL..."
            echo "$pids" | xargs kill -9 2>/dev/null || true
        fi
        echo "   ✅ Procesos eliminados: $description"
    fi
}

# Función para matar procesos por puertos
kill_by_ports() {
    local ports="$1"
    echo "🔍 Liberando puertos: $ports"

    for port in $(echo $ports | tr ',' ' '); do
        pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo "   🎯 Puerto $port ocupado por PIDs: $pids"
            echo "$pids" | xargs kill -TERM 2>/dev/null || true
            sleep 1
            # Verificar y forzar si es necesario
            still_alive=$(echo "$pids" | xargs ps -p 2>/dev/null | grep -v PID || true)
            if [ -n "$still_alive" ]; then
                echo "$pids" | xargs kill -9 2>/dev/null || true
            fi
            echo "   ✅ Puerto $port liberado"
        else
            echo "   ✅ Puerto $port ya libre"
        fi
    done
}

# 1. Matar procesos de desarrollo específicos
kill_processes "npm.*dev" "NPM dev scripts"
kill_processes "node.*vite" "Vite dev servers"
kill_processes "nodemon" "Nodemon processes"
kill_processes "turbo.*dev" "Turbo dev processes"

# 2. Matar procesos por puertos comunes
kill_by_ports "3000,5173,3001,4000,8080,5174,5175"

# 3. Matar procesos específicos del proyecto
PROJECT_DIR="/Users/juandavidmayorga/Documents/Proyectos_personales/Ecommerce-project"
kill_processes "$PROJECT_DIR.*node" "Project-specific Node processes"

# 4. Limpiar procesos zombi relacionados con npm/node
echo "🧹 Limpiando procesos zombi..."
pkill -f "npm.*run.*dev" 2>/dev/null || true
pkill -f "node.*ts-node.*server" 2>/dev/null || true

echo ""
echo "✅ LIMPIEZA COMPLETADA"
echo "======================"
echo "📊 Procesos activos restantes relacionados con Node/npm:"
ps aux | grep -E "(node|npm|vite)" | grep -v grep | grep -v "kill-all-dev" || echo "   ✨ ¡Ningún proceso de desarrollo activo!"
echo ""
echo "🔌 Puertos liberados - verificación:"
for port in 3000 5173 3001 4000 8080; do
    if lsof -i:$port >/dev/null 2>&1; then
        echo "   ⚠️  Puerto $port aún ocupado"
    else
        echo "   ✅ Puerto $port libre"
    fi
done
echo ""
echo "🎉 ¡Listo para desarrollar sin conflictos!"