
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  History, 
  Bot, 
  LogOut, 
  Bell,
  Menu,
  CheckCircle2,
  Users,
  ClipboardCheck
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  patientName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, patientName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const isManager = patientName.includes('Gestor');

  const navItems = isManager ? [
    { id: 'management-tokens', label: 'Tokens e Check-ins', icon: ClipboardCheck },
    { id: 'management-requests', label: 'Autorizações', icon: FileText },
    { id: 'records', label: 'Pacientes', icon: Users },
  ] : [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'check-in', label: 'Validar Consulta', icon: CheckCircle2 },
    { id: 'profile', label: 'Dados do Plano', icon: User },
    { id: 'requests', label: 'Autorizações', icon: FileText },
    { id: 'ai-assistant', label: 'Dúvidas Urgetrauma', icon: Bot },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${isManager ? 'bg-[#004a87]' : 'bg-[#005da4]'}`}>
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <h1 className="text-xl font-bold text-[#004a87]">Urgetrauma</h1>
          </div>

          <nav className="flex-1 px-4 space-y-1 py-4">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Menu Principal</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id as ViewType);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-[#005da4]/10 text-[#004a87] font-semibold' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                  `}
                >
                  <Icon size={20} className={isActive ? (isManager ? 'text-[#004a87]' : 'text-[#005da4]') : ''} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100">
             <button 
               onClick={() => window.location.reload()}
               className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
             >
               <LogOut size={20} />
               <span>Sair do Portal</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-slate-800">
              {navItems.find(i => i.id === currentView)?.label || 'Detalhes'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-900 leading-tight">{patientName}</p>
                <p className="text-[10px] text-[#005da4] font-bold uppercase tracking-wider">
                  {isManager ? 'Acesso Administrativo' : 'Paciente Urgetrauma'}
                </p>
              </div>
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patientName)}&background=${isManager ? '004a87' : '005da4'}&color=fff`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
