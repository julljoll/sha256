import { useState } from 'react';
import { useForenseStore, type Adquisicion } from '../../store/forenseStore';
import { Smartphone, Save, ShieldCheck, Database } from 'lucide-react';

export default function AdquisicionTecnica() {
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



  const handleGuardar = () => {
    setAdquisicionAndriller(adquisicion);
  };

  return (
    <div className="space-y-6">
      {dispositivo && (
        <div className="forensic-card p-4 bg-primary-900/10 border-primary-500/20">
          <h3 className="text-sm font-medium text-primary-400 mb-2 flex items-center gap-2">
            <Smartphone size={14} /> Dispositivo en Custodia
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <p><span className="text-gray-500">Marca/Modelo:</span> <span className="text-white ml-1">{dispositivo.marca} {dispositivo.modelo}</span></p>
            <p><span className="text-gray-500">IMEI:</span> <span className="text-white ml-1">{dispositivo.imei}</span></p>
          </div>
        </div>
      )}

      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary-500" />
          Datos Técnicos de la Adquisición
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Versión de Andriller *</label>
            <input type="text" value={adquisicion.versionHerramienta} onChange={(e) => setAdquisicionLocal({ ...adquisicion, versionHerramienta: e.target.value })} className="forensic-input" placeholder="Ej: 3.6.2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Extracción *</label>
            <select value={adquisicion.tipoExtraccion} onChange={(e) => setAdquisicionLocal({ ...adquisicion, tipoExtraccion: e.target.value as any })} className="forensic-input">
              <option value="logica">Extracción Lógica</option>
              <option value="fisica">Extracción Física</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Ruta de Salida *</label>
            <input type="text" value={adquisicion.rutaSalida} onChange={(e) => setAdquisicionLocal({ ...adquisicion, rutaSalida: e.target.value })} className="forensic-input" placeholder="Ej: /casos/MP-2024-001/adquisicion" />
          </div>

          <div className="md:col-span-2 border-t border-forensic-light pt-4 mt-2">
            <h3 className="text-md font-medium text-white mb-4 flex items-center gap-2">
              <Database size={16} /> Validación de Integridad
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hash SHA-256 (Original)</label>
                <input type="text" value={adquisicion.hashOrigenSHA256} onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashOrigenSHA256: e.target.value })} className="forensic-input font-mono text-xs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hash SHA-256 (Copia)</label>
                <input type="text" value={adquisicion.hashCopiaSHA256} onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashCopiaSHA256: e.target.value })} className="forensic-input font-mono text-xs" />
              </div>
              <label className="flex items-center gap-3 p-3 bg-forensic-dark rounded border border-forensic-light cursor-pointer">
                <input type="checkbox" checked={adquisicion.hashesCoinciden} onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashesCoinciden: e.target.checked })} className="w-5 h-5 rounded text-primary-600" />
                <span className="text-sm text-gray-300">Certifico que los hashes coinciden (Integridad garantizada)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleGuardar} disabled={!adquisicion.hashesCoinciden} className="forensic-btn forensic-btn-primary">
            <Save className="w-4 h-4 mr-2" /> Guardar Registro
          </button>
        </div>
      </div>
    </div>
  );
}
