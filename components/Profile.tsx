
import React from 'react';
import { User, Mail, Calendar, Phone, ShieldCheck, MapPin, Edit2, CreditCard, Heart } from 'lucide-react';
import { Patient } from '../types';

interface ProfileProps {
  patient: Patient;
}

const Profile: React.FC<ProfileProps> = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* Profile Info Side */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=00995D&color=fff&size=200`} 
              alt="Avatar" 
              className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-md"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-[#00995D] text-white rounded-full border-2 border-white shadow-lg">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
          <p className="text-slate-500 text-sm mb-6">Beneficiário Unimed</p>
          <div className="flex justify-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
              Plano Ativo
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Contato</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="text-slate-400" size={18} />
              <span className="text-slate-600">{patient.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="text-slate-400" size={18} />
              <span className="text-slate-600">(51) 98765-4321</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-slate-400" size={18} />
              <span className="text-slate-600">{patient.unimedUnit}, RS - Brasil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Unimed Card */}
        <div className="bg-gradient-to-br from-[#006544] to-[#00995D] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-xs font-bold uppercase tracking-widest mb-1">Cartão Virtual Unimed</p>
                <h3 className="text-xl font-bold">{patient.insuranceName}</h3>
              </div>
              <ShieldCheck size={32} className="text-white opacity-80" />
            </div>
            
            <div className="mt-8">
              <p className="text-green-200 text-[10px] uppercase font-bold tracking-widest mb-1">Número do Cartão</p>
              <p className="text-2xl font-mono tracking-wider">{patient.cardNumber.match(/.{1,4}/g)?.join(' ')}</p>
            </div>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-green-200 text-[10px] uppercase font-bold tracking-widest mb-1">Validade</p>
                <p className="text-sm font-bold">{patient.validUntil}</p>
              </div>
              <div className="text-right">
                <p className="text-green-200 text-[10px] uppercase font-bold tracking-widest mb-1">Plano</p>
                <p className="text-sm font-bold">{patient.planType}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>

        {/* Details Grid */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Dados Cadastrais</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</p>
              <p className="text-slate-800 font-medium">{patient.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data de Nascimento</p>
              <p className="text-slate-800 font-medium">{patient.birthDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome da Mãe</p>
              <p className="text-slate-800 font-medium">{patient.motherName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unidade Unimed</p>
              <p className="text-slate-800 font-medium">{patient.unimedUnit}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo Sanguíneo</p>
              <p className="text-slate-800 font-medium">A+</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vínculo</p>
              <p className="text-[#00995D] font-bold">Titular</p>
            </div>
          </div>
        </div>

        {/* Informational Alert */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <h4 className="font-bold text-orange-800 mb-1">Mantenha seus dados atualizados</h4>
            <p className="text-sm text-orange-700">Divergências no Nome da Mãe ou no Número da Carteirinha podem impedir a validação automática via portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
