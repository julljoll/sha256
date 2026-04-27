import { Scale, Book, Shield } from 'lucide-react';

export default function ReferenciaLegal() {
  return (
    <div className="space-y-6">
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary-500" />
          Marco Legal y Estándares
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-primary-400 uppercase flex items-center gap-2">
              <Book size={14} /> Legislación Nacional
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• Constitución Nacional (Debido Proceso)</li>
              <li>• COPP Art. 188 (Resguardo de Evidencias)</li>
              <li>• Ley Especial contra Delitos Informáticos</li>
              <li>• Ley sobre Mensajes de Datos y Firmas</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-primary-400 uppercase flex items-center gap-2">
              <Shield size={14} /> Estándares ISO/NIST
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• ISO/IEC 27037:2012 (Colección)</li>
              <li>• ISO/IEC 27042:2015 (Análisis)</li>
              <li>• NIST SP 800-101 r1 (Móviles)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-primary-400 uppercase">Manuales Oficiales</h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• Manual Único de Cadena de Custodia</li>
              <li>• Guía de Buenas Prácticas ACPO</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forensic-light">
          <h3 className="text-sm font-bold text-white uppercase mb-4">Figuras de Carácter Continuo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
            <div className="bg-forensic-dark p-3 rounded border border-forensic-light">
              <span className="text-primary-400 font-bold block mb-1">PROCESO DE RESGUARDO</span>
              Protección y conservación en espacios especializados con control de acceso y condiciones óptimas.
            </div>
            <div className="bg-forensic-dark p-3 rounded border border-forensic-light">
              <span className="text-primary-400 font-bold block mb-1">ACTIVIDAD DE TRANSFERENCIA</span>
              Registro obligatorio de cada cambio de custodia (quién entrega y quién recibe).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

