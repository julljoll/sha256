import { useState } from 'react';
import { useForenseStore } from '../store/forenseStore';
import { FileCheck, Save, Download, Printer } from 'lucide-react';

export default function InformePage() {
  const { casoActual: caso, dispositivoActual: dispositivo, prccActual: prcc, adquisicionAndriller } = useForenseStore();
  
  const [informe, setInforme] = useState({
    motivo: '',
    descripcionEvidencia: '',
    examenesPracticados: '',
    resultados: '',
    conclusiones: '',
    fundamentacionLegal: ['COPP Art. 188', 'Constitución Nacional'],
    peritoActuante: '',
    credencialNumero: '',
  });

  const handleGenerarInforme = () => {
    // Aquí se generaría el PDF del informe técnico
    console.log('Generando informe:', informe);
    alert('Informe generado exitosamente (simulación)');
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileCheck className="w-7 h-7 text-primary-500" />
            Informe Técnico Pericial
          </h1>
          <p className="text-gray-400 mt-1">
            Generación del Dictamen Pericial conforme al marco legal venezolano
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleImprimir}
            className="forensic-btn forensic-btn-secondary flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
          <button
            onClick={handleGenerarInforme}
            className="forensic-btn forensic-btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Generar Informe
          </button>
        </div>
      </div>

      {/* Resumen del caso */}
      <div className="forensic-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Resumen del Caso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caso && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Información del Caso</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Número:</span> <span className="text-white">{caso.numeroCaso}</span></p>
                <p><span className="text-gray-500">Fiscal:</span> <span className="text-white">{caso.fiscal}</span></p>
                <p><span className="text-gray-500">Fecha:</span> <span className="text-white">{caso.fechaInicio}</span></p>
              </div>
            </div>
          )}
          
          {dispositivo && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Dispositivo</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Equipo:</span> <span className="text-white">{dispositivo.marca} {dispositivo.modelo}</span></p>
                <p><span className="text-gray-500">IMEI:</span> <span className="text-white">{dispositivo.imei}</span></p>
              </div>
            </div>
          )}
          
          {prcc && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Cadena de Custodia</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">PRCC:</span> <span className="text-white">{prcc.numeroPRCC}</span></p>
                <p><span className="text-gray-500">Funcionario:</span> <span className="text-white">{prcc.funcionarioColector}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estructura del Dictamen */}
      <div className="forensic-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Estructura del Dictamen Pericial</h2>
        
        <div className="space-y-6">
          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              1. Motivo *
            </label>
            <textarea
              value={informe.motivo}
              onChange={(e) => setInforme({ ...informe, motivo: e.target.value })}
              className="forensic-input"
              rows={3}
              placeholder="Razón por la cual se practica la peritación (oficio, solicitud fiscal, etc.)"
            />
          </div>

          {/* Descripción de la Evidencia */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              2. Descripción de la Evidencia *
            </label>
            <textarea
              value={informe.descripcionEvidencia}
              onChange={(e) => setInforme({ ...informe, descripcionEvidencia: e.target.value })}
              className="forensic-input"
              rows={4}
              placeholder="Estado en que se halló y recibió la evidencia física"
            />
          </div>

          {/* Exámenes Practicados */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              3. Exámenes Practicados *
            </label>
            <textarea
              value={informe.examenesPracticados}
              onChange={(e) => setInforme({ ...informe, examenesPracticados: e.target.value })}
              className="forensic-input"
              rows={5}
              placeholder={`Detalle de softwares utilizados:\n- Andriller v3.6.2 (extracción ${adquisicionAndriller?.tipoExtraccion || 'lógica'})\n- ALEAPP v2.1.0 (análisis de artefactos)\n\nTécnicas aplicadas y valores Hash calculados`}
            />
          </div>

          {/* Resultados */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              4. Resultados *
            </label>
            <div className="border border-forensic-light rounded-md p-4 bg-forensic-dark">
              <p className="text-xs text-gray-400 mb-3">Tabla de resultados con nombre nativo, fechas, ruta, tamaño y Hash individual</p>
              <textarea
                value={informe.resultados}
                onChange={(e) => setInforme({ ...informe, resultados: e.target.value })}
                className="forensic-input"
                rows={6}
                placeholder="Describa los hallazgos principales del análisis..."
              />
            </div>
          </div>

          {/* Conclusiones */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              5. Conclusiones *
            </label>
            <textarea
              value={informe.conclusiones}
              onChange={(e) => setInforme({ ...informe, conclusiones: e.target.value })}
              className="forensic-input"
              rows={4}
              placeholder="Juicio de valor técnico-científico sin precalificación jurídica"
            />
            <p className="text-xs text-gray-500 mt-1">
              ⚠️ Las conclusiones deben ser objetivas y basadas únicamente en aspectos técnico-científicos
            </p>
          </div>

          {/* Fundamentación Legal */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              6. Fundamentación Legal
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Constitución Nacional - Debido Proceso',
                'COPP Art. 188 - Resguardo de Evidencias',
                'Ley Especial contra Delitos Informáticos',
                'Ley de Infogobierno',
                'Ley sobre Mensajes de Datos y Firmas Electrónicas (Art. 4, 7, 8)',
                'ISO/IEC 27037:2012',
                'ISO/IEC 27042:2015',
                'NIST SP 800-101 r1'
              ].map((ley) => (
                <label key={ley} className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={informe.fundamentacionLegal.includes(ley)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInforme({ ...informe, fundamentacionLegal: [...informe.fundamentacionLegal, ley] });
                      } else {
                        setInforme({ 
                          ...informe, 
                          fundamentacionLegal: informe.fundamentacionLegal.filter(l => l !== ley) 
                        });
                      }
                    }}
                    className="rounded border-forensic-light bg-forensic-dark text-primary-600 focus:ring-primary-500"
                  />
                  {ley}
                </label>
              ))}
            </div>
          </div>

          {/* Datos del Perito */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Perito Actuante *
              </label>
              <input
                type="text"
                value={informe.peritoActuante}
                onChange={(e) => setInforme({ ...informe, peritoActuante: e.target.value })}
                className="forensic-input"
                placeholder="Nombre completo del perito"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Credencial
              </label>
              <input
                type="text"
                value={informe.credencialNumero}
                onChange={(e) => setInforme({ ...informe, credencialNumero: e.target.value })}
                className="forensic-input"
                placeholder="Número de identificación profesional"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Consumo de Evidencia */}
      <div className="forensic-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Consumo de Evidencia</h2>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="radio"
              name="consumo"
              defaultChecked
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-300">
              La evidencia NO fue alterada ni consumida durante el peritaje
            </span>
          </label>
          
          <label className="flex items-center gap-3 text-sm">
            <input
              type="radio"
              name="consumo"
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-300">
              Consumo parcial de la evidencia (especificar a continuación)
            </span>
          </label>
          
          <textarea
            className="forensic-input"
            rows={2}
            placeholder="Especifique qué parte de la evidencia fue consumida o alterada durante el análisis..."
          />
        </div>
      </div>

      {/* Vista previa del informe */}
      <div className="forensic-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Informe
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-forensic-dark rounded-lg border border-forensic-light hover:border-primary-500 transition-colors text-left">
            <h4 className="text-white font-medium mb-1">PDF</h4>
            <p className="text-xs text-gray-400">Formato oficial para presentación</p>
          </button>
          
          <button className="p-4 bg-forensic-dark rounded-lg border border-forensic-light hover:border-primary-500 transition-colors text-left">
            <h4 className="text-white font-medium mb-1">DOCX</h4>
            <p className="text-xs text-gray-400">Editable para revisiones</p>
          </button>
          
          <button className="p-4 bg-forensic-dark rounded-lg border border-forensic-light hover:border-primary-500 transition-colors text-left">
            <h4 className="text-white font-medium mb-1">JSON</h4>
            <p className="text-xs text-gray-400">Datos estructurados para sistema</p>
          </button>
        </div>
      </div>
    </div>
  );
}
