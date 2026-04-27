import { useState } from 'react';
import { useForenseStore, type PRCC } from '../store/forenseStore';
import { Save, Shield, Printer } from 'lucide-react';

export default function PrccPage() {
  const { prccActual: storePrcc, setPRCC } = useForenseStore();
  
  const [prcc, setPrcCLocal] = useState<PRCC>({
    numeroPRCC: storePrcc?.numeroPRCC || '',
    tipo: storePrcc?.tipo || 'principal',
    expedienteNumero: storePrcc?.expedienteNumero || '',
    funcionarioColector: storePrcc?.funcionarioColector || '',
    cargo: storePrcc?.cargo || '',
    organo: storePrcc?.organo || '',
    tipoEmbalaje: storePrcc?.tipoEmbalaje || 'bolsa',
    numeroPrecinto: storePrcc?.numeroPrecinto || '',
    hashSHA256: storePrcc?.hashSHA256 || '',
    hashMD5: storePrcc?.hashMD5 || '',
    estadoEmbalaje: storePrcc?.estadoEmbalaje || 'buenas',
    nombreFirmante: storePrcc?.nombreFirmante || '',
    tipoObjeto: storePrcc?.tipoObjeto || 'Dispositivo Móvil',
    color: storePrcc?.color || '',
    descripcionEvidencia: storePrcc?.descripcionEvidencia || '',
  });

  const [saved, setSaved] = useState(false);

  const handleGuardar = () => {
    setPRCC(prcc);
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">2. Planilla de Registro de Cadena de Custodia</h1>
          <p className="text-gray-400 mt-1">
            Registro oficial de la evidencia según el Manual Único
          </p>
        </div>
      </div>

      <div className="forensic-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Datos del PRCC
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Número PRCC *</label>
            <input
              type="text"
              value={prcc.numeroPRCC}
              onChange={(e) => setPrcCLocal({ ...prcc, numeroPRCC: e.target.value })}
              className="forensic-input"
              placeholder="Ej: PRCC-2024-001234"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo *</label>
            <select
              value={prcc.tipo}
              onChange={(e) => setPrcCLocal({ ...prcc, tipo: e.target.value as any })}
              className="forensic-input"
            >
              <option value="principal">Principal</option>
              <option value="derivada">Derivada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Funcionario Colector *</label>
            <input
              type="text"
              value={prcc.funcionarioColector}
              onChange={(e) => setPrcCLocal({ ...prcc, funcionarioColector: e.target.value })}
              className="forensic-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cargo</label>
            <input
              type="text"
              value={prcc.cargo}
              onChange={(e) => setPrcCLocal({ ...prcc, cargo: e.target.value })}
              className="forensic-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Órgano</label>
            <input
              type="text"
              value={prcc.organo}
              onChange={(e) => setPrcCLocal({ ...prcc, organo: e.target.value })}
              className="forensic-input"
              placeholder="Ej: CICPC, PNB, MP"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Embalaje *</label>
            <select
              value={prcc.tipoEmbalaje}
              onChange={(e) => setPrcCLocal({ ...prcc, tipoEmbalaje: e.target.value as any })}
              className="forensic-input"
            >
              <option value="bolsa">Bolsa</option>
              <option value="caja">Caja</option>
              <option value="sobre">Sobre</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Número de Precinto</label>
            <input
              type="text"
              value={prcc.numeroPrecinto}
              onChange={(e) => setPrcCLocal({ ...prcc, numeroPrecinto: e.target.value })}
              className="forensic-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Estado del Embalaje *</label>
            <select
              value={prcc.estadoEmbalaje}
              onChange={(e) => setPrcCLocal({ ...prcc, estadoEmbalaje: e.target.value as any })}
              className="forensic-input"
            >
              <option value="buenas">Buenas</option>
              <option value="deterioradas">Deterioradas</option>
              <option value="rotas">Rotas</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del Firmante *</label>
            <input
              type="text"
              value={prcc.nombreFirmante}
              onChange={(e) => setPrcCLocal({ ...prcc, nombreFirmante: e.target.value })}
              className="forensic-input"
              placeholder="Persona que entrega la evidencia"
            />
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg flex justify-between items-center">
            <p className="text-green-400">✓ Planilla PRCC guardada exitosamente</p>
            <button 
              onClick={() => window.print()}
              className="forensic-btn forensic-btn-primary flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimir Planilla PRCC
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            disabled={!prcc.numeroPRCC || !prcc.funcionarioColector}
            className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Guardar PRCC
          </button>
        </div>
      </div>
    </div>
  );
}
