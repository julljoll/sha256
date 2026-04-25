"""
Servicio de cálculo de hashes criptográficos (SHA-256, MD5).
Soporta cálculo asíncrono con notificación de progreso.
"""

import hashlib
from pathlib import Path
from typing import Callable, Optional, Tuple


class HashService:
    """Servicio para cálculo de hashes de archivos."""
    
    CHUNK_SIZE = 1024 * 1024  # 1 MB por lectura
    
    def __init__(self):
        pass
    
    def calcular_hash_archivo(
        self,
        ruta_archivo: str,
        algoritmo: str = "sha256",
        progress_callback: Optional[Callable[[int, int], None]] = None
    ) -> Tuple[str, int]:
        """
        Calcula el hash de un archivo.
        
        Args:
            ruta_archivo: Ruta completa al archivo
            algoritmo: 'sha256' o 'md5'
            progress_callback: Función(bytes_procesados, total_bytes) para progreso
            
        Returns:
            Tupla (hash_hexadecimal, tamanio_bytes)
            
        Raises:
            FileNotFoundError: Si el archivo no existe
        """
        archivo_path = Path(ruta_archivo)
        if not archivo_path.exists():
            raise FileNotFoundError(f"El archivo no existe: {ruta_archivo}")
        
        tamanio_total = archivo_path.stat().st_size
        
        if algoritmo.lower() == "sha256":
            hasher = hashlib.sha256()
        elif algoritmo.lower() == "md5":
            hasher = hashlib.md5()
        else:
            raise ValueError(f"Algoritmo no soportado: {algoritmo}")
        
        bytes_procesados = 0
        
        with open(archivo_path, 'rb') as f:
            while True:
                chunk = f.read(self.CHUNK_SIZE)
                if not chunk:
                    break
                
                hasher.update(chunk)
                bytes_procesados += len(chunk)
                
                if progress_callback:
                    progress_callback(bytes_procesados, tamanio_total)
        
        return hasher.hexdigest(), tamanio_total
    
    def calcular_sha256(self, ruta_archivo: str, 
                        progress_callback: Optional[Callable[[int, int], None]] = None) -> str:
        """Calcula SHA-256 de un archivo."""
        hash_valor, _ = self.calcular_hash_archivo(
            ruta_archivo, "sha256", progress_callback
        )
        return hash_valor
    
    def calcular_md5(self, ruta_archivo: str,
                     progress_callback: Optional[Callable[[int, int], None]] = None) -> str:
        """Calcula MD5 de un archivo."""
        hash_valor, _ = self.calcular_hash_archivo(
            ruta_archivo, "md5", progress_callback
        )
        return hash_valor
    
    def calcular_hashes_completos(
        self,
        ruta_archivo: str,
        progress_callback: Optional[Callable[[int, int], None]] = None
    ) -> dict:
        """
        Calcula ambos hashes (SHA-256 y MD5) en una sola pasada.
        
        Args:
            ruta_archivo: Ruta completa al archivo
            progress_callback: Función(bytes_procesados, total_bytes) para progreso
            
        Returns:
            Diccionario con sha256, md5 y tamanio_bytes
        """
        archivo_path = Path(ruta_archivo)
        if not archivo_path.exists():
            raise FileNotFoundError(f"El archivo no existe: {ruta_archivo}")
        
        tamanio_total = archivo_path.stat().st_size
        
        hasher_sha256 = hashlib.sha256()
        hasher_md5 = hashlib.md5()
        bytes_procesados = 0
        
        with open(archivo_path, 'rb') as f:
            while True:
                chunk = f.read(self.CHUNK_SIZE)
                if not chunk:
                    break
                
                hasher_sha256.update(chunk)
                hasher_md5.update(chunk)
                bytes_procesados += len(chunk)
                
                if progress_callback:
                    progress_callback(bytes_procesados, tamanio_total)
        
        return {
            'sha256': hasher_sha256.hexdigest(),
            'md5': hasher_md5.hexdigest(),
            'tamanio_bytes': tamanio_total
        }
    
    def verificar_coincidencia_hashes(self, hash1: str, hash2: str) -> bool:
        """
        Verifica si dos hashes coinciden (comparación case-insensitive).
        
        Args:
            hash1: Primer hash hexadecimal
            hash2: Segundo hash hexadecimal
            
        Returns:
            True si coinciden, False en caso contrario
        """
        return hash1.lower().strip() == hash2.lower().strip()
    
    def calcular_hash_string(self, contenido: str, algoritmo: str = "sha256") -> str:
        """
        Calcula el hash de una cadena de texto.
        
        Args:
            contenido: Cadena de texto a hashear
            algoritmo: 'sha256' o 'md5'
            
        Returns:
            Hash hexadecimal del contenido
        """
        if algoritmo.lower() == "sha256":
            return hashlib.sha256(contenido.encode('utf-8')).hexdigest()
        elif algoritmo.lower() == "md5":
            return hashlib.md5(contenido.encode('utf-8')).hexdigest()
        else:
            raise ValueError(f"Algoritmo no soportado: {algoritmo}")


# Instancia singleton
_hash_service_instance: Optional[HashService] = None


def get_hash_service() -> HashService:
    """Obtiene la instancia singleton del servicio de hashes."""
    global _hash_service_instance
    if _hash_service_instance is None:
        _hash_service_instance = HashService()
    return _hash_service_instance
