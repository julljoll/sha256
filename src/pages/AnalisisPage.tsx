import { useState, useEffect } from 'react';
import { useForenseStore, type Adquisicion } from '../store/forenseStore';
import { Microscope, Save, ShieldCheck } from 'lucide-react';

export default function AnalisisPage() {
  const { adquisicionAndriller, adquisicionAleapp: storeAnalisis, setAdquisicionAleapp } = useForenseStore();
  
  const [analisis, setAnalisisLocal] = useState<Adquisicion>({
    herramienta: 'aleapp',
    versionHerramienta: storeAnalisis?.versionHerramienta || '',
    tipoExtraccion: storeAnalisis?.tipoExtraccion || 'analisis',
    rutaImagenOrigen: storeAnalisis?.rutaImagenOrigen || adquisicionAndriller?.rutaSalida || '',
    rutaSalida: storeAnalisis?.rutaSalida || '',
    hashOrigenSHA256: storeAnalisis?.hashOrigenSHA256 || '',
    hashCopiaSHA256: storeAnalisis?.hashCopiaSHA256 || '',
    hashesCoinciden: storeAnalisis?.hashesCoinciden || false,
    logEjecucion: storeAnalisis?.logEjecucion || '',
    pidProceso: 0,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (adquisicionAndriller?.rutaSalida && !analisis.rutaImagenOrigen) {
      setAnalisisLocal(prev => ({ ...prev, rutaImagenOrigen: adquisicionAndriller.rutaSalida }));
    }
  }, [adquisicionAndriller]);

  const handleGuardar = () => {
    setAdquisicionAleapp(analisis);
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Microscope className="w-7 h-7 text-primary-500" />
          4. Registro de Análisis Forense con ALEAPP
        </h1>
        <p className="text-gray-400 mt-1">
          Documentación legal del procesamiento de la evidencia y validación de artefactos analizados
        </p>
      </div>

      {/* Info de la adquisición previa */}
      {adquisicionAndriller && (
        <div className="forensic-card p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Adquisición Origen</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Herramienta:</span>
              <span className="text-white ml-2 capitalize">{adquisicionAndriller.herramienta}</span>
            </div>
            <div>
              <span className="text-gray-500">Tipo:</span>
              <span className="text-white ml-2 capitalize">{adquisicionAndriller.tipoExtraccion}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Ruta de Evidencia:</span>
              <span className="text-white ml-2 break-all">{adquisicionAndriller.rutaSalida}</span>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Documentación */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Datos Técnicos del Análisis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Versión de ALEAPP Utilizada *
            </label>
            <input
              type="text"
              value={analisis.versionHerramienta}
              onChange={(e) => setAnalisisLocal({ ...analisis, versionHerramienta: e.target.value })}
              className="forensic-input"
              placeholder="Ej: 2.1.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Análisis Realizado *
            </label>
            <select
              value={analisis.tipoExtraccion}
              onChange={(e) => setAnalisisLocal({ ...analisis, tipoExtraccion: e.target.value as any })}
              className="forensic-input"
            >
              <option value="completo">Análisis Completo (Todos los artefactos)</option>
              <option value="whatsapp">Solo WhatsApp</option>
              <option value="timeline">Timeline de Eventos</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ruta de la Imagen Analizada *
            </label>
            <input
              type="text"
              value={analisis.rutaImagenOrigen}
              onChange={(e) => setAnalisisLocal({ ...analisis, rutaImagenOrigen: e.target.value })}
              className="forensic-input"
              placeholder="Ej: /casos/MP-2024-001/adquisicion_logica"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ruta de Salida del Reporte (HTML/JSON) *
            </label>
            <input
              type="text"
              value={analisis.rutaSalida}
              onChange={(e) => setAnalisisLocal({ ...analisis, rutaSalida: e.target.value })}
              className="forensic-input"
              placeholder="Ej: /casos/MP-2024-001/reportes_aleapp"
            />
          </div>

          <div className="md:col-span-2">
            <div className="border-t border-forensic-light my-4"></div>
            <h3 className="text-md font-medium text-white mb-4">Validación de la Evidencia Analizada</h3>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hash SHA-256 de la Imagen a Analizar *
            </label>
            <input
              type="text"
              value={analisis.hashOrigenSHA256}
              onChange={(e) => setAnalisisLocal({ ...analisis, hashOrigenSHA256: e.target.value })}
              className="forensic-input font-mono text-xs"
              placeholder="Ingrese el hash SHA-256 de la imagen antes del parseo"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 my-2">
            <input
              type="checkbox"
              id="hashesMatch"
              checked={analisis.hashesCoinciden}
              onChange={(e) => setAnalisisLocal({ ...analisis, hashesCoinciden: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="hashesMatch" className="text-sm font-medium text-gray-300">
              Certifico que el hash previo al análisis coincide con el de la adquisición, garantizando que no hubo manipulación
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Observaciones del Análisis / Resumen de Artefactos Obtenidos
            </label>
            <textarea
              value={analisis.logEjecucion}
              onChange={(e) => setAnalisisLocal({ ...analisis, logEjecucion: e.target.value })}
              className="forensic-input"
              rows={4}
              placeholder="Describa los artefactos de interés encontrados, si hubo parseos fallidos u observaciones sobre el reporte generado..."
            />
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
            <p className="text-green-400">✓ Registro de análisis forense guardado exitosamente</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            disabled={!analisis.versionHerramienta || !analisis.rutaImagenOrigen || !analisis.rutaSalida || !analisis.hashOrigenSHA256 || !analisis.hashesCoinciden}
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
