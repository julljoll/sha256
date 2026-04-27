import { Shield, Smartphone, FileText, Microscope } from 'lucide-react';
import ReferenciaLegal from '../components/MarcoLegal/ReferenciaLegal';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sistema Forense Android</h1>
        <p className="text-gray-400">
          Gestión del procedimiento forense informático de dispositivos Android bajo el marco legal venezolano
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <FileText className="w-10 h-10 text-primary-500 mb-4" />, title: 'Consignación', desc: 'Registro de evidencia recibida por entrega voluntaria con fijación fotográfica.' },
          { icon: <Smartphone className="w-10 h-10 text-primary-500 mb-4" />, title: 'Adquisición', desc: 'Extracción forense con Andriller en modo solo lectura para garantizar integridad.' },
          { icon: <Microscope className="w-10 h-10 text-primary-500 mb-4" />, title: 'Análisis', desc: 'Procesamiento con ALEAPP para parseo de SQLite, Protobuf y eventos.' },
          { icon: <Shield className="w-10 h-10 text-primary-500 mb-4" />, title: 'Informe Técnico', desc: 'Generación del Dictamen Pericial conforme a normativa legal vigente.' },
        ].map((item) => (
          <div key={item.title} className="forensic-card p-6 hover:border-primary-500 transition-colors">
            {item.icon}
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <ReferenciaLegal />
    </div>
  );
}

