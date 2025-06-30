import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { AuthProvider, useAuth } from './store/authStore';
import { Home } from './containers/Landing/Home';
import { About } from './containers/Landing/About';
import { Login } from './containers/Auth/Login';
import { CadastroPaciente } from './containers/Auth/CadastroPaciente';
import { CadastroProfissional } from './containers/Auth/CadastroProfissional';
import { EsqueciSenha } from './containers/Auth/EsqueciSenha';
import { Profile } from './containers/Landing/Profile';
import { AgendamentoPaciente } from './containers/Pacient/Agendamento';
import { AgendamentoDetalhe } from './containers/Pacient/AgendamentoDetalhe';
import { AgendamentoProfissional } from './containers/Professional/AgendamentoProfissional';
import { Professional } from './models';

const PerfilRedirect: React.FC = () => {
  const { user } = useAuth();
  function isProfessional(u: any): u is Professional {
    return u && 'crm' in u;
  }
  // Mock de avaliações dos profissionais (importado do Agendamento)
  const mockProfissionais = [
    {
      id: '2',
      nome: 'Dra. Ana Paula',
      avaliacoes: [
        { nome: 'Maria', nota: 5, comentario: 'Excelente atendimento!' },
        { nome: 'Carlos', nota: 4, comentario: 'Muito atenciosa.' },
      ],
    },
    {
      id: '3',
      nome: 'Dr. Carlos Silva',
      avaliacoes: [
        { nome: 'João', nota: 5, comentario: 'Ótimo profissional.' },
      ],
    },
    // ... outros profissionais omitidos
  ];

  if (user && user.role === 'PROFESSIONAL' && isProfessional(user.user)) {
    const prof = user.user;
    const profissionalMock = mockProfissionais.find(p => p.nome === prof.name);
    const avaliacoes = profissionalMock?.avaliacoes || [];
    return (
      <div style={{ minHeight: '100vh', background: '#F5F5F5', position: 'relative' }}>
        <a href="/" style={{ position: 'absolute', top: 16, left: 16, textDecoration: 'none', zIndex: 2 }}>
          <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>Consulta Fácil</span>
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '16px 0' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(66,107,31,0.10)',
              padding: '32px 20px',
              minWidth: 0,
              maxWidth: 420,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              boxSizing: 'border-box',
              transition: 'box-shadow 0.2s',
              margin: '0 8px',
              overflowY: 'auto',
              maxHeight: '90vh',
            }}
          >
            <h2 style={{ textAlign: 'center', color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 8, letterSpacing: 0.5, marginTop: 0 }}>Perfil Profissional</h2>
            <div style={{ borderBottom: '1px solid #E0E0E0', margin: '8px 0 18px 0' }} />
            <h3 style={{ color: '#426B1F', fontWeight: 500, fontSize: 16, marginBottom: 10 }}>Informações</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
              <span><b>Nome:</b> {prof.name}</span>
              <span><b>CRM:</b> {prof.crm}</span>
              <span><b>Especialidade:</b> {prof.specialty || (prof.specialties && prof.specialties[0]) || '-'}</span>
              <span><b>Experiência:</b> {prof.experience} anos</span>
              <span><b>Telefone:</b> {prof.phone}</span>
              <span><b>E-mail:</b> {prof.email}</span>
            </div>
            <div style={{ borderBottom: '1px solid #E0E0E0', margin: '18px 0 0 0' }} />
            <h3 style={{ color: '#426B1F', fontWeight: 500, fontSize: 16, margin: '18px 0 10px 0' }}>Avaliações</h3>
            {avaliacoes.length === 0 ? (
              <span style={{ color: '#BDBDBD', fontSize: 14 }}>Nenhuma avaliação ainda.</span>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {avaliacoes.map((a, idx) => (
                  <div key={idx} style={{ background: '#F7FAF5', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px rgba(66,107,31,0.06)', fontSize: 14 }}>
                    <span style={{ fontWeight: 600, color: '#42536B' }}>{a.nome} <span style={{ color: '#FFD600', fontWeight: 400 }}> {'★'.repeat(a.nota)}{'☆'.repeat(5 - a.nota)}</span></span>
                    <div style={{ color: '#212121', fontSize: 14, marginTop: 4 }}>{a.comentario}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ borderBottom: '1px solid #E0E0E0', margin: '18px 0 0 0' }} />
            <div style={{ color: '#BDBDBD', textAlign: 'center', fontSize: 13, marginTop: 14 }}>
              (Em breve: Histórico, agenda...)
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Para pacientes, renderiza o novo painel:
  return <Profile />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
            <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/perfil" element={<PerfilRedirect />} />
            <Route path="/agendamento" element={<AgendamentoPaciente />} />
            <Route path="/agendamento/:id" element={<AgendamentoDetalhe />} />
            <Route path="/agendamento-profissional" element={<AgendamentoProfissional />} />
            {/* Outras rotas podem ser adicionadas aqui futuramente */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
