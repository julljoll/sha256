import { useState } from 'react';
import { useForenseStore, type Adquisicion } from '../../store/forenseStore';
import { Smartphone, Save, ShieldCheck, Database, FileCode, CheckCircle2 } from 'lucide-react';

export default function AdquisicionTecnica() {
  const { dispositivoActual: dispositivo, adquisicionAndriller: storeAdquisicion, setAdquisicionAndriller } = useForenseStore();
  
  const [adquisicion, setAdquisicionLocal] = useState<Adquisicion>({
    herramienta: 'andriller',
    versionHerramienta: storeAdquisicion?.versionHerramienta || '3.6.2',
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {dispositivo && (
        <div className="forensic-card p-6 bg-fluent-accent/5 border-fluent-accent/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-fluent-accent/20 rounded-md text-fluent-accent">
              <Smartphone size={18} />
            </div>
            <h3 className="text-sm font-bold text-fluent-accent-light uppercase tracking-widest">
              Dispositivo en Custodia
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[10px] uppercase font-bold text-fluent-textSecondary mb-1 tracking-wider">Marca y Modelo</p>
              <p className="text-sm font-medium text-fluent-text">{dispositivo.marca} {dispositivo.modelo}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-fluent-textSecondary mb-1 tracking-wider">Identificador IMEI</p>
              <p className="text-sm font-mono text-fluent-text">{dispositivo.imei}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-fluent-textSecondary mb-1 tracking-wider">Estado de Pantalla</p>
              <p className="text-sm font-medium text-fluent-text capitalize">{dispositivo.pantallaEstado}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-fluent-textSecondary mb-1 tracking-wider">Modo de Aislamiento</p>
              <p className="text-sm font-medium text-fluent-text">Bolsa Faraday</p>
            </div>
          </div>
        </div>
      )}

      <div className="forensic-card p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-fluent-accent/10 rounded-lg text-fluent-accent">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fluent-text">Parámetros de Adquisición Forense</h2>
            <p className="text-sm text-fluent-textSecondary">Configuración de herramientas y validación de integridad (Andriller)</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="forensic-label">Versión de Herramienta *</label>
            <div className="relative">
              <FileCode className="absolute left-3 top-3 text-fluent-textSecondary" size={16} />
              <input 
                type="text" 
                value={adquisicion.versionHerramienta} 
                onChange={(e) => setAdquisicionLocal({ ...adquisicion, versionHerramienta: e.target.value })} 
                className="forensic-input pl-10" 
                placeholder="Ej: 3.6.2" 
              />
            </div>
          </div>
          <div>
            <label className="forensic-label">Método de Extracción *</label>
            <select 
              value={adquisicion.tipoExtraccion} 
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, tipoExtraccion: e.target.value as any })} 
              className="forensic-input"
            >
              <option value="logica">Extracción Lógica (Recomendado)</option>
              <option value="fisica">Extracción Física (Root/Bootloader)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="forensic-label">Ruta de Destino para Imagen Forense *</label>
            <input 
              type="text" 
              value={adquisicion.rutaSalida} 
              onChange={(e) => setAdquisicionLocal({ ...adquisicion, rutaSalida: e.target.value })} 
              className="forensic-input font-mono text-xs" 
              placeholder="Ej: /mnt/forense/casos/MP-2024-001/adquisicion/" 
            />
          </div>

          <div className="md:col-span-2 mt-4 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Database size={18} className="text-fluent-accent" />
              <h3 className="text-sm font-bold text-fluent-text uppercase tracking-widest">Validación de Integridad Hash</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6 bg-fluent-surfaceActive/20 p-6 rounded-fluent-card border border-fluent-border">
              <div>
                <label className="forensic-label">Firma Digital SHA-256 (Original / Master)</label>
                <input 
                  type="text" 
                  value={adquisicion.hashOrigenSHA256} 
                  onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashOrigenSHA256: e.target.value })} 
                  className="forensic-input font-mono text-[10px] tracking-wider" 
                  placeholder="0000000000000000000000000000000000000000000000000000000000000000"
                />
              </div>
              <div>
                <label className="forensic-label">Firma Digital SHA-256 (Copia de Trabajo)</label>
                <input 
                  type="text" 
                  value={adquisicion.hashCopiaSHA256} 
                  onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashCopiaSHA256: e.target.value })} 
                  className="forensic-input font-mono text-[10px] tracking-wider" 
                  placeholder="0000000000000000000000000000000000000000000000000000000000000000"
                />
              </div>
              
              <label className={`flex items-center gap-4 p-4 rounded-fluent-btn border transition-all cursor-pointer ${adquisicion.hashesCoinciden ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-fluent-surface border-fluent-border text-fluent-textSecondary'}`}>
                <input 
                  type="checkbox" 
                  checked={adquisicion.hashesCoinciden} 
                  onChange={(e) => setAdquisicionLocal({ ...adquisicion, hashesCoinciden: e.target.checked })} 
                  className="w-5 h-5 rounded border-fluent-border text-fluent-accent focus:ring-offset-fluent-bg" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold flex items-center gap-2">
                    {adquisicion.hashesCoinciden && <CheckCircle2 size={16} />}
                    Certificación de Integridad
                  </span>
                  <span className="text-[10px] uppercase tracking-wider opacity-70">Certifico que los valores hash coinciden plenamente</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-fluent-border flex justify-end">
          <button 
            onClick={handleGuardar} 
            disabled={!adquisicion.hashesCoinciden || !adquisicion.rutaSalida} 
            className="forensic-btn forensic-btn-primary flex items-center gap-2 px-8"
          >
            <Save className="w-5 h-5" /> Registrar Adquisición
          </button>
        </div>
      </div>
    </div>
  );
}
