"""
Ventana principal del Sistema Forense Android.
Contiene el sidebar de navegación y el área de contenido.
"""

from PyQt6.QtWidgets import (
    QMainWindow, QWidget, QHBoxLayout, QStackedWidget,
    QVBoxLayout, QLabel, QPushButton, QMessageBox, QFileDialog
)
from PyQt6.QtCore import Qt
from pathlib import Path

from ui.sidebar import Sidebar
from database.db_manager import DatabaseManager
from services.audit_service import AuditService


class MainWindow(QMainWindow):
    """Ventana principal de la aplicación."""
    
    def __init__(self):
        super().__init__()
        
        # Inicializar servicios
        self.db = DatabaseManager()
        self.audit = AuditService(self.db)
        
        # Estado de la aplicación
        self.caso_actual_id = None
        self.paso_actual = 1
        
        self._setup_ui()
        self._cargar_caso_ejemplo()
        
    def _setup_ui(self):
        """Configura la interfaz principal."""
        self.setWindowTitle("Sistema Forense Android v1.0.0")
        self.setMinimumSize(1200, 800)
        
        # Widget central
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # Layout principal horizontal
        layout_principal = QHBoxLayout(central_widget)
        layout_principal.setContentsMargins(0, 0, 0, 0)
        layout_principal.setSpacing(0)
        
        # Sidebar
        self.sidebar = Sidebar()
        self.sidebar.paso_seleccionado.connect(self._cambiar_paso)
        layout_principal.addWidget(self.sidebar)
        
        # Área de contenido
        self.contenido = QStackedWidget()
        self.contenido.setStyleSheet("background-color: #1a1d23;")
        
        # Agregar páginas para cada paso
        self._crear_paginas()
        
        layout_principal.addWidget(self.contenido)
        
        # Barra de estado
        self.statusBar().showMessage("Listo - Seleccione o cree un caso para comenzar")
    
    def _crear_paginas(self):
        """Crea las páginas para cada paso del proceso."""
        # Página de inicio (sin caso seleccionado)
        pagina_inicio = self._crear_pagina_inicio()
        self.contenido.addWidget(pagina_inicio)
        
        # Páginas para cada paso (1-11)
        for i in range(1, 12):
            pagina = self._crear_pagina_paso(i)
            self.contenido.addWidget(pagina)
    
    def _crear_pagina_inicio(self) -> QWidget:
        """Crea la página de inicio."""
        widget = QWidget()
        layout = QVBoxLayout(widget)
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        titulo = QLabel("SISTEMA FORENSE ANDROID")
        titulo.setStyleSheet("""
            color: #90cdf4;
            font-size: 28px;
            font-weight: bold;
            padding: 20px;
        """)
        titulo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        subtitulo = QLabel("Gestión del Procedimiento Forense de Dispositivos Android\nMarco Legal Venezolano")
        subtitulo.setStyleSheet("""
            color: #a0aec0;
            font-size: 14px;
            padding: 10px;
        """)
        subtitulo.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        btn_nuevo_caso = QPushButton("Nuevo Caso")
        btn_nuevo_caso.setObjectName("btnPrimary")
        btn_nuevo_caso.setFixedSize(200, 50)
        btn_nuevo_caso.clicked.connect(self._nuevo_caso)
        
        layout.addWidget(titulo)
        layout.addWidget(subtitulo)
        layout.addSpacing(40)
        layout.addWidget(btn_nuevo_caso, alignment=Qt.AlignmentFlag.AlignCenter)
        
        return widget
    
    def _crear_pagina_paso(self, numero: int) -> QWidget:
        """Crea una página genérica para un paso."""
        widget = QWidget()
        layout = QVBoxLayout(widget)
        
        # Título del paso
        titulos_pasos = {
            1: "Consignación",
            2: "Aislamiento y Fijación",
            3: "Adquisición con Andriller",
            4: "Cadena de Custodia (PRCC)",
            5: "Recepción en Laboratorio",
            6: "Análisis con ALEAPP",
            7: "Evidencia Derivada",
            8: "Resguardo Judicial",
            9: "Fundamentación Jurídica",
            10: "Dictamen Pericial",
            11: "Disposición Final"
        }
        
        titulo = QLabel(f"PASO {numero}: {titulos_pasos.get(numero, 'Paso')}")
        titulo.setObjectName("sectionTitle")
        layout.addWidget(titulo)
        
        # Contenido placeholder
        placeholder = QLabel("Contenido del formulario en desarrollo...")
        placeholder.setStyleSheet("color: #718096; font-size: 14px; padding: 20px;")
        layout.addWidget(placeholder)
        
        # Botones de navegación
        layout_botones = QHBoxLayout()
        
        if numero > 1:
            btn_anterior = QPushButton("← Anterior")
            btn_anterior.setObjectName("btnSecondary")
            btn_anterior.clicked.connect(lambda: self._navegar_paso(numero - 1))
            layout_botones.addWidget(btn_anterior)
        
        layout_botones.addStretch()
        
        if numero < 11:
            btn_siguiente = QPushButton("Siguiente →")
            btn_siguiente.setObjectName("btnPrimary")
            btn_siguiente.clicked.connect(lambda: self._completar_paso(numero))
            layout_botones.addWidget(btn_siguiente)
        
        layout.addLayout(layout_botones)
        layout.addStretch()
        
        return widget
    
    def _cargar_caso_ejemplo(self):
        """Carga un caso de ejemplo para demostración."""
        casos = self.db.listar_casos()
        if not casos:
            # Crear caso de ejemplo
            caso_id = self.db.crear_caso("DEMO-2024-001", "Fiscal Demo")
            self.caso_actual_id = caso_id
            self.statusBar().showMessage(f"Caso DEMO-2024-001 creado")
        else:
            self.caso_actual_id = casos[0]['id']
            self.statusBar().showMessage(f"Caso activo: {casos[0]['numero_caso']}")
    
    def _nuevo_caso(self):
        """Maneja la creación de un nuevo caso."""
        from PyQt6.QtWidgets import QInputDialog
        
        numero, ok = QInputDialog.getText(
            self, "Nuevo Caso", "Ingrese número de caso:"
        )
        if ok and numero:
            caso_id = self.db.crear_caso(numero)
            self.caso_actual_id = caso_id
            self.audit.registrar_accion(caso_id, 0, 0, "Caso creado")
            self.statusBar().showMessage(f"Caso {numero} creado exitosamente")
            
            # Habilitar paso 1
            self.sidebar.habilitar_paso(1)
            self.contenido.setCurrentIndex(1)
    
    def _cambiar_paso(self, numero_paso: int):
        """Cambia al paso seleccionado."""
        if self.caso_actual_id is None:
            QMessageBox.warning(
                self, "Sin caso", 
                "Debe crear o seleccionar un caso primero."
            )
            return
        
        self.paso_actual = numero_paso
        self.contenido.setCurrentIndex(numero_paso)
        self.statusBar().showMessage(f"Paso {numero_paso} seleccionado")
    
    def _navegar_paso(self, numero_paso: int):
        """Navega a un paso específico."""
        self.sidebar.establecer_paso_actual(numero_paso)
        self._cambiar_paso(numero_paso)
    
    def _completar_paso(self, numero_paso: int):
        """Marca un paso como completado y avanza al siguiente."""
        if self.caso_actual_id:
            # Registrar en auditoría
            self.audit.registrar_accion(
                self.caso_actual_id,
                (numero_paso - 1) // 3 + 1,  # Fase aproximada
                numero_paso,
                f"Paso {numero_paso} completado"
            )
            
            # Actualizar paso en BD
            self.db.actualizar_paso_caso(self.caso_actual_id, numero_paso + 1)
            
            # Habilitar siguiente paso
            siguiente = numero_paso + 1
            self.sidebar.habilitar_paso(siguiente)
            self._navegar_paso(siguiente)
            
            self.statusBar().showMessage(f"Paso {numero_paso} completado - Avanzando al paso {siguiente}")
