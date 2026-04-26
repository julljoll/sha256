# 📋 Manual Único de Cadena de Custodia - Procedimientos

> **Procedimiento para extracción y análisis de dispositivos Android (WhatsApp) siguiendo el Manual de Cadena de Custodia Venezolano**

---

## 📖 Información General

| Propiedad | Valor |
|-----------|-------|
| **Título** | Manual Único de Cadena de Custodia de Evidencias Físicas |
| **Descripción** | Procedimiento para extracción y análisis de dispositivos Android (WhatsApp) |
| **Base Legal** | Manual Único de Cadena de Custodia Venezolano (2017) |

---

## 🗺️ Mapa del Proceso Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROCESO FORENSE ANDROID - WHATSAPP                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │FASE INICIAL  │ → │FASE          │ → │FASE          │ → │FASE          │ │
│  │              │   │LABORATORIO   │   │DISPOSICIÓN   │   │DISPOSICIÓN   │ │
│  │Obtención     │   │Peritaje      │   │JUDICIAL      │   │FINAL         │ │
│  │              │   │              │   │              │   │              │ │
│  │• Consignación│   │• Recepción   │   │• Resguardo   │   │• Devolución  │ │
│  │• Fijación    │   │• Análisis    │   │• Exhibición  │   │• Destrucción │ │
│  │• PRCC        │   │• Dictamen    │   │              │   │• Cierre      │ │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📍 Fase 1: Fase Inicial - Obtención

### Definición
Fase donde se obtienen las evidencias físicas para iniciar la cadena de custodia.

### Formas de Obtención

#### 1️⃣ Obtención por Consignación ⭐ PRIORIDAD

> **Definición:** Cuando el propietario o poseedor entrega voluntariamente la evidencia al organismo de investigación.

**Escenarios Comunes:**
- 📱 Entrega voluntaria del dispositivo móvil
- 💾 Consignación de evidencia digital por ciudadanos

##### Procedimiento de Recepción

**Pasos Detallados:**

| # | Paso | Descripción |
|---|------|-------------|
| 1 | **Verificar Identidad** | Solicitar cédula de identidad de quien consigna |
| 2 | **Documentar Motivo** | Registrar motivo de la consignación |
| 3 | **Registrar Dispositivo** | Documentar marca, modelo, IMEI, IMEI2, número telefónico |
| 4 | **Verificar Estado** | Inspeccionar estado físico del dispositivo |

##### Procedimiento de Fijación

**Medios de Fijación:**
```
📝 Fijación escrita: Acta de Obtención por Consignación
📸 Fijación fotográfica: estado del dispositivo, IMEI, pantalla, puertos
```

**Datos a Registrar:**

| Dato | Descripción |
|------|-------------|
| Marca y modelo | Fabricante y modelo específico |
| IMEI y IMEI2 | Códigos de 15 dígitos (dual SIM) |
| Número de teléfono/línea | Número asociado al dispositivo |
| Estado de la batería | Porcentaje o condición |
| Daños físicos | Golpes, rayones, roturas |
| Estado de pantalla | Encendido/apagado |

---

#### 2️⃣ Obtención Técnica

> **Definición:** Cuando el personal especializado acude al sitio del suceso o lugar de ubicación de la evidencia.

**Procedimientos:**

| Paso | Acción | Descripción |
|------|--------|-------------|
| 1 | **Protección** | Aislar dispositivo (Modo Avión o Bolsa Faraday) |
| 2 | **Observación Preliminar** | Verificar estado del dispositivo |
| 3 | **Fijación** | Fotografías y actas |
| 4 | **Colección** | Uso de write-blockers y extracción con Andriller |
| 5 | **Embalaje y Rotulación** | Protección e identificación |
| 6 | **Registro en PRCC** | Documentación oficial |
| 7 | **Traslado** | Transporte seguro al laboratorio |

**Cálculo de Hash:**
```
✓ Calcular MD5 o SHA-256
✓ Garantizar inalterabilidad
✓ Documentar valores en PRCC
```

---

#### 3️⃣ Obtención por Aseguramiento

> **Definición:** Cuando se requiere asegurar evidencias en poder de terceros mediante procedimientos legales.

**Requisitos Legales:**
- Orden judicial
- Flagrancia
- Consentimiento

---

#### 4️⃣ Obtención por Derivación

> **Definición:** Cuando del análisis de una evidencia principal se obtiene una nueva evidencia.

