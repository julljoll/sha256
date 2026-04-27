import { useState, memo, useId } from 'react';
import { useForenseStore, type Caso, type Dispositivo, type PRCC } from '../../store/forenseStore';
import { FileText, Camera, ChevronRight, ChevronLeft, Printer, CheckCircle2, AlertCircle } from 'lucide-react';

const InputField = memo(({ label, value, onChange, placeholder, type = 'text', required }: any) => {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="forensic-label flex items-center gap-1.5">
        {label}
        {required && <span className="text-fluent-accent" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="forensic-input"
        placeholder={placeholder}
        required={required}
        aria-required={required}
      />
    </div>
  );
});

export default function ConsignacionForm() {
  const { setCaso, setDispositivo, setPRCC } = useForenseStore();
  const [isSaved, setIsSaved] = useState(false);
  
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
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    handleGuardar();
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <nav className="flex items-center justify-center gap-12 print:hidden" aria-label="Pasos del formulario">
        <div className="flex flex-col items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${step >= 1 ? 'bg-fluent-accent border-fluent-accent text-white' : 'bg-fluent-surface border-fluent-border text-white/40'}`}>
            1
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 1 ? 'text-white' : 'text-white/40'}`}>Datos del Caso</span>
        </div>
        <div className={`w-24 h-0.5 rounded-full ${step >= 2 ? 'bg-fluent-accent' : 'bg-fluent-border'}`}></div>
        <div className="flex flex-col items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${step >= 2 ? 'bg-fluent-accent border-fluent-accent text-white' : 'bg-fluent-surface border-fluent-border text-white/40'}`}>
            2
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 2 ? 'text-white' : 'text-white/40'}`}>Fijación Técnica</span>
        </div>
      </nav>

      {step === 1 && (
        <section className="forensic-card p-8 space-y-8 animate-fade-in" aria-labelledby="step1-title">
          <div className="flex items-center justify-between border-b border-fluent-border pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-fluent-accent/10 rounded-xl text-fluent-accent">
                <FileText size={24} />
              </div>
              <div>
                <h2 id="step1-title" className="text-xl font-bold text-white">Información del Proceso</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">Fase Inicial / Obtención</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Número de Caso" value={caso.numeroCaso} onChange={(v: string) => setCasoLocal({ ...caso, numeroCaso: v })} placeholder="Ej: MP-2024-001234" required />
            <InputField label="Fiscal Asignado" value={caso.fiscal} onChange={(v: string) => setCasoLocal({ ...caso, fiscal: v })} placeholder="Nombre y Apellido" required />
            <InputField label="Fecha de Inicio" type="date" value={caso.fechaInicio} onChange={(v: string) => setCasoLocal({ ...caso, fechaInicio: v })} required />
            <InputField label="Número de Expediente" value={prcc.expediente} onChange={(v: string) => setPrcCLocal({ ...prcc, expediente: v })} placeholder="Ej: EXP-2024-567" />
          </div>

          <div className="bg-fluent-surfaceActive/20 p-4 rounded-fluent-btn flex items-start gap-3 border border-fluent-border">
            <AlertCircle size={18} className="text-fluent-accent shrink-0 mt-0.5" />
            <p className="text-xs text-white/60 leading-relaxed">
              Asegúrese de que el número de caso sea el mismo que figura en el oficio de solicitud para garantizar la trazabilidad.
            </p>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              onClick={() => { handleGuardar(); setStep(2); }} 
              disabled={!caso.numeroCaso || !caso.fiscal} 
              className="forensic-btn forensic-btn-primary flex items-center gap-2 px-8"
            >
              Siguiente Paso <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="forensic-card p-8 space-y-8 animate-fade-in" aria-labelledby="step2-title">
          <div className="flex items-center justify-between border-b border-fluent-border pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-fluent-accent/10 rounded-xl text-fluent-accent">
                <Camera size={24} />
              </div>
              <div>
                <h2 id="step2-title" className="text-xl font-bold text-white">Fijación del Dispositivo</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-1">Detalles de la Evidencia Física</p>
              </div>
            </div>
            {isSaved && (
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={16} /> Datos Guardados
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Marca" value={dispositivo.marca} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, marca: v })} placeholder="Ej: Samsung" required />
            <InputField label="Modelo" value={dispositivo.modelo} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, modelo: v })} placeholder="Ej: Galaxy A54" required />
            <InputField label="IMEI 1" value={dispositivo.imei} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei: v })} placeholder="15 dígitos" required />
            <InputField label="Número de Teléfono" value={dispositivo.numeroTel} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, numeroTel: v })} placeholder="+58" />
            
            <div className="space-y-1.5">
              <label className="forensic-label">Estado de Pantalla</label>
              <select 
                value={dispositivo.pantallaEstado} 
                onChange={(e) => setDispositivoLocal({ ...dispositivo, pantallaEstado: e.target.value as any })} 
                className="forensic-input"
              >
                <option value="encendido">Encendido</option>
                <option value="apagado">Apagado</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="forensic-label">Estado Físico / Observaciones</label>
              <textarea 
                value={dispositivo.danosVisibles} 
                onChange={(e) => setDispositivoLocal({ ...dispositivo, danosVisibles: e.target.value })} 
                className="forensic-input" 
                rows={4} 
                placeholder="Describa el estado físico, daños visibles, precintos, etc." 
              />
            </div>
          </div>

          <div className="pt-6 flex justify-between print:hidden">
            <button 
              onClick={() => setStep(1)} 
              className="forensic-btn forensic-btn-secondary flex items-center gap-2 px-6"
            >
              <ChevronLeft size={18} /> Atrás
            </button>
            <div className="flex gap-4">
              <button 
                onClick={handleGuardar} 
                className="forensic-btn forensic-btn-secondary px-6"
              >
                Guardar Borrador
              </button>
              <button 
                onClick={handlePrint} 
                disabled={!dispositivo.marca || !dispositivo.modelo || !dispositivo.imei} 
                className="forensic-btn forensic-btn-primary flex items-center gap-2 px-8 shadow-lg shadow-fluent-accent/20"
              >
                <Printer size={18} /> Generar e Imprimir
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
