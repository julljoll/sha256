# 📋 Guía de Implementación - Forense Android

## ✅ Configuración Completada

Este proyecto ahora es una aplicación **React + Vite + Electron + Tailwind** que puede:
1. Generar paquetes `.deb` para Linux
2. Desplegarse como PWA en Vercel

---

## 🚀 Comandos Disponibles

```bash
# Instalación
npm install

# Desarrollo
npm run dev              # Vite dev server
npm run electron:dev     # Electron + Vite hot reload

# Build Web/PWA
npm run build            # Build estándar
npm run build:vercel     # Build optimizado para Vercel

# Build Electron
npm run electron:build:deb    # Solo .deb (Linux)
npm run electron:build:all    # Todas las plataformas
```

---

## 📁 Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| `package.json` | Dependencias y scripts |
| `vite.config.ts` | Config Vite + PWA |
| `vercel.json` | Config despliegue Vercel |
| `electron/main.js` | Proceso principal Electron |
| `electron/preload.js` | Bridge seguro |
| `public/manifest.webmanifest` | Manifiesto PWA |
| `src/hooks/usePWA.ts` | Hook estado PWA |
| `.github/workflows/build.yml` | CI/CD |

---

## 🌐 Despliegue en Vercel

1. Conecta tu repo a Vercel
2. Framework: Vite
3. Build Command: `npm run build:vercel`
4. Output: `dist`

---

## 🖥️ Build .deb

```bash
npm run electron:build:deb
```

Salida: `dist-electron/*.deb`

---

## 📱 PWA Features

- Instalable en móviles/desktop
- Funcionamiento offline
- Actualizaciones automáticas
- Iconos personalizados

---

## 🔐 Seguridad

- Context Isolation (Electron)
- Headers seguridad (Vercel)
- Preload script seguro

---

**Versión:** 1.0.0 | **Licencia:** MIT
