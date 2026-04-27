import { useState } from 'react';
import { useForenseStore } from '../../store/forenseStore';
import { FileCheck, Save, Printer, Award, Gavel, AlertTriangle } from 'lucide-react';

export default function InformeTecnico() {
  const { adquisicionAndriller, adquisicionAleapp, dispositivoActual } = useForenseStore();
  
  const [informe, setInforme] = useState({
    motivo: '',
    descripcionEvidencia: '',
    examenesPracticados: `Sistema: Ubuntu 26.04 LTS\n- Andriller v3.6.2 (extracción ${adquisicionAndriller?.tipoExtraccion || 'lógica'})\n- ALEAPP v2.1.0 (análisis de artefactos)\n- Hash SHA-256 Original: ${adquisicionAndriller?.hashOrigenSHA256 || 'N/A'}\n- Hash SHA-256 Copia: ${adquisicionAndriller?.hashCopiaSHA256 || 'N/A'}`,
    resultados: adquisicionAleapp?.logEjecucion || '',
    conclusiones: '',
    fundamentacionLegal: 'Constitución Nacional (Art. 49), COPP Art. 188, Ley Especial contra Delitos Informáticos, ISO/IEC 27037:2012.',
    consumoEvidencia: 'La evidencia NO fue alterada ni consumida durante el proceso de peritación.',
    peritoActuante: '',
    credencialNumero: '',
  });

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="forensic-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-fluent-accent/10 rounded-lg text-fluent-accent">
              <FileCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-fluent-text">Emisión de Dictamen Pericial</h2>
              <p className="text-sm text-fluent-textSecondary">Generación del informe técnico-científico oficial</p>
            </div>
          </div>
          <div className="print:hidden flex gap-3">
            <button onClick={handlePrint} className="forensic-btn forensic-btn-secondary flex items-center gap-2">
              <Printer size={18} /> Vista Previa / Imprimir
            </button>
            <button className="forensic-btn forensic-btn-primary flex items-center gap-2">
              <Save size={18} /> Guardar Final
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="forensic-label">1. Motivo de la Peritación *</label>
              <textarea 
                value={informe.motivo} 
                onChange={(e) => setInforme({ ...informe, motivo: e.target.value })} 
                className="forensic-input" 
                rows={2} 
                placeholder="Indique el número de oficio, fiscalía solicitante y el objeto del peritaje."
              />
            </div>

            <div>
              <label className="forensic-label">2. Descripción de la Evidencia *</label>
              <textarea 
                value={informe.descripcionEvidencia} 
                onChange={(e) => setInforme({ ...informe, descripcionEvidencia: e.target.value })} 
                className="forensic-input" 
                rows={3} 
                placeholder={dispositivoActual ? `Dispositivo móvil ${dispositivoActual.marca} ${dispositivoActual.modelo}, IMEI: ${dispositivoActual.imei}, recibido en estado ${dispositivoActual.pantallaEstado}.` : 'Describa el estado físico y características del dispositivo.'}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gavel size={16} className="text-fluent-accent" />
                <label className="forensic-label mb-0">3. Exámenes Practicados (Metodología y Herramientas) *</label>
              </div>
              <textarea 
                value={informe.examenesPracticados} 
                onChange={(e) => setInforme({ ...informe, examenesPracticados: e.target.value })} 
                className="forensic-input font-mono text-xs" 
                rows={6} 
              />
            </div>

            <div>
              <label className="forensic-label">4. Resultados del Análisis *</label>
              <textarea 
                value={informe.resultados} 
                onChange={(e) => setInforme({ ...informe, resultados: e.target.value })} 
                className="forensic-input" 
                rows={5} 
                placeholder="Resumen de los artefactos y hallazgos obtenidos durante el procesamiento con ALEAPP."
              />
            </div>

            <div>
              <label className="forensic-label">5. Conclusiones Técnicas *</label>
              <textarea 
                value={informe.conclusiones} 
                onChange={(e) => setInforme({ ...informe, conclusiones: e.target.value })} 
                className="forensic-input border-l-4 border-l-fluent-accent" 
                rows={4} 
                placeholder="Juicio de valor técnico-científico basado en los hallazgos. No debe contener precalificación jurídica."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="forensic-label">6. Fundamentación Legal</label>
                <textarea 
                  value={informe.fundamentacionLegal} 
                  onChange={(e) => setInforme({ ...informe, fundamentacionLegal: e.target.value })} 
                  className="forensic-input text-xs" 
                  rows={3} 
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-fluent-accent-light" />
                  <label className="forensic-label mb-0">7. Consumo de Evidencia</label>
                </div>
                <textarea 
                  value={informe.consumoEvidencia} 
                  onChange={(e) => setInforme({ ...informe, consumoEvidencia: e.target.value })} 
                  className="forensic-input text-xs" 
                  rows={3} 
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-fluent-border">
            <div className="flex items-center gap-2 mb-6">
              <Award size={18} className="text-fluent-accent" />
              <h3 className="text-sm font-bold text-fluent-text uppercase tracking-widest">Identificación del Perito Informático</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="forensic-label">Nombre y Apellido del Perito</label>
                <input 
                  type="text" 
                  value={informe.peritoActuante} 
                  onChange={(e) => setInforme({ ...informe, peritoActuante: e.target.value })} 
                  className="forensic-input" 
                  placeholder="Ej: Ing. Juan Pérez" 
                />
              </div>
              <div>
                <label className="forensic-label">Número de Credencial / Registro</label>
                <input 
                  type="text" 
                  value={informe.credencialNumero} 
                  onChange={(e) => setInforme({ ...informe, credencialNumero: e.target.value })} 
                  className="forensic-input" 
                  placeholder="Ej: MP-IF-00123" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
