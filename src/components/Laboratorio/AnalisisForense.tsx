import { useState } from 'react';
import { useForenseStore, type Adquisicion } from '../../store/forenseStore';
import { Microscope, Save, Activity, FileJson, AlertCircle } from 'lucide-react';

export default function AnalisisForense() {
  const { adquisicionAndriller, adquisicionAleapp: storeAnalisis, setAdquisicionAleapp } = useForenseStore();
  
  const [analisis, setAnalisisLocal] = useState<Adquisicion>({
    herramienta: 'aleapp',
    versionHerramienta: storeAnalisis?.versionHerramienta || '2.1.0',
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="forensic-card p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-fluent-accent/10 rounded-lg text-fluent-accent">
            <Microscope size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fluent-text">Procesamiento de Artefactos (ALEAPP)</h2>
            <p className="text-sm text-fluent-textSecondary">Análisis y parseo técnico de bases de datos y registros del sistema</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="forensic-label">Versión de ALEAPP *</label>
            <input 
              type="text" 
              value={analisis.versionHerramienta} 
              onChange={(e) => setAnalisisLocal({ ...analisis, versionHerramienta: e.target.value })} 
              className="forensic-input" 
              placeholder="Ej: 2.1.0" 
            />
          </div>
          <div>
            <label className="forensic-label">Alcance del Peritaje *</label>
            <select 
              value={analisis.tipoExtraccion} 
              onChange={(e) => setAnalisisLocal({ ...analisis, tipoExtraccion: e.target.value as any })} 
              className="forensic-input"
            >
              <option value="completo">Análisis Forense Completo</option>
              <option value="whatsapp">Mensajería Instantánea (WhatsApp)</option>
              <option value="timeline">Línea de Tiempo de Eventos (Timeline)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="forensic-label">Directorio de Reporte de Salida *</label>
            <div className="relative">
              <FileJson className="absolute left-3 top-3 text-fluent-textSecondary" size={16} />
              <input 
                type="text" 
                value={analisis.rutaSalida} 
                onChange={(e) => setAnalisisLocal({ ...analisis, rutaSalida: e.target.value })} 
                className="forensic-input pl-10 font-mono text-xs" 
                placeholder="Ej: /mnt/forense/casos/MP-2024-001/reportes/" 
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-fluent-accent" />
              <label className="forensic-label mb-0">Hallazgos Relevantes y Log de Artefactos</label>
            </div>
            <textarea 
              value={analisis.logEjecucion} 
              onChange={(e) => setAnalisisLocal({ ...analisis, logEjecucion: e.target.value })} 
              className="forensic-input" 
              rows={6} 
              placeholder="Documente aquí los artefactos encontrados de mayor relevancia forense (chats, ubicaciones, llamadas, etc.)..." 
            />
          </div>
        </div>

        {!adquisicionAndriller && (
          <div className="mt-8 p-4 bg-fluent-accent/5 border border-fluent-accent/20 rounded-fluent-btn flex items-start gap-3">
            <AlertCircle className="text-fluent-accent shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-fluent-textSecondary leading-relaxed">
              <span className="font-bold text-fluent-text">Aviso:</span> No se detectó una adquisición previa en esta sesión. Asegúrese de que la ruta de la imagen forense sea correcta antes de procesar los resultados.
            </p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-fluent-border flex justify-end">
          <button 
            onClick={handleGuardar} 
            className="forensic-btn forensic-btn-primary flex items-center gap-2 px-8"
          >
            <Save className="w-5 h-5" /> Registrar Resultados del Análisis
          </button>
        </div>
      </div>
    </div>
  );
}
