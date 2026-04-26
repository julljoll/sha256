# 🔗 Arquitectura del Sistema de Cadena de Custodia

> **Plataforma para gestión integral del proceso de cadena de custodia según Manual Único venezolano**

---

## 📋 Metadatos del Proyecto

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | Sistema de Cadena de Custodia de Evidencias |
| **Versión** | 1.0.0 |
| **Descripción** | Plataforma para gestión integral del proceso de cadena de custodia según Manual Único venezolano |
| **Fuente Documental** | MANUAL_ÚNICO_DE_CADENA DE_CUSTODIA_DE_EVIDENCIAS_(VERSIÓN_FINAL_29SEP17).pdf |

### 🛠️ Stack Tecnológico

```yaml
Frontend:
  • React 18 + Vite + TypeScript
  • TailwindCSS + HeadlessUI

Desktop:
  • Electron + electron-builder

PWA:
  • vite-plugin-pwa + Workbox

Despliegue:
  • Web: Vercel (PWA)
  • Desktop: GitHub Actions (.deb, .exe, .dmg)
```

---

## 🔄 Flujo Principal del Sistema

> **Basado en las 4 Fases del Manual Único**

### Visión General del Flujo

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   FASE INICIAL  │ ──→ │FASE LABORATORIO │ ──→ │ DISPOSICIÓN     │ ──→ │ DISPOSICIÓN     │
│                 │     │                 │     │ JUDICIAL        │     │ FINAL           │
│ Obtención       │     │ Peritaje        │     │ Resguardo       │     │ Cierre          │
│ Aseguramiento   │     │ Análisis        │     │ Exhibición      │     │ Devolución      │
│ Consignación    │     │ Dictamen        │     │                 │     │ Destrucción     │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 📍 Fase 1: Fase Inicial

### 🎯 Descripción General

| Propiedad | Valor |
|-----------|-------|
| **ID** | `fase_inicial` |
| **Nombre** | FASE INICIAL |
| **Icono** | `clipboard-document-check` |
| **Color** | Azul |
| **Descripción** | Obtención y aseguramiento de evidencias en escena o por consignación |

### Tipos de Obtención

#### 1️⃣ Obtención Técnica

**Escenarios:** Escena del crimen, Lugar de los hechos

##### Procedimientos

###### 🛡️ Protección Técnica

**Descripción:** Aislamiento y preservación del lugar

**Pasos:**
```
1. Delimitar área (círculos concéntricos)
2. Controlar acceso de personas
3. Registrar personas que entran/salen
4. Usar elementos de protección personal
```

**Responsables:** Policía Científica, Funcionario actuante

**Campos del Formulario:**

| Campo ID | Label | Tipo | Requerido |
|----------|-------|------|-----------|
| `fecha_hora_proteccion` | Fecha y Hora de Protección | datetime-local | ✓ |
| `lugar_proteccion` | Lugar/Locación | text | ✓ |
| `coordenadas` | Coordenadas GPS | text | ✗ |
| `funcionario_responsable` | Funcionario Responsable | text | ✓ |
| `organismo` | Organismo | select | ✓ |

*Opciones de organismo:* CICPC, GNB, PNB, Policía Estadal

---

###### 👁️ Observación Preliminar

**Descripción:** Evaluación inicial del sitio y determinación de técnicas

**Pasos:**
```
1. Observar sin modificar
2. Evaluar características físicas del sitio
3. Identificar evidencias potenciales
4. Determinar técnicas de fijación y colección
```

**Responsables:** Perito Criminalista, Investigador

**Campos del Formulario:**

| Campo ID | Label | Tipo | Requerido |
|----------|-------|------|-----------|
| `descripcion_sitio` | Descripción del Sitio | textarea | ✓ |
| `condiciones_climaticas` | Condiciones Climáticas | text | ✓ |
| `iluminacion` | Condiciones de Iluminación | select | ✓ |
| `evidencias_identificadas` | Evidencias Identificadas | array | ✓ |

*Opciones de iluminación:* Natural, Artificial, Mixta

---

###### 📸 Fijación

**Descripción:** Registro permanente mediante fotografía, video, planimetría

