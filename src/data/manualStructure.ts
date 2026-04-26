// Estructura basada en el Manual Único de Cadena de Custodia de Evidencias Físicas (2017)

export interface ManualSection {
  id: string;
  title: string;
  description: string;
  pages: number[];
  subsections?: ManualSection[];
}

export const MANUAL_STRUCTURE: ManualSection[] = [
  {
    id: "intro",
    title: "Introducción y Fundamentos",
    description: "Antecedentes, bases legales, alcance y objetivos del manual",
    pages: [10, 11, 12, 13, 14, 15],
    subsections: [
      {
        id: "antecedentes",
        title: "Antecedentes",
        description: "Historia criminalística venezolana y evolución del manual (2001-2017)",
        pages: [12]
      },
      {
        id: "bases-legales",
        title: "Bases Legales",
        description: "CRBV 1999, COPP 2001, Ley del Plan de la Patria",
        pages: [13]
      },
      {
        id: "objetivos",
        title: "Objetivos",
        description: "Objetivo general y 11 objetivos específicos",
        pages: [14]
      }
    ]
  },
  {
    id: "fase-inicial",
    title: "Fase Inicial - Proceso de Obtención",
    description: "Génesis del sistema con 4 modalidades de obtención",
    pages: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    subsections: [
      {
        id: "obtencion-tecnica",
        title: "Obtención Técnica",
        description: "Trabajo de campo planificado por criminalistas y forenses",
        pages: [22, 23],
        subsections: [
          {
            id: "proteccion",
            title: "Procedimiento de Protección",
            description: "Delimitación y preservación del lugar (Tabla 1)",
            pages: [24, 25]
          },
          {
            id: "observacion-preliminar",
            title: "Observación Preliminar",
            description: "Planificación del abordaje y búsqueda (Tabla 2)",
            pages: [25, 26, 27]
          },
          {
            id: "fijacion",
            title: "Fijación",
            description: "Fotográfica, escrita, planimétrica y videográfica (Tablas 3-6)",
            pages: [27, 28, 29, 30, 31, 32]
          },
          {
            id: "coleccion",
            title: "Colección",
            description: "Levantamiento manual o con equipos especializados (Tabla 7)",
            pages: [32, 33, 34]
          },
          {
            id: "embalaje-rotulacion",
            title: "Embalaje y Rotulación",
            description: "Precintado biológico/físico/digital y rotulado (Tablas 8-9)",
            pages: [35, 36, 37]
          },
          {
            id: "registro-prcc",
            title: "Registro en PRCC",
            description: "Planilla de Registro de Cadena de Custodia",
            pages: [37]
          },
          {
            id: "traslado",
            title: "Traslado",
            description: "Transporte seguro al área de resguardo o laboratorio (Tabla 10)",
            pages: [38]
          }
        ]
      },
      {
        id: "obtencion-aseguramiento",
        title: "Obtención por Aseguramiento",
        description: "Situaciones de flagrancia o riesgo inminente",
        pages: [40, 41, 42, 43],
        subsections: [
          {
            id: "busqueda-aseguramiento",
            title: "Búsqueda",
            description: "Rastreo visual y táctil en lugares, personas o vehículos",
            pages: [42]
          },
          {
            id: "posesion",
            title: "Posesión",
            description: "Aseguramiento inicial con guantes quirúrgicos/nitrilo",
            pages: [42]
          },
          {
            id: "fijacion-aseguramiento",
            title: "Fijación",
            description: "Acta de Obtención por Aseguramiento",
            pages: [43]
          }
        ]
      },
      {
        id: "obtencion-consignacion",
        title: "Obtención por Consignación",
        description: "Entrega voluntaria por particulares",
        pages: [45, 46, 47],
        subsections: [
          {
            id: "recepcion",
            title: "Recepción",
            description: "Evaluación de pertinencia y recepción formal",
            pages: [47]
          },
          {
            id: "fijacion-consignacion",
            title: "Fijación",
            description: "Acta de Obtención por Consignación",
            pages: [47]
          }
        ]
      },
      {
        id: "obtencion-derivacion",
        title: "Obtención por Derivación",
        description: "Evidencias obtenidas durante peritaje o selección",
        pages: [49, 50, 51, 52, 53],
        subsections: [
          {
            id: "derivacion-peritacion",
            title: "Derivación en Peritación",
            description: "Por separación o segmentación de evidencia principal",
            pages: [49]
          },
          {
            id: "derivacion-seleccion",
            title: "Derivación por Selección",
            description: "Discriminación ulterior de evidencias colectadas",
            pages: [49]
          }
        ]
      }
    ]
  },
  {
    id: "fase-laboratorio",
    title: "Fase de Laboratorio - Proceso de Peritación",
    description: "Estudios forenses bajo ambiente controlado",
    pages: [54, 55, 56, 57, 58],
    subsections: [
      {
        id: "recepcion-lab",
        title: "Recepción",
        description: "Ingreso y registro manual/automatizado de evidencias",
        pages: [54, 55]
      },
      {
        id: "designacion",
        title: "Designación",
        description: "Asignación de forense para análisis",
        pages: [56]
      },
      {
        id: "peritaje",
        title: "Peritaje",
        description: "Valoración, descripción, análisis, interpretación y conclusión",
        pages: [56, 57]
      },
      {
        id: "remision",
        title: "Remisión",
        description: "Entrega de dictamen pericial y evidencias",
        pages: [58]
      }
    ]
  },
  {
    id: "fase-disposicion-judicial",
    title: "Fase de Disposición Judicial",
    description: "Resguardo judicial y exhibición en audiencia",
    pages: [60, 61],
    subsections: [
      {
        id: "resguardo-judicial",
        title: "Resguardo Judicial",
        description: "Áreas del Poder Judicial tras admisión de acusación",
        pages: [60]
      },
      {
        id: "exhibicion-audiencia",
        title: "Exhibición en Audiencia",
        description: "Manipulación directa/indirecta con guantes (Tabla 11)",
        pages: [60, 61]
      }
    ]
  },
  {
    id: "fase-disposicion-final",
    title: "Fase de Disposición Final - Proceso de Cierre",
    description: "Culminación del tratamiento de evidencias",
    pages: [62, 63],
    subsections: [
      {
        id: "formas-cierre",
        title: "Formas de Cierre",
        description: "Devolución, Entrega, Destrucción, Consumida en Peritaje",
        pages: [62]
      },
      {
        id: "ejecucion-cierre",
        title: "Procedimiento de Ejecución",
        description: "Materialización de devolución, entrega o destrucción",
        pages: [62]
      },
      {
        id: "cierre-prcc",
        title: "Cierre de PRCC",
        description: "Constancia en observaciones y remisión al expediente",
        pages: [63]
      }
    ]
  },
  {
    id: "figuras-continuas",
    title: "Figuras de Carácter Continuo",
    description: "Procesos comunes a todas las fases",
    pages: [63, 64, 65, 66, 67, 68, 69],
    subsections: [
      {
        id: "resguardo",
        title: "Proceso de Resguardo",
        description: "Ingreso, depósito, egreso y consideraciones generales",
        pages: [63, 64, 65, 66, 67]
      },
      {
        id: "traslado-continuo",
        title: "Procedimiento de Traslado",
        description: "Transporte entre áreas especializadas",
        pages: [68]
      },
      {
        id: "transferencia",
        title: "Actividad de Transferencia",
        description: "Cambio de responsabilidad entre operarios",
        pages: [69]
      }
    ]
  }
];

