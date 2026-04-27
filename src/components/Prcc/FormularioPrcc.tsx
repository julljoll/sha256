import { useState, memo } from 'react';
import { useForenseStore, type PRCC } from '../../store/forenseStore';
import { ClipboardList, FileText } from 'lucide-react';

const InputField = memo(({ label, value, onChange, placeholder }: any) => (
  <div>
    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">{label}</label>
    <input className="forensic-input py-1.5 text-sm" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  </div>
));

export default function FormularioPrcc() {
  const { prccActual: storePrcc, setPRCC } = useForenseStore();
  const [prcc, setPrcCLocal] = useState<PRCC>(storePrcc || {
    expediente: '', prcc: '', despachoInstruye: '', organismoInstruye: '', despachoInicia: '', organismoInicia: '',
    direccion: '', fechaHora: '', formaObtencion: '',
    fijacion: { nombre: '', ci: '' }, coleccion: { nombre: '', ci: '' }, 
    descripcion: '', motivoTransferencia: '',
    entrega: { nombre: '', organismo: '', despacho: '', ci: '' }, recibe: { nombre: '', organismo: '', despacho: '', ci: '' }, observaciones: ''
  });

  const handlePrint = () => {
    setPRCC(prcc);
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="forensic-card p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-forensic-light pb-2">
          <ClipboardList className="text-primary-500" /> PLANILLA DE REGISTRO DE CADENA DE CUSTODIA (PRCC)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary-400 uppercase">I. Datos Generales</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="N° Expediente" value={prcc.expediente} onChange={(v: string) => setPrcCLocal({...prcc, expediente: v})} />
              <InputField label="N° PRCC" value={prcc.prcc} onChange={(v: string) => setPrcCLocal({...prcc, prcc: v})} />
            </div>
            <InputField label="Despacho Instruye" value={prcc.despachoInstruye} onChange={(v: string) => setPrcCLocal({...prcc, despachoInstruye: v})} />
            <InputField label="Organismo Instruye" value={prcc.organismoInstruye} onChange={(v: string) => setPrcCLocal({...prcc, organismoInstruye: v})} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary-400 uppercase">V. Transferencia</h3>
            <InputField label="Motivo de Transferencia" value={prcc.motivoTransferencia} onChange={(v: string) => setPrcCLocal({...prcc, motivoTransferencia: v})} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Entrega (Nombre)" value={prcc.entrega.nombre} onChange={(v: string) => setPrcCLocal({...prcc, entrega: {...prcc.entrega, nombre: v}})} />
              <InputField label="Recibe (Nombre)" value={prcc.recibe.nombre} onChange={(v: string) => setPrcCLocal({...prcc, recibe: {...prcc.recibe, nombre: v}})} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end print:hidden">
          <button onClick={handlePrint} className="forensic-btn forensic-btn-primary">
            <FileText size={16} className="mr-2" /> Generar e Imprimir PRCC
          </button>
        </div>
      </div>
    </div>
  );
}