**Tipos:**

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Por Separación** | Diferente naturaleza a la evidencia principal | Extraer SIM del teléfono |
| **Por Segmentación** | División de la evidencia principal | Dividir imagen forense |
| **Por Seleccion** | Discriminación para peritaje especializado | Seleccionar solo WhatsApp |

---

## 🔬 Fase 2: Fase de Laboratorio - Peritación

### Definición
Fase intermedia destinada a la peritación de evidencias previamente obtenidas.

### Proceso de Peritación

#### Paso 1: Recepción en Laboratorio

**Acciones:**
```
✓ Verificar precintos de seguridad
✓ Recalcular Hash para confirmar integridad
✓ Cotejar PRCC con el embalaje
✓ Verificar correspondencia con oficio de remisión
```

**Norma Aplicable:** ISO/IEC 27042:2015

---

#### Paso 2: Designación

**Acciones:**
```
✓ Registrar en sistema manual o automatizado
✓ Asignar perito responsable
✓ Firmar controles y PRCC
```

---

#### Paso 3: Peritaje

**Etapas del Peritaje:**

```
┌─────────────────────────────────────────────────────────────┐
│                    ETAPAS DEL PERITAJE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. VALORACIÓN                                              │
│     Apreciar contexto y planificar técnicas                 │
│                          ↓                                  │
│  2. DESCRIPCIÓN                                             │
│     Detallar características de la evidencia                │
│                          ↓                                  │
│  3. ANÁLISIS                                                │
│     Aplicar métodos y técnicas (ALEAPP y Andriller)         │
│                          ↓                                  │
│  4. INTERPRETACIÓN                                          │
│     Evaluar datos resultantes                               │
│                          ↓                                  │
│  5. CONCLUSIÓN                                              │
│     Juicio de valor técnico-científico                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Herramientas Utilizadas:**

| Herramienta | Versión | Función |
|-------------|---------|---------|
| **Andriller** | v3.6.2+ | Extracción lógica y física |
| **ALEAPP** | v2.1.0+ | Parseo de SQLite y Protobuf |

---

#### Paso 4: Remisión

**Acciones:**
```
✓ Entregar dictamen pericial
✓ Remitir evidencias y PRCC al despacho solicitante
✓ Acotar en PRCC la remisión
```

---

## ⚖️ Fase 3: Fase de Disposición Judicial

### Definición
Momento en que la evidencia pasa a disposición del Poder Judicial tras admitirse la acusación.

### Procesos

| Proceso | Descripción |
|---------|-------------|
| **Resguardo Judicial** | En áreas especializadas del Poder Judicial |
| **Exhibición en Audiencia** | Cumplir procedimiento de traslado y transferencia |

**Documento Asociado:** Acta de Exhibición de Evidencias

---

## 🏁 Fase 4: Fase de Disposición Final - Cierre

### Definición
Fase final que pone fin al tratamiento de las evidencias.

### Formas de Cierre

| Forma | Descripción | Requisito |
|-------|-------------|-----------|
| **Devolución** | Restituir a quien tenga legítimo derecho | Autorización judicial |
| **Entrega** | Otorgar a persona jurídica autorizada | Autorización judicial |
| **Destrucción** | Inutilizar evidencia sin interés | Autorización judicial |
| **Consumida en Peritaje** | Agotada durante análisis | - |

### Procedimientos

```
1. EJECUCIÓN
   Materializar devolución, entrega o destrucción
   
2. CIERRE DE PRCC
   Dejar constancia en observaciones y remitir al expediente
