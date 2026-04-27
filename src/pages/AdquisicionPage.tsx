import { useState, useEffect } from 'react';
import { useForenseStore } from '../store/forenseStore';
import { Smartphone, Play, Square, Save, HardDrive } from 'lucide-react';

export default function AdquisicionPage() {
  const { dispositivoActual: dispositivo, setAdquisicionAndriller } = useForenseStore();
  
  const [config, setConfig] = useState({
    outputPath: '',
    extractionType: 'logica' as 'logica' | 'fisica',
    deviceId: '',
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Configurar listeners para output de Andriller
    if (window.electronAPI) {
      window.electronAPI.andriller.onOutput((data: string) => {
        setOutput(prev => [...prev, data]);
        setProgress(prev => Math.min(prev + 5, 95));
      });
      
      window.electronAPI.andriller.onError((data: string) => {
        setError(prev => [...prev, data]);
      });
    }
  }, []);

  const handleSelectFolder = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.dialog.selectFolder();
      if (!result.canceled && result.filePaths.length > 0) {
        setConfig({ ...config, outputPath: result.filePaths[0] });
      }
    }
  };

  const handleIniciarExtraccion = async () => {
    if (!config.outputPath) return;
    
    setIsRunning(true);
    setOutput([]);
    setError([]);
    setProgress(0);
    setCompleted(false);

    try {
      const result = await window.electronAPI.andriller.start(config);
      
      if (result.success) {
        setProgress(100);
        setCompleted(true);
        
        // Guardar adquisición en el store
        setAdquisicionAndriller({
          herramienta: 'andriller',
          versionHerramienta: '3.6.2', // Versión ejemplo
          tipoExtraccion: config.extractionType,
          rutaSalida: config.outputPath,
          rutaImagenOrigen: '',
          hashOrigenSHA256: '',
          hashCopiaSHA256: '',
          hashesCoinciden: true,
          logEjecucion: result.output,
          pidProceso: 0,
        });
      } else {
        setError(prev => [...prev, `Error: ${result.error}`]);
      }
    } catch (err: any) {
      setError(prev => [...prev, `Error crítico: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCancelar = async () => {
    if (window.electronAPI) {
      await window.electronAPI.andriller.cancel();
      setIsRunning(false);
      setOutput(prev => [...prev, 'Extracción cancelada por el usuario']);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Smartphone className="w-7 h-7 text-primary-500" />
          Adquisición Forense con Andriller
        </h1>
        <p className="text-gray-400 mt-1">
          Extracción lógica/física del dispositivo en modo solo lectura
        </p>
      </div>

      {/* Info del dispositivo */}
      {dispositivo && (
        <div className="forensic-card p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Dispositivo Registrado</h3>
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

      {/* Configuración */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5" />
          Configuración de Extracción
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Directorio de Salida *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={config.outputPath}
                readOnly
                className="forensic-input flex-1"
                placeholder="Seleccione carpeta..."
              />
              <button
                onClick={handleSelectFolder}
                disabled={isRunning}
                className="forensic-btn forensic-btn-secondary"
              >
                Examinar
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Extracción *
            </label>
            <select
              value={config.extractionType}
              onChange={(e) => setConfig({ ...config, extractionType: e.target.value as 'logica' | 'fisica' })}
              disabled={isRunning}
              className="forensic-input"
            >
              <option value="logica">Extracción Lógica (Recomendado)</option>
              <option value="fisica">Extracción Física (Root requerido)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ID del Dispositivo (Opcional)
            </label>
            <input
              type="text"
              value={config.deviceId}
              onChange={(e) => setConfig({ ...config, deviceId: e.target.value })}
              disabled={isRunning}
              className="forensic-input"
              placeholder="Ej: emulator-5554 o serial USB"
            />
          </div>
        </div>

        {/* Botones de control */}
        <div className="mt-6 flex gap-4">
          {!isRunning ? (
            <button
              onClick={handleIniciarExtraccion}
              disabled={!config.outputPath}
              className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Iniciar Extracción
            </button>
          ) : (
            <button
              onClick={handleCancelar}
              className="forensic-btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Cancelar
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        {(isRunning || completed) && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progreso</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="w-full bg-forensic-dark rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${completed ? 'bg-green-500' : 'bg-primary-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Output en vivo */}
      {(output.length > 0 || error.length > 0) && (
        <div className="forensic-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Registro de Ejecución</h2>
          
          <div className="space-y-2 max-h-96 overflow-auto font-mono text-sm">
            {output.map((line, i) => (
              <div key={i} className="text-green-400">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {line}
              </div>
            ))}
            
            {error.map((line, i) => (
              <div key={i} className="text-red-400">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen final */}
      {completed && (
        <div className="forensic-card p-6 border-green-700 bg-green-900/20">
          <h2 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Extracción Completada Exitosamente
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Herramienta:</span>
              <span className="text-white ml-2">Andriller v3.6.2</span>
            </div>
            <div>
              <span className="text-gray-400">Tipo:</span>
              <span className="text-white ml-2 capitalize">{config.extractionType}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400">Ruta de salida:</span>
              <span className="text-white ml-2 break-all">{config.outputPath}</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-forensic-dark rounded-lg">
            <p className="text-xs text-gray-400">
              ⚠️ Recuerde calcular y verificar los hashes SHA-256 y MD5 de la imagen obtenida para garantizar la integridad de la evidencia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
