import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, Patient, Professional } from '../models';
import { login as authLogin, logout as authLogout, registerPatient, registerProfessional } from '../services/authService';

interface AuthContextProps {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerPatient: (patient: Patient, password: string) => Promise<boolean>;
  registerProfessional: (professional: Professional, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string) => {
    const result = await authLogin(email, password);
    setUser(result);
    return !!result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const handleRegisterPatient = async (patient: Patient, password: string) => {
    const result = await registerPatient(patient, password);
    setUser(result);
    return !!result;
  };

  const handleRegisterProfessional = async (professional: Professional, password: string) => {
    const result = await registerProfessional(professional, password);
    setUser(result);
    return !!result;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerPatient: handleRegisterPatient, registerProfessional: handleRegisterProfessional }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}; 