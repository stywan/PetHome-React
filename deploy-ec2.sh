#!/bin/bash

# Script de despliegue para EC2
# Uso: ./deploy-ec2.sh

echo "🚀 Iniciando despliegue en EC2..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Actualizar repositorio
echo -e "${YELLOW}📥 Actualizando código desde Git...${NC}"
git pull origin develop

# Instalar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm install

# Construir proyecto
echo -e "${YELLOW}🔨 Construyendo proyecto...${NC}"
npm run build

# Reiniciar PM2 (si está usando PM2)
if command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}🔄 Reiniciando aplicación con PM2...${NC}"
    pm2 restart pethome-react || pm2 start ecosystem.config.js
    pm2 save
else
    echo -e "${YELLOW}⚠️  PM2 no está instalado. La aplicación debe iniciarse manualmente.${NC}"
fi

echo -e "${GREEN}✅ Despliegue completado!${NC}"
echo -e "${GREEN}La aplicación debería estar corriendo en http://0.0.0.0:3000${NC}"
