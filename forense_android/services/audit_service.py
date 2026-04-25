"""
Servicio de auditoría y trazabilidad para el Sistema Forense Android.
Registra todas las acciones en el log de auditoría inmutable.
"""

from typing import Optional, TYPE_CHECKING
from datetime import datetime, timezone

if TYPE_CHECKING:
    from database.db_manager import DatabaseManager


class AuditService:
    """Servicio para registro de auditoría con hashes encadenados."""
    
    def __init__(self, db_manager: 'DatabaseManager'):
        """
        Inicializa el servicio de auditoría.
        
        Args:
            db_manager: Instancia del gestor de base de datos
        """
        self.db = db_manager
        self._usuario_actual: str = "admin"  # Por defecto, configurable
    
    def set_usuario_actual(self, usuario: str) -> None:
        """Establece el usuario actual para las entradas de auditoría."""
        self._usuario_actual = usuario
    
    def get_usuario_actual(self) -> str:
        """Obtiene el usuario actual."""
        return self._usuario_actual
    
    def registrar_accion(
        self,
        caso_id: Optional[int],
        fase: int,
        paso: int,
        accion: str,
        metadata: Optional[dict] = None
    ) -> int:
        """
        Registra una acción en el log de auditoría.
        
        Args:
            caso_id: ID del caso (None para acciones globales)
            fase: Número de fase (1, 2, 3)
            paso: Número de paso dentro de la fase
            accion: Descripción de la acción realizada
            metadata: Datos adicionales en formato diccionario
            
        Returns:
            ID del registro creado en la BD
        """
        return self.db.registrar_en_audit_log(
            caso_id=caso_id,
            fase=fase,
            paso=paso,
            accion=accion,
            usuario=self._usuario_actual,
            metadata=metadata
        )
    
    # ==================== MÉTODOS ESPECÍFICOS POR FASE ====================
    
    # FASE 1 - Obtención y Adquisición en Sitio
    
    def registrar_aislamiento_guardado(self, caso_id: int, dispositivo_id: int) -> int:
        """Registra el guardado del formulario de aislamiento."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=1,
            paso=1,
            accion="Formulario Aislamiento guardado",
            metadata={'dispositivo_id': dispositivo_id}
        )
    
    def registrar_andriller_iniciado(self, caso_id: int, pid: int, ruta_salida: str) -> int:
        """Registra el inicio de extracción con Andriller."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=1,
            paso=2,
            accion=f"Andriller iniciado - PID {pid}",
            metadata={'ruta_salida': ruta_salida, 'pid': pid}
        )
    
    def registrar_andriller_completado(self, caso_id: int, exit_code: int) -> int:
        """Registra la finalización de extracción con Andriller."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=1,
            paso=2,
            accion=f"Andriller completado - código salida {exit_code}",
            metadata={'exit_code': exit_code}
        )
    
    def registrar_hash_verificado(self, caso_id: int, coincide: bool) -> int:
        """Registra la verificación de hashes."""
        estado = "verificado ✅" if coincide else "NO COINCIDEN ❌"
        return self.registrar_accion(
            caso_id=caso_id,
            fase=1,
            paso=2,
            accion=f"Hash SHA-256 {estado}",
            metadata={'hashes_coinciden': coincide}
        )
    
    def registrar_prcc_guardada(self, caso_id: int, prcc_numero: str) -> int:
        """Registra el guardado de una PRCC."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=1,
            paso=3,
            accion=f"PRCC {prcc_numero} guardada",
            metadata={'numero_prcc': prcc_numero}
        )
    
    # FASE 2 - Peritaje y Análisis en Laboratorio
    
    def registrar_recepcion_laboratorio(self, caso_id: int, perito: str, 
                                         hashes_coinciden: bool) -> int:
        """Registra la recepción en laboratorio."""
        estado = "íntegra" if hashes_coinciden else "DISCREPANCIA"
        return self.registrar_accion(
            caso_id=caso_id,
            fase=2,
            paso=4,
            accion=f"Recepción laboratorio - evidencia {estado}",
            metadata={'perito_receptor': perito, 'hashes_coinciden': hashes_coinciden}
        )
    
    def registrar_aleapp_iniciado(self, caso_id: int, pid: int, 
                                   ruta_imagen: str) -> int:
        """Registra el inicio de análisis con ALEAPP."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=2,
            paso=5,
            accion=f"ALEAPP iniciado - PID {pid}",
            metadata={'ruta_imagen': ruta_imagen, 'pid': pid}
        )
    
    def registrar_aleapp_completado(self, caso_id: int, exit_code: int) -> int:
        """Registra la finalización de análisis con ALEAPP."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=2,
            paso=5,
            accion=f"ALEAPP completado - código salida {exit_code}",
            metadata={'exit_code': exit_code}
        )
    
    def registrar_evidencia_derivada(self, caso_id: int, 
                                      nombre_archivo: str) -> int:
        """Registra el registro de una evidencia derivada."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=2,
            paso=6,
            accion=f"Evidencia derivada registrada: {nombre_archivo}",
            metadata={'nombre_archivo': nombre_archivo}
        )
    
    # FASE 3 - Emisión del Dictamen Pericial
    
    def registrar_fundamentacion_guardada(self, caso_id: int, 
                                           leyes_seleccionadas: list) -> int:
        """Registra el guardado de la fundamentación jurídica."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=3,
            paso=7,
            accion="Fundamentación jurídica guardada",
            metadata={'leyes_count': len(leyes_seleccionadas)}
        )
    
    def registrar_dictamen_guardado(self, caso_id: int, 
                                     numero_dictamen: str) -> int:
        """Registra el guardado del dictamen pericial."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=3,
            paso=8,
            accion=f"Dictamen {numero_dictamen} guardado",
            metadata={'numero_dictamen': numero_dictamen}
        )
    
    def registrar_cierre_caso(self, caso_id: int, 
                               destino: str) -> int:
        """Registra el cierre de un caso."""
        return self.registrar_accion(
            caso_id=caso_id,
            fase=3,
            paso=9,
            accion=f"Caso cerrado - destino: {destino}",
            metadata={'destino_evidencia': destino}
        )
    
    # ==================== UTILIDADES ====================
    
    def verificar_integridad_log(self) -> bool:
        """
        Verifica la integridad de toda la cadena de auditoría.
        
        Returns:
            True si todos los hashes son válidos, False en caso contrario
        """
        return self.db.verificar_integridad_audit_log()
    
    def obtener_log_por_caso(self, caso_id: int) -> list:
        """
        Obtiene el log de auditoría de un caso específico.
        
        Args:
            caso_id: ID del caso
            
        Returns:
            Lista de entradas del log
        """
        return self.db.obtener_audit_log_por_caso(caso_id)
    
    def exportar_log_a_pdf(self, caso_id: int, output_path: str) -> None:
        """
        Exporta el log de auditoría de un caso a PDF.
        
        Args:
            caso_id: ID del caso
            output_path: Ruta de salida del archivo PDF
        """
        # Esta funcionalidad se implementará en print_service.py
        pass


# Factory function
def create_audit_service(db_manager: 'DatabaseManager') -> AuditService:
    """Crea una instancia del servicio de auditoría."""
    return AuditService(db_manager)
