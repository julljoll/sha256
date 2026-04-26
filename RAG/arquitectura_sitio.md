# 🏛️ Arquitectura del Sitio Web - Portal de Informática Forense

> **Recurso integral sobre informática forense, delitos informáticos y marco legal venezolano**

---

## 📋 Información General

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | Portal de Informática Forense |
| **Descripción** | Recurso integral sobre informática forense, delitos informáticos y marco legal venezolano |
| **Idioma** | Español (es) |

### 🎨 Sistema de Diseño - Fluent Design

```yaml
Tema Visual:
  • Color Primario:   #1a5f7a  ▰▰▰▰▰▰▰▰ Azul profundo profesional
  • Color Secundario: #159895  ▰▰▰▰▰▰▰▰ Turquesa moderno
  • Color Acento:     #57c5b6  ▰▰▰▰▰▰▰▰ Verde agua vibrante
  • Fondo:            #f8f9fa  ▰▰▰▰▰▰▰▰ Gris claro neutro
  • Texto:            #212529  ▰▰▰▰▰▰▰▰ Gris oscuro legible
```

---

## 🧭 Estructura de Navegación Principal

### Menú Principal

#### 🏠 Inicio
- **Ruta:** `/`
- **Icono:** `home`

#### ⚖️ Marco Legal
- **Ruta:** `/marco-legal/`
- **Icono:** `scale`

**Subsecciones:**
| ID | Título | Ruta |
|----|--------|------|
| constitucion | Constitución Nacional | `/marco-legal/constitucion/` |
| ley_infogobierno | Ley de Infogobierno | `/marco-legal/infogobierno/` |
| ley_delitos_informaticos | Ley Especial de Delitos Informáticos | `/marco-legal/delitos-informaticos/` |
| ley_mensajes_datos | Ley de Mensajes de Datos y Firmas Electrónicas | `/marco-legal/mensajes-datos/` |
| codigo_penal | Código Penal | `/marco-legal/codigo-penal/` |
| copp | Código Orgánico Procesal Penal | `/marco-legal/copp/` |
| creacion_cenif | Creación del CENIF | `/marco-legal/cenif/` |

#### 📋 Normas Técnicas
- **Ruta:** `/normas-tecnicas/`
- **Icono:** `clipboard-check`

**Subsecciones:**
| ID | Título | Ruta | Descripción |
|----|--------|------|-------------|
| iso_27037 | ISO/IEC 27037:2012 | `/normas-tecnicas/iso-27037/` | Identificación, colección, adquisición y preservación de evidencia digital |
| iso_27042 | ISO/IEC 27042:2015 | `/normas-tecnicas/iso-27042/` | Análisis e interpretación de evidencia digital |
| nist_800_101 | NIST SP 800-101 | `/normas-tecnicas/nist-800-101/` | Guía de forense en dispositivos móviles |
| acpo_guide | ACPO Good Practice Guide | `/normas-tecnicas/acpo/` | Guía de buenas prácticas para evidencia digital |

#### 📄 Peritaje Informático
- **Ruta:** `/peritaje/`
- **Icono:** `file-text`

**Subsecciones:**
- Conceptos Básicos → `/peritaje/conceptos/`
- Evidencia Digital → `/peritaje/evidencia-digital/`
- Casos Prácticos → `/peritaje/casos-practicos/`
- Informes Periciales → `/peritaje/informes/`

#### 🔗 Cadena de Custodia
- **Ruta:** `/cadena-custodia/`
- **Icono:** `link`

**Subsecciones:**
- Manual Único de Cadena de Custodia → `/cadena-custodia/manual/`
- Procedimientos → `/cadena-custodia/procedimientos/`
- Formatos y Plantillas → `/cadena-custodia/formatos/`

#### 👥 Criminología
- **Ruta:** `/criminologia/`
- **Icono:** `users`

**Subsecciones:**
- La Criminología como Ciencia Dinámica → `/criminologia/ciencia-dinamica/`
- Tipos de Delitos Informáticos → `/criminologia/tipos-delitos/`

#### 🌐 Economía Digital
- **Ruta:** `/economia-digital/`
- **Icono:** `globe`

**Subsecciones:**
- Normalización en Economía Digital → `/economia-digital/normalizacion/`
- Áreas Clave de Normalización → `/economia-digital/areas-clave/`

#### 📥 Recursos
- **Ruta:** `/recursos/`
- **Icono:** `download`

**Subsecciones:**
- Biblioteca Documental → `/recursos/biblioteca/`
- Glosario de Términos → `/recursos/glosario/`
- Enlaces de Interés → `/recursos/enlaces/`

---

## 📄 Páginas Principales

### 🏡 Página de Inicio (`homepage.html`)