**Técnicas Disponibles:**
- 📷 Fotográfica
- 🎥 Videográfica
- 📐 Planimétrica
- 📝 Descripción escrita

**Pasos:**
```
1. Fijación externa (vista general)
2. Fijación interna (vista media y detalle)
3. Usar testigo métrico y numerador
4. Registrar coordenadas y puntos cardinales
```

**Responsables:** Fotógrafo Forense, Topógrafo

**Campos del Formulario:**

| Campo ID | Label | Tipo | Requerido |
|----------|-------|------|-----------|
| `tipo_fijacion` | Tipo de Fijación | multiselect | ✓ |
| `cantidad_fotos` | Cantidad de Fotografías | number | ✓ |
| `equipo_utilizado` | Equipo Utilizado | text | ✓ |
| `operador` | Operador del Equipo | text | ✓ |

---

###### 🧤 Colección

**Descripción:** Recolección física de evidencias usando técnicas apropiadas

**Técnicas de Colección:**

| Técnica | Aplicación |
|---------|------------|
| Directa | Objetos grandes y visibles |
| Barrido/Aspiración | Partículas pequeñas |
| Levantamiento | Huellas y rastros |
| Hisopado | Fluidos biológicos |
| Raspado | Sustancias adheridas |

**Pasos:**
```
1. Usar guantes y cambiar entre evidencias
2. Coleccionar de lo menos contaminante a lo más
3. Evitar contaminación cruzada
4. Documentar posición original
```

**Responsables:** Perito Coleccionista, Técnico Forense

**Campos del Formulario:**

| Campo ID | Label | Tipo | Requerido |
|----------|-------|------|-----------|
| `tecnica_coleccion` | Técnica de Colección | select | ✓ |
| `materiales_usados` | Materiales Usados | array | ✓ |
| `precauciones` | Precauciones Tomadas | textarea | ✓ |

---

###### 📦 Embalaje y Rotulación

**Descripción:** Acondicionamiento seguro con identificación clara

**Principios Fundamentales:**
```
✓ Un evidencia = Un embalaje
✓ Evitar contaminación cruzada
✓ Material compatible con la evidencia
✓ Sello inviolable
```

**Campos de Etiqueta:**

| Campo ID | Label | Tipo | Patrón/Notas |
|----------|-------|------|--------------|
| `numero_evidencia` | Número de Evidencia | text | EVD-[YYYY]-[NNNN] |
| `descripcion_evidencia` | Descripción | textarea | - |
| `marca` | Marca | text | Opcional |
| `modelo` | Modelo | text | Opcional |
| `serie` | Número de Serie | text | Opcional |
| `color` | Color | text | Opcional |
| `peso` | Peso/Medida | text | Opcional |
| `fecha_hora_embalaje` | Fecha y Hora | datetime-local | ✓ |
| `remitente` | Remitente | text | ✓ |
| `cargo_remitente` | Cargo | text | ✓ |
| `firma_remitente` | Firma Digital | signature | ✓ |

**Tipos de Embalaje:**

| Tipo | Aplicación |
|------|------------|
| Bolsa de papel | Documentos, ropa seca |
| Bolsa plástica | Objetos no biológicos |
| Sobre de evidencia | Pequeñas muestras |
| Caja de cartón | Objetos frágiles |
| Contenedor estéril | Muestras biológicas |
| Frasco de vidrio | Líquidos, tóxicos |

---

###### 📋 Registro en Planilla de Cadena de Custodia

**Descripción:** Documentación oficial del inicio de la cadena  
**Documento Legal:** ✅ Sí

**Campos del Encabezado:**

| Campo ID | Label | Tipo | Ejemplo/Notas |
|----------|-------|------|---------------|
| `numero_actuacion` | Número de Actuación/NRO de Caso | text | MP-2024-001234 |
| `fecha_inicio` | Fecha de Inicio | date | ✓ |
| `hora_inicio` | Hora de Inicio | time | ✓ |
| `lugar_hechos` | Lugar de los Hechos | textarea | ✓ |
| `naturaleza_hecho` | Naturaleza del Hecho | select | Homicidio, Robo, Droga, etc. |

