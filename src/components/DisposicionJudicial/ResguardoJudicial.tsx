import { Shield, Clock, MapPin } from 'lucide-react';

export default function ResguardoJudicial() {
  return (
    <div className="space-y-6">
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-500" />
          Fase de Disposición Judicial
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Control de la evidencia a disposición del Poder Judicial tras la admisión de la acusación.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-forensic-dark p-4 rounded-lg border border-forensic-light">
            <h3 className="text-white font-medium mb-2 flex items-center gap-2">
              <MapPin size={16} /> Depósito Judicial
            </h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• Ubicación en áreas especializadas</li>
              <li>• Control de acceso restringido</li>
              <li>• Condiciones ambientales controladas</li>
            </ul>
          </div>
          
          <div className="bg-forensic-dark p-4 rounded-lg border border-forensic-light">
            <h3 className="text-white font-medium mb-2 flex items-center gap-2">
              <Clock size={16} /> Exhibición en Audiencia
            </h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• Protocolo de traslado seguro</li>
              <li>• Registro de apertura de precintos</li>
              <li>• Acta de exhibición de evidencias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
