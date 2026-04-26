import { Shield, Smartphone, FileText, Microscope } from 'lucide-react';

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
        <div className="forensic-card p-6">
          <FileText className="w-10 h-10 text-primary-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Consignación</h3>
          <p className="text-sm text-gray-400">
            Registro de evidencia recibida por entrega voluntaria con fijación fotográfica y documental
          </p>
        </div>

        <div className="forensic-card p-6">
          <Smartphone className="w-10 h-10 text-primary-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Adquisición</h3>
          <p className="text-sm text-gray-400">
            Extracción forense con Andriller en modo solo lectura para garantizar integridad
          </p>
        </div>

        <div className="forensic-card p-6">
          <Microscope className="w-10 h-10 text-primary-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Análisis</h3>
          <p className="text-sm text-gray-400">
            Procesamiento con ALEAPP para parseo de SQLite, Protobuf y reconstrucción de eventos
          </p>
        </div>

        <div className="forensic-card p-6">
          <Shield className="w-10 h-10 text-primary-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Informe Técnico</h3>
          <p className="text-sm text-gray-400">
            Generación del Dictamen Pericial conforme a normativa legal vigente
          </p>
        </div>
      </div>

      {/* Marco Legal */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Marco Legal Venezolano</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Constitución Nacional</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Debido proceso</li>
              <li>• Tutela judicial efectiva</li>
              <li>• Privacidad de las comunicaciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">COPP</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Art. 188: Resguardo de evidencias</li>
              <li>• Régimen de licitud de la prueba</li>
              <li>• Obligatoriedad de cadena de custodia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Leyes Especiales</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Ley Especial contra Delitos Informáticos</li>
              <li>• Ley de Infogobierno</li>
              <li>• Ley sobre Mensajes de Datos y Firmas Electrónicas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Estándares Internacionales</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• ISO/IEC 27037:2012</li>
              <li>• ISO/IEC 27042:2015</li>
              <li>• NIST SP 800-101 r1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Herramientas */}
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Herramientas Forenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-forensic-dark rounded-lg p-4 border border-forensic-light">
            <h3 className="text-lg font-medium text-white mb-2">Andriller</h3>
            <p className="text-sm text-gray-400 mb-3">
              Extracción lógica y física en dispositivos Android
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✓ Solo lectura (no destructivo)</li>
              <li>✓ Forensemente sólido</li>
              <li>✓ Soporte para múltiples dispositivos</li>
            </ul>
          </div>
          <div className="bg-forensic-dark rounded-lg p-4 border border-forensic-light">
            <h3 className="text-lg font-medium text-white mb-2">ALEAPP</h3>
            <p className="text-sm text-gray-400 mb-3">
              Android Logs Events And Protobuf Parser
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✓ Parseo de SQLite</li>
              <li>✓ Análisis de Protobuf</li>
              <li>✓ Reconstrucción de eventos WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
