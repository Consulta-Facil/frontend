import { Patient, Professional, AuthUser } from '../models';

// Mock database
const users: ((Patient & { password: string }) | (Professional & { password: string }))[] = [
  {
    id: '1',
    name: 'João Maria Gonçalves',
    email: 'joao@teste.com',
    cpf: '123.456.789-00',
    birthDate: '1990-01-01',
    phone: '(11) 99999-9999',
    addressId: 'addr1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    address: {
      id: 'addr1',
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      cep: '01234-567',
      uf: 'SP',
    },
    password: '123456',
  } as Patient & { password: string },
  {
    id: '2',
    name: 'Dra. Ana Paula',
    email: 'ana@teste.com',
    crm: '12345-SP',
    specialty: 'Clínico Geral',
    specialties: ['Clínico Geral'],
    experience: 10,
    rating: 4.8,
    availableHours: [],
    phone: '(11) 98888-8888',
    addressId: 'addr2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cpf: '987.654.321-00',
    address: {
      id: 'addr2',
      street: 'Av. Brasil',
      number: '456',
      city: 'São Paulo',
      cep: '02345-678',
      uf: 'SP',
    },
    password: 'prof456',
  } as Professional & { password: string },
];

const agendamentos = [
  {
    id: 1,
    userId: '1',
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    data: '20/06/2024',
    hora: '14:00',
    status: 'Agendado',
  },
  {
    id: 2,
    userId: '1',
    profissional: 'Dr. Carlos Silva',
    especialidade: 'Dermatologia',
    data: '25/06/2024',
    hora: '09:30',
    status: 'Agendado',
  },
  {
    id: 3,
    userId: '2',
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    data: '22/06/2024',
    hora: '10:00',
    status: 'Agendado',
  },
];

export async function login(email: string, password: string): Promise<AuthUser | null> {
  // Simula busca no banco
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    let role: 'PATIENT' | 'PROFESSIONAL' = 'PATIENT';
    if ('crm' in user) {
      role = 'PROFESSIONAL';
    }
    return {
      id: user.id,
      email: user.email,
      role,
      user: user as Patient | Professional,
    };
  }
  return null;
}

export async function getAgendamentosByUserId(userId: string) {
  return agendamentos.filter(a => a.userId === userId);
}

export async function registerPatient(patient: Patient, password: string): Promise<AuthUser | null> {
  const patientWithPassword = { ...patient, password };
  users.push(patientWithPassword);
  return {
    id: patient.id,
    email: patient.email,
    role: 'PATIENT',
    user: patient,
  };
}

export async function registerProfessional(professional: Professional, password: string): Promise<AuthUser | null> {
  const professionalWithPassword = { ...professional, password };
  users.push(professionalWithPassword);
  return {
    id: professional.id,
    email: professional.email,
    role: 'PROFESSIONAL',
    user: professional,
  };
}

export function logout() {
  // Mock: não faz nada
} 