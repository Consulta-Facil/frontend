import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { getAgendamentosByUserId } from '../../services/authService';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | null>(null);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getAgendamentosByUserId(user.id).then(setAgendamentos);
    }
  }, [user]);

  if (!user) return null;

  const userName = user.user?.name || '';

  // Mock de dados detalhados
  const exames = [
    { id: 1, nome: 'Hemograma', data: '2024-05-10', tipo: 'Sangue', local: 'Laboratório Central' },
    { id: 2, nome: 'Raio-X', data: '2024-06-01', tipo: 'Imagem', local: 'Clínica Imagem' },
  ];
  const diagnosticos = [
    { id: 1, nome: 'Hipertensão', data: '2024-05-12', profissional: 'Dra. Ana Paula' },
  ];
  const profissionaisConsultados = [
    { id: 1, nome: 'Dra. Ana Paula', especialidade: 'Clínico Geral', consultas: 2 },
    { id: 2, nome: 'Dr. Carlos Silva', especialidade: 'Dermatologia', consultas: 1 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSection = (section: string) => {
    setOpen(open === section ? null : section);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', position: 'relative', padding: 0 }}>
      <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
        <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>ConsultaFácil</span>
      </Link>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '48px 0 0 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid #42536B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <svg width="48" height="48" fill="none" stroke="#42536B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
          </div>
          <h2 style={{ fontWeight: 500, fontSize: 26, color: '#212121', margin: 0 }}>{userName}</h2>
          <button onClick={handleLogout} style={{ marginTop: 18, background: '#426B1F', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(66,83,107,0.08)' }}>Sair</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#FAFAF7', borderRadius: 10, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 0 }}>
            <button onClick={() => toggleSection('consultas')} style={{ width: '100%', background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 17, color: '#42536B', fontWeight: 500, height: 48 }}>
              <span style={{ marginLeft: 18 }}>Minhas Consultas <span style={{ background: '#BFD8B8', color: '#426B1F', borderRadius: 12, fontSize: 14, fontWeight: 600, padding: '2px 10px', marginLeft: 8 }}>{agendamentos.length}</span></span>
              <span style={{ marginRight: 18 }}>{open === 'consultas' ? '▲' : '▼'}</span>
            </button>
            {open === 'consultas' && (
              <div style={{ padding: '0 24px 16px 24px' }}>
                {agendamentos.length === 0 ? (
                  <div style={{ color: '#757575', fontSize: 15, padding: '12px 0' }}>Nenhuma consulta encontrada.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {agendamentos.map(ag => (
                      <li key={ag.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontWeight: 600, color: '#42536B', fontSize: 16 }}>{ag.profissional} <span style={{ fontWeight: 400, color: '#757575', fontSize: 14 }}>({ag.especialidade})</span></span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Data: <b>{ag.data}</b> às <b>{ag.hora}</b></span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Hospital: {ag.hospital || '-'}</span>
                        <span style={{ color: '#426B1F', fontWeight: 500, fontSize: 15 }}>Status: {ag.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div style={{ background: '#FAFAF7', borderRadius: 10, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 0 }}>
            <button onClick={() => toggleSection('exames')} style={{ width: '100%', background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 17, color: '#42536B', fontWeight: 500, height: 48 }}>
              <span style={{ marginLeft: 18 }}>Meus Exames <span style={{ background: '#BFD8B8', color: '#426B1F', borderRadius: 12, fontSize: 14, fontWeight: 600, padding: '2px 10px', marginLeft: 8 }}>{exames.length}</span></span>
              <span style={{ marginRight: 18 }}>{open === 'exames' ? '▲' : '▼'}</span>
            </button>
            {open === 'exames' && (
              <div style={{ padding: '0 24px 16px 24px' }}>
                {exames.length === 0 ? (
                  <div style={{ color: '#757575', fontSize: 15, padding: '12px 0' }}>Nenhum exame encontrado.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {exames.map(ex => (
                      <li key={ex.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontWeight: 600, color: '#42536B', fontSize: 16 }}>{ex.nome}</span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Data: <b>{ex.data}</b></span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Tipo: {ex.tipo}</span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Local: {ex.local}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div style={{ background: '#FAFAF7', borderRadius: 10, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 0 }}>
            <button onClick={() => toggleSection('diagnosticos')} style={{ width: '100%', background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 17, color: '#42536B', fontWeight: 500, height: 48 }}>
              <span style={{ marginLeft: 18 }}>Meus Diagnósticos <span style={{ background: '#BFD8B8', color: '#426B1F', borderRadius: 12, fontSize: 14, fontWeight: 600, padding: '2px 10px', marginLeft: 8 }}>{diagnosticos.length}</span></span>
              <span style={{ marginRight: 18 }}>{open === 'diagnosticos' ? '▲' : '▼'}</span>
            </button>
            {open === 'diagnosticos' && (
              <div style={{ padding: '0 24px 16px 24px' }}>
                {diagnosticos.length === 0 ? (
                  <div style={{ color: '#757575', fontSize: 15, padding: '12px 0' }}>Nenhum diagnóstico encontrado.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {diagnosticos.map(diag => (
                      <li key={diag.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontWeight: 600, color: '#42536B', fontSize: 16 }}>{diag.nome}</span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Data: <b>{diag.data}</b></span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Profissional responsável: {diag.profissional}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div style={{ background: '#FAFAF7', borderRadius: 10, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 0 }}>
            <button onClick={() => toggleSection('profissionais')} style={{ width: '100%', background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 17, color: '#42536B', fontWeight: 500, height: 48 }}>
              <span style={{ marginLeft: 18 }}>Profissionais Consultados <span style={{ background: '#BFD8B8', color: '#426B1F', borderRadius: 12, fontSize: 14, fontWeight: 600, padding: '2px 10px', marginLeft: 8 }}>{profissionaisConsultados.length}</span></span>
              <span style={{ marginRight: 18 }}>{open === 'profissionais' ? '▲' : '▼'}</span>
            </button>
            {open === 'profissionais' && (
              <div style={{ padding: '0 24px 16px 24px' }}>
                {profissionaisConsultados.length === 0 ? (
                  <div style={{ color: '#757575', fontSize: 15, padding: '12px 0' }}>Nenhum profissional encontrado.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {profissionaisConsultados.map(prof => (
                      <li key={prof.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(66,83,107,0.06)', marginBottom: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontWeight: 600, color: '#42536B', fontSize: 16 }}>{prof.nome}</span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Especialidade: {prof.especialidade}</span>
                        <span style={{ color: '#212121', fontSize: 15 }}>Consultas realizadas: {prof.consultas}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 