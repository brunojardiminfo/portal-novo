
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import RequestCenter from './components/RequestCenter';
import AIHealthBot from './components/AIHealthBot';
import CheckInFlow from './components/CheckInFlow';
import Login from './components/Login';
import ManagerDashboard from './components/ManagerDashboard';
import { ViewType, UserRole, Patient, HealthRequest, RequestStatus, Appointment, CheckInStatus } from './types';

const MOCK_PATIENT: Patient = {
  id: '1',
  name: 'João Silva Oliveira',
  email: 'joao.silva@unimedpoa.com.br',
  birthDate: '12/05/1992',
  insuranceName: 'Unimed Porto Alegre',
  cardNumber: '0032998877665544',
  planType: 'Unifácil Regional Coparticipativo',
  validUntil: '12/2026',
  avatarUrl: '',
  unimedUnit: 'Porto Alegre',
  motherName: 'Maria Silva Oliveira'
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'João Silva Oliveira',
    doctorName: 'Dra. Marina Santos',
    specialty: 'Cardiologia',
    date: '25/11',
    time: '14:30',
    location: 'Centro Clínico Unimed - Unidade Norte',
    checkInStatus: CheckInStatus.AVAILABLE
  },
  {
    id: 'apt2',
    patientName: 'João Silva Oliveira',
    doctorName: 'Dr. Ricardo Mendes',
    specialty: 'Ortopedia',
    date: '02/12',
    time: '09:00',
    location: 'Hospital Unimed - Bloco B',
    checkInStatus: CheckInStatus.NOT_STARTED
  }
];

const INITIAL_REQUESTS: HealthRequest[] = [
  {
    id: 'req1',
    patientName: 'João Silva Oliveira',
    type: 'Exame Laboratorial',
    description: 'Hemograma completo e perfil lipídico',
    date: '20/11/2023',
    status: RequestStatus.PENDING
  },
  {
    id: 'req2',
    patientName: 'Carlos Eduardo Souza',
    type: 'Ressonância',
    description: 'RM Coluna Lombar',
    date: '19/11/2023',
    status: RequestStatus.PENDING
  }
];

const App: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>('guest');
  const [currentView, setCurrentView] = React.useState<ViewType>('dashboard');
  const [appointments, setAppointments] = React.useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [requests, setRequests] = React.useState<HealthRequest[]>(INITIAL_REQUESTS);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView(role === 'manager' ? 'management-tokens' : 'dashboard');
  };

  const handleCompleteCheckIn = (token: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === 'apt1' 
        ? { ...apt, checkInStatus: CheckInStatus.COMPLETED, validationToken: token } 
        : apt
    ));
    setCurrentView('dashboard');
  };

  if (userRole === 'guest') {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      // Patient Views
      case 'dashboard':
        return <Dashboard patient={MOCK_PATIENT} appointments={appointments} onStartCheckIn={setCurrentView} />;
      case 'check-in':
        return <CheckInFlow appointment={appointments.find(a => a.id === 'apt1')!} patient={MOCK_PATIENT} onComplete={handleCompleteCheckIn} />;
      case 'profile':
        return <Profile patient={MOCK_PATIENT} />;
      case 'requests':
        return <RequestCenter requests={requests.filter(r => r.patientName === MOCK_PATIENT.name)} onAddRequest={() => {}} />;
      case 'ai-assistant':
        return <AIHealthBot />;
      
      // Manager Views
      case 'management-tokens':
      case 'management-requests':
        return <ManagerDashboard appointments={appointments} requests={requests} view={currentView} />;
      
      default:
        return <Dashboard patient={MOCK_PATIENT} appointments={appointments} onStartCheckIn={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onViewChange={setCurrentView} 
      patientName={userRole === 'manager' ? 'Gestor Administrativo' : MOCK_PATIENT.name}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
