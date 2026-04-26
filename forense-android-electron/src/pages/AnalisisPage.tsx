import { useState, useEffect } from 'react';
import { useForenseStore } from '../store/forenseStore';
import { Microscope, Play, Square, Save, FolderOpen } from 'lucide-react';

export default function AnalisisPage() {
  const { adquisicionAndriller, setAdquisicionAleapp } = useForenseStore();
  
  const [config, setConfig] = useState({
    imagePath: '',
    outputPath: '',
    analysisType: 'completo' as 'completo' | 'whatsapp' | 'timeline',
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Configurar listeners para output de ALEAPP
    if (window.electronAPI) {
      window.electronAPI.aleapp.onOutput((data: string) => {
        setOutput(prev => [...prev, data]);
        setProgress(prev => Math.min(prev + 3, 95));
      });
      
      window.electronAPI.aleapp.onError((data: string) => {
        setError(prev => [...prev, data]);
      });
    }
  }, []);

  useEffect(() => {
    // Pre-llenar ruta de imagen si viene de adquisición Andriller
    if (adquisicionAndriller?.rutaSalida) {
      setConfig(prev => ({ ...prev, imagePath: adquisicionAndriller.rutaSalida }));
    }
  }, [adquisicionAndriller]);

  const handleSelectImageFolder = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.dialog.selectFolder();
      if (!result.canceled && result.filePaths.length > 0) {
        setConfig({ ...config, imagePath: result.filePaths[0] });
      }
    }
  };

  const handleSelectOutputFolder = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.dialog.selectFolder();
      if (!result.canceled && result.filePaths.length > 0) {
        setConfig({ ...config, outputPath: result.filePaths[0] });
      }
    }
  };

  const handleIniciarAnalisis = async () => {
    if (!config.imagePath || !config.outputPath) return;
    
    setIsRunning(true);
    setOutput([]);
    setError([]);
    setProgress(0);
    setCompleted(false);

    try {
      const result = await window.electronAPI.aleapp.start(config);
      
      if (result.success) {
        setProgress(100);
        setCompleted(true);
        
        // Guardar adquisición en el store
        setAdquisicionAleapp({
          herramienta: 'aleapp',
          versionHerramienta: '2.1.0', // Versión ejemplo
          tipoExtraccion: 'analisis',
          rutaSalida: config.outputPath,
          rutaImagenOrigen: config.imagePath,
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
      await window.electronAPI.aleapp.cancel();
      setIsRunning(false);
      setOutput(prev => [...prev, 'Análisis cancelado por el usuario']);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Microscope className="w-7 h-7 text-primary-500" />
          Análisis Forense con ALEAPP
        </h1>
        <p className="text-gray-400 mt-1">
          Android Logs Events And Protobuf Parser - Procesamiento de evidencia digital
        </p>
      </div>

      {/* Info de la adquisición previa */}
      {adquisicionAndriller && (
        <div className="forensic-card p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Adquisición Andriller Disponible</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Herramienta:</span>
              <span className="text-white ml-2">{adquisicionAndriller.herramienta}</span>
            </div>
            <div>
              <span className="text-gray-500">Tipo:</span>
              <span className="text-white ml-2 capitalize">{adquisicionAndriller.tipoExtraccion}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Ruta:</span>
              <span className="text-white ml-2 break-all">{adquisicionAndriller.rutaSalida}</span>
            </div>
          </div>
        </div>
      )}

      {/* Configuración */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Configuración del Análisis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagen/Directorio de Entrada *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={config.imagePath}
                readOnly
                className="forensic-input flex-1"
                placeholder="Seleccione carpeta de extracción..."
              />
              <button
                onClick={handleSelectImageFolder}
                disabled={isRunning}
                className="forensic-btn forensic-btn-secondary"
              >
                Examinar
              </button>
            </div>
          </div>
          
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
                placeholder="Seleccione carpeta de reporte..."
              />
              <button
                onClick={handleSelectOutputFolder}
                disabled={isRunning}
                className="forensic-btn forensic-btn-secondary"
              >
                Examinar
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Análisis *
            </label>
            <select
              value={config.analysisType}
              onChange={(e) => setConfig({ ...config, analysisType: e.target.value as any })}
              disabled={isRunning}
              className="forensic-input"
            >
              <option value="completo">Análisis Completo (Todos los artefactos)</option>
              <option value="whatsapp">Solo WhatsApp</option>
              <option value="timeline">Timeline de Eventos</option>
            </select>
          </div>
        </div>

        {/* Botones de control */}
        <div className="mt-6 flex gap-4">
          {!isRunning ? (
            <button
              onClick={handleIniciarAnalisis}
              disabled={!config.imagePath || !config.outputPath}
              className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Iniciar Análisis
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
        {isRunning || completed && (
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
            Análisis Completado Exitosamente
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Herramienta:</span>
              <span className="text-white ml-2">ALEAPP v2.1.0</span>
            </div>
            <div>
              <span className="text-gray-400">Tipo:</span>
              <span className="text-white ml-2 capitalize">{config.analysisType}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400">Reporte generado en:</span>
              <span className="text-white ml-2 break-all">{config.outputPath}</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-forensic-dark rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Artefactos Analizados</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Mensajes WhatsApp</li>
                <li>• Llamadas y contactos</li>
                <li>• Ubicación GPS</li>
                <li>• Navegación web</li>
              </ul>
            </div>
            <div className="p-4 bg-forensic-dark rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Formatos de Salida</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• HTML interactivo</li>
                <li>• CSV/Excel</li>
                <li>• Timeline JSON</li>
                <li>• Reporte PDF</li>
              </ul>
            </div>
            <div className="p-4 bg-forensic-dark rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Próximos Pasos</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>1. Revisar reporte HTML</li>
                <li>2. Seleccionar evidencias</li>
                <li>3. Generar informe técnico</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
