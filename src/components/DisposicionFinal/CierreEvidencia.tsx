import { XCircle, RefreshCw, Trash2, CheckCircle } from 'lucide-react';

export default function CierreEvidencia() {
  return (
    <div className="space-y-6">
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Fase de Disposición Final
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Cierre del ciclo de vida de la evidencia física y digital.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Devolución', icon: <RefreshCw size={20} />, desc: 'Restitución al propietario' },
            { title: 'Entrega', icon: <CheckCircle size={20} />, desc: 'Cesión a ente autorizado' },
            { title: 'Destrucción', icon: <Trash2 size={20} />, desc: 'Inutilización autorizada' },
            { title: 'Consumida', icon: <XCircle size={20} />, desc: 'Agotada en peritaje' }
          ].map((item) => (
            <div key={item.title} className="bg-forensic-dark p-4 rounded-lg border border-forensic-light hover:border-primary-500 cursor-pointer transition-colors">
              <div className="text-primary-500 mb-2">{item.icon}</div>
              <h4 className="text-white text-sm font-medium">{item.title}</h4>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
