"""
Modelos de datos para el Sistema Forense Android.
Dataclasses puras sin dependencias de UI o servicios externos.
"""

from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime


@dataclass
class Caso:
    """Representa un caso forense."""
    id: Optional[int] = None
    numero_caso: str = ""
    fiscal: Optional[str] = None
    fecha_inicio: str = ""
    estado: str = "activo"  # activo, cerrado, archivado
    paso_actual: int = 1
    
    @classmethod
    def from_dict(cls, data: dict) -> "Caso":
        return cls(
            id=data.get('id'),
            numero_caso=data.get('numero_caso', ''),
            fiscal=data.get('fiscal'),
            fecha_inicio=data.get('fecha_inicio', ''),
            estado=data.get('estado', 'activo'),
            paso_actual=data.get('paso_actual', 1)
        )


@dataclass
class Dispositivo:
    """Representa un dispositivo móvil intervenido."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    marca: str = ""
    modelo: str = ""
    imei: Optional[str] = None
    sim_card: Optional[str] = None
    numero_tel: Optional[str] = None
    estado_fisico: Optional[str] = None
    modo_aislamiento: Optional[str] = None  # modo_avion, bolsa_faraday
    fotos_path: list = field(default_factory=list)
    danos_visibles: Optional[str] = None
    fecha_fijacion: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "Dispositivo":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            marca=data.get('marca', ''),
            modelo=data.get('modelo', ''),
            imei=data.get('imei'),
            sim_card=data.get('sim_card'),
            numero_tel=data.get('numero_tel'),
            estado_fisico=data.get('estado_fisico'),
            modo_aislamiento=data.get('modo_aislamiento'),
            fotos_path=data.get('fotos_path', []),
            danos_visibles=data.get('danos_visibles'),
            fecha_fijacion=data.get('fecha_fijacion')
        )


@dataclass
class PRCC:
    """Planilla de Registro de Cadena de Custodia."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    numero_prcc: str = ""
    tipo: str = "principal"  # principal, derivada
    prcc_origen_id: Optional[int] = None
    expediente_numero: Optional[str] = None
    funcionario_colector: str = ""
    cargo: Optional[str] = None
    organo: Optional[str] = None
    tipo_embalaje: Optional[str] = None  # bolsa, caja, sobre
    numero_precinto: Optional[str] = None
    hash_sha256: Optional[str] = None
    hash_md5: Optional[str] = None
    estado_embalaje: Optional[str] = None  # buenas, deterioradas, rotas
    nombre_firmante: Optional[str] = None
    tipo_objeto: str = "Dispositivo Móvil"
    color: Optional[str] = None
    descripcion_evidencia: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "PRCC":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            numero_prcc=data.get('numero_prcc', ''),
            tipo=data.get('tipo', 'principal'),
            prcc_origen_id=data.get('prcc_origen_id'),
            expediente_numero=data.get('expediente_numero'),
            funcionario_colector=data.get('funcionario_colector', ''),
            cargo=data.get('cargo'),
            organo=data.get('organo'),
            tipo_embalaje=data.get('tipo_embalaje'),
            numero_precinto=data.get('numero_precinto'),
            hash_sha256=data.get('hash_sha256'),
            hash_md5=data.get('hash_md5'),
            estado_embalaje=data.get('estado_embalaje'),
            nombre_firmante=data.get('nombre_firmante'),
            tipo_objeto=data.get('tipo_objeto', 'Dispositivo Móvil'),
            color=data.get('color'),
            descripcion_evidencia=data.get('descripcion_evidencia')
        )


@dataclass
class Adquisicion:
    """Representa una adquisición forense (Andriller/ALEAPP)."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    herramienta: str = ""  # andriller, aleapp
    version_herramienta: Optional[str] = None
    tipo_extraccion: Optional[str] = None  # logica, fisica
    ruta_salida: str = ""
    ruta_imagen_origen: Optional[str] = None
    hash_origen_sha256: Optional[str] = None
    hash_copia_sha256: Optional[str] = None
    hashes_coinciden: bool = False
    log_ejecucion: Optional[str] = None
    pid_proceso: Optional[int] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "Adquisicion":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            herramienta=data.get('herramienta', ''),
            version_herramienta=data.get('version_herramienta'),
            tipo_extraccion=data.get('tipo_extraccion'),
            ruta_salida=data.get('ruta_salida', ''),
            ruta_imagen_origen=data.get('ruta_imagen_origen'),
            hash_origen_sha256=data.get('hash_origen_sha256'),
            hash_copia_sha256=data.get('hash_copia_sha256'),
            hashes_coinciden=bool(data.get('hashes_coinciden', False)),
            log_ejecucion=data.get('log_ejecucion'),
            pid_proceso=data.get('pid_proceso')
        )


@dataclass
class EvidenciaDerivada:
    """Evidencia derivada del análisis ALEAPP."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    prcc_id: Optional[int] = None
    nombre_nativo: str = ""
    ruta_origen: str = ""
    tamanio_bytes: Optional[int] = None
    hash_sha256: str = ""
    fecha_creacion_metadata: Optional[str] = None
    fecha_modificacion_metadata: Optional[str] = None
    fecha_acceso_metadata: Optional[str] = None
    relevancia_forense: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "EvidenciaDerivada":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            prcc_id=data.get('prcc_id'),
            nombre_nativo=data.get('nombre_nativo', ''),
            ruta_origen=data.get('ruta_origen', ''),
            tamanio_bytes=data.get('tamanio_bytes'),
            hash_sha256=data.get('hash_sha256', ''),
            fecha_creacion_metadata=data.get('fecha_creacion_metadata'),
            fecha_modificacion_metadata=data.get('fecha_modificacion_metadata'),
            fecha_acceso_metadata=data.get('fecha_acceso_metadata'),
            relevancia_forense=data.get('relevancia_forense')
        )


