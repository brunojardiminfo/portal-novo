
import React from 'react';
import { 
  CreditCard, 
  Calendar, 
  Activity, 
  ArrowUpRight,
  ChevronRight,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Patient, Appointment, CheckInStatus, ViewType } from '../types';

interface DashboardProps {
  patient: Patient;
  appointments: Appointment[];
  onStartCheckIn: (view: ViewType) => void;
}

const healthData = [
  { name: 'Jan', consultas: 1 },
  { name: 'Fev', consultas: 2 },
  { name: 'Mar', consultas: 1 },
  { name: 'Abr', consultas: 3 },
  { name: 'Mai', consultas: 1 },
  { name: 'Jun', consultas: 4 },
];

const Dashboard: React.FC<DashboardProps> = ({ patient, appointments, onStartCheckIn }) => {
  const nextAppt = appointments[0];
  const isCheckInAvailable = nextAppt?.checkInStatus === CheckInStatus.AVAILABLE;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Check-in Banner */}
      {isCheckInAvailable ? (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-orange-900">Check-in disponível!</h2>
              <p className="text-sm text-orange-700">Você tem uma consulta com {nextAppt.doctorName} hoje às {nextAppt.time}. Valide agora para agilizar sua entrada na Urgetrauma.</p>
            </div>
          </div>
          <button 
            onClick={() => onStartCheckIn('check-in')}
            className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
          >
            <QrCode size={20} />
            Validar Sessão
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#005da4] to-[#004a87] rounded-2xl p-6 lg:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Bem-vindo à Urgetrauma, {patient.name.split(' ')[0]}!</h1>
            <p className="text-blue-100 max-w-md">Sua saúde e movimento são nossa prioridade. Utilize o portal para check-ins rápidos e gestão de autorizações.</p>
            <div className="mt-8 flex gap-4">
              <button className="bg-white text-[#004a87] px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Unidades Urgetrauma
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold hover:bg-white/20 transition-colors">
                Especialidades
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 hidden md:block opacity-20 transform translate-x-10 -translate-y-10">
            <Activity size={240} />
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Identificação Urgetrauma</p>
          <p className="text-lg font-mono font-bold text-slate-800">{patient.cardNumber.slice(0, 4)} **** **** {patient.cardNumber.slice(-4)}</p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Convênio Ativo</span>
            <span className="text-[#005da4] font-bold">Validado</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Próxima Sessão</p>
          <p className="text-lg font-bold text-slate-800">{nextAppt?.date} às {nextAppt?.time}</p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">{nextAppt?.specialty}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status de Fisioterapia</p>
          <p className="text-lg font-bold text-[#005da4]">Autorizado</p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">10 sessões restantes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Evolução do Tratamento</p>
          <p className="text-lg font-bold text-slate-800">Em Progresso</p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Recuperação 75%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Frequência de Tratamento (Mensal)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#005da4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#005da4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="consultas" stroke="#005da4" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Agendamentos</h3>
            <button className="text-[#005da4] text-sm font-bold hover:underline">Ver Agenda</button>
          </div>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-slate-50 rounded-lg">
                  <span className="text-xs font-bold text-slate-400 uppercase">{apt.date.split('/')[0]}</span>
                  <span className="text-lg font-bold text-[#004a87] leading-none">{apt.date.split('/')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{apt.doctorName}</p>
                  <p className="text-xs text-slate-500 truncate">{apt.specialty}</p>
                </div>
                <div className="flex items-center">
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-[#005da4]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
