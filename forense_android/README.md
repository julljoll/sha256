# Sistema Forense Android - Panel de Control

Aplicación de escritorio para gestionar el proceso forense informático de dispositivos Android según el marco legal venezolano.

## 📁 Estructura del Proyecto

```
forense_android/
├── main.py                          # Punto de entrada principal (pendiente)
├── __init__.py                      # Paquete Python
├── requirements.txt                 # Dependencias Python
│
├── database/                        # Capa de datos
│   ├── __init__.py
│   ├── schema.sql                   # Esquema SQLite completo
│   └── db_manager.py                # Gestor CRUD + trazabilidad
│
├── models/                          # Modelos de datos (dataclasses)
│   └── __init__.py                  # Caso, Dispositivo, PRCC, etc.
│
├── services/                        # Servicios reutilizables
│   ├── __init__.py
│   ├── hash_service.py              # Cálculo SHA-256/MD5
│   ├── audit_service.py             # Log de auditoría encadenado
│   ├── andriller_service.py         # Wrapper QProcess Andriller (pendiente)
│   ├── aleapp_service.py            # Wrapper QProcess ALEAPP (pendiente)
│   └── print_service.py             # Generación PDF (pendiente)
│
├── ui/                              # Interfaz PyQt6
│   ├── main_window.py               # Ventana principal (pendiente)
│   ├── sidebar.py                   # Navegación lateral (pendiente)
│   ├── pages/                       # Páginas por fase
│   │   ├── home_page.py             # Dashboard (pendiente)
│   │   ├── fase1/                   # Obtención y Adquisición
│   │   ├── fase2/                   # Peritaje y Análisis
│   │   └── fase3/                   # Emisión Dictamen
│   └── widgets/                     # Componentes reutilizables
│
├── assets/                          # Recursos estáticos
│   ├── style.qss                    # Tema oscuro profesional
│   ├── logo.png                     # Logo institucional (pendiente)
│   └── fonts/                       # Fuentes personalizadas
│
└── packaging/                       # Empaquetado .deb
    ├── DEBIAN/
    │   ├── control                  # Metadatos del paquete
    │   ├── postinst                 # Post-instalación
    │   └── prerm                    # Pre-desinstalación
    └── build_deb.sh                 # Script de construcción
```

## 🔗 Integración con Otros Repositorios

El sistema forense está diseñado para integrarse con las siguientes herramientas externas en cada etapa del proceso:

### FASE I - Obtención y Adquisición en Sitio

| Paso | Herramienta | Repositorio | Integración |
|------|-------------|-------------|-------------|
| 1. Aislamiento | - | - | Formulario interno |
| 2. Adquisición | **Andriller** | `/workspace/andriller/` | `QProcess` lanza `andriller --read-only` |
| 3. Cadena Custodia | - | - | Generación PRCC interna |

**Integración con Andriller:**
```python
# services/andriller_service.py (pendiente)
from PyQt6.QtCore import QProcess

class AndrillerService:
    def iniciar_extraccion(self, ruta_salida: str, tipo: str):
        process = QProcess()
        process.start("andriller", ["--read-only", "-o", ruta_salida])
```

### FASE II - Peritaje y Análisis en Laboratorio

| Paso | Herramienta | Repositorio | Integración |
|------|-------------|-------------|-------------|
| 4. Recepción | - | - | Verificación hash interna |
| 5. Análisis | **ALEAPP** | `/workspace/ALEAPP/` | `QProcess` lanza `aleapp -i <imagen> -o <salida>` |
| 6. Evidencia Derivada | - | - | Selectores desde output ALEAPP |

**Integración con ALEAPP:**
```python
# services/aleapp_service.py (pendiente)
class AleappService:
    def iniciar_analisis(self, imagen: str, salida: str):
        process = QProcess()
        process.start("aleapp", ["-i", imagen, "-o", salida])
```

### FASE III - Emisión del Dictamen Pericial

| Paso | Herramienta | Repositorio | Integración |
|------|-------------|-------------|-------------|
| 7. Fundamentación | - | - | Checklist interno |
| 8. Dictamen | - | - | Auto-poblado desde BD |
| 9. Cierre | - | - | Formularios internos |

## 🏗️ Estado de Implementación

### ✅ Completado

- [x] Esquema de base de datos (`database/schema.sql`)
- [x] Gestor de base de datos (`database/db_manager.py`)
- [x] Modelos de datos (`models/__init__.py`)
- [x] Servicio de hashes (`services/hash_service.py`)
- [x] Servicio de auditoría (`services/audit_service.py`)
- [x] Estilos QSS (`assets/style.qss`)
- [x] Configuración de empaquetado `.deb`

### ⏳ Pendiente

- [ ] UI Principal (`ui/main_window.py`, `ui/sidebar.py`)
- [ ] Páginas Fase I (`ui/pages/fase1/*`)
- [ ] Páginas Fase II (`ui/pages/fase2/*`)
- [ ] Páginas Fase III (`ui/pages/fase3/*`)
- [ ] Servicios Andriller/ALEAPP (`services/andriller_service.py`, `services/aleapp_service.py`)
- [ ] Servicio de impresión (`services/print_service.py`)
- [ ] Widgets reutilizables (`ui/widgets/*`)
- [ ] Punto de entrada (`main.py`)

## 🚀 Instalación y Desarrollo

### Requisitos

- Python >= 3.11
- PyQt6 >= 6.6.0
- reportlab >= 4.0.0
- Ubuntu 24.04 LTS (recomendado)

### Instalación de dependencias

```bash
cd /workspace/forense_android
pip install -r requirements.txt
```

### Construir paquete .deb

```bash
cd /workspace/forense_android/packaging
./build_deb.sh
```

### Ejecutar en modo desarrollo

```bash
# Pendiente: implementar main.py
python main.py
```

## 📊 Base de Datos

La aplicación utiliza SQLite con las siguientes tablas principales:

- `casos` - Casos forenses activos/cerrados
- `dispositivos` - Dispositivos intervenidos
- `prcc` - Planillas de Cadena de Custodia
- `adquisiciones` - Extracciones con Andriller/ALEAPP
- `evidencias_derivadas` - Archivos relevantes del análisis
- `dictamenes` - Informes periciales
- `audit_log` - Log inmutable de trazabilidad con hashes encadenados

## ⚖️ Marco Legal Venezolano

La aplicación está diseñada conforme a:

- Constitución Nacional (due process, privacidad comunicaciones)
- COPP (licitud de prueba, cadena de custodia)
- Ley Especial contra Delitos Informáticos
- Ley de Infogobierno
- Ley sobre Mensajes de Datos y Firmas Electrónicas (Art. 4, 7, 8)
- ISO/IEC 27037:2012, 27042:2015
- NIST SP 800-101r1

## 📝 Licencia

Proyecto desarrollado para uso institucional del sistema de justicia venezolano.