#### Sección Hero
```
┌─────────────────────────────────────────────────────┐
│  INFORMÁTICA FORENSE Y DELITOS INFORMÁTICOS         │
│                                                     │
│  Portal integral de referencia sobre investigación  │
│  forense digital y marco legal venezolano           │
│                                                     │
│  [ Explorar Recursos ]                              │
└─────────────────────────────────────────────────────┘
```

#### Temas Destacados

| Tema | Icono | Descripción | Enlace |
|------|-------|-------------|--------|
| 📚 Marco Legal Venezolano | `book` | Conoce las leyes que regulan los delitos informáticos en Venezuela | `/marco-legal/` |
| 🏆 Normas ISO | `certificate` | Estándares internacionales para el manejo de evidencia digital | `/normas-tecnicas/` |
| 🛡️ Cadena de Custodia | `shield` | Procedimientos para garantizar la integridad de la evidencia | `/cadena-custodia/` |
| 🔍 Peritaje Informático | `search` | Metodologías y técnicas de investigación forense | `/peritaje/` |

#### Documentos Recientes
- **Fuente:** Biblioteca documental
- **Límite:** 6 documentos

#### Estadísticas del Portal

| Métrica | Valor |
|---------|-------|
| 📜 Documentos Legales | **8** |
| 📐 Normas Técnicas | **4** |
| 📖 Guías y Manuales | **4** |

#### Newsletter
> **Suscríbete**  
> Recibe actualizaciones sobre normativa y mejores prácticas

---

### ⚖️ Marco Legal Landing (`category-landing.html`)

#### Encabezado
**Marco Legal Venezolano**  
Compilación completa de la legislación venezolana relacionada con informática, delitos digitales y procesos penales

#### Grid de Documentos

| Documento | Año | Tipo | Relevancia |
|-----------|-----|------|------------|
| 📜 Constitución de la República Bolivariana de Venezuela | 1999 | Constitución | Base fundamental del ordenamiento jurídico |
| 💻 Ley de Infogobierno | 2013 | Ley | Uso de tecnologías de información en el Poder Público |
| ⚠️ Ley Especial Contra los Delitos Informáticos | 2001 | Ley Especial | Tipificación de delitos informáticos |
| ✉️ Ley sobre Mensajes de Datos y Firmas Electrónicas | 2001 | Ley | Validez jurídica de documentos electrónicos |
| ⚖️ Código Penal de Venezuela | 2000 | Código | Disposiciones penales generales |
| 📋 Código Orgánico Procesal Penal | Actualizado | Código Procesal | Procedimiento penal aplicable |
| 🏢 Creación del CENIF | 2012 | Decreto | Centro Nacional de Informática Forense |

---

### 📐 Norma ISO/IEC 27037:2012 (`standard-detail.html`)

#### Metadatos
| Campo | Valor |
|-------|-------|
| **Número** | ISO/IEC 27037:2012 |
| **Título** | Guidelines for identification, collection, acquisition, and preservation of digital evidence |
| **Organización** | ISO/IEC |
| **Año** | 2012 |
| **Categoría** | Seguridad de la Información |

#### Descripción General
Esta norma proporciona directrices para las actividades específicas de identificación, colección, adquisición y preservación de evidencia digital.

#### Principios Clave
```
✓ Minimizar el manejo de evidencia digital original
✓ Personal competente debe realizar todas las acciones
✓ Auditoría completa de todo el proceso
✓ Preservar la integridad de la evidencia
```

#### Flujo del Proceso
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Identificación│ →  │   Colección  │ →  │  Adquisición │ →  │ Preservación │
│   de Evidencia│    │   de Evidencia│    │    Forense   │    │  y Almacen.  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

#### Normas Relacionadas
- ISO/IEC 27042:2015
- NIST SP 800-101

---

### 📐 Norma ISO/IEC 27042:2015 (`standard-detail.html`)

#### Metadatos
| Campo | Valor |
|-------|-------|
| **Número** | ISO/IEC 27042:2015 |
| **Título** | Guidelines for the analysis and interpretation of digital evidence |
| **Organización** | ISO/IEC |
| **Año** | 2015 |
| **Categoría** | Seguridad de la Información |

#### Fases del Análisis
```
┌────────────────────┐
│ 1. Preparación     │
│    del Análisis    │
└─────────┬──────────┘
          ▼
┌────────────────────┐
│ 2. Examen de la    │
│    Evidencia       │
└─────────┬──────────┘
          ▼
┌────────────────────┐
│ 3. Análisis de     │
│    Datos           │
└─────────┬──────────┘
          ▼
┌────────────────────┐
│ 4. Interpretación  │
│    de Resultados   │
└────────────────────┘
```

