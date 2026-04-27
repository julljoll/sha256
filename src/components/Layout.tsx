import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Smartphone, 
  FileText, 
  Microscope, 
  FileCheck,
  Home,
  Shield
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/consignacion', label: '1. Fase Inicial (Obtención)', icon: FileText },
  { path: '/prcc', label: '2. Cadena de Custodia (PRCC)', icon: Shield },
  { path: '/adquisicion', label: '3. Adquisición Forense', icon: Smartphone },
  { path: '/analisis', label: '4. Fase Laboratorio (ALEAPP)', icon: Microscope },
  { path: '/informe', label: '5. Dictamen e Informe', icon: FileCheck },
  { path: '/disposicion-judicial', label: '6. Disposición Judicial', icon: Shield },
  { path: '/disposicion-final', label: '7. Disposición Final', icon: Home },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#fcfcfd] font-sans text-slate-900 overflow-hidden relative">
      {/* Sidebar */}
      <div className="hidden md:flex w-72 bg-[#0a1122] flex-col shrink-0 relative z-20 shadow-2xl print:hidden">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <img src="./favicon.svg" alt="SHA256.US Logo" className="w-9 h-9" />
            <div>
              <h1 className="font-serif font-bold text-2xl tracking-widest text-white print:hidden">SHA256.US</h1>
            </div>
          </div>
          <p className="text-[10px] uppercase font-semibold tracking-widest text-amber-500/80 mb-10 leading-relaxed max-w-[200px]">
            Laboratorio de Informática Forense y Ciberseguridad
          </p>

          <nav className="flex flex-col gap-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-3">Menú Principal</h3>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-800/50 flex flex-col gap-6">
          <div className="pt-6 border-t border-slate-800/50 print:hidden">
            <div className="block p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/70 hover:border-slate-600 transition-all group cursor-default">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800/80 rounded-md text-slate-400 group-hover:text-amber-500 group-hover:bg-slate-700 transition-colors shadow-sm group-hover:shadow">
                  <Shield size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">Sistema Forense v1.0</h4>
                  <p className="text-[9px] text-slate-400 leading-tight">Cumplimiento MP / ISO 27037</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16 text-[#0a1122] page-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
