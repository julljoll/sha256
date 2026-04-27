import { useState } from 'react';
import { useForenseStore } from '../../store/forenseStore';
import { FileCheck, Save, Printer } from 'lucide-react';

export default function InformeTecnico() {
  const { adquisicionAndriller } = useForenseStore();
  
  const [informe, setInforme] = useState({
    motivo: '',
    descripcionEvidencia: '',
    examenesPracticados: '',
    resultados: '',
    conclusiones: '',
    fundamentacionLegal: ['COPP Art. 188'],
    peritoActuante: '',
    credencialNumero: '',
  });

  return (
    <div className="space-y-6">
      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary-500" />
          Generación de Dictamen Pericial
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">1. Motivo de la Peritación *</label>
            <textarea value={informe.motivo} onChange={(e) => setInforme({ ...informe, motivo: e.target.value })} className="forensic-input" rows={2} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">2. Descripción de la Evidencia *</label>
            <textarea value={informe.descripcionEvidencia} onChange={(e) => setInforme({ ...informe, descripcionEvidencia: e.target.value })} className="forensic-input" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">3. Exámenes Practicados (Software/Versiones) *</label>
            <textarea 
              value={informe.examenesPracticados} 
              onChange={(e) => setInforme({ ...informe, examenesPracticados: e.target.value })} 
              className="forensic-input" 
              rows={4} 
              placeholder={`Sistema: Ubuntu 26.04 LTS (Kernel 7.0)\n- Andriller v3.6.2 (extracción ${adquisicionAndriller?.tipoExtraccion || 'lógica'})\n- ALEAPP v2.1.0`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">4. Conclusiones *</label>
            <textarea value={informe.conclusiones} onChange={(e) => setInforme({ ...informe, conclusiones: e.target.value })} className="forensic-input" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre del Perito" className="forensic-input" />
            <input type="text" placeholder="Credencial Nro" className="forensic-input" />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 print:hidden">
          <button onClick={() => window.print()} className="forensic-btn forensic-btn-secondary">
            <Printer size={16} className="mr-2" /> Imprimir
          </button>
          <button className="forensic-btn forensic-btn-primary">
            <Save size={16} className="mr-2" /> Guardar Informe
          </button>
        </div>
      </div>
    </div>
  );
}
