# ⚙️ Proceso de Desarrollo Forense - Sistema Android

> **Sistema de gestión forense para dispositivos Android con empaquetado .deb**

---

## 📋 Información del Proyecto

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | Forense Android Electron |
| **Versión** | 1.0.0 |
| **Descripción** | Sistema de gestión forense para dispositivos Android con empaquetado .deb |

### 🛠️ Tecnologías Utilizadas

#### Frontend
```yaml
• React 18.2.0
• TypeScript 5.3.3
• Vite 5.0.8
• TailwindCSS 3.4.0
• React Router DOM 6.20.0
• Zustand 4.4.7 (State Management)
• Lucide React (Iconos)
```

#### Desktop
```yaml
• Electron 28.0.0
• Electron Builder 24.9.1
```

#### Herramientas Externas
```yaml
• Andriller v3.6.2+ (Extracción forense)
• ALEAPP v2.1.0+ (Análisis de artefactos)
```

---

## 🏗️ Arquitectura del Sistema

### Tipo de Aplicación
**Aplicación de Escritorio Multiplataforma**

### Patrón de Diseño
**Componentes React con State Management Centralizado**

### Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                          │
│                  (React Components)                              │
│            /src/pages/, /src/components/                         │
│         Interfaz de usuario con TailwindCSS                      │
└─────────────────────────────────────────────────────────────────┘
                              ↕ IPC
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE ESTADO                                │
│                  (Zustand Store)                                 │
│                 /src/store/                                      │
│           Gestión del estado global                              │
└─────────────────────────────────────────────────────────────────┘
                              ↕ IPC
┌─────────────────────────────────────────────────────────────────┐
│                 CAPA DE COMUNICACIÓN                             │
│                (Electron IPC)                                    │
│          /electron/main.js, preload.js                           │
│        Comunicación segura entre procesos                        │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                 CAPA DE SERVICIOS EXTERNOS                       │
│                                                                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│   │   Andriller  │  │    ALEAPP    │  │  Sistema de  │        │
│   │  (QProcess)  │  │  (CLI Tool)  │  │  Archivos    │        │
│   └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                  │
│   ┌──────────────┐  ┌──────────────┐                            │
│   │   Cálculo    │  │   Base de    │                            │
│   │   Hashes     │  │   Datos      │                            │
│   │ SHA-256/MD5  │  │  (Futura)    │                            │
│   └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
Usuario → Componente React → electronAPI (preload) → IPC → Main Process
                                                                    ↓
