
import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink,
  FileText,
  AlertCircle,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { Appointment, HealthRequest, RequestStatus, CheckInStatus } from '../types';
import { dbService } from '../services/dbService';

interface ManagerDashboardProps {
  appointments: Appointment[];
  requests: HealthRequest[];
  view: 'management-tokens' | 'management-requests';
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ appointments, requests, view }) => {
  const [localRequests, setLocalRequests] = React.useState(requests);
  
  const validatedTokens = appointments.filter(a => a.checkInStatus === CheckInStatus.COMPLETED);
  const pendingRequests = localRequests.filter(r => r.status === RequestStatus.PENDING);

  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    dbService.updateRequestStatus(id, status);
    setLocalRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

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
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{validatedTokens.length}</p>
          <p className="text-sm text-slate-500">Check-ins Validados</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{appointments.length}</p>
          <p className="text-sm text-slate-500">Pacientes Hoje</p>
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
            {view === 'management-tokens' ? 'Monitoramento de Tokens' : 'Gestão de Autorizações'}
          </h3>
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
                      <div>
                        <p className="text-sm font-bold text-slate-800">{apt.patientName}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{apt.specialty}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {apt.validationToken ? (
                        <span className="text-xs font-mono font-bold text-[#006544] bg-green-50 px-2 py-1 rounded border border-green-100">
                          {apt.validationToken}
                        </span>
                      ) : <span className="text-xs text-slate-400">Pendente...</span>}
                    </td>
                    <td className="px-6 py-4 text-xs">
                       {apt.checkInStatus}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                localRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{req.patientName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{req.type}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {req.description}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                         req.status === RequestStatus.APPROVED ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         req.status === RequestStatus.REJECTED ? 'bg-red-50 text-red-600 border-red-100' :
                         'bg-amber-50 text-amber-600 border-amber-100'
                       }`}>
                         {req.status.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === RequestStatus.PENDING && (
                        <div className="flex justify-end gap-2">
                           <button 
                             onClick={() => handleStatusUpdate(req.id, RequestStatus.APPROVED)}
                             className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg"
                           >
                             APROVAR
                           </button>
                           <button 
                             onClick={() => handleStatusUpdate(req.id, RequestStatus.REJECTED)}
                             className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg"
                           >
                             NEGAR
                           </button>
                        </div>
                      )}
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
