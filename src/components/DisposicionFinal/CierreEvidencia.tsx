import { useId } from 'react';
import { Home, Trash2, RotateCcw, FileCheck, Printer } from 'lucide-react';

export default function CierreEvidencia() {
  const idBase = useId();

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="forensic-card p-8">
        <div className="flex items-center justify-between mb-8 border-b border-fluent-border pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-fluent-accent/10 rounded-xl text-fluent-accent">
              <Home size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Fase de Disposición Final</h2>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-widest mt-1">Cierre del Ciclo de Custodia</p>
            </div>
          </div>
          <button 
            onClick={() => window.print()} 
            className="forensic-btn forensic-btn-primary flex items-center gap-2 px-8 print:hidden"
          >
            <Printer size={18} /> Acta de Cierre
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold text-fluent-accent-light uppercase tracking-[0.2em] flex items-center gap-2">
                <FileCheck size={14} /> Modalidad de Cierre
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'dev', label: 'Devolución', icon: RotateCcw, desc: 'Restitución al propietario legítimo.' },
                  { id: 'dest', label: 'Destrucción', icon: Trash2, desc: 'Inutilización por orden judicial.' },
                  { id: 'cons', label: 'Consumida', icon: FileCheck, desc: 'Agotada durante el peritaje.' }
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-4 p-4 rounded-fluent-btn border border-fluent-border bg-fluent-surface hover:bg-fluent-surfaceHover cursor-pointer transition-all">
                    <input type="radio" name="modalidad" value={item.id} className="mt-1 w-4 h-4 text-fluent-accent focus:ring-offset-fluent-bg" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <item.icon size={14} className="text-fluent-accent" />
                        {item.label}
                      </span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold text-fluent-accent-light uppercase tracking-[0.2em] flex items-center gap-2">
                <FileCheck size={14} /> Documentación de Ejecución
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor={`${idBase}-aut`} className="forensic-label">Autorización Judicial N°</label>
                  <input id={`${idBase}-aut`} type="text" className="forensic-input" placeholder="Ej: AUTO-2024-ABC" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor={`${idBase}-obs`} className="forensic-label">Observaciones de Cierre</label>
                  <textarea id={`${idBase}-obs`} className="forensic-input" rows={6} placeholder="Detalle final sobre la entrega, destrucción o consumo de la evidencia..." />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 p-8 bg-fluent-surfaceActive/20 rounded-fluent-card border border-fluent-border text-center">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Cierre Definitivo de PRCC</h4>
          <p className="text-xs text-white/40 leading-relaxed max-w-2xl mx-auto">
            Este procedimiento pone fin a la cadena de custodia. Se debe anexar el acta correspondiente al expediente judicial y marcar la evidencia como "Cerrada" en el sistema central.
          </p>
        </div>
      </div>
    </div>
  );
}
