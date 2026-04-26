# 🚀 Forense Android - Sistema de Gestión Forense

Sistema completo para gestión forense de dispositivos Android, disponible como:
- **Aplicación de escritorio** (.deb para Linux)
- **PWA** (Progressive Web App) desplegable en Vercel

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: TailwindCSS
- **Estado**: Zustand
- **Router**: React Router DOM v6
- **Desktop**: Electron
- **PWA**: vite-plugin-pwa con Workbox
- **Iconos**: Lucide React

## 📦 Instalación

```bash
npm install
```

## 🖥️ Desarrollo

### Modo desarrollo (Vite)
```bash
npm run dev
```

### Electron en desarrollo
```bash
npm run electron:dev
```

## 🏗️ Construcción

### Build para web (Vercel/PWA)
```bash
npm run build:vercel
```

### Build para Electron (.deb)
```bash
npm run electron:build:deb
```

El paquete .deb se generará en `dist-electron/`

### Build multiplataforma
```bash
npm run electron:build:all
```

Genera paquetes para:
- Linux (.deb)
- Windows (.exe)
- macOS (.dmg)

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si son necesarias
3. Despliega automáticamente

La aplicación funcionará como PWA con:
- Instalación en dispositivos móviles
- Funcionamiento offline
- Actualizaciones automáticas

## 📱 Características PWA

- ✅ Instalable en móviles y escritorio
- ✅ Funcionamiento offline parcial
- ✅ Notificaciones push (configurable)
- ✅ Icono personalizado
- ✅ Splash screen
- ✅ Cache estratégico con Workbox

## 🔧 Configuración Electron

El archivo `electron/main.js` incluye:
- IPC para comunicación con Andriller
- IPC para comunicación con ALEAPP
- Gestión de archivos y directorios
- Cálculo de hashes (SHA256)
- Diálogos nativos

## 📁 Estructura del Proyecto

```
forense-android-electron/
├── electron/           # Código Electron (main process)
│   ├── main.js        # Proceso principal
│   └── preload.js     # Bridge seguro
├── public/            # Assets estáticos
│   ├── manifest.webmanifest
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── src/               # Código React
│   ├── components/    # Componentes reutilizables
│   ├── pages/         # Páginas de la app
│   ├── store/         # Estado global (Zustand)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json        # Configuración Vercel
└── vite.config.ts     # Configuración Vite + PWA
```

## 🔐 Seguridad

- Context Isolation habilitado en Electron
- Node Integration deshabilitado
- Preload script para APIs seguras
- Headers de seguridad en Vercel

## 📄 Licencia

MIT

## 👥 Autor

Laboratorio Forense