**Datos del Organismo:**

| Campo ID | Label | Tipo |
|----------|-------|------|
| `organismo_remitente` | Organismo Remitente | text |
| `direccion_organismo` | Dirección del Organismo | textarea |
| `telefono` | Teléfono | tel |

**Datos del Funcionario Actuante:**

| Campo ID | Label | Tipo |
|----------|-------|------|
| `nombre_funcionario` | Nombre y Apellido | text |
| `cedula_funcionario` | Cédula de Identidad | text |
| `cargo_funcionario` | Cargo | text |
| `correo_funcionario` | Correo Electrónico | email |

**Tabla de Evidencias (Múltiples Registros):**

| Columna | Label | Ancho |
|---------|-------|-------|
| `numero` | N° | w-16 |
| `descripcion` | Descripción Detallada | w-64 |
| `cantidad` | Cant. | w-16 |
| `caracteristicas` | Características | w-80 |
| `peso_medida` | Peso/Medida | w-24 |
| `tipo_embalaje` | Tipo de Embalaje | w-32 |
| `precinto` | Precinto/Sello | w-24 |
| `observaciones` | Observaciones | w-48 |

**Firmas Iniciales:**
- ✓ Firma del Funcionario Actuante (signature)
- ✓ Firma de Testigo Presencial (signature, cuando aplique)

**Validaciones:**
```
✓ Todos los campos obligatorios deben estar completos
✓ Las firmas deben ser digitales certificadas
✓ El número de actuación debe ser único
✓ La hora debe ser coherente con la secuencia de eventos
```

---

###### 🚚 Traslado Inicial

**Descripción:** Transporte seguro manteniendo integridad

**Requisitos:**
```
✓ Vehículo oficial acondicionado
✓ Funcionario armado si aplica
✓ Evidencias aseguradas contra movimiento
✓ Ruta registrada
```

**Campos del Formulario:**

| Campo ID | Label | Tipo |
|----------|-------|------|
| `fecha_hora_salida` | Fecha y Hora de Salida | datetime-local |
| `origen` | Lugar de Origen | text |
| `destino` | Lugar de Destino | select |
| `funcionario_traslado` | Funcionario Responsable | text |
| `vehiculo` | Vehículo/Placa | text |
| `kilometraje` | Kilometraje | number |
| `ruta_utilizada` | Ruta Utilizada | textarea |
| `incidentes` | Incidentes en el Trayecto | textarea |

*Opciones de destino:* Área de Resguardo, Laboratorio de Criminalística, Fiscalía

---

#### 2️⃣ Obtención por Aseguramiento

**Escenarios:** Allanamientos, Decomisos, Presentaciones personales

| Procedimiento | Descripción | Métodos/Requisitos |
|---------------|-------------|-------------------|
| **Búsqueda** | Localización sistemática | Espiral, Cuadrícula, Zonas, Lineal |
| **Posesión** | Toma de control legal | Orden judicial, Flagrancia, Consentimiento |

---

#### 3️⃣ Obtención por Consignación

**Escenarios:** Entrega voluntaria, Remisión de otros organismos

##### Recepción

**Descripción:** Verificación y aceptación de evidencias consignadas

**Pasos:**
```
1. Verificar documentación de acompañamiento
2. Inspeccionar estado de embalajes
3. Confirmar sellos intactos
4. Generar acta de recepción
```

---

#### 4️⃣ Obtención por Derivación

**Escenarios:** Solicitud de peritaje específico, Reenvío entre laboratorios

---

## 🔬 Fase 2: Fase de Laboratorio

### 🎯 Descripción General

| Propiedad | Valor |
|-----------|-------|
| **ID** | `fase_laboratorio` |
| **Nombre** | FASE DE LABORATORIO |
| **Icono** | `microscope` |
| **Color** | Purple |
| **Descripción** | Análisis pericial de las evidencias |

### Procedimientos de Laboratorio

#### 📥 Recepción en Laboratorio

**Descripción:** Verificación de condiciones de llegada  
**Responsable:** Jefe de Laboratorio / Recepcionista

