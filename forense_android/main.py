#!/usr/bin/env python3
"""
Sistema Forense Android - Aplicación de Escritorio
Gestión del procedimiento forense informático de dispositivos Android
bajo el marco legal venezolano.

Versión: 1.0.0
"""

import sys
import os
from pathlib import Path

# Agregar directorio raíz al path para imports
ROOT_DIR = Path(__file__).parent
sys.path.insert(0, str(ROOT_DIR))

from PyQt6.QtWidgets import QApplication, QSplashScreen
from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtGui import QPixmap, QFont


def load_stylesheet() -> str:
    """Carga la hoja de estilos QSS."""
    qss_path = ROOT_DIR / "assets" / "style.qss"
    if qss_path.exists():
        return qss_path.read_text(encoding='utf-8')
    return ""


def main():
    """Función principal de entrada."""
    # Configurar aplicación
    app = QApplication(sys.argv)
    app.setApplicationName("Sistema Forense Android")
    app.setApplicationVersion("1.0.0")
    app.setOrganizationName("ForenseAndroid")
    
    # Configurar fuente global
    font = QFont("Segoe UI", 10)
    app.setFont(font)
    
    # Cargar hoja de estilos
    stylesheet = load_stylesheet()
    app.setStyleSheet(stylesheet)
    
    # Mostrar ventana principal
    from ui.main_window import MainWindow
    window = MainWindow()
    window.show()
    
    # Ejecutar aplicación
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
