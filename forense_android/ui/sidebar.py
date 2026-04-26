"""
Panel lateral de navegación para el Sistema Forense Android.
Muestra las fases y pasos del proceso forense.
"""

from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QListWidget, QListWidgetItem,
    QLabel, QFrame, QScrollArea
)
from PyQt6.QtCore import pyqtSignal


class Sidebar(QWidget):
    """Panel lateral con navegación por fases y pasos."""
    
    paso_seleccionado = pyqtSignal(int)  # Emite el número de paso seleccionado
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setObjectName("sidebar")
        self.pasos_habilitados = set([1])  # Solo paso 1 habilitado inicialmente
        self.paso_actual = 1
        
        self._setup_ui()
        
    def _setup_ui(self):
        """Configura la interfaz del sidebar."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        
        # Título
        titulo = QLabel("SISTEMA FORENSE ANDROID")
        titulo.setStyleSheet("""
            color: #e2e8f0;
            font-size: 14px;
            font-weight: bold;
            padding: 20px 15px 15px 15px;
            border-bottom: 1px solid #2d3748;
        """)
        layout.addWidget(titulo)
        
        # Scroll area para la lista
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)
        scroll.setStyleSheet("border: none; background: transparent;")
        
        container = QWidget()
        container_layout = QVBoxLayout(container)
        container_layout.setContentsMargins(0, 0, 0, 0)
        container_layout.setSpacing(0)
        
        # Lista de navegación
        self.lista = QListWidget()
        self.lista.setStyleSheet("border: none;")
        self.lista.itemClicked.connect(self._on_item_clicked)
        
        # Llenar con fases y pasos
        self._llenar_lista()
        
        container_layout.addWidget(self.lista)
        scroll.setWidget(container)
        layout.addWidget(scroll)
        
    def _llenar_lista(self):
        """Llena la lista con las fases y pasos del proceso."""
        self.lista.clear()
        
        # Fases y pasos según skill_claude.json
        fases = [
            {
                "nombre": "FASE 1 - OBTENCIÓN",
                "pasos": [
                    (1, "Consignación"),
                    (2, "Aislamiento y Fijación"),
                    (3, "Adquisición (Andriller)"),
                    (4, "Cadena de Custodia (PRCC)")
                ]
            },
            {
                "nombre": "FASE 2 - LABORATORIO",
                "pasos": [
                    (5, "Recepción Laboratorio"),
                    (6, "Análisis (ALEAPP)"),
                    (7, "Evidencia Derivada")
                ]
            },
            {
                "nombre": "FASE 3 - JUDICIAL",
                "pasos": [
                    (8, "Resguardo Judicial")
                ]
            },
            {
                "nombre": "FASE 4 - CIERRE",
                "pasos": [
                    (9, "Fundamentación Jurídica"),
                    (10, "Dictamen Pericial"),
                    (11, "Disposición Final")
                ]
            }
        ]
        
        for fase in fases:
            # Encabezado de fase
            header_item = QListWidgetItem(fase["nombre"])
            header_item.setFlags(header_item.flags() & ~Qt.ItemFlag.ItemIsSelectable)
            header_item.setForeground(self.palette().color(self.palette.ColorRole.Text))
            
            # Usar propiedad para identificar como header
            header_item.setData(Qt.ItemDataRole.UserRole, "header")
            
            # Estilo especial para headers
            font = header_item.font()
            font.setBold(True)
            font.setPointSize(11)
            header_item.setFont(font)
            
            self.lista.addItem(header_item)
            
            # Pasos de la fase
            for num_paso, nombre_paso in fase["pasos"]:
                item = QListWidgetItem(f"  {num_paso}. {nombre_paso}")
                item.setData(Qt.ItemDataRole.UserRole, num_paso)
                
                # Verificar si está habilitado
                if num_paso not in self.pasos_habilitados:
                    item.setForeground(self.palette().color(self.palette.ColorRole.PlaceholderText))
                    font = item.font()
                    font.setItalic(True)
                    item.setFont(font)
                    item.setFlags(item.flags() & ~Qt.ItemFlag.ItemIsEnabled)
                
                self.lista.addItem(item)
    
    def _on_item_clicked(self, item: QListWidgetItem):
        """Maneja el click en un item de la lista."""
        rol_data = item.data(Qt.ItemDataRole.UserRole)
        if isinstance(rol_data, int) and rol_data in self.pasos_habilitados:
            self.paso_actual = rol_data
            self.paso_seleccionado.emit(rol_data)
            self._actualizar_estilos()
    
    def _actualizar_estilos(self):
        """Actualiza los estilos de selección."""
        for i in range(self.lista.count()):
            item = self.lista.item(i)
            if item.data(Qt.ItemDataRole.UserRole) == self.paso_actual:
                self.lista.setCurrentItem(item)
    
    def habilitar_paso(self, paso: int):
        """Habilita un paso para navegación."""
        self.pasos_habilitados.add(paso)
        self._llenar_lista()  # Recargar para actualizar estilos
    
    def deshabilitar_paso(self, paso: int):
        """Deshabilita un paso."""
        self.pasos_habilitados.discard(paso)
        self._llenar_lista()
    
    def establecer_paso_actual(self, paso: int):
        """Establece el paso actual y lo selecciona."""
        if paso in self.pasos_habilitados:
            self.paso_actual = paso
            self._llenar_lista()
            self._actualizar_estilos()
