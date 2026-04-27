import { useState, memo } from 'react';
import { useForenseStore, type Caso, type Dispositivo, type PRCC } from '../../store/forenseStore';
import { FileText, Camera, ChevronRight, ChevronLeft } from 'lucide-react';

const InputField = memo(({ label, value, onChange, placeholder, type = 'text' }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
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
    direccion: '', fechaHora: '', formaObtencion: '',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-forensic-light'} text-white`}>
            1. Datos del Caso
          </span>
          <span className="text-gray-500"><ChevronRight size={14} /></span>
          <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-forensic-light'} text-white`}>
            2. Fijación del Dispositivo
          </span>
        </div>
      </div>

      {step === 1 && (
        <div className="forensic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            Datos del Caso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Número de Caso *" value={caso.numeroCaso} onChange={(v: string) => setCasoLocal({ ...caso, numeroCaso: v })} placeholder="Ej: MP-2024-001234" />
            <InputField label="Fiscal Asignado *" value={caso.fiscal} onChange={(v: string) => setCasoLocal({ ...caso, fiscal: v })} placeholder="Nombre del fiscal" />
            <InputField label="Fecha de Inicio *" type="date" value={caso.fechaInicio} onChange={(v: string) => setCasoLocal({ ...caso, fechaInicio: v })} />
            <InputField label="Número de Expediente" value={prcc.expediente} onChange={(v: string) => setPrcCLocal({ ...prcc, expediente: v })} placeholder="Ej: EXP-2024-567890" />
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => setStep(2)} disabled={!caso.numeroCaso || !caso.fiscal} className="forensic-btn forensic-btn-primary disabled:opacity-50">
              Continuar <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="forensic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary-500" />
            Fijación del Dispositivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Marca *" value={dispositivo.marca} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, marca: v })} placeholder="Ej: Samsung" />
            <InputField label="Modelo *" value={dispositivo.modelo} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, modelo: v })} placeholder="Ej: Galaxy A54" />
            <InputField label="IMEI 1 *" value={dispositivo.imei} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei: v })} placeholder="15 dígitos" />
            <InputField label="IMEI 2" value={dispositivo.imei2} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, imei2: v })} placeholder="15 dígitos (opcional)" />
            <InputField label="Número de Teléfono" value={dispositivo.numeroTel} onChange={(v: string) => setDispositivoLocal({ ...dispositivo, numeroTel: v })} placeholder="+58 XXX XXXXXXX" />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Estado de la Pantalla *</label>
              <select value={dispositivo.pantallaEstado} onChange={(e) => setDispositivoLocal({ ...dispositivo, pantallaEstado: e.target.value as any })} className="forensic-input">
                <option value="encendido">Encendido</option>
                <option value="apagado">Apagado</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Estado Físico / Daños Visibles</label>
              <textarea value={dispositivo.danosVisibles} onChange={(e) => setDispositivoLocal({ ...dispositivo, danosVisibles: e.target.value })} className="forensic-input" rows={3} placeholder="Describa golpes, rayones, etc." />
            </div>
          </div>
          <div className="mt-6 flex justify-between print:hidden">
            <button onClick={() => setStep(1)} className="forensic-btn forensic-btn-secondary">
              <ChevronLeft size={16} className="mr-1" /> Atrás
            </button>
            <button onClick={() => { handleGuardar(); setTimeout(() => window.print(), 100); }} disabled={!dispositivo.marca || !dispositivo.modelo || !dispositivo.imei} className="forensic-btn forensic-btn-primary">
              <FileText className="w-4 h-4 mr-2" /> Generar e Imprimir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
