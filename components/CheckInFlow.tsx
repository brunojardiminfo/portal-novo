
import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  User, 
  CreditCard, 
  ChevronRight, 
  Loader2, 
  QrCode, 
  ShieldCheck,
  Smartphone,
  Scan,
  Key
} from 'lucide-react';
import { Appointment, CheckInStatus, Patient } from '../types';

interface CheckInFlowProps {
  appointment: Appointment;
  patient: Patient;
  onComplete: (token: string) => void;
}

const CheckInFlow: React.FC<CheckInFlowProps> = ({ appointment, patient, onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFaceVerified, setIsFaceVerified] = React.useState(false);
  const [clinicToken, setClinicToken] = React.useState('');

  const isPOA = patient.insuranceName.toLowerCase().includes('porto alegre');

  const startFaceRecognition = () => {
    setIsLoading(true);
    // Simulação de reconhecimento facial
    setTimeout(() => {
      setIsLoading(false);
      setIsFaceVerified(true);
      setStep(2);
    }, 2000);
  };

  const handleClinicTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clinicToken.length >= 4) {
      onComplete('POA-' + clinicToken.toUpperCase());
    }
  };

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(prev => prev + 1);
    }, 1500);
  };

  if (appointment.checkInStatus === CheckInStatus.COMPLETED) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-[#00995D] rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Check-in Validado!</h2>
        <p className="text-slate-500 mb-10">Sua sessão foi autenticada com sucesso. Apresente este código na recepção.</p>
        
        <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-200 inline-block mb-10">
          <div className="w-48 h-48 bg-white p-4 rounded-xl shadow-inner mx-auto mb-4 flex items-center justify-center border border-slate-100">
             <QrCode size={140} className="text-slate-800" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Token de Atendimento</p>
          <p className="text-3xl font-mono font-bold text-[#006544] tracking-widest">{appointment.validationToken}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
            Salvar Comprovante
          </button>
          <button className="px-8 py-3 bg-[#00995D] text-white rounded-xl font-bold hover:bg-[#006544] transition-all">
            Ir para Clínica
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Condicional de Interface por Convênio */}
      <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-slate-100 min-h-[450px] flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Loader2 size={40} className="text-[#00995D] animate-spin" />
            <p className="text-slate-500 font-medium">Processando validação Unimed...</p>
          </div>
        ) : (
          <>
            {/* Fluxo UNIMED PORTO ALEGRE */}
            {isPOA ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 text-[#00995D] rounded-full flex items-center justify-center">
                    <Scan size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Validação Porto Alegre</h3>
                </div>

                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4">
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-4 mb-6">
                      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <User size={40} />
                      </div>
                      <h4 className="font-bold text-slate-800">Reconhecimento Facial</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        Para validar sua identidade Unimed POA, precisamos realizar uma captura facial rápida.
                      </p>
                      <button 
                        onClick={startFaceRecognition}
                        className="px-8 py-3 bg-[#00995D] text-white rounded-xl font-bold hover:bg-[#006544] transition-all flex items-center justify-center gap-2 mx-auto"
                      >
                        <Scan size={20} />
                        Iniciar Reconhecimento
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                      <CheckCircle2 className="text-[#00995D]" size={24} />
                      <p className="text-sm font-semibold text-emerald-800">Identidade facial validada com sucesso!</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Key className="text-slate-400" size={18} />
                        <label className="text-sm font-bold text-slate-700">Insira o Token da Clínica</label>
                      </div>
                      <p className="text-xs text-slate-500">Solicite o código de 4 ou 6 dígitos na recepção ou totem da unidade.</p>
                      <form onSubmit={handleClinicTokenSubmit} className="space-y-4">
                        <input 
                          type="text"
                          maxLength={6}
                          value={clinicToken}
                          onChange={(e) => setClinicToken(e.target.value)}
                          placeholder="EX: 8877"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-mono font-bold tracking-[0.5em] focus:ring-2 focus:ring-[#00995D] focus:border-transparent outline-none"
                        />
                        <button 
                          type="submit"
                          disabled={clinicToken.length < 4}
                          className="w-full py-4 bg-[#00995D] text-white rounded-xl font-bold hover:bg-[#006544] transition-all disabled:opacity-50"
                        >
                          Validar Sessão e Finalizar
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fluxo DEMAIS UNIMEDS */
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Verificação de Dados do Beneficiário</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome Completo</p>
                    <p className="text-lg font-bold text-slate-800">{patient.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Carteirinha</p>
                    <p className="text-lg font-mono font-bold text-slate-800">{patient.cardNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data de Vencimento</p>
                    <p className="text-lg font-bold text-slate-800">{patient.validUntil}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome da Mãe</p>
                    <p className="text-lg font-bold text-slate-800">{patient.motherName}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-center">
                  <p className="text-sm text-slate-500">Confirme se os dados acima estão corretos para realizar o pré-check-in.</p>
                  <button 
                    onClick={() => onComplete('UNI-' + Math.floor(1000 + Math.random() * 9000))}
                    className="w-full py-4 bg-[#00995D] text-white rounded-xl font-bold hover:bg-[#006544] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                  >
                    Confirmar Dados e Validar
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckInFlow;
