"""
Servicio wrapper para ejecución de ALEAPP mediante QProcess.
Permite análisis forense de imágenes Android sin bloquear la UI.
"""

from PyQt6.QtCore import QProcess, pyqtSignal, QObject
from typing import Optional


class AleappService(QObject):
    """Servicio para ejecutar ALEAPP de forma asíncrona."""
    
    output_line = pyqtSignal(str)
    error_line = pyqtSignal(str)
    finished = pyqtSignal(int)  # exit_code
    started = pyqtSignal(int)   # PID
    
    def __init__(self):
        super().__init__()
        self._proc: Optional[QProcess] = None
        self._ruta_imagen: str = ""
        self._ruta_salida: str = ""
        
    def iniciar(
        self, 
        aleapp_bin: str, 
        ruta_imagen: str,
        ruta_salida: str,
        tipo_analisis: str = "completo"
    ) -> bool:
        """
        Inicia el análisis con ALEAPP.
        
        Args:
            aleapp_bin: Ruta al ejecutable de ALEAPP
            ruta_imagen: Ruta a la imagen forense o directorio de extracción
            ruta_salida: Directorio de salida para el reporte
            tipo_analisis: 'completo', 'whatsapp', 'timeline'
            
        Returns:
            True si se inició correctamente, False en caso contrario
        """
        if self._proc is not None and self._proc.state() == QProcess.ProcessState.Running:
            self.error_line.emit("ALEAPP ya está en ejecución")
            return False
        
        self._proc = QProcess(self)
        self._ruta_imagen = ruta_imagen
        self._ruta_salida = ruta_salida
        
        # Conectar señales
        self._proc.readyReadStandardOutput.connect(self._on_stdout)
        self._proc.readyReadStandardError.connect(self._on_stderr)
        self._proc.finished.connect(self._on_finished)
        self._proc.started.connect(self._on_started)
        
        # Construir argumentos
        args = [
            "-i", ruta_imagen,
            "-o", ruta_salida,
            "-t", "fs"  # Tipo de entrada: filesystem
        ]
        
        # Filtros opcionales según tipo de análisis
        if tipo_analisis == "whatsapp":
            args.extend(["--filter", "whatsapp"])
        elif tipo_analisis == "timeline":
            args.extend(["--timeline", "1"])
        
        # Iniciar proceso
        try:
            self._proc.start(aleapp_bin, args)
            return True
        except Exception as e:
            self.error_line.emit(f"Error al iniciar ALEAPP: {str(e)}")
            return False
    
    def _on_stdout(self):
        """Maneja la salida estándar de ALEAPP."""
        if self._proc is None:
            return
        data = self._proc.readAllStandardOutput().data().decode(errors="replace")
        for line in data.splitlines():
            self.output_line.emit(f"[ALEAPP] {line}")
    
    def _on_stderr(self):
        """Maneja la salida de error de ALEAPP."""
        if self._proc is None:
            return
        data = self._proc.readAllStandardError().data().decode(errors="replace")
        for line in data.splitlines():
            self.error_line.emit(f"[ALEAPP ERR] {line}")
    
    def _on_started(self):
        """Maneja el inicio del proceso."""
        if self._proc:
            pid = self._proc.processId()
            self.started.emit(pid)
            self.output_line.emit(f"ALEAPP iniciado - PID: {pid}")
    
    def _on_finished(self, exit_code: int, exit_status: QProcess.ExitStatus):
        """Maneja la finalización del proceso."""
        if exit_status == QProcess.ExitStatus.NormalExit:
            self.output_line.emit(f"ALEAPP completado exitosamente (código: {exit_code})")
        else:
            self.error_line.emit(f"ALEAPP terminado abruptamente (código: {exit_code})")
        self.finished.emit(exit_code)
    
    def cancelar(self) -> bool:
        """
        Cancela la ejecución de ALEAPP.
        
        Returns:
            True si se canceló, False si no estaba en ejecución
        """
        if self._proc is None or self._proc.state() != QProcess.ProcessState.Running:
            return False
        
        self._proc.terminate()
        self.output_line.emit("ALEAPP cancelado por el usuario")
        return True
    
    def esta_ejecutando(self) -> bool:
        """Verifica si ALEAPP está en ejecución."""
        return self._proc is not None and self._proc.state() == QProcess.ProcessState.Running
    
    def obtener_ruta_imagen(self) -> str:
        """Obtiene la ruta de la imagen forense."""
        return self._ruta_imagen
    
    def obtener_ruta_salida(self) -> str:
        """Obtiene la ruta de salida configurada."""
        return self._ruta_salida


# Instancia singleton
_aleapp_service_instance: Optional[AleappService] = None


def get_aleapp_service() -> AleappService:
    """Obtiene la instancia singleton del servicio ALEAPP."""
    global _aleapp_service_instance
    if _aleapp_service_instance is None:
        _aleapp_service_instance = AleappService()
    return _aleapp_service_instance
