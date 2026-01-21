
export enum RequestStatus {
  PENDING = 'Pendente',
  APPROVED = 'Aprovado',
  REJECTED = 'Recusado',
  COMPLETED = 'Concluído'
}

export enum CheckInStatus {
  NOT_STARTED = 'Não Iniciado',
  COMPLETED = 'Validado',
  AVAILABLE = 'Disponível'
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  insuranceName: string;
  cardNumber: string;
  planType: string;
  validUntil: string;
  avatarUrl: string;
  unimedUnit: string;
  motherName: string;
}

export interface HealthRequest {
  id: string;
  patientName: string;
  type: string;
  description: string;
  date: string;
  status: RequestStatus;
  attachmentUrl?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  checkInStatus: CheckInStatus;
  validationToken?: string;
}

export type UserRole = 'guest' | 'patient' | 'manager';
export type ViewType = 'dashboard' | 'profile' | 'requests' | 'records' | 'ai-assistant' | 'check-in' | 'management-tokens' | 'management-requests';
