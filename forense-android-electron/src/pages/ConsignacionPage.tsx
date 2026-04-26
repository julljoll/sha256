import { useState } from 'react';
import { useForenseStore, type Caso, type Dispositivo, type PRCC } from '../store/forenseStore';
import { FileText, Camera, Save } from 'lucide-react';

export default function ConsignacionPage() {
  const { setCaso, setDispositivo, setPRCC } = useForenseStore();
  
  // Estado del caso
  const [caso, setCasoLocal] = useState<Caso>({
    numeroCaso: '',
    fiscal: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    estado: 'activo',
    pasoActual: 1,
  });

  // Estado del dispositivo
  const [dispositivo, setDispositivoLocal] = useState<Dispositivo>({
    marca: '',
    modelo: '',
    imei: '',
    imei2: '',
    simCard: '',
    numeroTel: '',
    estadoFisico: '',
    modoAislamiento: 'modo_avion',
    danosVisibles: '',
    bateriaEstado: '',
    pantallaEstado: 'apagado',
  });

  // Estado PRCC
  const [prcc, setPrcCLocal] = useState<PRCC>({
    numeroPRCC: '',
    tipo: 'principal',
    expedienteNumero: '',
    funcionarioColector: '',
    cargo: '',
    organo: '',
    tipoEmbalaje: 'bolsa',
    numeroPrecinto: '',
    hashSHA256: '',
    hashMD5: '',
    estadoEmbalaje: 'buenas',
    nombreFirmante: '',
    tipoObjeto: 'Dispositivo Móvil',
    color: '',
    descripcionEvidencia: '',
  });

  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const handleGuardarConsignacion = () => {
    // Guardar en el store global
    setCaso(caso);
    setDispositivo(dispositivo);
    setPRCC(prcc);
    
    // Aquí se podría guardar en base de datos
    console.log('Datos guardados:', { caso, dispositivo, prcc });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Consignación de Evidencia</h1>
          <p className="text-gray-400 mt-1">
            Registro de dispositivo móvil recibido por entrega voluntaria
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-forensic-light'} text-white`}>
            1. Datos del Caso
          </span>
          <span className="text-gray-500">→</span>
          <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-forensic-light'} text-white`}>
            2. Dispositivo
          </span>
          <span className="text-gray-500">→</span>
          <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-primary-600' : 'bg-forensic-light'} text-white`}>
            3. PRCC
          </span>
        </div>
      </div>

      {/* Step 1: Datos del Caso */}
      {step === 1 && (
        <div className="forensic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Datos del Caso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Caso *
              </label>
              <input
                type="text"
                value={caso.numeroCaso}
                onChange={(e) => setCasoLocal({ ...caso, numeroCaso: e.target.value })}
                className="forensic-input"
                placeholder="Ej: MP-2024-001234"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fiscal Asignado *
              </label>
              <input
                type="text"
                value={caso.fiscal}
                onChange={(e) => setCasoLocal({ ...caso, fiscal: e.target.value })}
                className="forensic-input"
                placeholder="Nombre del fiscal"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                value={caso.fechaInicio}
                onChange={(e) => setCasoLocal({ ...caso, fechaInicio: e.target.value })}
                className="forensic-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Expediente
              </label>
              <input
                type="text"
                value={prcc.expedienteNumero}
                onChange={(e) => setPrcCLocal({ ...prcc, expedienteNumero: e.target.value })}
                className="forensic-input"
                placeholder="Ej: EXP-2024-567890"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!caso.numeroCaso || !caso.fiscal}
              className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Datos del Dispositivo */}
      {step === 2 && (
        <div className="forensic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Fijación del Dispositivo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Marca *
              </label>
              <input
                type="text"
                value={dispositivo.marca}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, marca: e.target.value })}
                className="forensic-input"
                placeholder="Ej: Samsung, Xiaomi, Huawei"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                value={dispositivo.modelo}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, modelo: e.target.value })}
                className="forensic-input"
                placeholder="Ej: Galaxy A54, Redmi Note 12"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IMEI 1 *
              </label>
              <input
                type="text"
                value={dispositivo.imei}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, imei: e.target.value })}
                className="forensic-input"
                placeholder="15 dígitos"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IMEI 2
              </label>
              <input
                type="text"
                value={dispositivo.imei2}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, imei2: e.target.value })}
                className="forensic-input"
                placeholder="15 dígitos (si aplica)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Teléfono / Línea
              </label>
              <input
                type="text"
                value={dispositivo.numeroTel}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, numeroTel: e.target.value })}
                className="forensic-input"
                placeholder="+58 XXX XXXXXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SIM Card
              </label>
              <input
                type="text"
                value={dispositivo.simCard}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, simCard: e.target.value })}
                className="forensic-input"
                placeholder="Número de serie SIM"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color
              </label>
              <input
                type="text"
                value={prcc.color}
                onChange={(e) => setPrcCLocal({ ...prcc, color: e.target.value })}
                className="forensic-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado de la Pantalla *
              </label>
              <select
                value={dispositivo.pantallaEstado}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, pantallaEstado: e.target.value as 'encendido' | 'apagado' })}
                className="forensic-input"
              >
                <option value="encendido">Encendido</option>
                <option value="apagado">Apagado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado de la Batería
              </label>
              <input
                type="text"
                value={dispositivo.bateriaEstado}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, bateriaEstado: e.target.value })}
                className="forensic-input"
                placeholder="Ej: 75%, Baja, Media, Alta"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modo de Aislamiento *
              </label>
              <select
                value={dispositivo.modoAislamiento}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, modoAislamiento: e.target.value as any })}
                className="forensic-input"
              >
                <option value="modo_avion">Modo Avión</option>
                <option value="bolsa_faraday">Bolsa Faraday</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado Físico / Daños Visibles
              </label>
              <textarea
                value={dispositivo.danosVisibles}
                onChange={(e) => setDispositivoLocal({ ...dispositivo, danosVisibles: e.target.value })}
                className="forensic-input"
                rows={3}
                placeholder="Describa golpes, rayones, pantalla rota, etc."
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descripción de la Evidencia
              </label>
              <textarea
                value={prcc.descripcionEvidencia}
                onChange={(e) => setPrcCLocal({ ...prcc, descripcionEvidencia: e.target.value })}
                className="forensic-input"
                rows={3}
                placeholder="Descripción detallada del dispositivo"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="forensic-btn forensic-btn-secondary"
            >
              ← Atrás
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!dispositivo.marca || !dispositivo.modelo || !dispositivo.imei}
              className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: PRCC */}
      {step === 3 && (
        <div className="forensic-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Save className="w-5 h-5" />
            Planilla de Registro de Cadena de Custodia (PRCC)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número PRCC *
              </label>
              <input
                type="text"
                value={prcc.numeroPRCC}
                onChange={(e) => setPrcCLocal({ ...prcc, numeroPRCC: e.target.value })}
                className="forensic-input"
                placeholder="Ej: PRCC-2024-001234"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo *
              </label>
              <select
                value={prcc.tipo}
                onChange={(e) => setPrcCLocal({ ...prcc, tipo: e.target.value as 'principal' | 'derivada' })}
                className="forensic-input"
              >
                <option value="principal">Principal</option>
                <option value="derivada">Derivada</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Funcionario Colector *
              </label>
              <input
                type="text"
                value={prcc.funcionarioColector}
                onChange={(e) => setPrcCLocal({ ...prcc, funcionarioColector: e.target.value })}
                className="forensic-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cargo
              </label>
              <input
                type="text"
                value={prcc.cargo}
                onChange={(e) => setPrcCLocal({ ...prcc, cargo: e.target.value })}
                className="forensic-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Órgano
              </label>
              <input
                type="text"
                value={prcc.organo}
                onChange={(e) => setPrcCLocal({ ...prcc, organo: e.target.value })}
                className="forensic-input"
                placeholder="Ej: CICPC, PNB, MP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Embalaje *
              </label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Precinto
              </label>
              <input
                type="text"
                value={prcc.numeroPrecinto}
                onChange={(e) => setPrcCLocal({ ...prcc, numeroPrecinto: e.target.value })}
                className="forensic-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado del Embalaje *
              </label>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Firmante *
              </label>
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
            <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
              <p className="text-green-400">✓ Consignación guardada exitosamente</p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="forensic-btn forensic-btn-secondary"
            >
              ← Atrás
            </button>
            <button
              onClick={handleGuardarConsignacion}
              disabled={!prcc.numeroPRCC || !prcc.funcionarioColector}
              className="forensic-btn forensic-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Guardar Consignación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