**Pasos:**
```
1. Verificar correspondencia con solicitud
2. Inspeccionar integridad de sellos
3. Confirmar cadena de custodia previa
4. Asignar número de laboratorio
```

**Campos del Formulario:**

| Campo ID | Label | Tipo | Patrón/Notas |
|----------|-------|------|--------------|
| `numero_lab` | Número de Laboratorio | text | LAB-[YYYY]-[NNNN] |
| `fecha_recepcion` | Fecha de Recepción | date | ✓ |
| `hora_recepcion` | Hora de Recepción | time | ✓ |
| `estado_sellos` | Estado de Sellos | select | Intactos, Dañados, Ausentes |
| `observaciones_recepcion` | Observaciones | textarea | Opcional |
| `recibido_por` | Recibido Por | text | ✓ |

---

#### 👨‍⚕️ Designación de Perito

**Descripción:** Asignación de especialista según tipo de evidencia  
**Responsable:** Director de Laboratorio

**Especialidades Disponibles:**
- 🔫 Balística
- 🧬 Biología Forense
- 🧪 Química Forense
- 📄 Documentoscopía
- 💻 Informática Forense
- 👆 Dactiloscopia
- 📸 Fotografía Forense

**Campos del Formulario:**

| Campo ID | Label | Tipo |
|----------|-------|------|
| `perito_designado` | Perito Designado | text |
| `especialidad` | Especialidad | select |
| `fecha_designacion` | Fecha de Designación | date |
| `numero_expediente` | Número de Expediente | text |

---

#### 🔍 Peritaje

**Descripción:** Análisis técnico-científico de la evidencia  
**Responsable:** Perito Especialista

**Etapas del Peritaje:**

```
┌─────────────────┐
│ 1. Valoración   │  Apreciar contexto y planificar técnicas
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. Descripción  │  Detallar características de la evidencia
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. Análisis     │  Aplicar métodos y técnicas
└────────┬────────┘
         ▼
┌─────────────────┐
│ 4. Interpretación│  Evaluar datos resultantes
└────────┬────────┘
         ▼
┌─────────────────┐
│ 5. Conclusión   │  Juicio de valor técnico-científico
└─────────────────┘
```

**Herramientas Forenses:**
- Andriller: Extracción lógica y física
- ALEAPP: Parseo de SQLite y Protobuf

---

#### 📤 Remisión del Laboratorio

**Descripción:** Devolución de evidencia al organismo solicitante

**Acciones:**
```
1. Entregar dictamen pericial
2. Remitir evidencias y PRCC
3. Acotar remisión en PRCC
```

---

## ⚖️ Fase 3: Disposición Judicial

### 🎯 Descripción General

| Propiedad | Valor |
|-----------|-------|
| **ID** | `fase_disposicion_judicial` |
| **Nombre** | FASE DE DISPOSICIÓN JUDICIAL |
| **Icono** | `gavel` |
| **Color** | Amber |
| **Descripción** | La evidencia pasa a disposición del Poder Judicial |

### Procesos

| Proceso | Descripción | Documento Asociado |
|---------|-------------|-------------------|
| **Resguardo Judicial** | Almacenamiento en áreas especializadas del Poder Judicial | - |
| **Exhibición en Audiencia** | Presentación en sala cumpliendo procedimiento de traslado | Acta de Exhibición de Evidencias |

---

## 🏁 Fase 4: Disposición Final

### 🎯 Descripción General

| Propiedad | Valor |
|-----------|-------|
| **ID** | `fase_disposicion_final` |
| **Nombre** | FASE DE DISPOSICIÓN FINAL - CIERRE |
| **Icono** | `check-circle` |
| **Color** | Green |
| **Descripción** | Fase final que pone fin al tratamiento de las evidencias |

### Formas de Cierre

| Tipo | Descripción | Requisito |
|------|-------------|-----------|
| **Devolución** | Restituir a quien tenga legítimo derecho | Autorización judicial |
| **Entrega** | Otorgar a persona jurídica autorizada | Autorización judicial |
| **Destrucción** | Inutilizar evidencia sin interés | Autorización judicial |
| **Consumida en Peritaje** | Agotada durante análisis | - |