Usuario ← Componente React ← electronAPI (preload) ← IPC ← Herramientas Externas
```

---

## 📁 Estructura de Directorios

### Raíz del Proyecto
`/workspace/forense-android-electron/`

### Directorios Principales

#### `/electron/`
| Archivo | Descripción |
|---------|-------------|
| `main.js` | Proceso principal de Electron |
| `preload.js` | Bridge seguro entre procesos |

#### `/src/`

**Subdirectorios:**

| Directorio | Propósito |
|------------|-----------|
| `components/` | Componentes reutilizables (Layout, etc.) |
| `pages/` | Páginas principales de la aplicación |
| `store/` | Estado global con Zustand |
| `services/` | Servicios y utilidades |
| `hooks/` | Custom hooks de React |
| `types/` | Definiciones TypeScript |
| `utils/` | Funciones auxiliares |

**Páginas Principales:**

| Página | Archivo | Función |
|--------|---------|---------|
| **HomePage** | `HomePage.tsx` | Dashboard inicial |
| **ConsignacionPage** | `ConsignacionPage.tsx` | Registro de evidencia |
| **AdquisicionPage** | `AdquisicionPage.tsx` | Extracción con Andriller |
| **AnalisisPage** | `AnalisisPage.tsx` | Procesamiento con ALEAPP |
| **InformePage** | `InformePage.tsx` | Generación de dictamen |

**Archivos Base:**

| Archivo | Descripción |
|---------|-------------|
| `App.tsx` | Componente raíz con routing |
| `main.tsx` | Punto de entrada de React |
| `index.css` | Estilos globales con Tailwind |

#### `/public/`
> Recursos estáticos (iconos, assets)

#### `/dist/`
> Build de producción de Vite

#### `/dist-electron/`
> Paquetes .deb generados

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias y scripts |
| `vite.config.ts` | Configuración de Vite |
| `tsconfig.json` | Configuración de TypeScript |
| `tailwind.config.js` | Personalización de Tailwind |
| `postcss.config.js` | Configuración de PostCSS |
| `index.html` | HTML base |

---

## 📱 Proceso de Consignación de Teléfonos

### Fase I - Obtención por Consignación

> **Definición:** Recepción voluntaria de dispositivo móvil por parte del propietario/poseedor

### Pasos del Proceso

#### Paso 1: Verificación de Identidad

**Acciones:**
```
✓ Solicitar cédula de identidad de quien consigna
✓ Registrar nombre completo y datos de contacto
✓ Documentar relación con el caso
```

**Interfaz:** `ConsignacionPage.tsx - Paso 1: Datos del Caso`

---

#### Paso 2: Documentación del Motivo

**Acciones:**
```
✓ Registrar motivo de la consignación
✓ Asignar número de caso único
✓ Identificar fiscal asignado
```

**Campos Requeridos:**

| Campo | Ejemplo |
|-------|---------|
| `numeroCaso` | MP-2024-001234 |
| `fiscal` | Nombre del fiscal |
| `fechaInicio` | Fecha actual |
| `expedienteNumero` | Número de expediente |

---

#### Paso 3: Fijación del Dispositivo

**Acciones:**
```
✓ Fotografiar dispositivo desde todos los ángulos
✓ Documentar IMEI, IMEI2 (marcar *#06#)
✓ Registrar estado físico (golpes, rayones)
✓ Verificar estado de pantalla (encendido/apagado)
✓ Documentar estado de batería
```

**Campos Requeridos:**

| Campo | Descripción |
|-------|-------------|
| `marca` | Samsung, Xiaomi, Huawei, etc. |
| `modelo` | Modelo específico |
| `imei` | 15 dígitos |
| `imei2` | 15 dígitos (si es dual SIM) |
| `numeroTel` | Número de línea |
| `simCard` | Número de serie SIM |
| `estadoFisico` | Descripción de daños |
| `pantallaEstado` | encendido/apagado |
| `bateriaEstado` | Porcentaje o estado |
| `modoAislamiento` | modo_avion/bolsa_faraday |

---

#### Paso 4: Generación de PRCC

**Acciones:**
```
✓ Crear Planilla de Registro de Cadena de Custodia
✓ Asignar número único de PRCC
✓ Documentar funcionario colector
✓ Especificar tipo de embalaje
✓ Registrar número de precinto
✓ Calcular hash inicial (si aplica)
```

**Campos Requeridos:**

| Campo | Ejemplo/Notas |
|-------|---------------|
| `numeroPRCC` | PRCC-2024-001234 |
| `tipo` | principal/derivada |
| `funcionarioColector` | Nombre completo |
| `cargo` | Cargo del funcionario |
| `organo` | CICPC, PNB, MP, etc. |
| `tipoEmbalaje` | bolsa/caja/sobre/otro |
| `numeroPrecinto` | Código del precinto |
| `estadoEmbalaje` | buenas/deterioradas/rotas |
| `nombreFirmante` | Quien entrega la evidencia |
| `hashSHA256` | Hash calculado |
| `hashMD5` | Hash calculado |

---

#### Paso 5: Almacenamiento de Datos

**Acciones:**
```
✓ Guardar toda la información en Zustand store
✓ Persistir en base de datos (implementación futura)
✓ Generar acta de consignación en PDF
```

**Salida:** Datos disponibles para fases siguientes

---

## 🔌 Proceso de Adquisición con Andriller

### Fase II - Adquisición Forense

| Propiedad | Valor |
|-----------|-------|
| **Herramienta** | Andriller v3.6.2+ |
| **Definición** | Extracción lógica/física del dispositivo en modo solo lectura |

### Configuración de Andriller

**Comando Base:**
```bash
andriller --output <ruta_salida> --mode <tipo> --readonly
```

**Modos de Extracción:**

| Tipo | Descripción | Recomendación |
|------|-------------|---------------|
| **lógica** | Extracción de datos accesibles sin root | Método recomendado para mayoría de casos |
| **fisica** | Extracción bit-a-bit completa | Requiere root o bootloader desbloqueado |

**Argumentos Disponibles:**
```
--output    Directorio de salida
--mode      Tipo de extracción (logica/fisica)
--readonly  Modo solo lectura (integridad forense)
--device    ID del dispositivo (opcional)
```

### Implementación en Electron

#### Archivo: `/electron/main.js`

**IPC Handler:**
```javascript
ipcMain.handle('andriller:start', async (event, config) => {
  const { outputPath, extractionType = 'logica', deviceId } = config;
  const args = ['--output', outputPath, '--mode', extractionType, '--readonly'];
  if (deviceId) args.push('--device', deviceId);
  const process = spawn('andriller', args);
  // Manejo de stdout, stderr, y eventos
});
```

#### API Expuesta (preload.js)
```javascript
window.electronAPI.andriller.start(config)
window.electronAPI.andriller.cancel()
window.electronAPI.andriller.onOutput(callback)
window.electronAPI.andriller.onError(callback)
```

### Interfaz de Usuario

**Página:** `AdquisicionPage.tsx`

**Componentes:**
```
✓ Selector de directorio de salida
✓ Selector de tipo de extracción
✓ Campo opcional para device ID
✓ Botón Iniciar/Cancelar extracción
✓ Barra de progreso en tiempo real
✓ Log de ejecución en vivo
```

### Flujo de Trabajo

```
1. Usuario selecciona carpeta de salida
2. Usuario configura tipo de extracción
3. Sistema invoca Andriller vía IPC
4. Proceso se ejecuta asíncronamente
5. Output se muestra en tiempo real
6. Al finalizar, se guarda registro en store
7. Se calculan hashes de verificación
```

### Validación de Integridad

```
✓ Calcular SHA-256 de imagen original
✓ Calcular SHA-256 de copia obtenida
✓ Comparar hashes para verificar integridad
✓ Documentar valores en PRCC/adquisiciones
```

---

## 🔍 Proceso de Análisis con ALEAPP

### Fase III - Peritaje y Análisis

| Propiedad | Valor |
|-----------|-------|
| **Herramienta** | ALEAPP v2.1.0+ |
| **Significado** | Android Logs Events And Protobuf Parser |

### Configuración de ALEAPP

**Comando Base:**
```bash
aleapp -i <imagen> -o <salida> -t fs
```

**Tipos de Análisis:**

| Tipo | Descripción | Argumento | Uso |
|------|-------------|-----------|-----|
| **completo** | Todos los artefactos disponibles | - | Análisis exhaustivo del dispositivo |
| **whatsapp** | Solo artefactos de WhatsApp | `--filter whatsapp` | Casos específicos de mensajería |
| **timeline** | Línea de tiempo de eventos | `--timeline 1` | Reconstrucción cronológica |

**Argumentos Disponibles:**
```
-i          Ruta de imagen o directorio de entrada
-o          Directorio de salida para reportes
-t          Tipo de entrada (fs = filesystem)
--filter    Filtrar módulos específicos
--timeline  Generar línea de tiempo
```

### Implementación en Electron

#### Archivo: `/electron/main.js`

**IPC Handler:**
```javascript
ipcMain.handle('aleapp:start', async (event, config) => {
  const { imagePath, outputPath, analysisType = 'completo' } = config;
  const args = ['-i', imagePath, '-o', outputPath, '-t', 'fs'];
  if (analysisType === 'whatsapp') args.push('--filter', 'whatsapp');
  if (analysisType === 'timeline') args.push('--timeline', '1');
  const process = spawn('aleapp', args);
  // Manejo de stdout, stderr, y eventos
});
```

#### API Expuesta (preload.js)
```javascript
window.electronAPI.aleapp.start(config)
window.electronAPI.aleapp.cancel()
window.electronAPI.aleapp.onOutput(callback)
window.electronAPI.aleapp.onError(callback)
```

### Interfaz de Usuario

**Página:** `AnalisisPage.tsx`

**Componentes:**
```
✓ Selector de imagen/directorio de entrada
✓ Selector de directorio de salida
✓ Selector de tipo de análisis
✓ Botón Iniciar/Cancelar análisis
✓ Barra de progreso en tiempo real
✓ Log de ejecución en vivo
✓ Resumen de artefactos procesados
```

### Artefactos Analizados

#### WhatsApp
```
✓ Mensajes enviados/recibidos
✓ Contactos de WhatsApp
✓ Llamadas VoIP
✓ Archivos multimedia
✓ Ubicaciones compartidas
✓ Estados/publicaciones
```

#### Sistema
```
✓ Llamadas telefónicas
✓ Contactos del dispositivo
✓ Mensajes SMS/MMS
✓ Historial de navegación
✓ Ubicación GPS
✓ Aplicaciones instaladas
✓ Archivos de medios
```

### Formatos de Salida

| Formato | Descripción |
|---------|-------------|
| **HTML** | Reporte interactivo principal |
| **CSV/Excel** | Datos tabulares |
| **JSON** | Datos estructurados |
| **Timeline** | Línea de tiempo |

---

## 📄 Generación de Informe Técnico

### Fase IV - Emisión del Dictamen Pericial

> **Definición:** Generación del informe técnico-científico conforme al marco legal

### Estructura del Dictamen

#### 1. Motivo
**Contenido:** Razón por la cual se practica la peritación  
**Ejemplo:** "Por oficio N° XYZ del Ministerio Público..."

---

#### 2. Descripción de la Evidencia
**Contenido:** Estado en que se halló y recibió la evidencia

**Datos:**
```
✓ Marca y modelo del dispositivo
✓ IMEI(s) registrados
✓ Estado físico observado
✓ Condiciones de recepción
```

---

#### 3. Exámenes Practicados
**Contenido:** Detalle de softwares, técnicas y valores Hash

**Datos:**
```
✓ Andriller v3.6.2 - Extracción lógica
✓ ALEAPP v2.1.0 - Análisis de artefactos
✓ Hash SHA-256 original: <valor>
✓ Hash SHA-256 copia: <valor>
✓ Coincidencia de hashes: Sí/No
```

---

#### 4. Resultados
**Contenido:** Tabla con hallazgos del análisis

**Columnas:**

| Columna | Descripción |
|---------|-------------|
| Nombre nativo | del archivo/artefacto |
| Fecha | de creación/modificación |
| Ruta | de ubicación |
| Tamaño | en bytes |
| Hash individual | SHA-256 |
| Relevancia forense | Clasificación |

---

#### 5. Conclusiones
**Contenido:** Juicio de valor técnico-científico

**Características:**
```
✓ Objetivas y basadas en hechos
✓ Responden a objetivos del peritaje
✓ En lenguaje claro y preciso
⚠️ Sin precalificación jurídica
```

---

#### 6. Fundamentación Legal

**Leyes Aplicables:**

| Ley | Disposición |
|-----|-------------|
| Constitución Nacional | Debido proceso |
| COPP Art. 188 | Resguardo de evidencias |
| Ley Especial contra Delitos Informáticos | Tipificación de delitos |
| Ley de Infogobierno | Validez tecnológica |
| Ley sobre Mensajes de Datos y Firmas Electrónicas | Eficacia probatoria |
| ISO/IEC 27037:2012 | Obtención y preservación |
| ISO/IEC 27042:2015 | Análisis e interpretación |
| NIST SP 800-101 r1 | Forensia móvil |

---

#### 7. Consumo de Evidencia
**Contenido:** Constancia de alteración o no de la evidencia

**Opciones:**
```
✓ La evidencia NO fue alterada ni consumida
✓ Consumo parcial (especificar)
```

### Formalidades

```
✓ Presentación por escrito
✓ Firma del Perito Informático
✓ Sello del perito
✓ Versión exacta de herramientas usadas
✓ Fecha de emisión
```

### Exportación

**Formatos Disponibles:**

| Formato | Propósito |
|---------|-----------|
| **PDF** | Formato oficial para presentación |
| **DOCX** | Editable para revisiones |
| **JSON** | Datos estructurados para sistema |

### Interfaz de Usuario

**Página:** `InformePage.tsx`

**Componentes:**
```
✓ Resumen del caso (datos de fases anteriores)
✓ Formulario de estructura del dictamen
✓ Checklist de fundamentación legal
✓ Selector de consumo de evidencia
✓ Botones de exportación (PDF, DOCX, JSON)
✓ Vista previa del informe
```

---

## 📦 Empaquetado .deb para Ubuntu/Debian

### Herramienta: Electron Builder

| Propiedad | Valor |
|-----------|-------|
| **Herramienta** | Electron Builder |
| **Versión** | 24.9.1+ |

### Configuración en package.json

#### Scripts Disponibles

```json
{
  "scripts": {
    "electron:build": "tsc && vite build && electron-builder",
    "electron:build:deb": "tsc && vite build && electron-builder --linux deb"
  }
}
```

#### Sección Build

```json
{
  "build": {
    "appId": "com.forens.android",
    "productName": "Forense Android",
    "linux": {
      "target": ["deb"],
      "category": "Utility",
      "maintainer": "Tu nombre <tu@email.com>"
    },
    "deb": {
      "depends": ["gconf2", "gconf-service", "libnotify4", "libappindicator1", "libxtst6", "python3"]
    }
  }
}
```

### Dependencias del Sistema

```bash
# Python 3 (requerido para Andriller y ALEAPP)
sudo apt install python3 python3-pip

# Dependencias de Electron
sudo apt install gconf2 gconf-service libnotify4 libappindicator1 libxtst6

# Instalación de herramientas forenses
pip3 install andriller
pip3 install aleapp
```

### Proceso de Construcción

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar TypeScript
npm run build

# 3. Construir paquete .deb
npm run electron:build:deb

# 4. El paquete se genera en dist-electron/
ls dist-electron/*.deb
```

### Instalación del Paquete

```bash
# Instalar paquete .deb
sudo dpkg -i dist-electron/forense-android_1.0.0_amd64.deb

# Corregir dependencias si es necesario
sudo apt-get install -f
```

---

## 🎨 Principios Fluent Design Aplicados

### Luz
- Sombras elevadas para tarjetas de procedimientos
- Bordes sutiles en formularios interactivos
- Indicadores de estado iluminados
- Efectos hover con iluminación progresiva

### Profundidad
- Capas jerárquicas: Fases → Procedimientos → Pasos
- Efectos de elevación en cards de evidencia
- Superposiciones suaves en modales
- Z-index estratégico para overlays

### Movimiento
- Transiciones fluidas entre páginas (300ms)
- Animaciones de progreso en tiempo real
- Micro-interacciones en botones de acción
- Fade-in en carga de componentes

### Material
- Superficies diferenciadas por tipo de contenido
- Bordes redondeados consistentes (8px)
- Texturas sutiles en fondos de sección
- Materiales visuales coherentes

### Escala
- Tipografía jerárquica clara (H1-H6)
- Espaciado basado en grid de 8px
- Iconos proporcionales (24px, 32px, 48px)
- Proporciones áureas en layouts principales

---

## 📊 Resumen Visual del Flujo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SISTEMA FORENSE ANDROID COMPLETO                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CONSIGNACIÓN                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Identidad │→ │Motivo    │→ │Dispositivo│→ │PRCC      │           │
│  │          │  │          │  │          │  │          │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                     ↓                               │
│  ADQUISICIÓN (Andriller)                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Configurar│→ │Extraer   │→ │Verificar │→ │Guardar   │           │
│  │          │  │          │  │Hash      │  │          │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                     ↓                               │
│  ANÁLISIS (ALEAPP)                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Seleccionar│→ │Procesar  │→ │Revisar   │→ │Exportar  │           │
│  │          │  │          │  │Artefactos│  │          │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                     ↓                               │
│  INFORME                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Redactar  │→ │Fundamentar│→ │Previsualizar│→ │Exportar │           │
│  │          │  │Legal     │  │          │  │PDF/DOCX  │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

*Documento generado siguiendo principios de Fluent Design System para consistencia visual y experiencia de usuario moderna.*
