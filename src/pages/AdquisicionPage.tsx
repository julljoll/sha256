import { useState } from 'react';
import { useForenseStore, type Adquisicion } from '../store/forenseStore';
import { Smartphone, Save, ShieldCheck } from 'lucide-react';

export default function AdquisicionPage() {
  const { dispositivoActual: dispositivo, adquisicionAndriller: storeAdquisicion, setAdquisicionAndriller } = useForenseStore();
  
  const [adquisicion, setAdquisicionLocal] = useState<Adquisicion>({
    herramienta: 'andriller',
    versionHerramienta: storeAdquisicion?.versionHerramienta || '',
    tipoExtraccion: storeAdquisicion?.tipoExtraccion || 'logica',
    rutaSalida: storeAdquisicion?.rutaSalida || '',
    rutaImagenOrigen: storeAdquisicion?.rutaImagenOrigen || '',
    hashOrigenSHA256: storeAdquisicion?.hashOrigenSHA256 || '',
    hashCopiaSHA256: storeAdquisicion?.hashCopiaSHA256 || '',
    hashesCoinciden: storeAdquisicion?.hashesCoinciden || false,
    logEjecucion: storeAdquisicion?.logEjecucion || '',
    pidProceso: 0,
  });

  const [saved, setSaved] = useState(false);

  const handleGuardar = () => {
    setAdquisicionAndriller(adquisicion);
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Smartphone className="w-7 h-7 text-primary-500" />
          3. Registro de Adquisición Forense
        </h1>
        <p className="text-gray-400 mt-1">
          Documentación legal de la extracción lógica/física para mantener la integridad de la evidencia
        </p>
      </div>

      {/* Info del dispositivo */}
      {dispositivo && (
        <div className="forensic-card p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Dispositivo a Analizar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Marca:</span>
              <span className="text-white ml-2">{dispositivo.marca}</span>
            </div>
            <div>
              <span className="text-gray-500">Modelo:</span>
              <span className="text-white ml-2">{dispositivo.modelo}</span>
            </div>
            <div>
              <span className="text-gray-500">IMEI:</span>
              <span className="text-white ml-2">{dispositivo.imei}</span>
            </div>
            <div>
              <span className="text-gray-500">Estado:</span>
              <span className="text-white ml-2">{dispositivo.pantallaEstado}</span>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Documentación */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Datos Técnicos de la Adquisición
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Versión de Andriller Utilizada *
            </label>
            <input
              type="text"
              value={adquisicion.versionHerramienta}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, versionHerramienta: e.target.value })}
              className="forensic-input"
              placeholder="Ej: 3.6.2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Extracción *
            </label>
            <select
              value={adquisicion.tipoExtraccion}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, tipoExtraccion: e.target.value as 'logica' | 'fisica' })}
              className="forensic-input"
            >
              <option value="logica">Extracción Lógica</option>
              <option value="fisica">Extracción Física</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ruta de Salida de la Adquisición *
            </label>
            <input
              type="text"
              value={adquisicion.rutaSalida}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, rutaSalida: e.target.value })}
              className="forensic-input"
              placeholder="Ej: /casos/MP-2024-001/adquisicion_logica"
            />
          </div>

          <div className="md:col-span-2">
            <div className="border-t border-forensic-light my-4"></div>
            <h3 className="text-md font-medium text-white mb-4">Validación de Integridad Forense</h3>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hash SHA-256 (Imagen Original) *
            </label>
            <input
              type="text"
              value={adquisicion.hashOrigenSHA256}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashOrigenSHA256: e.target.value })}
              className="forensic-input font-mono text-xs"
              placeholder="Ingrese el hash SHA-256 original"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hash SHA-256 (Copia Obtenida) *
            </label>
            <input
              type="text"
              value={adquisicion.hashCopiaSHA256}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashCopiaSHA256: e.target.value })}
              className="forensic-input font-mono text-xs"
              placeholder="Ingrese el hash SHA-256 de la copia de trabajo"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 my-2">
            <input
              type="checkbox"
              id="hashesMatch"
              checked={adquisicion.hashesCoinciden}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashesCoinciden: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="hashesMatch" className="text-sm font-medium text-gray-300">
              Certifico que los hashes coinciden y la integridad de la evidencia se mantiene intacta
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Observaciones del Proceso / Log de Extracción
            </label>
            <textarea
              value={adquisicion.logEjecucion}
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, logEjecucion: e.target.value })}
              className="forensic-input"
              rows={4}
              placeholder="Detalles sobre bloqueos, errores o particularidades de la extracción..."
            />
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
            <p className="text-green-400">✓ Registro de adquisición forense guardado exitosamente</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            disabled={!adquisicion.versionHerramienta || !adquisicion.rutaSalida || !adquisicion.hashOrigenSHA256 || !adquisicion.hashCopiaSHA256 || !adquisicion.hashesCoinciden}
            className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Guardar Registro
          </button>
        </div>
      </div>
    </div>
  );
}
