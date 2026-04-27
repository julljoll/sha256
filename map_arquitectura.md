# Mapa de Arquitectura - Sistema de Cadena de Custodia

## Descripción General

Este documento mapea la arquitectura completa del Sistema de Gestión de Cadena de Custodia de Evidencias, basado en el **Manual Único de Cadena de Custodia de Evidencias Físicas (Venezuela 2017)** y los documentos legales/informáticos asociados.

**Actualización:** Unificación completada - se eliminaron archivos `.md` redundantes y se integró Fluent Design System al YAML maestro.

---

## Estructura de Archivos

```
SHA256.deb/
├── RAG/                              # Base de conocimiento
│   ├── manual_unico_unificado.yaml    # YAML maestro unificado (INCLUYE Fluent Design)
│   ├── arquitectura_cadena_custodia.yaml
│   ├── proceso-desarrollo-forense.yaml
│   ├── manual-procedimiento.yaml
│   ├── arquitectura_sitio.yaml
│   └── *.pdf                         # Documentos fuente (16 PDFs)
│
├── componente/                        # Componentes modulares
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
└── map_arquitectura.md              # Este archivo
```

### Cambios Realizados:
- ✅ **Unificación de archivos .md**: `MANUAL_UNIFICADO.md` creado y luego eliminado (contenido movido a YAML)
- ✅ **Eliminados**: `manual-procedimiento.md`, `IMPLEMENTACION_CADENA_CUSTODIA.md`, `arquitectura_sitio.md`, `IMPLEMENTACION.md`, `arquitectura_cadena_custodia.md`, `proceso-desarrollo-forense.md`, `fluent-design-system.md`, `CAMBIOS_REALIZADOS.md`
- ✅ **Fluen Design integrado**: Ahora en `manual_unico_unificado.yaml` (no archivo separado)
- ✅ **Componentes YAML**: 7 componentes modulares creados

---

## Arquitectura del Sistema

### Jerarquía de Componentes

```
sistema_cadena_custodia (raíz)
├── fluent_design_system (integrado en YAML maestro)
│   ├── typography
│   ├── colors & theme (dark mode)
│   ├── geometry (border_radius)
│   ├── elevation (shadows)
│   ├── motion (transitions 167ms)
│   └── componentes (card, button, input)
│
├── fase_inicial (obtención)
│   ├── OBTENCIÓN TÉCNICA
│   │   ├── Protección
│   │   ├── Observación
│   │   ├── Fijación
│   │   ├── Colección
│   │   ├── Embalaje/Rotulación
│   │   └── Registro PRCC
│   ├── OBTENCIÓN POR ASEGURAMIENTO
│   │   ├── Búsqueda
│   │   └── Posesión
│   ├── OBTENCIÓN POR CONSIGNACIÓN
│   │   ├── Recepción
│   │   └── Fijación
│   └── OBTENCIÓN POR DERIVACIÓN
│
├── fase_laboratorio (peritación)
│   ├── Recepción en Laboratorio
│   ├── Designación de Perito
│   ├── Peritaje
│   │   ├── Valoración
│   │   ├── Descripción
│   │   ├── Análisis (Andriller + ALEAPP)
│   │   ├── Interpretación
│   │   └── Conclusión
│   └── Remisión de Resultados
│
├── fase_disposicion_judicial
│   ├── Resguardo Judicial
│   └── Exhibición en Audiencia
│
├── fase_disposicion_final (cierre)
│   ├── Devolución
│   ├── Entrega
│   ├── Destrucción
│   └── Consumida en Peritaje
│
├── Procesos Continuos
│   ├── Resguardo (Ingreso/Depósito/Egreso)
│   ├── Traslado
│   └── Transferencia
│
└── Herramientas Forenses
    ├── Andriller v3.6.2+
    └── ALEAPP v2.1.0+
```

---

## Flujo de Datos

### Entrada → Proceso → Salida (Teoría General de Sistemas)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   EVIDENCIA     │     │   CADENA DE     │     │   GARANTÍA      │
│   ENTRADA      │ ──► │   CUSTODIA     │ ──► │   LEGAL         │
│                 │     │   (E-P-S)       │     │   SALIDA        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Ciclo de Vida de la Evidencia

```
[OBTENCIÓN] → [RESGUARDO] → [PERITACIÓN] → [JUDICIAL] → [DISPOSICIÓN FINAL]
     │               │              │             │              │
  fase_inicial   resguardo    fase_laboratorio  fase_judicial  fase_final
```