@dataclass
class Dictamen:
    """Dictamen pericial completo."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    numero_dictamen: Optional[str] = None
    motivo: Optional[str] = None
    descripcion_evidencia: Optional[str] = None
    examenes_practicados: list = field(default_factory=list)
    resultados_json: dict = field(default_factory=dict)
    conclusiones: Optional[str] = None
    consumo_evidencia: Optional[str] = None  # no_alterado, consumo_parcial
    consumo_especificacion: Optional[str] = None
    fundamentacion_legal: list = field(default_factory=list)
    delitos_tipificados: list = field(default_factory=list)
    perito_actuante: Optional[str] = None
    credencial_numero: Optional[str] = None
    fecha_emision: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "Dictamen":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            numero_dictamen=data.get('numero_dictamen'),
            motivo=data.get('motivo'),
            descripcion_evidencia=data.get('descripcion_evidencia'),
            examenes_practicados=data.get('examenes_practicados', []),
            resultados_json=data.get('resultados_json', {}),
            conclusiones=data.get('conclusiones'),
            consumo_evidencia=data.get('consumo_evidencia'),
            consumo_especificacion=data.get('consumo_especificacion'),
            fundamentacion_legal=data.get('fundamentacion_legal', []),
            delitos_tipificados=data.get('delitos_tipificados', []),
            perito_actuante=data.get('perito_actuante'),
            credencial_numero=data.get('credencial_numero'),
            fecha_emision=data.get('fecha_emision')
        )


@dataclass
class RecepcionLaboratorio:
    """Recepción de evidencia en laboratorio."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    perito_receptor: str = ""
    estado_precintos: Optional[str] = None  # integros, violados
    hash_original_prcc: str = ""
    hash_recalculado: Optional[str] = None
    hashes_coinciden: bool = False
    discrepancia_documentada: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "RecepcionLaboratorio":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            perito_receptor=data.get('perito_receptor', ''),
            estado_precintos=data.get('estado_precintos'),
            hash_original_prcc=data.get('hash_original_prcc', ''),
            hash_recalculado=data.get('hash_recalculado'),
            hashes_coinciden=bool(data.get('hashes_coinciden', False)),
            discrepancia_documentada=data.get('discrepancia_documentada')
        )


@dataclass
class CierreCaso:
    """Cierre y disposición final de un caso."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    destino_evidencia: str = ""  # resguardo_judicial, fiscal_mp, disposicion_final
    funcionario_receptor: Optional[str] = None
    fecha_entrega: Optional[str] = None
    observaciones: Optional[str] = None
    numero_acta_disposicion: Optional[str] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "CierreCaso":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            destino_evidencia=data.get('destino_evidencia', ''),
            funcionario_receptor=data.get('funcionario_receptor'),
            fecha_entrega=data.get('fecha_entrega'),
            observaciones=data.get('observaciones'),
            numero_acta_disposicion=data.get('numero_acta_disposicion')
        )


@dataclass
class AuditLogEntry:
    """Entrada del log de auditoría/traabilidad."""
    id: Optional[int] = None
    caso_id: Optional[int] = None
    fase: int = 0
    paso: int = 0
    accion: str = ""
    usuario: str = ""
    fecha_utc: str = ""
    hash_previo: str = ""
    hash_actual: str = ""
    metadata_json: Optional[dict] = None
    
    @classmethod
    def from_dict(cls, data: dict) -> "AuditLogEntry":
        return cls(
            id=data.get('id'),
            caso_id=data.get('caso_id'),
            fase=data.get('fase', 0),
            paso=data.get('paso', 0),
            accion=data.get('accion', ''),
            usuario=data.get('usuario', ''),
            fecha_utc=data.get('fecha_utc', ''),
            hash_previo=data.get('hash_previo', ''),
            hash_actual=data.get('hash_actual', ''),
            metadata_json=data.get('metadata_json')
        )
