
import React from 'react';
import { User, ShieldCheck, ArrowRight, Lock, CreditCard, Mail, UserPlus, Fingerprint } from 'lucide-react';
import { UserRole } from '../types';
import { dbService } from '../services/dbService';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = React.useState<UserRole>('patient');
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [error, setError] = React.useState('');
  
  // Form States
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    cardNumber: '', // Servirá como CPF ou Carteirinha
    motherName: '',
    birthDate: '',
    insuranceName: 'Particular / Convênio Urgetrauma',
    planType: 'Saúde e Movimento Pleno',
    unimedUnit: 'Sede Porto Alegre'
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        const newUser = dbService.register({ ...formData, role: activeTab });
        onLoginSuccess(newUser);
      } else {
        const identifier = activeTab === 'patient' ? formData.cardNumber : formData.email;
        const user = dbService.login({ identifier, role: activeTab });
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "Erro na autenticação.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side: Brand & Welcome */}
        <div className="bg-[#005da4] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <span className="text-[#005da4] font-bold text-2xl">U</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Urgetrauma:<br/>Saúde e movimento.</h1>
            <p className="text-blue-100 text-lg">
              {isRegistering 
                ? "Crie sua conta e tenha acesso a agendamentos, tokens e gestão de saúde digital." 
                : "Agilize seu atendimento especializado em traumato-ortopedia através do nosso portal."}
            </p>
          </div>
          
          <div className="relative z-10 pt-12">
             <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="text-blue-200" />
                <p className="text-xs font-medium">Dados protegidos conforme a LGPD e protocolos de saúde.</p>
             </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
          <div className="mb-6">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setActiveTab('patient')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'patient' ? 'bg-white text-[#005da4] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <User size={16} /> Paciente
              </button>
              <button 
                onClick={() => setActiveTab('manager')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'manager' ? 'bg-white text-[#004a87] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Lock size={16} /> Gestão
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {isRegistering ? 'Criar Nova Conta' : 'Acesse o Portal'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isRegistering ? 'Preencha os dados abaixo' : 'Insira suas credenciais para continuar'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2">
              <Fingerprint size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nome Completo</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Nome Completo"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                {activeTab === 'patient' ? 'Carteirinha ou CPF' : 'E-mail Corporativo'}
              </label>
              <div className="relative">
                {activeTab === 'patient' ? <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} /> : <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />}
                <input 
                  type={activeTab === 'patient' ? 'text' : 'email'} required
                  value={activeTab === 'patient' ? formData.cardNumber : formData.email}
                  onChange={e => setFormData({...formData, [activeTab === 'patient' ? 'cardNumber' : 'email']: e.target.value})}
                  placeholder={activeTab === 'patient' ? "000.000.000-00" : "exemplo@urgetrauma.com.br"}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none"
                />
              </div>
            </div>

            {isRegistering && activeTab === 'patient' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nascimento</label>
                    <input type="date" required value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">E-mail</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nome da Mãe</label>
                  <input type="text" required value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} placeholder="Nome completo da mãe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none" />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Senha</label>
              <input 
                type="password" required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005da4] outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#005da4] text-white rounded-xl font-bold hover:bg-[#004a87] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 group"
            >
              {isRegistering ? 'Cadastrar Minha Conta' : 'Entrar no Portal'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#005da4] font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
            >
              {isRegistering ? <User size={16}/> : <UserPlus size={16}/>}
              {isRegistering ? 'Já tenho uma conta. Fazer Login.' : 'Não tem conta? Cadastre-se agora.'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