---

## Componentes Detallados

### 1. Fase Inicial - Obtención

| Subcomponente | Descripción | Documentos |
|--------------|-------------|------------|
| Obtención Técnica | Sitio del suicidio, trabajo de campo | Acta de Obtención Técnica |
| Obtención por Aseguramiento | Allanamientos, decomisos | Acta de Aseguramiento |
| Obtención por Consignación ⭐ | Entrega voluntaria | Acta de Consignación |
| Obtención por Derivación | Análisis genera nueva evidencia | Acta de Derivación |

### 2. Fase de Laboratorio

| Subcomponente | Descripción | Documentos |
|--------------|-------------|------------|
| Recepción | Verificación de condiciones | Acta de Recepción |
| Designación | Asignación de perito | Oficio de Designación |
| Peritaje | Análisis técnico-científico | Dictamen Pericial |
| Remisión | Entrega de resultados | Acta de Remisión |

### 3. Fase de Disposición Judicial

| Subcomponente | Descripción | Documentos |
|--------------|-------------|------------|
| Resguardo Judicial | Áreas del Poder Judicial | Registro interno |
| Exhibición | Presentación en tribunal | Acta de Exhibición |

### 4. Fase de Disposición Final

| Tipo | Descripción | Requisito |
|-------|-------------|-----------|
| Devolución | Restitución a dueño legítimo | Orden judicial |
| Entrega | A persona jurídica autorizada | Orden judicial |
| Destrucción | Inutilizar evidencia | Orden judicial |
| Consumida | Agotada en peritaje | Constancia |

### 5. Procesos Continuos

| Proceso | Etapas |
|---------|--------|
| Resguardo | Ingreso → Depósito → Egreso |
| Traslado | Preparación → Transporte → Entrega |
| Transferencia | Cambio de custodio |

### 6. Herramientas Forenses

| Herramienta | Función | Versión |
|-------------|---------|---------|
| Andriller | Extracción lógica/física Android | v3.6.2+ |
| ALEAPP | Parseo de artefactos Android | v2.1.0+ |

### 7. Fluent Design System (Integrado)

| Elemento | Configuración |
|---------|---------------|
| **Fuente** | Segoe UI Variable, system-ui, sans-serif |
| **Tema** | Dark (`#202020`) |
| **Colores** | Primary: `#0078D4`, Light: `#60CDFF`, Text: `#ffffff` |
| **Border Radius** | Button/Input: `4px`, Card: `12px` |
| **Sombras** | Default: `0 4px 8px`, Elevated: `0 8px 16px` |
| **Motion** | Duration: `167ms`, Timing: `cubic-bezier(0.1, 0.9, 0.2, 1)` |
| **Componentes** | Cards, Buttons (primary/secondary), Inputs |

---

## Marco Legal Aplicado

### Constitución Nacional
- Art. 2: Estado democrático y social de Derecho
- Art. 49: Garantías del debido proceso
- Art. 48: Privacidad de las comunicaciones

### Código Orgánico Procesal Penal
- Art. 187: Definición de cadena de custodia
- Art. 188: Resguardo de evidencias
- Art. 202: Obligatoriedad del manual

### Leyes Especiales
- Ley Especial contra Delitos Informáticos (2001)
- Ley de Infogobierno (2013)
- Ley sobre Mensajes de Datos y Firmas Electrónicas (2001)

### Estándares Internacionales
- ISO/IEC 27037:2012 - Identificación y preservación
- ISO/IEC 27042:2015 - Análisis e interpretación
- NIST SP 800-101 r1 - Forensia móvil
- ACPO v5 - Buenas prácticas

---

## Integridad y Seguridad

### Validación de Hash
```
Imagen Original ──► SHA-256 ──► Comparar ──► SHA-256 copia
```

### Documentación Obligatoria
- Versión exacta de herramientas
- Fecha y hora de ejecución
- Hashes de verificación
- Comandos utilizados
- Operador responsable

---

## Componentes y Referencias

