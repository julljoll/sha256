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
  { path: '/consignacion', label: 'Consignación', icon: FileText },
  { path: '/adquisicion', label: 'Adquisición (Andriller)', icon: Smartphone },
  { path: '/analisis', label: 'Análisis (ALEAPP)', icon: Microscope },
  { path: '/informe', label: 'Informe Técnico', icon: FileCheck },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-forensic-dark">
      {/* Sidebar */}
      <aside className="w-64 bg-forensic-medium border-r border-forensic-light flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-forensic-light">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary-500" />
            <div>
              <h1 className="text-lg font-bold text-white">Forense Android</h1>
              <p className="text-xs text-gray-400">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-forensic-light hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-forensic-light">
          <div className="text-xs text-gray-500">
            <p>Sistema de Gestión Forense</p>
            <p>Marco Legal Venezolano</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
