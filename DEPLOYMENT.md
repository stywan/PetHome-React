# Guía de Despliegue en EC2

## Requisitos Previos en EC2

1. **Conexión SSH configurada** ✅ (Ya lo tienes)
2. **Node.js y npm instalados**
3. **Git instalado**
4. **PM2 instalado (recomendado para mantener la app corriendo)**
5. **Puerto 3000 abierto en el Security Group** ✅ (Ya configurado)

## Configuración Inicial en EC2

### 1. Conectar a tu instancia EC2

```bash
ssh -i tu-key.pem ec2-user@TU_IP_PUBLICA
```

### 2. Instalar Node.js (si no está instalado)

```bash
# Para Amazon Linux 2023 / Amazon Linux 2
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

### 3. Instalar PM2 (Process Manager)

```bash

```

### 4. Clonar el repositorio

```bash
cd ~
git clone https://github.com/TU_USUARIO/PetHome-React.git
cd PetHome-React
git checkout develop
```

### 5. Instalar dependencias

```bash
npm install
```

## Opciones de Despliegue

### Opción 1: Modo Desarrollo (Vite Dev Server)

**Ventajas:** Hot reload, útil para desarrollo
**Desventajas:** No optimizado para producción

```bash
# Iniciar con PM2
pm2 start npm --name "pethome-react" -- run dev

# Ver logs
pm2 logs pethome-react

# Reiniciar
pm2 restart pethome-react

# Detener
pm2 stop pethome-react
```

### Opción 2: Modo Producción (Build + Preview)

**Ventajas:** Código optimizado y minificado
**Desventajas:** No hot reload

```bash
# Construir el proyecto
npm run build

# Previsualizar con PM2
pm2 start npm --name "pethome-react" -- run preview

# O usar el ecosystem.config.js
pm2 start ecosystem.config.js
```

### Opción 3: Usar el Script de Despliegue Automático

```bash
# Dar permisos de ejecución al script
chmod +x deploy-ec2.sh

# Ejecutar despliegue
./deploy-ec2.sh
```

## Verificar que la Aplicación está Corriendo

1. **Verificar el estado de PM2:**
```bash
pm2 status
```

2. **Ver logs en tiempo real:**
```bash
pm2 logs pethome-react
```

3. **Acceder desde el navegador:**
```
http://TU_IP_PUBLICA:3000
```

## Configuración de PM2 para Reinicio Automático

```bash
# Guardar la configuración actual de PM2
pm2 save

# Configurar PM2 para iniciarse al arrancar el sistema
pm2 startup

# Ejecutar el comando que PM2 te muestra (sudo)
```

## Actualizar la Aplicación

Cada vez que hagas cambios en el código:

```bash
# Opción 1: Usar el script automático
./deploy-ec2.sh

# Opción 2: Manual
git pull origin develop
npm install
npm run build
pm2 restart pethome-react
```

## Solución de Problemas

### La aplicación no es accesible desde el navegador

1. **Verificar que el puerto 3000 está abierto en el Security Group:**
   - Ve a EC2 Console > Security Groups
   - Busca tu Security Group
   - Verifica que hay una regla Inbound para el puerto 3000
   - Tipo: Custom TCP
   - Puerto: 3000
   - Origen: 0.0.0.0/0 (o tu IP específica)

2. **Verificar que la aplicación está corriendo:**
```bash
pm2 status
curl http://localhost:3000
```

3. **Verificar logs de errores:**
```bash
pm2 logs pethome-react --err
```

### La aplicación se cae después de cerrar SSH

- Usa PM2 (ya incluido en las instrucciones)
- O usa `nohup`:
```bash
nohup npm run dev > output.log 2>&1 &
```

### Puerto 3000 ya está en uso

```bash
# Ver qué proceso está usando el puerto
sudo lsof -i :3000

# Matar el proceso (reemplaza PID con el número que aparece)
kill -9 PID
```

## Mejoras Recomendadas (Opcional)

### 1. Usar Nginx como Reverse Proxy

Beneficios:
- Permite usar puerto 80 (HTTP) o 443 (HTTPS)
- Mejor manejo de archivos estáticos
- Más seguro

### 2. Configurar HTTPS con Let's Encrypt

Para acceso seguro HTTPS

### 3. Configurar un dominio

En lugar de usar la IP pública directamente

## Comandos Útiles de PM2

```bash
pm2 list              # Listar todas las aplicaciones
pm2 stop pethome-react    # Detener la aplicación
pm2 restart pethome-react # Reiniciar la aplicación
pm2 delete pethome-react  # Eliminar de PM2
pm2 logs              # Ver logs de todas las apps
pm2 monit             # Monitor en tiempo real
pm2 save              # Guardar configuración actual
```

## Notas Importantes

- La aplicación ahora está configurada para escuchar en `0.0.0.0:3000` (todas las interfaces de red)
- Asegúrate de que tu IP pública de EC2 esté en la configuración del Security Group
- Si la IP pública de EC2 cambia (al reiniciar la instancia), necesitarás usar la nueva IP o configurar una Elastic IP
