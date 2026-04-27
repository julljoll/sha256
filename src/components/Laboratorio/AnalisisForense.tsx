import { useState } from 'react';
import { useForenseStore, type Adquisicion } from '../../store/forenseStore';
import { Microscope, Save } from 'lucide-react';

export default function AnalisisForense() {
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

  const handleGuardar = () => {
    setAdquisicionAleapp(analisis);
  };

  return (
    <div className="space-y-6">
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Microscope className="w-5 h-5 text-primary-500" />
          Análisis con ALEAPP
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Versión de ALEAPP *</label>
            <input type="text" value={analisis.versionHerramienta} onChange={(e) => setAnalisisLocal({ ...analisis, versionHerramienta: e.target.value })} className="forensic-input" placeholder="Ej: 2.1.0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Alcance del Análisis *</label>
            <select value={analisis.tipoExtraccion} onChange={(e) => setAnalisisLocal({ ...analisis, tipoExtraccion: e.target.value as any })} className="forensic-input">
              <option value="completo">Análisis Completo</option>
              <option value="whatsapp">Solo WhatsApp</option>
              <option value="timeline">Timeline</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Ruta del Reporte de Salida *</label>
            <input type="text" value={analisis.rutaSalida} onChange={(e) => setAnalisisLocal({ ...analisis, rutaSalida: e.target.value })} className="forensic-input" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones / Log de Artefactos</label>
            <textarea value={analisis.logEjecucion} onChange={(e) => setAnalisisLocal({ ...analisis, logEjecucion: e.target.value })} className="forensic-input" rows={4} placeholder="Hallazgos relevantes..." />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleGuardar} className="forensic-btn forensic-btn-primary">
            <Save className="w-4 h-4 mr-2" /> Guardar Análisis
          </button>
        </div>
      </div>
    </div>
  );
}