#### Documentación Requerida
- ✓ Registro de todas las acciones realizadas
- ✓ Herramientas utilizadas y su validación
- ✓ Resultados obtenidos
- ✓ Conclusiones del análisis

---

### 📄 Conceptos Básicos de Peritaje Informático (`content-page.html`)

#### Metadatos
| Campo | Valor |
|-------|-------|
| **Título** | Conceptos Básicos de Peritaje Informático |
| **Autor** | Jeimy José Cano Martínez |
| **Fuente** | El Peritaje Informático y la Evidencia Digital en Colombia |

#### Introducción al Peritaje Informático
El peritaje informático es el proceso mediante el cual un experto en tecnología de la información analiza evidencia digital para proporcionar testimonio especializado en procesos judiciales.

#### Definiciones Fundamentales

| Término | Definición |
|---------|------------|
| **Perito Informático** | Profesional con conocimientos especializados en tecnología que auxilia al juez en la comprensión de aspectos técnicos |
| **Evidencia Digital** | Información almacenada o transmitida en formato digital que puede ser utilizada en un proceso legal |
| **Cadena de Custodia** | Procedimiento documentado que garantiza la integridad de la evidencia desde su hallazgo hasta su presentación en juicio |

#### Competencias del Perito
```
✓ Conocimientos técnicos en informática forense
✓ Dominio de normas ISO relacionadas
✓ Comprensión del marco legal aplicable
✓ Capacidad de redacción de informes técnicos
✓ Ética profesional e imparcialidad
```

---

### 🔗 Manual Único de Cadena de Custodia (`manual-page.html`)

#### Metadatos
| Campo | Valor |
|-------|-------|
| **Título** | Manual Único de Cadena de Custodia de Evidencias |
| **Versión** | Versión Final 29SEP17 |
| **Tipo** | Manual Oficial |

#### Procedimientos de Cadena de Custodia

| # | Paso | Descripción |
|---|------|-------------|
| 1 | **Identificación y recolección** | Localización y aseguramiento inicial de la evidencia |
| 2 | **Embalaje y etiquetado** | Protección física e identificación única de la evidencia |
| 3 | **Transporte seguro** | Traslado manteniendo las condiciones de integridad |
| 4 | **Almacenamiento controlado** | Guardado en instalaciones seguras con acceso restringido |
| 5 | **Transferencias documentadas** | Cada cambio de custodia debe quedar registrado |

#### Formatos de Registro
- 📋 Acta de recolección de evidencia
- 🔗 Cadena de custodia
- 📝 Solicitud de análisis
- 📤 Informe de transferencia

---

### 👥 La Criminología: Una Ciencia Dinámica (`article-page.html`)

#### Evolución de la Criminología
La criminología ha evolucionado para adaptarse a nuevas formas de criminalidad, incluyendo los delitos informáticos.

#### Aplicación en Delitos Digitales
Análisis de factores causales, prevención y tratamiento de la delincuencia informática.

#### Interdisciplinariedad
Relación con la informática forense, derecho penal y psicología criminal.

---

### 🌐 Normalización en la Economía Digital (`report-page.html`)

#### Las Normas Técnicas en la Economía Digital
Importancia de la normalización para el desarrollo del mercado digital.

#### Áreas de Normalización Clave
```
🔒 Seguridad de la información
🛡️ Protección de datos personales
🛒 Comercio electrónico
🆔 Identidad digital
☁️ Cloud computing
📱 Internet de las cosas (IoT)
```

#### Riesgos de No Participar en Normalización
| Riesgo | Impacto |
|--------|---------|
| Pérdida de competitividad | Alto |
| Incompatibilidad tecnológica | Crítico |
| Vulnerabilidades de seguridad | Crítico |
| Barreras comerciales | Medio |

---

### 📚 Biblioteca Documental (`library.html`)

#### Filtros Disponibles
- **Por Categoría:** Marco Legal, Normas Técnicas, Guías, Manuales, Artículos
- **Por Tipo:** Constitución, Ley, Código, Norma ISO, Guía, Manual
- **Por Año:** 1999 - 2024

---

## 🎨 Principios Fluent Design Aplicados

### Luz
- Sombras sutiles para profundidad
- Bordes iluminados en elementos interactivos
- Transiciones suaves de hover

### Profundidad
- Capas visuales diferenciadas
- Efectos de elevación en cards
- Z-index estratégico

### Movimiento
- Animaciones fluidas entre páginas
- Transiciones de entrada/salida
- Micro-interacciones en botones

### Material
- Texturas sutiles en fondos
- Superficies con diferente elevación
- Bordes redondeados consistentes

### Escala
- Tipografía jerárquica clara
- Espaciado consistente (8px grid)
- Proporciones áureas en layouts

---

*Documento generado siguiendo principios de Fluent Design System para consistencia visual y experiencia de usuario moderna.*
