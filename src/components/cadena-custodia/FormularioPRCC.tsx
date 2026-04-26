import React, { useState } from 'react';
import { TIPOS_EVIDENCIA, OPERARIOS, PRECINTADOS } from '../../data/manualStructure';
import { Save, Upload, Download, Printer, CheckCircle, AlertCircle } from 'lucide-react';

interface EvidenciaField {
  id: string;
  correlativo: string;
  descripcion: string;
  tipo: string;
  cantidad: string;
  caracteristicas: string;
  lugarColeccion: string;
  fechaHora: string;
  embalaje: string;
  precintoTipo: string;
  observaciones: string;
}

interface PRCCFormData {
  numeroExpediente: string;
  oficinaInstruye: string;
  fiscalia: string;
  delito: string;
  fechaSuceso: string;
  horaSuceso: string;
  lugarSuceso: string;
  sitioAsociado: string;
  solicitante: string;
  cargoSolicitante: string;
  organismoSolicitante: string;
  evidencias: EvidenciaField[];
  funcionarioObtuvo: string;
  cargoFuncionario: string;
  fechaRegistro: string;
  horaRegistro: string;
}

const initialEvidencia: EvidenciaField = {
  id: '',
  correlativo: '',
  descripcion: '',
  tipo: '',
  cantidad: '',
  caracteristicas: '',
  lugarColeccion: '',
  fechaHora: '',
  embalaje: '',
  precintoTipo: '',
  observaciones: ''
};

const initialFormData: PRCCFormData = {
  numeroExpediente: '',
  oficinaInstruye: '',
  fiscalia: '',
  delito: '',
  fechaSuceso: '',
  horaSuceso: '',
  lugarSuceso: '',
  sitioAsociado: '',
  solicitante: '',
  cargoSolicitante: '',
  organismoSolicitante: '',
  evidencias: [{ ...initialEvidencia, id: '1' }],
  funcionarioObtuvo: '',
  cargoFuncionario: '',
  fechaRegistro: new Date().toISOString().split('T')[0],
  horaRegistro: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
};

