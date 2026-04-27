# 🔬 Sistema Forense Android - Cadena de Custodia

> **Aplicación de escritorio eletrónica para gestión forense de dispositivos Android con cadena de custodia según Manual Único Venezolano (2017)**

---

## 📋 Descripción del Proyecto

Sistema integral de gestión forense para dispositivos Android que implementa fielmente el **Manual Único de Cadena de Custodia de Evidencias Físicas (Versión Final 29SEP17)**. Incluye extracción con Andriller, análisis con ALEAPP y generación de dictámenes periciales.

**Actualización:** Unificación completada - Archivos `.md` redundantes eliminados, Fluent Design integrado al YAML maestro.

---

## 🛠️ Stack Tecnológico

### Frontend
```yaml
• React 18.2.0
• TypeScript 5.3.3
• Vite 5.0.8
• TailwindCSS 3.4.0
• Zustand 4.4.7 (State Management)
• Lucide React (Iconos)
```

### Desktop
```yaml
• Electron 28.0.0
• Electron Builder 24.9.1
```

### Herramientas Forenses
```yaml
• Andriller v3.6.2+ (Extracción forense)
• ALEAPP v2.1.0+ (Análisis de artefactos)
```

---

## 📁 Estructura del Proyecto (Actualizada)

```
SHA256.deb/
├── RAG/                              # Base de conocimiento unificada
│   ├── manual_unico_unificado.yaml    # ✅ YAML MAESTRO (INCLUYE Fluent Design)
│   ├── arquitectura_cadena_custodia.yaml
│   ├── proceso-desarrollo-forense.yaml
│   ├── manual-procedimiento.yaml
│   ├── arquitectura_sitio.yaml
│   └── *.pdf                         # 16 documentos fuente (PDFs)
│
├── componente/                        # ✅ Componentes modulares (7 creados)
│   ├── fase_inicial/
│   │   └── fase_inicial.yaml
│   ├── fase_laboratorio/
│   │   └── fase_laboratorio.yaml
│   ├── fase_disposicion_judicial/
│   │   └── fase_disposicion_judicial.yaml
│   ├── fase_disposicion_final/
│   │   └── fase_disposicion_final.yaml
│   ├── resguardo/
│   │   └── resguardo.yaml
│   ├── herramientas/
│   │   └── herramientas.yaml
│   └── traslado/
│       └── traslado.yaml
│
├── electron/                          # Proceso Electron
│   ├── main.js                     # Proceso principal
│   └── preload.js                   # Bridge seguro
│
├── src/                              # Código React
│   ├── components/                  # Componentes reutilizables
│   ├── pages/                      # Páginas principales
│   ├── store/                      # Estado global (Zustand)
│   ├── services/                   # Servicios
│   ├── hooks/                      # Custom hooks
│   ├── types/                      # Definiciones TS
│   └── utils/                      # Funciones auxiliares
│
├── public/                           # Recursos estáticos
├── dist/                             # Build Vite
├── dist-electron/                     # Paquetes .deb
├── map_arquitectura.md              # ✅ Mapa actualizado
└── README.md                        # Este archivo
```

### 🎨 Cambios Recientes (27/Abr/2026)
- ✅ **Unificación completada**: Todos los `.md` de RAG/ fusionados en `manual_unico_unificado.yaml`
- ✅ **Eliminados 8 archivos**: `manual-procedimiento.md`, `IMPLEMENTACION_CADENA_CUSTODIA.md`, `arquitectura_sitio.md`, `IMPLEMENTACION.md`, `arquitectura_cadena_custodia.md`, `proceso-desarrollo-forense.md`, `fluent-design-system.md`, `CAMBIOS_REALIZADOS.md`
- ✅ **Fluet Design integrado**: Ahora en `manual_unico_unificado.yaml` (no archivo separado)
- ✅ **7 Componentes YAML creados** en `/componente/`
- ✅ **map_arquitectura.md** actualizado con todos los cambios

---

## 🎨 Fluent Design System (Integrado)

El proyecto usa **Microsoft Fluent Design** para consistencia visual moderna:

| Elemento | Configuración |
|---------|---------------|
| **Fuente** | Segoe UI Variable, system-ui, sans-serif |
| **Tema** | Dark (`#202020`) |
| **Color Primario** | `#0078D4` (Azul Fluent) |
| **Color Acento** | `#60CDFF` (Windows 11 Dark) |
| **Border Radius** | Botones/Inputs: `4px`, Cards: `12px` |
| **Sombras** | `0 4px 8px rgba(0,0,0,0.2)` |
| **Motion** | `167ms` cúbico-bezier |

**Archivo:** `RAG/manual_unico_unificado.yaml` (sección `fluent_design_system`)

---

## 📍 Fases del Sistema

### 1️⃣ Fase Inicial - Obtención
- Obtención Técnica (Protección, Observación, Fijación, Colección)
- Obtención por Consignación ⭐ **PRIORIDAD**
- Obtención por Aseguramiento
- Obtención por Derivación

### 2️⃣ Fase de Laboratorio - Peritación
- Recepción en Laboratorio
- Designación de Perito
- Peritaje (Andriller + ALEAPP)
- Remisión de Resultados

### 3️⃣ Fase de Disposición Judicial
- Resguardo Judicial
- Exhibición en Audiencia

### 4️⃣ Fase de Disposición Final
- Devolución / Entrega / Destrucción
- Cierre de PRCC

