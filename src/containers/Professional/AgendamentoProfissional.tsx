import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const mockAgendamentos = [
  {
    id: 1,
    paciente: 'João Maria Gonçalves',
    idade: 34,
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    hospital: 'Hospital São Paulo',
    local: 'São Paulo - SP',
    data: '2024-06-20',
    hora: '14:00',
    status: 'pendente',
    avaliado: false,
  },
  {
    id: 2,
    paciente: 'Maria Souza',
    idade: 28,
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    hospital: 'Clínica Dermato',
    local: 'São Paulo - SP',
    data: '2024-06-21',
    hora: '10:00',
    status: 'futuro',
    avaliado: true,
    nota: 5,
    comentario: 'Excelente atendimento! A Dra. Ana foi muito atenciosa e profissional. Explicou tudo com clareza e me fez sentir muito confortável durante a consulta.',
  },
  {
    id: 3,
    paciente: 'Carlos Silva',
    idade: 7,
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    hospital: 'Hospital Infantil',
    local: 'Campinas - SP',
    data: '2024-05-15',
    hora: '15:00',
    status: 'finalizado',
    avaliado: true,
    nota: 4,
    comentario: 'Muito boa médica! Atendeu meu filho com muito carinho e paciência. Recomendo fortemente.',
  },
  {
    id: 4,
    paciente: 'Bruna Lima',
    idade: 45,
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    hospital: 'Orto Center',
    local: 'São Paulo - SP',
    data: '2024-05-10',
    hora: '13:00',
    status: 'cancelado',
    avaliado: false,
  },
];

