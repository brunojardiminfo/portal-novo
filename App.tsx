
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
import { dbService } from './services/dbService';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [currentView, setCurrentView] = React.useState<ViewType>('dashboard');
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [requests, setRequests] = React.useState<HealthRequest[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Inicialização e Sincronização
  React.useEffect(() => {
    const session = dbService.getCurrentSession();
    if (session) {
      setCurrentUser(session);
      setCurrentView(session.role === 'manager' ? 'management-tokens' : 'dashboard');
    }
    
    // Carregar dados iniciais do "banco"
    setAppointments(dbService.getAllAppointments());
    setRequests(dbService.getAllRequests());
    setIsLoaded(true);
  }, []);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    setCurrentView(user.role === 'manager' ? 'management-tokens' : 'dashboard');
    // Recarregar agendamentos e requisições no contexto
    setAppointments(dbService.getAllAppointments());
    setRequests(dbService.getAllRequests());
  };

  const handleLogout = () => {
    dbService.logout();
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleAddRequest = (req: Partial<HealthRequest>) => {
    if (!currentUser) return;
    const newReq = dbService.saveRequest({
      ...req,
      patientName: currentUser.name,
    });
    setRequests(prev => [...prev, newReq as HealthRequest]);
  };

  const handleCompleteCheckIn = (token: string) => {
    const updated = dbService.updateAppointment('apt_demo_1', { 
      checkInStatus: CheckInStatus.COMPLETED, 
      validationToken: token 
    });
    setAppointments(updated);
    setCurrentView('dashboard');
  };

  if (!isLoaded) return null;
  if (!currentUser) return <Login onLoginSuccess={handleLoginSuccess} />;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard patient={currentUser} appointments={appointments.filter(a => a.patientName === currentUser.name || currentUser.role === 'manager')} onStartCheckIn={setCurrentView} />;
      case 'check-in':
        return <CheckInFlow appointment={appointments.find(a => a.patientName === currentUser.name)!} patient={currentUser} onComplete={handleCompleteCheckIn} />;
      case 'profile':
        return <Profile patient={currentUser} />;
      case 'requests':
        return <RequestCenter requests={requests.filter(r => r.patientName === currentUser.name)} onAddRequest={handleAddRequest} />;
      case 'ai-assistant':
        return <AIHealthBot />;
      case 'management-tokens':
      case 'management-requests':
        return <ManagerDashboard appointments={appointments} requests={requests} view={currentView} />;
      default:
        return <Dashboard patient={currentUser} appointments={appointments} onStartCheckIn={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onViewChange={setCurrentView} 
      patientName={currentUser.name}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