export const TABLAS_REFERENCIA = [
  { id: 1, title: "Protección Técnica", page: 25 },
  { id: 2, title: "Observación Preliminar", page: 27 },
  { id: 3, title: "Fijación Fotográfica", page: 29 },
  { id: 4, title: "Fijación Escrita", page: 30 },
  { id: 5, title: "Fijación Planimétrica", page: 31 },
  { id: 6, title: "Fijación Videográfica", page: 32 },
  { id: 7, title: "Colección", page: 34 },
  { id: 8, title: "Embalaje", page: 36 },
  { id: 9, title: "Rotulación", page: 37 },
  { id: 10, title: "Traslado", page: 38 },
  { id: 11, title: "Exhibición", page: 60 }
];

export const OPERARIOS = [
  "Criminalistas",
  "Forenses",
  "Policías",
  "Investigadores Penales",
  "Peritos",
  "Fiscales del Ministerio Público",
  "Jueces",
  "Militares en funciones de Investigación Penal",
  "Bomberos",
  "Rescatistas",
  "Personal de Área de Resguardo"
];

export const TIPOS_EVIDENCIA = [
  "Biológica",
  "Balística",
  "Documental",
  "Química",
  "Informática",
  "Dactilar",
  "Fotográfica",
  "Videográfica",
  "Planométrica",
  "Vestimenta",
  "Armas",
  "Drogas",
  "Líquidos corporales",
  "Huellas dactilares",
  "ADN"
];

export const PRECINTADOS = [
  {
    tipo: "Biológico",
    descripcion: "ADN sintético",
    uso: "Evidencias biológicas"
  },
  {
    tipo: "Físico",
    descripcion: "Fleje, precinto desechable (T-RAP), sello, tiras, cinta o cordón",
    uso: "Evidencias físicas generales"
  },
  {
    tipo: "Digital",
    descripcion: "Algoritmo Hash, Código QR",
    uso: "Evidencias digitales y documentales"
  }
];

export const FORMAS_CIERRE = [
  {
    id: "devolucion",
    nombre: "Devolución",
    descripcion: "Restituir a quien tenga legítimo derecho conforme a normas",
    requiere: "Autorización de autoridad competente"
  },
  {
    id: "entrega",
    nombre: "Entrega",
    descripcion: "Otorgamiento a persona natural/jurídica legalmente autorizada",
    requiere: "Mandato y autorización de autoridad competente"
  },
  {
    id: "destruccion",
    nombre: "Destrucción",
    descripcion: "Inutilizar o destruir evidencia sin interés para investigación",
    requiere: "No puedan ser devueltas/entregadas + autorización"
  },
  {
    id: "consumida",
    nombre: "Consumida en Peritaje",
    descripcion: "Evidencias agotadas totalmente durante actividad pericial",
    requiere: "Constancia en dictamen pericial y PRCC"
  }
];