export default function FormularioPRCC() {
  const [formData, setFormData] = useState<PRCCFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof PRCCFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEvidenciaChange = (id: string, field: keyof EvidenciaField, value: string) => {
    setFormData(prev => ({
      ...prev,
      evidencias: prev.evidencias.map(ev => 
        ev.id === id ? { ...ev, [field]: value } : ev
      )
    }));
  };

  const addEvidencia = () => {
    const newId = (formData.evidencias.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      evidencias: [...prev.evidencias, { ...initialEvidencia, id: newId }]
    }));
  };

  const removeEvidencia = (id: string) => {
    if (formData.evidencias.length > 1) {
      setFormData(prev => ({
        ...prev,
        evidencias: prev.evidencias.filter(ev => ev.id !== id)
      }));
    }
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.numeroExpediente || !formData.oficinaInstruye) {
      alert('Por favor complete los campos obligatorios del expediente');
      return;
    }
    
    // Generar número de PRCC
    const prccNumber = `PRCC-${formData.numeroExpediente}-${new Date().getFullYear()}-${String(formData.evidencias.length).padStart(3, '0')}`;
    
    console.log('PRCC Generada:', {
      numeroPRCC: prccNumber,
      ...formData
    });
    
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PRCC-${formData.numeroExpediente}.json`;
    link.click();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              PRCC Registrada Exitosamente
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              La Planilla de Registro de Cadena de Custodia ha sido generada correctamente
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Número de PRCC: <strong>PRCC-{formData.numeroExpediente}-{new Date().getFullYear()}-{String(formData.evidencias.length).padStart(3, '0')}</strong>
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
                Total de evidencias registradas: <strong>{formData.evidencias.length}</strong>
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer size={20} />
                Imprimir PRCC
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={20} />
                Exportar JSON
              </button>
              <button
                onClick={() => {
                  setFormData(initialFormData);
                  setSubmitted(false);
                  setCurrentStep(1);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Nueva PRCC
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Planilla de Registro de Cadena de Custodia (PRCC)
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manual Único de Cadena de Custodia - Versión 29SEP17
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <AlertCircle size={18} />
              <span>Documento oficial según Gaceta Oficial</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {[
              { step: 1, label: 'Datos del Expediente' },
              { step: 2, label: 'Información del Suceso' },
              { step: 3, label: 'Evidencias Físicas' },
              { step: 4, label: 'Funcionarios' }
            ].map((item, index, arr) => (
              <React.Fragment key={item.step}>
                <button
                  onClick={() => setCurrentStep(item.step)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === item.step
                      ? 'bg-blue-600 text-white'
                      : currentStep > item.step
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= item.step ? 'bg-white/20' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {currentStep > item.step ? '✓' : item.step}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
                {index < arr.length - 1 && (
                  <div className={`flex-1 h-0.5 ${
                    currentStep > item.step ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          
          {/* Step 1: Datos del Expediente */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Datos del Expediente
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de Expediente *
                  </label>
                  <input
                    type="text"
                    value={formData.numeroExpediente}
                    onChange={(e) => handleInputChange('numeroExpediente', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ej: MP-2024-001234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Oficina que Instruye *
                  </label>
                  <select
                    value={formData.oficinaInstruye}
                    onChange={(e) => handleInputChange('oficinaInstruye', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="MP">Ministerio Público</option>
                    <option value="CICPC">CICPC</option>
                    <option value="GNB">Guardia Nacional Bolivariana</option>
                    <option value="PNB">Policía Nacional Bolivariana</option>
                    <option value="POLICIAS_ESTADALES">Policías Estadales</option>
                    <option value="OTROS">Otros Organismos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fiscalía
                  </label>
                  <input
                    type="text"
                    value={formData.fiscalia}
                    onChange={(e) => handleInputChange('fiscalia', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ej: Fiscalía 5° del Ministerio Público"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delito Investigado
                  </label>
                  <input
                    type="text"
                    value={formData.delito}
                    onChange={(e) => handleInputChange('delito', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ej: Homicidio Calificado"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Información del Suceso */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Información del Suceso
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha del Suceso
                  </label>
                  <input
                    type="date"
                    value={formData.fechaSuceso}
                    onChange={(e) => handleInputChange('fechaSuceso', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hora del Suceso
                  </label>
                  <input
                    type="time"
                    value={formData.horaSuceso}
                    onChange={(e) => handleInputChange('horaSuceso', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lugar del Suceso
                  </label>
                  <textarea
                    value={formData.lugarSuceso}
                    onChange={(e) => handleInputChange('lugarSuceso', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Dirección completa con puntos de referencia"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sitios Asociados
                  </label>
                  <textarea
                    value={formData.sitioAsociado}
                    onChange={(e) => handleInputChange('sitioAsociado', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Lugares vinculados al hecho investigado"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Evidencias */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Evidencias Físicas
                </h2>
                <button
                  type="button"
                  onClick={addEvidencia}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  + Agregar Evidencia
                </button>
              </div>

              {formData.evidencias.map((evidencia, index) => (
                <div key={evidencia.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Evidencia #{index + 1}
                    </h3>
                    {formData.evidencias.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEvidencia(evidencia.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Correlativo Alfanumérico
                      </label>
                      <input
                        type="text"
                        value={evidencia.correlativo}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'correlativo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Ej: A-001"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Tipo de Evidencia
                      </label>
                      <select
                        value={evidencia.tipo}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'tipo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Seleccione...</option>
                        {TIPOS_EVIDENCIA.map(tipo => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Cantidad
                      </label>
                      <input
                        type="text"
                        value={evidencia.cantidad}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'cantidad', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Ej: 1 unidad"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Descripción Detallada
                      </label>
                      <textarea
                        value={evidencia.descripcion}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'descripcion', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Describa características generales, particulares y de detalle"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Lugar de Colección
                      </label>
                      <input
                        type="text"
                        value={evidencia.lugarColeccion}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'lugarColeccion', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Ubicación exacta donde se colectó"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Fecha y Hora
                      </label>
                      <input
                        type="datetime-local"
                        value={evidencia.fechaHora}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'fechaHora', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Tipo de Embalaje
                      </label>
                      <select
                        value={evidencia.embalaje}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'embalaje', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Seleccione...</option>
                        <option value="papel">Bolsa de papel</option>
                        <option value="sintetico">Bolsa sintética</option>
                        <option value="carton">Caja de cartón</option>
                        <option value="vidrio">Contenedor de vidrio</option>
                        <option value="metal">Contenedor metálico</option>
                        <option value="antiestatico">Contenedor antiestático</option>
                        <option value="faraday">Bolsa Faraday</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Tipo de Precinto
                      </label>
                      <select
                        value={evidencia.precintoTipo}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'precintoTipo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Seleccione...</option>
                        {PRECINTADOS.map(p => (
                          <option key={p.tipo} value={p.tipo}>{p.tipo}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Observaciones
                      </label>
                      <input
                        type="text"
                        value={evidencia.observaciones}
                        onChange={(e) => handleEvidenciaChange(evidencia.id, 'observaciones', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Frágil, tóxica, inflamable, etc."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Funcionarios */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Funcionarios Actuantes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Funcionario que Obtuvo *
                  </label>
                  <input
                    type="text"
                    value={formData.funcionarioObtuvo}
                    onChange={(e) => handleInputChange('funcionarioObtuvo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cargo
                  </label>
                  <select
                    value={formData.cargoFuncionario}
                    onChange={(e) => handleInputChange('cargoFuncionario', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccione...</option>
                    {OPERARIOS.map(op => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Registro
                  </label>
                  <input
                    type="date"
                    value={formData.fechaRegistro}
                    onChange={(e) => handleInputChange('fechaRegistro', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hora de Registro
                  </label>
                  <input
                    type="time"
                    value={formData.horaRegistro}
                    onChange={(e) => handleInputChange('horaRegistro', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Importante:</strong> Todos los funcionarios que participen en la cadena de custodia deben firmar esta planilla en cada transferencia de evidencias, garantizando la continuidad y trazabilidad del proceso.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={20} />
                Registrar PRCC
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
