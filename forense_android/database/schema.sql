-- Esquema de base de datos para Sistema Forense Android
-- Versión: 1.0.0

-- Tabla de control de versiones del esquema
CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY,
    applied_date TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabla principal de casos
CREATE TABLE IF NOT EXISTS casos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_caso TEXT UNIQUE NOT NULL,
    fiscal TEXT,
    fecha_inicio TEXT NOT NULL,
    estado TEXT DEFAULT 'activo' CHECK(estado IN ('activo', 'cerrado', 'archivado')),
    paso_actual INTEGER DEFAULT 1,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Dispositivos móviles intervenidos
CREATE TABLE IF NOT EXISTS dispositivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    imei TEXT,
    sim_card TEXT,
    numero_tel TEXT,
    estado_fisico TEXT,
    modo_aislamiento TEXT CHECK(modo_aislamiento IN ('modo_avion', 'bolsa_faraday', 'otro')),
    fotos_path TEXT,  -- JSON array de rutas de fotografías
    danos_visibles TEXT,
    fecha_fijacion TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- PRCC (Planilla de Registro de Cadena de Custodia)
CREATE TABLE IF NOT EXISTS prcc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    numero_prcc TEXT UNIQUE NOT NULL,
    tipo TEXT DEFAULT 'principal' CHECK(tipo IN ('principal', 'derivada')),
    prcc_origen_id INTEGER REFERENCES prcc(id),  -- Para evidencias derivadas
    expediente_numero TEXT,
    funcionario_colector TEXT NOT NULL,
    cargo TEXT,
    organo TEXT,
    tipo_embalaje TEXT CHECK(tipo_embalaje IN ('bolsa', 'caja', 'sobre', 'otro')),
    numero_precinto TEXT,
    hash_sha256 TEXT,
    hash_md5 TEXT,
    estado_embalaje TEXT CHECK(estado_embalaje IN ('buenas', 'deterioradas', 'rotas')),
    nombre_firmante TEXT,
    tipo_objeto TEXT DEFAULT 'Dispositivo Móvil',
    color TEXT,
    descripcion_evidencia TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Adquisiciones forenses (Andriller, ALEAPP)
CREATE TABLE IF NOT EXISTS adquisiciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    herramienta TEXT NOT NULL CHECK(herramienta IN ('andriller', 'aleapp')),
    version_herramienta TEXT,
    tipo_extraccion TEXT CHECK(tipo_extraccion IN ('logica', 'fisica')),
    ruta_salida TEXT NOT NULL,
    ruta_imagen_origen TEXT,
    hash_origen_sha256 TEXT,
    hash_copia_sha256 TEXT,
    hashes_coinciden INTEGER CHECK(hashes_coinciden IN (0, 1)),
    log_ejecucion TEXT,  -- stdout/stderr completo
    pid_proceso INTEGER,
    fecha_ejecucion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Evidencias derivadas del análisis
CREATE TABLE IF NOT EXISTS evidencias_derivadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    prcc_id INTEGER REFERENCES prcc(id),
    nombre_nativo TEXT NOT NULL,
    ruta_origen TEXT NOT NULL,
    tamanio_bytes INTEGER,
    hash_sha256 TEXT NOT NULL,
    fecha_creacion_metadata TEXT,
    fecha_modificacion_metadata TEXT,
    fecha_acceso_metadata TEXT,
    relevancia_forense TEXT,  -- Justificación de por qué es evidencia
    fecha_registro TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Dictámenes periciales
CREATE TABLE IF NOT EXISTS dictamenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    numero_dictamen TEXT UNIQUE,
    motivo TEXT,
    descripcion_evidencia TEXT,
    examenes_practicados TEXT,  -- JSON con detalles de exámenes
    resultados_json TEXT,  -- JSON con tabla de resultados
    conclusiones TEXT,
    consumo_evidencia TEXT CHECK(consumo_evidencia IN ('no_alterado', 'consumo_parcial')),
    consumo_especificacion TEXT,  -- Detalle si hubo consumo parcial
    fundamentacion_legal TEXT,  -- JSON con leyes seleccionadas
    delitos_tipificados TEXT,  -- JSON con delitos marcados
    perito_actuante TEXT,
    credencial_numero TEXT,
    fecha_emision TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Cierre y disposición final de casos
CREATE TABLE IF NOT EXISTS cierres_caso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    destino_evidencia TEXT NOT NULL CHECK(destino_evidencia IN ('resguardo_judicial', 'fiscal_mp', 'disposicion_final')),
    funcionario_receptor TEXT,
    fecha_entrega TEXT,
    observaciones TEXT,
    numero_acta_disposicion TEXT,
    fecha_cierre TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Recepción en laboratorio
CREATE TABLE IF NOT EXISTS recepciones_laboratorio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
    perito_receptor TEXT NOT NULL,
    estado_precintos TEXT CHECK(estado_precintos IN ('integros', 'violados')),
    hash_original_prcc TEXT NOT NULL,
    hash_recalculado TEXT,
    hashes_coinciden INTEGER CHECK(hashes_coinciden IN (0, 1)),
    discrepancia_documentada TEXT,  -- Si los hashes no coinciden
    fecha_recepcion TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Log de auditoría / trazabilidad (INMUTABLE - solo INSERT)
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caso_id INTEGER REFERENCES casos(id),
    fase INTEGER NOT NULL,
    paso INTEGER NOT NULL,
    accion TEXT NOT NULL,
    usuario TEXT,
    fecha_utc TEXT NOT NULL,
    hash_previo TEXT,  -- Hash del registro anterior
    hash_actual TEXT NOT NULL,  -- SHA-256(fase||paso||accion||usuario||fecha||hash_previo)
    metadata_json TEXT  -- Datos adicionales en formato JSON
);

-- Índices para optimizar consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_casos_numero ON casos(numero_caso);
CREATE INDEX IF NOT EXISTS idx_casos_estado ON casos(estado);
CREATE INDEX IF NOT EXISTS idx_dispositivos_caso ON dispositivos(caso_id);
CREATE INDEX IF NOT EXISTS idx_prcc_caso ON prcc(caso_id);
CREATE INDEX IF NOT EXISTS idx_prcc_numero ON prcc(numero_prcc);
CREATE INDEX IF NOT EXISTS idx_adquisiciones_caso ON adquisiciones(caso_id);
CREATE INDEX IF NOT EXISTS idx_adquisiciones_herramienta ON adquisiciones(herramienta);
CREATE INDEX IF NOT EXISTS idx_evidencias_derivadas_caso ON evidencias_derivadas(caso_id);
CREATE INDEX IF NOT EXISTS idx_dictamenes_caso ON dictamenes(caso_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_caso ON audit_log(caso_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_fecha ON audit_log(fecha_utc);

-- Insertar versión inicial del esquema
INSERT INTO schema_version (version) VALUES (1);
