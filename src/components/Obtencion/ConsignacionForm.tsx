import { useState, memo, useId } from 'react';
import { useForenseStore, type Caso, type Dispositivo, type PRCC } from '../../store/forenseStore';
import { FileText, Camera, Printer, CheckCircle2, ShieldCheck, Smartphone, Info } from 'lucide-react';

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
    <div className="space-y-8 max-w-5xl mx-auto pb-20 animate-fade-in">
      {/* Header Panel */}
      <div className="forensic-card p-8 bg-fluent-accent/5 border-fluent-accent/20">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-fluent-accent/20 rounded-xl text-fluent-accent">
              <FileText size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Planilla de Consignación de Evidencia</h1>
              <p className="text-xs text-fluent-accent-light font-bold uppercase tracking-[0.2em] mt-1">Fase Inicial / Registro de Ingreso de Dispositivos Móviles</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <div className="text-right">
               <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Código de Control</p>
               <p className="text-xs font-mono font-bold text-white">FOR-OBT-001</p>
             </div>
             <div className="p-2 bg-fluent-surface rounded-lg border border-fluent-border">
               <ShieldCheck size={20} className="text-fluent-accent" />
             </div>
          </div>
        </div>
      </div>

      <div className="forensic-card p-10 space-y-12">
        {/* Section 1: Case Data */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-fluent-border pb-4">
            <Info size={18} className="text-fluent-accent" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">I. Datos del Proceso Judicial / Administrativo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InputField label="Nro de Caso (Oficio)" value={caso.numeroCaso} onChange={(v: string) => setCasoLocal({ ...caso, numeroCaso: v })} placeholder="Ej: MP-2024-001" required />
            <InputField label="Autoridad / Fiscal" value={caso.fiscal} onChange={(v: string) => setCasoLocal({ ...caso, fiscal: v })} placeholder="Nombre completo" required />
            <InputField label="Fecha de Recepción" type="date" value={caso.fechaInicio} onChange={(v: string) => setCasoLocal({ ...caso, fechaInicio: v })} required />
          </div>
        </section>

        {/* Section 2: Device Technical Data */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-fluent-border pb-4">
            <Smartphone size={18} className="text-fluent-accent" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">II. Identificación Técnica del Dispositivo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <InputField label="Marca" value={dispositivo.marca} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, marca: v })} placeholder="Samsung, Apple..." required />
            <InputField label="Modelo" value={dispositivo.modelo} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, modelo: v })} placeholder="Galaxy S23..." required />
            <InputField label="IMEI (Slot 1)" value={dispositivo.imei} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei: v })} placeholder="15 dígitos" required />
            <InputField label="Nro Telefónico / SIM" value={dispositivo.numeroTel} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, numeroTel: v })} placeholder="+58..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-1.5">
                <label className="forensic-label">Estado de la Pantalla</label>
                <select 
                  value={dispositivo.pantallaEstado} 
                  onChange={(e) => setDispositivoLocal({ ...dispositivo, pantallaEstado: e.target.value as any })} 
                  className="forensic-input"
                >
                  <option value="apagado">Apagado (Sugerido)</option>
                  <option value="encendido">Encendido</option>
                  <option value="bloqueado">Bloqueado / Patrón</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="forensic-label">Modo de Aislamiento</label>
                <select 
                  value={dispositivo.modoAislamiento} 
                  onChange={(e) => setDispositivoLocal({ ...dispositivo, modoAislamiento: e.target.value as any })} 
                  className="forensic-input"
                >
                  <option value="modo_avion">Modo Avión Activado</option>
                  <option value="bolsa_faraday">Bolsa Faraday / Jaula</option>
                  <option value="sin_aislamiento">Sin Aislamiento (Riesgo)</option>
                </select>
             </div>
          </div>
        </section>

        {/* Section 3: Physical Observations */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-fluent-border pb-4">
            <Camera size={18} className="text-fluent-accent" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">III. Fijación Técnica y Observaciones Físicas</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="forensic-label">Estado Físico Detallado</label>
              <textarea 
                value={dispositivo.danosVisibles} 
                onChange={(e) => setDispositivoLocal({ ...dispositivo, danosVisibles: e.target.value })} 
                className="forensic-input min-h-[120px]" 
                placeholder="Describa rayaduras, golpes, presencia de líquidos, sellos de seguridad, carcasas, etc." 
              />
            </div>
            
            <div className="p-6 bg-fluent-surfaceActive/20 rounded-fluent-card border border-fluent-border flex items-start gap-4">
               <ShieldCheck size={24} className="text-fluent-accent shrink-0" />
               <div className="space-y-2">
                 <h4 className="text-xs font-bold text-white uppercase tracking-widest">Compromiso de Integridad</h4>
                 <p className="text-xs text-white/40 leading-relaxed">
                   Al consignar esta evidencia, se certifica que el dispositivo se recibe en las condiciones descritas. 
                   Cualquier cambio posterior debe ser documentado en la Planilla de Registro de Cadena de Custodia (PRCC).
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Actions Panel */}
        <div className="pt-10 border-t border-fluent-border flex flex-wrap items-center justify-between gap-6 print:hidden">
          <div className="flex items-center gap-4">
            {isSaved && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={20} /> Planilla registrada en el sistema
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleGuardar} 
              className="forensic-btn forensic-btn-secondary px-8 h-12"
            >
              Guardar Borrador
            </button>
            <button 
              onClick={handlePrint} 
              disabled={!caso.numeroCaso || !caso.fiscal || !dispositivo.imei} 
              className="forensic-btn forensic-btn-primary flex items-center gap-3 px-12 h-12 shadow-xl shadow-fluent-accent/20"
            >
              <Printer size={20} /> Generar e Imprimir Planilla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