export const AgendamentoProfissional: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [aba, setAba] = useState<'agendamentos' | 'historico'>('agendamentos');
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [modalReagendar, setModalReagendar] = useState<{ aberto: boolean, agendamento?: any, horarios?: string[] }>({ aberto: false });
  const [novoHorario, setNovoHorario] = useState('');
  const [modalAvaliacao, setModalAvaliacao] = useState<{ aberto: boolean, agendamento?: any }>({ aberto: false });

  useEffect(() => {
    if (!user || user.role !== 'PROFESSIONAL') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === 'PROFESSIONAL') {
      setAgendamentos(mockAgendamentos); // Aqui filtraria pelo profissional logado
    }
  }, [user]);

  if (!user || user.role !== 'PROFESSIONAL') {
    return <div style={{ padding: 40, textAlign: 'center' }}>Acesso restrito a profissionais.</div>;
  }

  const agendamentosAtivos = agendamentos.filter(a => a.status === 'pendente' || a.status === 'futuro');
  const historico = agendamentos.filter(a => a.status === 'finalizado' || a.status === 'cancelado');

  const finalizarAgendamento = (id: number) => {
    setAgendamentos(ags => ags.map(a => a.id === id ? { ...a, status: 'finalizado' } : a));
  };

  const handleAbrirReagendar = (agendamento: any) => {
    const profissional = mockAgendamentos.find(p => p.paciente === agendamento.paciente && p.especialidade === agendamento.especialidade);
    const horarios = [
      '28/06/2024 10:00',
      '29/06/2024 14:00',
      '30/06/2024 09:00',
    ];
    setModalReagendar({ aberto: true, agendamento, horarios });
    setNovoHorario('');
  };

  const handleConfirmarReagendar = () => {
    if (modalReagendar.agendamento && novoHorario) {
      setAgendamentos(prev => prev.map(a => a.id === modalReagendar.agendamento.id ? { ...a, data: novoHorario.split(' ')[0], hora: novoHorario.split(' ')[1], status: 'futuro' } : a));
      setModalReagendar({ aberto: false });
    }
  };

  const handleVerAvaliacao = (agendamento: any) => {
    setModalAvaliacao({ aberto: true, agendamento });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', position: 'relative', padding: 0 }}>
      <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
        <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Consulta Fácil</span>
      </Link>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 0 0 0' }}>
        <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 28, marginBottom: 24 }}>Minhas Consultas</h2>
        <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
          <button onClick={() => setAba('agendamentos')} style={{ flex: 1, padding: 12, background: aba === 'agendamentos' ? '#426B1F' : '#E8F5E9', color: aba === 'agendamentos' ? '#fff' : '#426B1F', border: 'none', borderRadius: '12px 0 0 12px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Agendamentos</button>
          <button onClick={() => setAba('historico')} style={{ flex: 1, padding: 12, background: aba === 'historico' ? '#426B1F' : '#E8F5E9', color: aba === 'historico' ? '#fff' : '#426B1F', border: 'none', borderRadius: '0 12px 12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Histórico</button>
        </div>
        {aba === 'agendamentos' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {agendamentosAtivos.length === 0 ? (
              <div style={{ color: '#757575', fontSize: 18 }}>Nenhum agendamento ativo.</div>
            ) : (
              agendamentosAtivos.map(a => (
                <div key={a.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 20, color: '#42536B' }}>{a.paciente} <span style={{ fontWeight: 400, color: '#757575', fontSize: 16 }}>({a.idade} anos)</span></span>
                  <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {a.hospital} - {a.local}</span>
                  <span style={{ color: '#212121', fontSize: 16 }}>Data: <b>{a.data}</b> às <b>{a.hora}</b></span>
                  <span style={{ color: '#426B1F', fontWeight: 500, fontSize: 15 }}>Status: {a.status}</span>
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    <button onClick={() => finalizarAgendamento(a.id)} style={{ background: '#BFD8B8', color: '#426B1F', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Finalizar atendimento</button>
                    <button onClick={() => handleAbrirReagendar(a)} style={{ background: '#426B1F', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Reagendar</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {historico.length === 0 ? (
              <div style={{ color: '#757575', fontSize: 18 }}>Nenhum histórico encontrado.</div>
            ) : (
              historico.map(a => (
                <div key={a.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 20, color: '#42536B' }}>{a.paciente} <span style={{ fontWeight: 400, color: '#757575', fontSize: 16 }}>({a.idade} anos)</span></span>
                  <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {a.hospital} - {a.local}</span>
                  <span style={{ color: '#212121', fontSize: 16 }}>Data: <b>{a.data}</b> às <b>{a.hora}</b></span>
                  <span style={{ color: a.status === 'cancelado' ? '#F44336' : '#426B1F', fontWeight: 500, fontSize: 15 }}>Status: {a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span>
                  {a.avaliado && (
                    <div style={{ marginTop: 10, background: '#F8FAF5', borderRadius: 8, padding: '10px 16px', border: '1px solid #BFD8B8' }}>
                      <div style={{ fontSize: 16, color: '#426B1F', fontWeight: 600, marginBottom: 4 }}>Avaliação do paciente:</div>
                      <div style={{ fontSize: 22, color: '#FFD600', marginBottom: 4 }}>{'★'.repeat(a.nota || 0)}{'☆'.repeat(5 - (a.nota || 0))}</div>
                      <div style={{ color: '#757575', fontSize: 15 }}><b>Comentário:</b> {a.comentario || 'Sem comentário.'}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {modalReagendar.aberto && modalReagendar.agendamento && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,83,107,0.12)', padding: 32, minWidth: 320, maxWidth: 400, width: '100%', position: 'relative' }}>
            <button onClick={() => setModalReagendar({ aberto: false })} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#757575', cursor: 'pointer' }}>×</button>
            <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Reagendar Consulta</h2>
            <div style={{ margin: '18px 0 8px 0', color: '#42536B', fontWeight: 500 }}>Escolha um novo horário:</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {modalReagendar.horarios && modalReagendar.horarios.map((h: string) => (
                <li
                  key={h}
                  onClick={() => setNovoHorario(h)}
                  style={{
                    background: novoHorario === h ? '#426B1F' : '#F5F5F5',
                    color: novoHorario === h ? '#fff' : '#426B1F',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 500,
                    border: '1px solid #BFD8B8',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {h}
                </li>
              ))}
            </ul>
            <button
              onClick={handleConfirmarReagendar}
              disabled={!novoHorario}
              style={{
                marginTop: 18,
                background: novoHorario ? '#426B1F' : '#BDBDBD',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: novoHorario ? 'pointer' : 'not-allowed',
                width: '100%',
                transition: 'background 0.2s',
              }}
            >
              Confirmar Reagendamento
            </button>
          </div>
        </div>
      )}
      {modalAvaliacao.aberto && modalAvaliacao.agendamento && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,83,107,0.12)', padding: 32, minWidth: 320, maxWidth: 400, width: '100%', position: 'relative' }}>
            <button onClick={() => setModalAvaliacao({ aberto: false })} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#757575', cursor: 'pointer' }}>×</button>
            <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Avaliação do Paciente</h2>
            <div style={{ margin: '18px 0 8px 0', color: '#42536B', fontWeight: 500 }}>Nota:</div>
            <div style={{ fontSize: 28, color: '#FFD600', marginBottom: 12 }}>{'★'.repeat(modalAvaliacao.agendamento.nota || 0)}{'☆'.repeat(5 - (modalAvaliacao.agendamento.nota || 0))}</div>
            <div style={{ color: '#212121', fontSize: 16, marginBottom: 8 }}><b>Comentário:</b></div>
            <div style={{ color: '#757575', fontSize: 15 }}>{modalAvaliacao.agendamento.comentario || 'Sem comentário.'}</div>
          </div>
        </div>
      )}
    </div>
  );
}; 