"""
Servicio wrapper para ejecución de Andriller mediante QProcess.
Permite extracción forense de dispositivos Android sin bloquear la UI.
"""

from PyQt6.QtCore import QProcess, pyqtSignal, QObject
from typing import Optional


class AndrillerService(QObject):
    """Servicio para ejecutar Andriller de forma asíncrona."""
    
    output_line = pyqtSignal(str)
    error_line = pyqtSignal(str)
    finished = pyqtSignal(int)  # exit_code
    started = pyqtSignal(int)   # PID
    
    def __init__(self):
        super().__init__()
        self._proc: Optional[QProcess] = None
        self._ruta_salida: str = ""
        self._tipo_extraccion: str = ""
        
    def iniciar(
        self, 
        andriller_bin: str, 
        ruta_salida: str, 
        tipo_extraccion: str = "logica",
        dispositivo_id: Optional[str] = None
    ) -> bool:
        """
        Inicia la extracción con Andriller.
        
        Args:
            andriller_bin: Ruta al ejecutable de Andriller
            ruta_salida: Directorio de salida para la extracción
            tipo_extraccion: 'logica' o 'fisica'
            dispositivo_id: ID del dispositivo (opcional)
            
        Returns:
            True si se inició correctamente, False en caso contrario
        """
        if self._proc is not None and self._proc.state() == QProcess.ProcessState.Running:
            self.error_line.emit("Andriller ya está en ejecución")
            return False
        
        self._proc = QProcess(self)
        self._ruta_salida = ruta_salida
        self._tipo_extraccion = tipo_extraccion
        
        # Conectar señales
        self._proc.readyReadStandardOutput.connect(self._on_stdout)
        self._proc.readyReadStandardError.connect(self._on_stderr)
        self._proc.finished.connect(self._on_finished)
        self._proc.started.connect(self._on_started)
        
        # Construir argumentos
        args = [
            "--output", ruta_salida,
            "--mode", tipo_extraccion,
            "--readonly"  # Modo solo lectura para integridad forense
        ]
        
        if dispositivo_id:
            args.extend(["--device", dispositivo_id])
        
        # Iniciar proceso
        try:
            self._proc.start(andriller_bin, args)
            return True
        except Exception as e:
            self.error_line.emit(f"Error al iniciar Andriller: {str(e)}")
            return False
    
    def _on_stdout(self):
        """Maneja la salida estándar de Andriller."""
        if self._proc is None:
            return
        data = self._proc.readAllStandardOutput().data().decode(errors="replace")
        for line in data.splitlines():
            self.output_line.emit(f"[Andriller] {line}")
    
    def _on_stderr(self):
        """Maneja la salida de error de Andriller."""
        if self._proc is None:
            return
        data = self._proc.readAllStandardError().data().decode(errors="replace")
        for line in data.splitlines():
            self.error_line.emit(f"[Andriller ERR] {line}")
    
    def _on_started(self):
        """Maneja el inicio del proceso."""
        if self._proc:
            pid = self._proc.processId()
            self.started.emit(pid)
            self.output_line.emit(f"Andriller iniciado - PID: {pid}")
    
    def _on_finished(self, exit_code: int, exit_status: QProcess.ExitStatus):
        """Maneja la finalización del proceso."""
        if exit_status == QProcess.ExitStatus.NormalExit:
            self.output_line.emit(f"Andriller completado exitosamente (código: {exit_code})")
        else:
            self.error_line.emit(f"Andriller terminado abruptamente (código: {exit_code})")
        self.finished.emit(exit_code)
    
    def cancelar(self) -> bool:
        """
        Cancela la ejecución de Andriller.
        
        Returns:
            True si se canceló, False si no estaba en ejecución
        """
        if self._proc is None or self._proc.state() != QProcess.ProcessState.Running:
            return False
        
        self._proc.terminate()
        self.output_line.emit("Andriller cancelado por el usuario")
        return True
    
    def esta_ejecutando(self) -> bool:
        """Verifica si Andriller está en ejecución."""
        return self._proc is not None and self._proc.state() == QProcess.ProcessState.Running
    
    def obtener_ruta_salida(self) -> str:
        """Obtiene la ruta de salida configurada."""
        return self._ruta_salida
    
    def obtener_tipo_extraccion(self) -> str:
        """Obtiene el tipo de extracción configurado."""
        return self._tipo_extraccion


# Instancia singleton
_andriller_service_instance: Optional[AndrillerService] = None


def get_andriller_service() -> AndrillerService:
    """Obtiene la instancia singleton del servicio Andriller."""
    global _andriller_service_instance
    if _andriller_service_instance is None:
        _andriller_service_instance = AndrillerService()
    return _andriller_service_instance