### 🔄 Procesos Continuos
- Resguardo (Ingreso → Depósito → Egreso)
- Traslado
- Transferencia

---

## 🛠️ Instalación y Desarrollo

### Requisitos
- Node.js >= 18.x
- npm >= 9.x
- Python >= 3.11
- Andriller instalado
- ALEAPP instalado

### Comandos

```bash
# Instalación
npm install

# Desarrollo
npm run dev              # Vite dev server
npm run electron:dev     # Electron + Vite hot reload

# Build Web
npm run build            # Build estándar

# Build Electron
npm run electron:build:deb    # Solo .deb (Linux)
npm run electron:build:all    # Todas las plataformas
```

---

## 📦 Empaquetado .deb

```bash
# Generar paquete
npm run electron:build:deb

# El paquete se genera en:
dist-electron/forense-android_1.0.0_amd64.deb

# Instalar en Debian/Ubuntu
sudo dpkg -i dist-electron/forense-android_1.0.0_amd64.deb

# Corregir dependencias si es necesario
sudo apt-get install -f
```

### Dependencias del Sistema
```bash
# Python 3 (requerido para Andriller y ALEAPP)
sudo apt install python3 python3-pip

# Dependencias de Electron
sudo apt install libgtk-3-0 libnotify4 libnss3 libxtst6

# Instalar herramientas forenses
pip3 install andriller
pip3 install aleapp
```

---

## 📊 Marco Legal Aplicado

| Ley | Año | Aplicación |
|-----|-----|------------|
| Constitución Nacional | 1999 | Debido proceso (Art. 49) |
| Código Orgánico Procesal Penal | 2012 | Cadena de custodia (Art. 187-188) |
| Ley Especial Delitos Informáticos | 2001 | Tipificación de delitos |
| Ley de Infogobierno | 2013 | Validez tecnológica |
| Ley Mensajes de Datos | 2001 | Eficacia probatoria |

### Estándares Internacionales
- **ISO/IEC 27037:2012** - Identificación y preservación
- **ISO/IEC 27042:2015** - Análisis e interpretación
- **NIST SP 800-101 r1** - Forense móvil
- **ACPO v5** - Buenas prácticas

---

## 📄 Documentación

| Archivo | Descripción |
|---------|-------------|
| `RAG/manual_unico_unificado.yaml` | ✅ YAML maestro unificado + Fluent Design |
| `map_arquitectura.md` | ✅ Mapa completo de arquitectura |
| `componente/*/ *.yaml` | ✅ 7 componentes modulares |
| `README.md` | ✅ Este archivo actualizado |

### PDFs en RAG/ (16 documentos)
1. MANUAL_ÚNICO_DE_CADENA_DE_CUSTODIA...pdf *(Fuente principal)*
2. Ley Especial de Delitos Informáticos (2001).pdf
3. Ley de Infogobierno.pdf
4. Ley sobre Mensajes de Datos y Firmas Electrónicas.pdf
5. Código Penal.pdf
6. Código Orgánico Procesal Penal.pdf
7. Constitución Nacional.pdf
8. ISO IEC 27037-2012.pdf
9. ISO-IEC 27042 2015.pdf
10. NIST SP 800-101.pdf
11. ACPO Good Practice Guide v5.pdf
12. El Peritaje Informático.pdf
13. La Criminología Una Ciencia Dinámica.pdf
14. Normalización Economía Digital.pdf
15. cyb_ecu_delitos_inform.pdf
16. Creación del CENIF (2012).pdf

---

## 🔐 Seguridad

### Electron
- ✅ Context Isolation: `true`
- ✅ Node Integration: `false`
- ✅ Preload script seguro con `contextBridge`
- ✅ IPC: Comunicación validada entre procesos

### Integridad de Datos
- ✅ Cálculo de hashes SHA-256 y MD5
- ✅ Verificación de coincidencia de hashes
- ✅ Registro de auditoría inmutable
- ✅ Modo solo lectura en herramientas forenses

---

## 📱 Páginas Principales

| Página | Archivo | Función |
|--------|---------|---------|
| **HomePage** | `src/pages/HomePage.tsx` | Dashboard inicial |
| **ConsignacionPage** | `src/pages/ConsignacionPage.tsx` | Registro de evidencia |
| **AdquisicionPage** | `src/pages/AdquisicionPage.tsx` | Extracción con Andriller |
| **AnalisisPage** | `src/pages/AnalisisPage.tsx` | Procesamiento con ALEAPP |
| **InformePage** | `src/pages/InformePage.tsx` | Generación de dictamen |

---

## 🎯 Próximos Pasos

- [ ] Backend Integration: Conectar a PostgreSQL
- [ ] Autenticación: Implementar login por rol
- [ ] Firma Digital: Integrar firma electrónica para PRCC
- [ ] QR Codes: Generar códigos QR para tracking
- [ ] PDF Generation: Crear PDFs oficiales
- [ ] Audit Trail: Log de todas las operaciones
- [ ] Offline Mode: PWA para trabajo sin conexión

---

## 📓 Licencia

MIT

---

## 👥 Autor

Laboratorio Forense

---

*Última actualización: 27/Abr/2026 - Unificación completada + Fluent Design integrado*
*Versión: 1.0.0*
*Basado en: Manual Único de Cadena de Custodia (Versión Final 29SEP17)*