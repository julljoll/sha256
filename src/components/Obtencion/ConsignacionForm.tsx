import { useState, memo } from 'react';
import { useForenseStore, type Caso, type Dispositivo, type PRCC } from '../../store/forenseStore';
import { FileText, Camera, ChevronRight, ChevronLeft, Printer } from 'lucide-react';

const InputField = memo(({ label, value, onChange, placeholder, type = 'text' }: any) => (
  <div>
    <label className="forensic-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="forensic-input"
      placeholder={placeholder}
    />
  </div>
));

export default function ConsignacionForm() {
  const { setCaso, setDispositivo, setPRCC } = useForenseStore();
  
  const [caso, setCasoLocal] = useState<Caso>({
    numeroCaso: '',
    fiscal: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    estado: 'activo',
    pasoActual: 1,
  });

  const [dispositivo, setDispositivoLocal] = useState<Dispositivo>({
    marca: '', modelo: '', imei: '', imei2: '', simCard: '', numeroTel: '',
    estadoFisico: '', modoAislamiento: 'modo_avion', danosVisibles: '', bateriaEstado: '', pantallaEstado: 'apagado',
  });

  const [prcc, setPrcCLocal] = useState<PRCC>({
    expediente: '', prcc: '', despachoInstruye: '', organismoInstruye: '', despachoInicia: '', organismoInicia: '',
    direccion: '', fechaHora: '', formaObtencion: 'Consignación',
    fijacion: { nombre: '', ci: '' }, coleccion: { nombre: '', ci: '' }, 
    descripcion: '', motivoTransferencia: '',
    entrega: { nombre: '', organismo: '', despacho: '', ci: '' }, recibe: { nombre: '', organismo: '', despacho: '', ci: '' }, observaciones: ''
  });

  const [step, setStep] = useState(1);

  const handleGuardar = () => {
    setCaso(caso);
    setDispositivo(dispositivo);
    setPRCC(prcc);
    console.log('Datos guardados:', { caso, dispositivo, prcc });
  };

  const handlePrint = () => {
    handleGuardar();
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? 'bg-fluent-accent text-white shadow-lg shadow-fluent-accent/20' : 'bg-fluent-surface text-fluent-textSecondary border border-fluent-border'}`}>
              1
            </span>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-fluent-text' : 'text-fluent-textSecondary'}`}>Datos del Caso</span>
          </div>
          <div className="w-12 h-px bg-fluent-border"></div>
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? 'bg-fluent-accent text-white shadow-lg shadow-fluent-accent/20' : 'bg-fluent-surface text-fluent-textSecondary border border-fluent-border'}`}>
              2
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-fluent-text' : 'text-fluent-textSecondary'}`}>Fijación del Dispositivo</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="forensic-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-fluent-accent/10 rounded-lg text-fluent-accent">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-fluent-text">Información General del Caso</h2>
              <p className="text-sm text-fluent-textSecondary">Ingrese los datos identificativos de la actuación judicial</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Número de Caso *" value={caso.numeroCaso} onChange={(v: string) => setCasoLocal({ ...caso, numeroCaso: v })} placeholder="Ej: MP-2024-001234" />
            <InputField label="Fiscal Asignado *" value={caso.fiscal} onChange={(v: string) => setCasoLocal({ ...caso, fiscal: v })} placeholder="Nombre del fiscal" />
            <InputField label="Fecha de Inicio *" type="date" value={caso.fechaInicio} onChange={(v: string) => setCasoLocal({ ...caso, fechaInicio: v })} />
            <InputField label="Número de Expediente" value={prcc.expediente} onChange={(v: string) => setPrcCLocal({ ...prcc, expediente: v })} placeholder="Ej: EXP-2024-567890" />
          </div>

          <div className="mt-10 pt-6 border-t border-fluent-border flex justify-end">
            <button 
              onClick={() => setStep(2)} 
              disabled={!caso.numeroCaso || !caso.fiscal} 
              className="forensic-btn forensic-btn-primary flex items-center gap-2"
            >
              Siguiente Paso <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="forensic-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-fluent-accent/10 rounded-lg text-fluent-accent">
              <Camera size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-fluent-text">Fijación Técnica del Dispositivo</h2>
              <p className="text-sm text-fluent-textSecondary">Detalles del hardware y estado físico de la evidencia</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Marca *" value={dispositivo.marca} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, marca: v })} placeholder="Ej: Samsung" />
            <InputField label="Modelo *" value={dispositivo.modelo} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, modelo: v })} placeholder="Ej: Galaxy A54" />
            <InputField label="IMEI 1 *" value={dispositivo.imei} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei: v })} placeholder="15 dígitos" />
            <InputField label="IMEI 2" value={dispositivo.imei2} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei2: v })} placeholder="15 dígitos (opcional)" />
            <InputField label="Número de Teléfono" value={dispositivo.numeroTel} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, numeroTel: v })} placeholder="+58 XXX XXXXXXX" />
            
            <div>
              <label className="forensic-label">Estado de la Pantalla *</label>
              <select 
                value={dispositivo.pantallaEstado} 
                onChange={(e) => setDispositivoLocal({ ...dispositivo, pantallaEstado: e.target.value as any })} 
                className="forensic-input"
              >
                <option value="encendido">Encendido</option>
                <option value="apagado">Apagado</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="forensic-label">Estado Físico / Daños Visibles</label>
              <textarea 
                value={dispositivo.danosVisibles} 
                onChange={(e) => setDispositivoLocal({ ...dispositivo, danosVisibles: e.target.value })} 
                className="forensic-input" 
                rows={4} 
                placeholder="Describa de manera detallada cualquier golpe, rayón, rotura o particularidad física observada en el dispositivo." 
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-fluent-border flex justify-between print:hidden">
            <button 
              onClick={() => setStep(1)} 
              className="forensic-btn forensic-btn-secondary flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Atrás
            </button>
            <button 
              onClick={handlePrint} 
              disabled={!dispositivo.marca || !dispositivo.modelo || !dispositivo.imei} 
              className="forensic-btn forensic-btn-primary flex items-center gap-2"
            >
              <Printer size={18} /> Generar e Imprimir Acta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
