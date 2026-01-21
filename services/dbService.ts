
import { Patient, HealthRequest, Appointment, RequestStatus, CheckInStatus, UserRole } from '../types';

const STORAGE_KEYS = {
  USERS: 'urgetrauma_users',
  REQUESTS: 'urgetrauma_requests',
  APPOINTMENTS: 'urgetrauma_appointments',
  SESSION: 'urgetrauma_session'
};

// Dados Iniciais para popular o sistema se estiver vazio
const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_demo_1',
    patientName: 'João Silva Oliveira',
    doctorName: 'Dra. Marina Santos',
    specialty: 'Traumatologia Joelho',
    date: '25/05',
    time: '14:30',
    location: 'Unidade Central',
    checkInStatus: CheckInStatus.AVAILABLE
  }
];

export const dbService = {
  // --- AUTH & USERS ---
  register: (userData: any) => {
    const users = dbService.getUsers();
    const exists = users.find((u: any) => u.email === userData.email || u.cardNumber === userData.cardNumber);
    if (exists) throw new Error("Usuário ou CPF já cadastrado.");
    
    const newUser = { ...userData, id: crypto.randomUUID() };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  login: (credentials: { identifier: string; password?: string; role: UserRole }) => {
    const users = dbService.getUsers();
    const user = users.find((u: any) => 
      (u.email === credentials.identifier || u.cardNumber === credentials.identifier) && 
      u.role === credentials.role
    );
    
    if (!user) throw new Error("Credenciais inválidas ou usuário não encontrado.");
    
    // Em um sistema real validaríamos o password aqui
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getCurrentSession: () => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  },

  getUsers: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  // --- REQUESTS ---
  saveRequest: (request: Partial<HealthRequest>) => {
    const requests = dbService.getAllRequests();
    const newReq = {
      ...request,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('pt-BR'),
      status: RequestStatus.PENDING
    };
    requests.push(newReq);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return newReq;
  },

  getAllRequests: () => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  },

  updateRequestStatus: (id: string, status: RequestStatus) => {
    const requests = dbService.getAllRequests();
    const updated = requests.map((r: any) => r.id === id ? { ...r, status } : r);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
  },

  // --- APPOINTMENTS & TOKENS ---
  getAllAppointments: () => {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const appts = data ? JSON.parse(data) : DEFAULT_APPOINTMENTS;
    if (!data) localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
    return appts;
  },

  updateAppointment: (id: string, updates: Partial<Appointment>) => {
    const appts = dbService.getAllAppointments();
    const updated = appts.map((a: any) => a.id === id ? { ...a, ...updates } : a);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return updated;
  }
};
