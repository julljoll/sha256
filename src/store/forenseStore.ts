import { create } from 'zustand';

export interface Caso {
  id?: number;
  numeroCaso: string;
  fiscal: string;
  fechaInicio: string;
  estado: 'activo' | 'cerrado' | 'archivado';
  pasoActual: number;
}

export interface Dispositivo {
  id?: number;
  casoId?: number;
  marca: string;
  modelo: string;
  imei: string;
  imei2: string;
  simCard: string;
  numeroTel: string;
  estadoFisico: string;
  modoAislamiento: 'modo_avion' | 'bolsa_faraday' | 'otro';
  danosVisibles: string;
  bateriaEstado: string;
  pantallaEstado: 'encendido' | 'apagado';
}

export interface PRCC {
  id?: number;
  casoId?: number;
  numeroPRCC: string;
  tipo: 'principal' | 'derivada';
  expedienteNumero: string;
  funcionarioColector: string;
  cargo: string;
  organo: string;
  tipoEmbalaje: 'bolsa' | 'caja' | 'sobre' | 'otro';
  numeroPrecinto: string;
  hashSHA256: string;
  hashMD5: string;
  estadoEmbalaje: 'buenas' | 'deterioradas' | 'rotas';
  nombreFirmante: string;
  tipoObjeto: string;
  color: string;
  descripcionEvidencia: string;
}

export interface Adquisicion {
  id?: number;
  casoId?: number;
  herramienta: 'andriller' | 'aleapp';
  versionHerramienta: string;
  tipoExtraccion: 'logica' | 'fisica' | 'analisis';
  rutaSalida: string;
  rutaImagenOrigen: string;
  hashOrigenSHA256: string;
  hashCopiaSHA256: string;
  hashesCoinciden: boolean;
  logEjecucion: string;
  pidProceso: number;
}

interface ForenseState {
  // Estado del caso actual
  casoActual: Caso | null;
  dispositivoActual: Dispositivo | null;
  prccActual: PRCC | null;
  adquisicionAndriller: Adquisicion | null;
  adquisicionAleapp: Adquisicion | null;
  
  // Acciones para Caso
  setCaso: (caso: Caso) => void;
  clearCaso: () => void;
  
  // Acciones para Dispositivo
  setDispositivo: (dispositivo: Dispositivo) => void;
  clearDispositivo: () => void;
  
  // Acciones para PRCC
  setPRCC: (prcc: PRCC) => void;
  clearPRCC: () => void;
  
  // Acciones para Adquisiciones
  setAdquisicionAndriller: (adquisicion: Adquisicion) => void;
  setAdquisicionAleapp: (adquisicion: Adquisicion) => void;
  
  // Reset completo
  resetAll: () => void;
}

export const useForenseStore = create<ForenseState>((set) => ({
  // Estado inicial
  casoActual: null,
  dispositivoActual: null,
  prccActual: null,
  adquisicionAndriller: null,
  adquisicionAleapp: null,
  
  // Acciones Caso
  setCaso: (caso) => set({ casoActual: caso }),
  clearCaso: () => set({ casoActual: null }),
  
  // Acciones Dispositivo
  setDispositivo: (dispositivo) => set({ dispositivoActual: dispositivo }),
  clearDispositivo: () => set({ dispositivoActual: null }),
  
  // Acciones PRCC
  setPRCC: (prcc) => set({ prccActual: prcc }),
  clearPRCC: () => set({ prccActual: null }),
  
  // Acciones Adquisiciones
  setAdquisicionAndriller: (adquisicion) => set({ adquisicionAndriller: adquisicion }),
  setAdquisicionAleapp: (adquisicion) => set({ adquisicionAleapp: adquisicion }),
  
  // Reset
  resetAll: () => set({
    casoActual: null,
    dispositivoActual: null,
    prccActual: null,
    adquisicionAndriller: null,
    adquisicionAleapp: null,
  }),
}));