### Procedimientos Finales

```
1. Ejecución: Materializar devolución, entrega o destrucción
2. Cierre de PRCC: Dejar constancia en observaciones y remitir al expediente
```

**Documento Asociado:** Acta de Disposición Final de Evidencias

---

## 🔄 Figuras de Carácter Continuo

> Procesos que se cumplen en cualquier fase del sistema

### 🏦 Proceso de Resguardo

**Definición:** Protección y conservación en espacios especializados

**Etapas:**

| Etapa | Descripción |
|-------|-------------|
| **Ingreso** | Verificar PRCC, identidad, condiciones de la evidencia |
| **Depósito** | Almacenamiento bajo condiciones óptimas |
| **Egreso** | Disposición expresa y por escrito del Fiscal o Tribunal |

**Lineamientos:**
```
✓ Solo personal autorizado
✓ Control de temperatura, humedad, seguridad
✓ Inventario periódico (máximo un año)
```

---

### 🚚 Procedimiento de Traslado

**Lineamientos:**
```
✓ Verificar condiciones de evidencia y embalaje
✓ Seleccionar medio que minimice riesgos
✓ Asentar datos en PRCC
```

---

### 🔄 Actividad de Transferencia

**Lineamientos:**
```
✓ Verificar condiciones físicas y precintos
✓ Verificar PRCC con rotulado
✓ Asentar datos de quien entrega y recibe
```

---

## 📄 Documentos Asociados

| Documento | Tipo |
|-----------|------|
| Acta Policial | Legal |
| Acta de Investigación Penal | Legal |
| Acta de Obtención Técnica | Técnico |
| Acta de Obtención por Aseguramiento | Legal |
| **Acta de Obtención por Consignación** | Legal (Prioridad) |
| Acta de Obtención por Derivación | Técnico |
| Acta de Disposición Final | Legal |
| Acta de Levantamiento de Cadáver | Legal |
| Acta de Inspección | Legal |
| Acta Pericial | Técnico |
| **Planilla de Registro de Cadena de Custodia (PRCC)** | Legal/Técnico |
| Dictamen Pericial | Técnico |
| Memorandos y Oficios | Administrativo |

---

## 🎨 Principios Fluent Design Aplicados

### Luz
- Sombras elevadas para tarjetas de procedimientos
- Bordes sutiles en formularios
- Indicadores de estado iluminados

### Profundidad
- Capas jerárquicas: Fases → Procedimientos → Pasos
- Efectos de elevación en cards de evidencia
- Superposiciones suaves en modales

### Movimiento
- Transiciones fluidas entre fases
- Animaciones de progreso en tiempo real
- Micro-interacciones en botones de acción

### Material
- Superficies diferenciadas por tipo de contenido
- Bordes redondeados consistentes (8px)
- Texturas sutiles en fondos de sección

### Escala
- Tipografía jerárquica clara (H1-H6)
- Espaciado basado en grid de 8px
- Iconos proporcionales (24px, 32px, 48px)

---

## 📊 Resumen Visual del Flujo Completo

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         CADENA DE CUSTODIA COMPLETA                       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FASE INICIAL                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Protección  │→ │ Observación │→ │  Fijación   │→ │  Colección  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│       ↓                  ↓                ↓                ↓            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                      │
│  │  Embalaje   │→ │   PRCC      │→ │  Traslado   │                      │
│  └─────────────┘  └─────────────┘  └─────────────┘                      │
│                            ↓                                             │
│  FASE LABORATORIO                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Recepción   │→ │ Designación │→ │  Peritaje   │→ │  Remisión   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│                            ↓                                             │
│  FASE DISPOSICIÓN JUDICIAL                                               │
│  ┌─────────────┐  ┌─────────────┐                                        │
│  │  Resguardo  │→ │ Exhibición  │                                        │
│  └─────────────┘  └─────────────┘                                        │
│                            ↓                                             │
│  FASE DISPOSICIÓN FINAL                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Devolución  │  │  Entrega    │  │ Destrucción │  │  Consumo    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

*Documento generado siguiendo principios de Fluent Design System para consistencia visual y experiencia de usuario moderna.*
