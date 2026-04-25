"""
Gestor de base de datos SQLite para el Sistema Forense Android.
Maneja conexiones, migraciones y operaciones CRUD.
"""

import sqlite3
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Any
from contextlib import contextmanager


class DatabaseManager:
    """Gestor de conexión y operaciones con SQLite."""
    
    def __init__(self, db_path: Optional[str] = None):
        """
        Inicializa el gestor de base de datos.
        
        Args:
            db_path: Ruta al archivo de base de datos. 
                    Por defecto usa ~/.local/share/forense-android/casos.db
        """
        if db_path is None:
            db_dir = Path.home() / ".local" / "share" / "forense-android"
            db_dir.mkdir(parents=True, exist_ok=True)
            self.db_path = str(db_dir / "casos.db")
        else:
            self.db_path = db_path
        
        self._connection: Optional[sqlite3.Connection] = None
        self._initialize_database()
    
    @contextmanager
    def get_connection(self):
        """Context manager para obtener conexión a la BD."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        try:
            yield conn
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()
    
    def _initialize_database(self) -> None:
        """Inicializa la base de datos creando tablas si no existen."""
        schema_file = Path(__file__).parent / "schema.sql"
        if not schema_file.exists():
            raise FileNotFoundError(f"Esquema no encontrado en {schema_file}")
        
        with self.get_connection() as conn:
            schema_sql = schema_file.read_text(encoding='utf-8')
            conn.executescript(schema_sql)
    
    def get_schema_version(self) -> int:
        """Obtiene la versión actual del esquema."""
        with self.get_connection() as conn:
            cursor = conn.execute("SELECT version FROM schema_version ORDER BY version DESC LIMIT 1")
            row = cursor.fetchone()
            return row['version'] if row else 0
    
    # ==================== MÉTODOS CRUD PARA CASOS ====================
    
    def crear_caso(self, numero_caso: str, fiscal: Optional[str] = None) -> int:
        """
        Crea un nuevo caso en la base de datos.
        
        Args:
            numero_caso: Número único identificador del caso
            fiscal: Nombre del fiscal asignado (opcional)
            
        Returns:
            ID del caso creado
        """
        fecha_inicio = datetime.now(timezone.utc).isoformat()
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO casos (numero_caso, fiscal, fecha_inicio) 
                   VALUES (?, ?, ?)""",
                (numero_caso, fiscal, fecha_inicio)
            )
            return cursor.lastrowid
    
    def obtener_caso(self, caso_id: int) -> Optional[dict]:
        """Obtiene un caso por su ID."""
        with self.get_connection() as conn:
            cursor = conn.execute("SELECT * FROM casos WHERE id = ?", (caso_id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def obtener_caso_por_numero(self, numero_caso: str) -> Optional[dict]:
        """Obtiene un caso por su número."""
        with self.get_connection() as conn:
            cursor = conn.execute("SELECT * FROM casos WHERE numero_caso = ?", (numero_caso,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def listar_casos(self, estado: Optional[str] = None) -> list[dict]:
        """
        Lista todos los casos o filtra por estado.
        
        Args:
            estado: 'activo', 'cerrado', 'archivado' o None para todos
            
        Returns:
            Lista de diccionarios con los datos de los casos
        """
        with self.get_connection() as conn:
            if estado:
                cursor = conn.execute(
                    "SELECT * FROM casos WHERE estado = ? ORDER BY fecha_inicio DESC",
                    (estado,)
                )
            else:
                cursor = conn.execute("SELECT * FROM casos ORDER BY fecha_inicio DESC")
            return [dict(row) for row in cursor.fetchall()]
    
    def actualizar_paso_caso(self, caso_id: int, paso_actual: int) -> None:
        """Actualiza el paso actual de un caso."""
        with self.get_connection() as conn:
            conn.execute(
                "UPDATE casos SET paso_actual = ?, fecha_modificacion = CURRENT_TIMESTAMP WHERE id = ?",
                (paso_actual, caso_id)
            )
    
    def cerrar_caso(self, caso_id: int) -> None:
        """Marca un caso como cerrado."""
        with self.get_connection() as conn:
            conn.execute(
                "UPDATE casos SET estado = 'cerrado', fecha_modificacion = CURRENT_TIMESTAMP WHERE id = ?",
                (caso_id,)
            )
    
    # ==================== DISPOSITIVOS ====================
    
    def guardar_dispositivo(self, caso_id: int, dispositivo_data: dict) -> int:
        """
        Guarda un dispositivo asociado a un caso.
        
        Args:
            caso_id: ID del caso
            dispositivo_data: Diccionario con datos del dispositivo
            
        Returns:
            ID del dispositivo guardado
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO dispositivos 
                   (caso_id, marca, modelo, imei, sim_card, numero_tel, 
                    estado_fisico, modo_aislamiento, fotos_path, danos_visibles, 
                    fecha_fijacion)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    dispositivo_data.get('marca'),
                    dispositivo_data.get('modelo'),
                    dispositivo_data.get('imei'),
                    dispositivo_data.get('sim_card'),
                    dispositivo_data.get('numero_tel'),
                    dispositivo_data.get('estado_fisico'),
                    dispositivo_data.get('modo_aislamiento'),
                    json.dumps(dispositivo_data.get('fotos_path', [])),
                    dispositivo_data.get('danos_visibles'),
                    dispositivo_data.get('fecha_fijacion', datetime.now(timezone.utc).isoformat())
                )
            )
            return cursor.lastrowid
    
    def obtener_dispositivos_por_caso(self, caso_id: int) -> list[dict]:
        """Obtiene todos los dispositivos de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM dispositivos WHERE caso_id = ?",
                (caso_id,)
            )
            resultados = []
            for row in cursor.fetchall():
                data = dict(row)
                if data.get('fotos_path'):
                    data['fotos_path'] = json.loads(data['fotos_path'])
                resultados.append(data)
            return resultados
    
    # ==================== PRCC (Cadena de Custodia) ====================
    
    def guardar_prcc(self, caso_id: int, prcc_data: dict) -> int:
        """
        Guarda una Planilla de Registro de Cadena de Custodia.
        
        Args:
            caso_id: ID del caso
            prcc_data: Diccionario con datos de la PRCC
            
        Returns:
            ID de la PRCC guardada
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO prcc 
                   (caso_id, numero_prcc, tipo, prcc_origen_id, expediente_numero,
                    funcionario_colector, cargo, organo, tipo_embalaje, 
                    numero_precinto, hash_sha256, hash_md5, estado_embalaje,
                    nombre_firmante, tipo_objeto, color, descripcion_evidencia)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    prcc_data.get('numero_prcc'),
                    prcc_data.get('tipo', 'principal'),
                    prcc_data.get('prcc_origen_id'),
                    prcc_data.get('expediente_numero'),
                    prcc_data.get('funcionario_colector'),
                    prcc_data.get('cargo'),
                    prcc_data.get('organo'),
                    prcc_data.get('tipo_embalaje'),
                    prcc_data.get('numero_precinto'),
                    prcc_data.get('hash_sha256'),
                    prcc_data.get('hash_md5'),
                    prcc_data.get('estado_embalaje'),
                    prcc_data.get('nombre_firmante'),
                    prcc_data.get('tipo_objeto', 'Dispositivo Móvil'),
                    prcc_data.get('color'),
                    prcc_data.get('descripcion_evidencia')
                )
            )
            return cursor.lastrowid
    
    def obtener_prcc_por_caso(self, caso_id: int, tipo: Optional[str] = None) -> list[dict]:
        """Obtiene todas las PRCC de un caso, opcionalmente filtradas por tipo."""
        with self.get_connection() as conn:
            if tipo:
                cursor = conn.execute(
                    "SELECT * FROM prcc WHERE caso_id = ? AND tipo = ?",
                    (caso_id, tipo)
                )
            else:
                cursor = conn.execute(
                    "SELECT * FROM prcc WHERE caso_id = ?",
                    (caso_id,)
                )
            return [dict(row) for row in cursor.fetchall()]
    
    def obtener_ultima_prcc(self, caso_id: int) -> Optional[dict]:
        """Obtiene la última PRCC creada para un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM prcc WHERE caso_id = ? ORDER BY fecha_creacion DESC LIMIT 1",
                (caso_id,)
            )
            row = cursor.fetchone()
            return dict(row) if row else None
    
    # ==================== ADQUISICIONES ====================
    
    def guardar_adquisicion(self, caso_id: int, adquisicion_data: dict) -> int:
        """
        Guarda una adquisición forense (Andriller/ALEAPP).
        
        Args:
            caso_id: ID del caso
            adquisicion_data: Diccionario con datos de la adquisición
            
        Returns:
            ID de la adquisición guardada
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO adquisiciones 
                   (caso_id, herramienta, version_herramienta, tipo_extraccion,
                    ruta_salida, ruta_imagen_origen, hash_origen_sha256, 
                    hash_copia_sha256, hashes_coinciden, log_ejecucion, pid_proceso)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    adquisicion_data.get('herramienta'),
                    adquisicion_data.get('version_herramienta'),
                    adquisicion_data.get('tipo_extraccion'),
                    adquisicion_data.get('ruta_salida'),
                    adquisicion_data.get('ruta_imagen_origen'),
                    adquisicion_data.get('hash_origen_sha256'),
                    adquisicion_data.get('hash_copia_sha256'),
                    1 if adquisicion_data.get('hashes_coinciden') else 0,
                    adquisicion_data.get('log_ejecucion'),
                    adquisicion_data.get('pid_proceso')
                )
            )
            return cursor.lastrowid
    
    def obtener_adquisiciones_por_caso(self, caso_id: int) -> list[dict]:
        """Obtiene todas las adquisiciones de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM adquisiciones WHERE caso_id = ?",
                (caso_id,)
            )
            return [dict(row) for row in cursor.fetchall()]
    
    # ==================== EVIDENCIAS DERIVADAS ====================
    
    def guardar_evidencia_derivada(self, caso_id: int, evidencia_data: dict) -> int:
        """
        Guarda una evidencia derivada del análisis.
        
        Args:
            caso_id: ID del caso
            evidencia_data: Diccionario con datos de la evidencia
            
        Returns:
            ID de la evidencia guardada
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO evidencias_derivadas 
                   (caso_id, prcc_id, nombre_nativo, ruta_origen, tamanio_bytes,
                    hash_sha256, fecha_creacion_metadata, fecha_modificacion_metadata,
                    fecha_acceso_metadata, relevancia_forense)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    evidencia_data.get('prcc_id'),
                    evidencia_data.get('nombre_nativo'),
                    evidencia_data.get('ruta_origen'),
                    evidencia_data.get('tamanio_bytes'),
                    evidencia_data.get('hash_sha256'),
                    evidencia_data.get('fecha_creacion_metadata'),
                    evidencia_data.get('fecha_modificacion_metadata'),
                    evidencia_data.get('fecha_acceso_metadata'),
                    evidencia_data.get('relevancia_forense')
                )
            )
            return cursor.lastrowid
    
    def obtener_evidencias_derivadas_por_caso(self, caso_id: int) -> list[dict]:
        """Obtiene todas las evidencias derivadas de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM evidencias_derivadas WHERE caso_id = ?",
                (caso_id,)
            )
            return [dict(row) for row in cursor.fetchall()]
    
    # ==================== DICTÁMENES ====================
    
    def guardar_dictamen(self, caso_id: int, dictamen_data: dict) -> int:
        """
        Guarda un dictamen pericial.
        
        Args:
            caso_id: ID del caso
            dictamen_data: Diccionario con datos del dictamen
            
        Returns:
            ID del dictamen guardado
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO dictamenes 
                   (caso_id, numero_dictamen, motivo, descripcion_evidencia,
                    examenes_practicados, resultados_json, conclusiones,
                    consumo_evidencia, consumo_especificacion, fundamentacion_legal,
                    delitos_tipificados, perito_actuante, credencial_numero, fecha_emision)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    dictamen_data.get('numero_dictamen'),
                    dictamen_data.get('motivo'),
                    dictamen_data.get('descripcion_evidencia'),
                    json.dumps(dictamen_data.get('examenes_practicados', [])),
                    json.dumps(dictamen_data.get('resultados_json', {})),
                    dictamen_data.get('conclusiones'),
                    dictamen_data.get('consumo_evidencia'),
                    dictamen_data.get('consumo_especificacion'),
                    json.dumps(dictamen_data.get('fundamentacion_legal', [])),
                    json.dumps(dictamen_data.get('delitos_tipificados', [])),
                    dictamen_data.get('perito_actuante'),
                    dictamen_data.get('credencial_numero'),
                    dictamen_data.get('fecha_emision')
                )
            )
            return cursor.lastrowid
    
    def obtener_dictamen_por_caso(self, caso_id: int) -> Optional[dict]:
        """Obtiene el dictamen de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM dictamenes WHERE caso_id = ?",
                (caso_id,)
            )
            row = cursor.fetchone()
            if row:
                data = dict(row)
                # Parsear campos JSON
                for campo in ['examenes_practicados', 'resultados_json', 'fundamentacion_legal', 'delitos_tipificados']:
                    if data.get(campo):
                        data[campo] = json.loads(data[campo])
                return data
            return None
    
    # ==================== RECEPCIONES DE LABORATORIO ====================
    
    def guardar_recepcion_laboratorio(self, caso_id: int, recepcion_data: dict) -> int:
        """
        Guarda una recepción en laboratorio.
        
        Args:
            caso_id: ID del caso
            recepcion_data: Diccionario con datos de la recepción
            
        Returns:
            ID de la recepción guardada
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO recepciones_laboratorio 
                   (caso_id, perito_receptor, estado_precintos, hash_original_prcc,
                    hash_recalculado, hashes_coinciden, discrepancia_documentada)
                   VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    recepcion_data.get('perito_receptor'),
                    recepcion_data.get('estado_precintos'),
                    recepcion_data.get('hash_original_prcc'),
                    recepcion_data.get('hash_recalculado'),
                    1 if recepcion_data.get('hashes_coinciden') else 0,
                    recepcion_data.get('discrepancia_documentada')
                )
            )
            return cursor.lastrowid
    
    def obtener_recepcion_por_caso(self, caso_id: int) -> Optional[dict]:
        """Obtiene la recepción de laboratorio de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM recepciones_laboratorio WHERE caso_id = ?",
                (caso_id,)
            )
            row = cursor.fetchone()
            return dict(row) if row else None
    
    # ==================== CIERRES DE CASO ====================
    
    def guardar_cierre_caso(self, caso_id: int, cierre_data: dict) -> int:
        """
        Guarda el cierre de un caso.
        
        Args:
            caso_id: ID del caso
            cierre_data: Diccionario con datos del cierre
            
        Returns:
            ID del cierre guardado
        """
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO cierres_caso 
                   (caso_id, destino_evidencia, funcionario_receptor, 
                    fecha_entrega, observaciones, numero_acta_disposicion)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (
                    caso_id,
                    cierre_data.get('destino_evidencia'),
                    cierre_data.get('funcionario_receptor'),
                    cierre_data.get('fecha_entrega'),
                    cierre_data.get('observaciones'),
                    cierre_data.get('numero_acta_disposicion')
                )
            )
            return cursor.lastrowid
    
    def obtener_cierre_por_caso(self, caso_id: int) -> Optional[dict]:
        """Obtiene el cierre de un caso."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM cierres_caso WHERE caso_id = ?",
                (caso_id,)
            )
            row = cursor.fetchone()
            return dict(row) if row else None
    
    # ==================== AUDIT LOG (TRAZABILIDAD) ====================
    
    def _calcular_hash_audit(self, fase: int, paso: int, accion: str, 
                             usuario: str, fecha_utc: str, hash_previo: str) -> str:
        """Calcula el hash encadenado para el log de auditoría."""
        contenido = f"{fase}|{paso}|{accion}|{usuario}|{fecha_utc}|{hash_previo}"
        return hashlib.sha256(contenido.encode('utf-8')).hexdigest()
    
    def registrar_en_audit_log(self, caso_id: Optional[int], fase: int, paso: int,
                                accion: str, usuario: str, 
                                metadata: Optional[dict] = None) -> int:
        """
        Registra una acción en el log de auditoría (inmutable).
        
        Args:
            caso_id: ID del caso (opcional para acciones globales)
            fase: Número de fase (1, 2, 3)
            paso: Número de paso dentro de la fase
            accion: Descripción de la acción realizada
            usuario: Identificador del usuario que realizó la acción
            metadata: Datos adicionales en formato diccionario
            
        Returns:
            ID del registro creado
        """
        fecha_utc = datetime.now(timezone.utc).isoformat()
        
        # Obtener el hash del último registro para encadenar
        hash_previo = ""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT hash_actual FROM audit_log ORDER BY id DESC LIMIT 1"
            )
            row = cursor.fetchone()
            if row:
                hash_previo = row['hash_actual']
        
        # Calcular hash actual encadenado
        hash_actual = self._calcular_hash_audit(
            fase, paso, accion, usuario, fecha_utc, hash_previo
        )
        
        with self.get_connection() as conn:
            cursor = conn.execute(
                """INSERT INTO audit_log 
                   (caso_id, fase, paso, accion, usuario, fecha_utc, 
                    hash_previo, hash_actual, metadata_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    caso_id, fase, paso, accion, usuario, fecha_utc,
                    hash_previo, hash_actual,
                    json.dumps(metadata) if metadata else None
                )
            )
            return cursor.lastrowid
    
    def obtener_audit_log_por_caso(self, caso_id: int) -> list[dict]:
        """Obtiene el log de auditoría de un caso específico."""
        with self.get_connection() as conn:
            cursor = conn.execute(
                "SELECT * FROM audit_log WHERE caso_id = ? ORDER BY id ASC",
                (caso_id,)
            )
            resultados = []
            for row in cursor.fetchall():
                data = dict(row)
                if data.get('metadata_json'):
                    data['metadata_json'] = json.loads(data['metadata_json'])
                resultados.append(data)
            return resultados
    
    def obtener_audit_log_completo(self) -> list[dict]:
        """Obtiene todo el log de auditoría ordenado cronológicamente."""
        with self.get_connection() as conn:
            cursor = conn.execute("SELECT * FROM audit_log ORDER BY id ASC")
            resultados = []
            for row in cursor.fetchall():
                data = dict(row)
                if data.get('metadata_json'):
                    data['metadata_json'] = json.loads(data['metadata_json'])
                resultados.append(data)
            return resultados
    
    # ==================== UTILIDADES ====================
    
    def verificar_integridad_audit_log(self) -> bool:
        """
        Verifica la integridad de la cadena de hashes del audit log.
        
        Returns:
            True si todos los hashes son válidos, False si hay inconsistencias
        """
        with self.get_connection() as conn:
            cursor = conn.execute("SELECT * FROM audit_log ORDER BY id ASC")
            hash_previo_esperado = ""
            
            for row in cursor.fetchall():
                hash_actual = row['hash_actual']
                
                # Recalcular hash esperado
                contenido = f"{row['fase']}|{row['paso']}|{row['accion']}|{row['usuario']}|{row['fecha_utc']}|{hash_previo_esperado}"
                hash_calculado = hashlib.sha256(contenido.encode('utf-8')).hexdigest()
                
                if hash_calculado != hash_actual:
                    return False
                
                hash_previo_esperado = hash_actual
        
        return True
    
    def exportar_caso_completo(self, caso_id: int) -> dict:
        """
        Exporta todos los datos de un caso en un diccionario consolidado.
        
        Args:
            caso_id: ID del caso a exportar
            
        Returns:
            Diccionario con todos los datos del caso
        """
        caso = self.obtener_caso(caso_id)
        if not caso:
            return {}
        
        return {
            'caso': caso,
            'dispositivos': self.obtener_dispositivos_por_caso(caso_id),
            'prcc': self.obtener_prcc_por_caso(caso_id),
            'adquisiciones': self.obtener_adquisiciones_por_caso(caso_id),
            'evidencias_derivadas': self.obtener_evidencias_derivadas_por_caso(caso_id),
            'dictamen': self.obtener_dictamen_por_caso(caso_id),
            'recepcion_laboratorio': self.obtener_recepcion_por_caso(caso_id),
            'cierre': self.obtener_cierre_por_caso(caso_id),
            'audit_log': self.obtener_audit_log_por_caso(caso_id)
        }


# Instancia global singleton
_db_instance: Optional[DatabaseManager] = None


def get_database(db_path: Optional[str] = None) -> DatabaseManager:
    """
    Obtiene la instancia singleton del gestor de base de datos.
    
    Args:
        db_path: Ruta personalizada a la base de datos (opcional)
        
    Returns:
        Instancia de DatabaseManager
    """
    global _db_instance
    if _db_instance is None:
        _db_instance = DatabaseManager(db_path)
    return _db_instance