```

**Documento Asociado:** Acta de Disposición Final de Evidencias

---

## 🔄 Figuras de Carácter Continuo

> Procesos y procedimientos que se cumplen en cualquier fase del sistema.

### 🏦 Proceso de Resguardo

**Definición:** Protección y conservación en espacios especializados.

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

| Documento | Tipo | Fase |
|-----------|------|------|
| Acta Policial | Legal | Inicial |
| Acta de Investigación Penal | Legal | Inicial |
| Acta de Obtención Técnica | Técnico | Inicial |
| Acta de Obtención por Aseguramiento | Legal | Inicial |
| **Acta de Obtención por Consignación** | Legal | Inicial (Prioridad) |
| Acta de Obtención por Derivación | Técnico | Inicial |
| Acta de Disposición Final | Legal | Final |
| Acta de Levantamiento de Cadáver | Legal | Inicial |
| Acta de Inspección | Legal | Inicial |
| Acta Pericial | Técnico | Laboratorio |
| **Planilla de Registro de Cadena de Custodia (PRCC)** | Legal/Técnico | Todas |
| Dictamen Pericial | Técnico | Laboratorio |
| Memorandos y Oficios | Administrativo | Todas |

---

## 📝 Estructura del Dictamen Pericial

### Estructura Obligatoria

| Sección | Contenido | Ejemplo |
|---------|-----------|---------|
| **1. Motivo** | Razón por la cual se practica la peritación | "Por oficio N° XYZ del Ministerio Público..." |
| **2. Descripción** | Estado en que se halló y recibió la evidencia | Marca, modelo, IMEI, estado físico |
| **3. Exámenes Practicados** | Detalle de softwares, técnicas y valores Hash | Andriller v3.6.2, ALEAPP v2.1.0, Hash SHA-256 |
| **4. Resultados** | Tabla con hallazgos del análisis | Nombre nativo, fechas, ruta, tamaño, Hash |
| **5. Conclusiones** | Juicio de valor técnico-científico | Sin precalificación jurídica |
| **6. Consumo de Evidencia** | Constancia si fue consumida o alterada | "La evidencia NO fue alterada" |

### Formalidades

```
✓ Presentación por escrito
✓ Firma del Perito Informático
✓ Sello del perito
✓ Versión exacta de herramientas usadas
```

---

## ⚖️ Marco Legal Venezolano

### Constitución Nacional

| Principio | Artículo |
|-----------|----------|
| Debido proceso | Art. 49 |
| Tutela judicial efectiva | Art. 26 |
| Privacidad de las comunicaciones | Art. 48 |

### Leyes Aplicables

#### COPP (Código Orgánico Procesal Penal)

| Artículo | Disposición |
|----------|-------------|
| Art. 188 | Resguardo de evidencias |
| - | Régimen de licitud de la prueba |
| - | Obligatoriedad de cadena de custodia |

#### Ley Especial contra Delitos Informáticos (2001)

> Tipifica delitos cibernéticos

#### Ley de Infogobierno

> Validez y seguridad de tecnologías de información

#### Ley sobre Mensajes de Datos y Firmas Electrónicas

| Artículo | Disposición |
|----------|-------------|
| Art. 4 y 8 | Eficacia probatoria de mensajes de datos |
| - | Misma eficacia que documento escrito |

---

## 📐 Estándares Internacionales

| Norma | Título | Aplicación |
|-------|--------|------------|
| **ISO/IEC 27037:2012** | Guidelines for identification, collection, acquisition, and preservation of digital evidence | Obtención y preservación |
| **ISO/IEC 27042:2015** | Guidelines for the analysis and interpretation of digital evidence | Análisis e interpretación |
| **NIST SP 800-101 r1** | Guide on Mobile Device Forensics | Forensia de dispositivos móviles |

---

## 🛠️ Herramientas Forenses Autorizadas

### Andriller

| Propiedad | Valor |
|-----------|-------|
| **Uso** | Extracción lógica y física en dispositivos Android |
| **Características** | Solo lectura (no destructivo), Forensemente sólido |
| **Versión** | Documentar versión exacta usada (v3.6.2+) |

### ALEAPP

| Propiedad | Valor |
|-----------|-------|
| **Uso** | Android Logs Events And Protobuf Parser |
| **Función** | Parseo de SQLite, Protobuf, reconstrucción de eventos WhatsApp |
| **Versión** | Documentar versión exacta usada (v2.1.0+) |

---

## 🎨 Principios Fluent Design Aplicados

### Luz
- Indicadores de estado iluminados para cada fase
- Sombras sutiles en tarjetas de procedimientos
- Bordes resaltados en elementos activos

### Profundidad
- Capas visuales: Fases → Procedimientos → Pasos
- Efectos de elevación en cards de documentos
- Superposiciones en modales de detalle

### Movimiento
- Transiciones fluidas entre fases del proceso
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

## 📊 Resumen Visual del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO COMPLETO WHATSAPP                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CONSIGNACIÓN                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Identidad │→ │Motivo    │→ │Dispositivo│→ │PRCC      │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                            ↓                                    │
│  LABORATORIO                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Recepción │→ │Andriller │→ │ALEAPP    │→ │Dictamen  │       │
│  │(Hash)    │  │(Extraer) │  │(Analizar)│  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                            ↓                                    │
│  DISPOSICIÓN                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │Resguardo │→ │Exhibición│→ │Cierre    │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

*Documento generado siguiendo principios de Fluent Design System para consistencia visual y experiencia de usuario moderna.*
