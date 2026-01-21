
import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink,
  MoreHorizontal,
  FileText,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Appointment, HealthRequest, RequestStatus, CheckInStatus } from '../types';

interface ManagerDashboardProps {
  appointments: Appointment[];
  requests: HealthRequest[];
  view: 'management-tokens' | 'management-requests';
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ appointments, requests, view }) => {
  const validatedTokens = appointments.filter(a => a.checkInStatus === CheckInStatus.COMPLETED);
  const pendingRequests = requests.filter(r => r.status === RequestStatus.PENDING);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-[#00995D] rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp size={12} />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{validatedTokens.length}</p>
          <p className="text-sm text-slate-500">Sessões Validadas Hoje</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{appointments.length}</p>
          <p className="text-sm text-slate-500">Total Agendados (Dia)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <AlertCircle size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{pendingRequests.length}</p>
          <p className="text-sm text-slate-500">Autorizações Pendentes</p>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-lg">
            {view === 'management-tokens' ? 'Monitoramento de Check-ins' : 'Gestão de Autorizações'}
          </h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar paciente..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00995D] outline-none"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Paciente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Informação</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {view === 'management-tokens' ? (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {apt.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{apt.patientName}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{apt.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {apt.validationToken ? (
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-mono font-bold text-[#006544] bg-green-50 px-2 py-1 rounded border border-green-100">
                             {apt.validationToken}
                           </span>
                           <span className="text-[10px] text-slate-400">Validado às {apt.time}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Aguardando check-in...</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${
                        apt.checkInStatus === CheckInStatus.COMPLETED 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {apt.checkInStatus === CheckInStatus.COMPLETED ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {apt.checkInStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{req.patientName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{req.type}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 max-w-xs truncate">{req.description}</p>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full border ${
                         req.status === RequestStatus.APPROVED ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         req.status === RequestStatus.REJECTED ? 'bg-red-50 text-red-600 border-red-100' :
                         'bg-amber-50 text-amber-600 border-amber-100'
                       }`}>
                         {req.status.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button className="px-3 py-1 bg-[#00995D] text-white text-[10px] font-bold rounded-lg hover:bg-[#006544] transition-all">
                           APROVAR
                         </button>
                         <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-50 transition-all">
                           VER LAUDO
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