| Componente | Archivo YAML | Referencia |
|------------|--------------|------------|
| YAML Unificado | `RAG/manual_unico_unificado.yaml` | Base del sistema + Fluent Design |
| Fase Inicial | `componente/fase_inicial/fase_inicial.yaml` | Obtención |
| Fase Laboratorio | `componente/fase_laboratorio/fase_laboratorio.yaml` | Peritación |
| Fase Judicial | `componente/fase_disposicion_judicial/fase_disposicion_judicial.yaml` | Exhibición |
| Fase Final | `componente/fase_disposicion_final/fase_disposicion_final.yaml` | Cierre |
| Resguardo | `componente/resguardo/resguardo.yaml` | Almacenamiento |
| Herramientas | `componente/herramientas/herramientas.yaml` | Andriller/ALEAPP |
| Traslado | `componente/traslado/traslado.yaml` | Transporte |

---

## Operarios / Responsables

- Criminalistas y Forenses
- Policías
- Peritos
- Investigadores Penales
- Fiscales del Ministerio Público
- Jueces
- Administradores de Resguardo
- Peritos Informáticos

---

## Glosario de Términos

| Término | Definición |
|---------|-----------|
| PRCC | Planilla de Registro de Cadena de Custodia |
| Evidencia Física | Elemento material susceptible de procesamiento forense |
| Cadena de Custodia | Garantía legal del manejo de evidencias |
| Perito Informático | Especialista en tecnología para análisis forense |
| Hash | Función matemática para verificar integridad |
| Andriller | Herramienta de extracción forense Android |
| ALEAPP | Parser de artefactos Android |
| Fluent Design | Sistema de diseño Microsoft (typography, colors, motion) |

---

## Flujograma General

```
INICIO (Conocimiento del hecho)
    │
    ▼
[FASE INICIAL - Obtención]
    │
    ├── Obtención Técnica
    ├── Obtención por Aseguramiento
    ├── Obtención por Consignación ◄── Dispositivo móvil
    └── Obtención por Derivación
    │
    ▼
[RESGUARDO] (Continuo)
    │
    ├── Ingreso
    ├── Depósito
    └── Egreso
    │
    ▼
[FASE DE LABORATORIO - Peritación]
    │
    ├── Recepción
    ├── Designación
    ├── Peritaje (Andriller + ALEAPP)
    └── Remisión
    │
    ▼
[FASE DISPOSICIÓN JUDICIAL]
    │
    ├── Resguardo Judicial
    └── Exhibición en Audiencia
    │
    ▼
[FASE DISPOSICIÓN FINAL]
    │
    ├── Devolución / Entrega
    ├── Destrucción
    └── Consumida en Peritaje
    │
    ▼
CIERRE PRCC
    │
    ▼
FIN (Archivo del caso)
```

---

## Referencias Documentales

### PDFs en RAG/ (16 documentos)
1. MANUAL_ÚNICO_DE_CADENA_DE_CUSTODIA_DE_EVIDENCIAS_(VERSIÓN_FINAL_29SEP17).pdf
2. Ley-de-infogobierno.pdf
3. Ley Especial de Delitos informáticos (2001).pdf
4. Ley-sobre-Mensajes-de-Datos-y-Firmas-Electronicas.pdf
5. codigo penal.pdf
6. codigo organico procesal penal.pdf
7. constitucion-nacional-20191205135853.pdf
8. ISO IEC 27037-2012.pdf
9. ISO-IEC 27042 2015.pdf
10. Guidelines on Mobile Device-NIST Special Publication 800-101.pdf
11. ACPO_Good_Practice_Guide_for_Digital_Evidence_v5.pdf
12. el peritaje informático.pdf
13. LA_CRIMINOLOGÍA_UNA_CIENCIA_DINAMICA.pdf
14. Normalizacion_economia_digital.pdf
15. cyb_ecu_delitos_inform.pdf
16. Creación del CENIF (2012).pdf

### YAMLs en RAG/ (4 archivos)
- `manual_unico_unificado.yaml` ⭐ **(INCLUYE Fluent Design System)**
- `arquitectura_cadena_custodia.yaml`
- `proceso-desarrollo-forense.yaml`
- `manual-procedimiento.yaml`
- `arquitectura_sitio.yaml`

---

## Cambios Recientes (Actualización)

### Unificación Completada:
- ✅ **Eliminados 8 archivos .md** redundantes de RAG/
- ✅ **Contenido unificado** en `manual_unico_unificado.yaml`
- ✅ **Fluen Design System** integrado al YAML maestro (no archivo separado)
- ✅ **7 Componentes YAML** creados en `/componente/`
- ✅ **map_arquitectura.md** actualizado con todos los cambios

---

*Última actualización: 27/Abr/2026 - Unificación completada + Fluent Design integrado*