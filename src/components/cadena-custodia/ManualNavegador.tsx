import React, { useState } from 'react';
import { MANUAL_STRUCTURE, TABLAS_REFERENCIA, OPERARIOS, TIPOS_EVIDENCIA, PRECINTADOS, FORMAS_CIERRE } from '../../data/manualStructure';
import { ChevronRight, ChevronDown, FileText, Users, Table, Tag, Package, Scale } from 'lucide-react';

interface SectionTreeProps {
  section: typeof MANUAL_STRUCTURE[0];
  level?: number;
  onSelectSection: (sectionId: string) => void;
  selectedSection?: string;
}

const SectionTree: React.FC<SectionTreeProps> = ({ 
  section, 
  level = 0, 
  onSelectSection,
  selectedSection 
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasSubsections = section.subsections && section.subsections.length > 0;
  const isSelected = selectedSection === section.id;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => {
          onSelectSection(section.id);
          if (hasSubsections) setIsExpanded(!isExpanded);
        }}
      >
        {hasSubsections && (
          <span className="text-gray-400">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {!hasSubsections && <span className="w-4" />}
        
        <FileText size={16} className="text-gray-500" />
        
        <div className="flex-1">
          <h3 className="text-sm font-medium">{section.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {section.description}
          </p>
        </div>
        
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
          pág. {section.pages[0]}{section.pages.length > 1 ? `-${section.pages[section.pages.length - 1]}` : ''}
        </span>
      </div>
      
      {hasSubsections && isExpanded && (
        <div className="border-l-2 border-gray-200 dark:border-gray-700 ml-6">
          {section.subsections!.map((subsection) => (
            <SectionTree
              key={subsection.id}
              section={subsection}
              level={level + 1}
              onSelectSection={onSelectSection}
              selectedSection={selectedSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ManualNavegador() {
  const [selectedSection, setSelectedSection] = useState<string>('fase-inicial');
  const [activeTab, setActiveTab] = useState<'structure' | 'tables' | 'operarios' | 'evidence' | 'precintos' | 'cierre'>('structure');

  const getSelectedSectionData = () => {
    const findSection = (sections: typeof MANUAL_STRUCTURE, id: string): any => {
      for (const section of sections) {
        if (section.id === id) return section;
        if (section.subsections) {
          const found = findSection(section.subsections, id);
          if (found) return found;
        }
      }
      return null;
    };
    return findSection(MANUAL_STRUCTURE, selectedSection);
  };

  const selectedSectionData = getSelectedSectionData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Manual Único de Cadena de Custodia
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Versión Final 29SEP17 - Gaceta Oficial
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Package className="text-blue-600" size={32} />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs de Navegación */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto" aria-label="Tabs">
            {[
              { id: 'structure', label: 'Estructura del Manual', icon: FileText },
              { id: 'tables', label: 'Tablas de Referencia', icon: Table },
              { id: 'operarios', label: 'Operarios', icon: Users },
              { id: 'evidence', label: 'Tipos de Evidencia', icon: Tag },
              { id: 'precintos', label: 'Precintados', icon: Package },
              { id: 'cierre', label: 'Formas de Cierre', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Panel Lateral - Solo para estructura */}
          {activeTab === 'structure' && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Navegación del Manual
                </h2>
                <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {MANUAL_STRUCTURE.map((section) => (
                    <SectionTree
                      key={section.id}
                      section={section}
                      onSelectSection={setSelectedSection}
                      selectedSection={selectedSection}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Panel Principal */}
          <div className={`${activeTab === 'structure' ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            
            {/* Vista: Estructura del Manual */}
            {activeTab === 'structure' && selectedSectionData && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedSectionData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedSectionData.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Páginas: {selectedSectionData.pages.join(', ')}
                    </span>
                    {selectedSectionData.subsections && (
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        {selectedSectionData.subsections.length} subsecciones
                      </span>
                    )}
                  </div>
                </div>

                {selectedSectionData.subsections && selectedSectionData.subsections.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Subsecciones
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {selectedSectionData.subsections.map((subsection: any) => (
                        <div
                          key={subsection.id}
                          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedSection(subsection.id)}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {subsection.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {subsection.description}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                            pág. {subsection.pages.join('-')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Vista: Tablas de Referencia */}
            {activeTab === 'tables' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tablas de Referencia del Manual
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {TABLAS_REFERENCIA.map((tabla) => (
                    <div
                      key={tabla.id}
                      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Table className="text-blue-600 dark:text-blue-400" size={20} />
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          Tabla {tabla.id}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {tabla.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                        Página {tabla.page}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista: Operarios */}
            {activeTab === 'operarios' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Operarios de la Cadena de Custodia
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Personal autorizado y capacitado para participar en el tratamiento de evidencias físicas
                </p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {OPERARIOS.map((operario, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <Users className="text-green-600 dark:text-green-400" size={20} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {operario}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista: Tipos de Evidencia */}
            {activeTab === 'evidence' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tipos de Evidencia Física
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Clasificación de evidencias según su naturaleza y tipo de análisis
                </p>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {TIPOS_EVIDENCIA.map((tipo, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 text-center"
                    >
                      <Tag className="mx-auto text-purple-600 dark:text-purple-400 mb-2" size={24} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {tipo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista: Precintados */}
            {activeTab === 'precintos' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tipos de Precintado
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Mecanismos de sellado para garantizar la integridad de las evidencias
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  {PRECINTADOS.map((precinto, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                    >
                      <Package className="text-amber-600 dark:text-amber-400 mb-3" size={28} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {precinto.tipo}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        <strong>Descripción:</strong> {precinto.descripcion}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Uso:</strong> {precinto.uso}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista: Formas de Cierre */}
            {activeTab === 'cierre' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Formas de Cierre del Proceso
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Culminación del tratamiento de evidencias físicas según el Manual
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  {FORMAS_CIERRE.map((forma) => (
                    <div
                      key={forma.id}
                      className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
                    >
                      <Scale className="text-emerald-600 dark:text-emerald-400 mb-3" size={28} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {forma.nombre}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {forma.descripcion}
                      </p>
                      <div className="text-xs text-emerald-700 dark:text-emerald-300 bg-white dark:bg-gray-800 px-3 py-2 rounded border border-emerald-200 dark:border-emerald-700">
                        <strong>Requiere:</strong> {forma.requiere}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
