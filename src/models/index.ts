export interface Address {
  id: string;
  street: string;
  number: string;
  city: string;
  cep: string;
  uf: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addressId: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  cpf: string;
  birthDate: string;
  emergencyContact?: string;
}

export interface Professional extends User {
  crm: string;
  specialty: string;
  specialties: string[];
  experience: number;
  rating: number;
  availableHours: string[];
  cpf: string;
}

export interface Clinic {
  id: string;
  name: string;
  addressId: string;
  address?: Address;
  phone: string;
  specialties: string[];
  professionals: Professional[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  clinicId: string;
  specialty: string;
  dateTime: string;
  price: number;
  status: 'SCHEDULED' | 'ONGOING' | 'FINISHED' | 'CANCELED';
  patient?: Patient;
  professional?: Professional;
  clinic?: Clinic;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';
  user: Patient | Professional;
} 