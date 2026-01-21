
import React from 'react';
import { User, ShieldCheck, ArrowRight, Lock, CreditCard } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = React.useState<UserRole>('patient');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side: Brand & Welcome */}
        <div className="bg-[#005da4] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <span className="text-[#005da4] font-bold text-2xl">U</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Urgetrauma:<br/>Saúde e movimento.</h1>
            <p className="text-blue-100 text-lg">Bem-vindo ao Portal Digital Urgetrauma. Agilize seu atendimento especializado em traumato-ortopedia.</p>
          </div>
          
          <div className="relative z-10 pt-12">
             <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="text-blue-200" />
                <p className="text-xs font-medium">Conexão segura com os protocolos de saúde Urgetrauma.</p>
             </div>
          </div>

          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button 
                onClick={() => setActiveTab('patient')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'patient' ? 'bg-white text-[#005da4] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <User size={16} />
                Paciente
              </button>
              <button 
                onClick={() => setActiveTab('manager')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'manager' ? 'bg-white text-[#004a87] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Lock size={16} />
                Gestão
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {activeTab === 'patient' ? 'Acesso do Paciente' : 'Portal Administrativo'}
            </h2>
            <p className="text-slate-500 text-sm">Acesse para gerenciar sua saúde e movimento.</p>
          </div>

          <div className="space-y-4">
            {activeTab === 'patient' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nº da Carteirinha ou CPF</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    placeholder="gestor@urgetrauma.com.br"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004a87] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Senha</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004a87] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </>
            )}

            <button 
              onClick={() => onLogin(activeTab)}
              className="w-full py-4 bg-[#005da4] text-white rounded-xl font-bold hover:bg-[#004a87] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 group"
            >
              Entrar no Portal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Dificuldades no acesso? <span className="text-[#005da4] font-bold cursor-pointer hover:underline">Falar com suporte Urgetrauma</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
