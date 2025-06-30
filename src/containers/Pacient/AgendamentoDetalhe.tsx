import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ModalSuccess } from '../../components/organisms/ModalSuccess';
import { useAuth } from '../../store/authStore';

const mockProfissionais = [
  {
    id: '2',
    nome: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    valor: 200,
    hospital: 'Hospital São Paulo',
    local: 'São Paulo - SP',
    experiencia: 10,
    rating: 4.8,
    avaliacoes: [
      { nome: 'Maria', nota: 5, comentario: 'Excelente atendimento!' },
      { nome: 'Carlos', nota: 4, comentario: 'Muito atenciosa.' },
    ],
    horarios: ['20/06/2024 14:00', '21/06/2024 10:00'],
  },
  {
    id: '3',
    nome: 'Dr. Carlos Silva',
    especialidade: 'Dermatologia',
    valor: 250,
    hospital: 'Clínica Dermato',
    local: 'São Paulo - SP',
    experiencia: 7,
    rating: 4.5,
    avaliacoes: [
      { nome: 'João', nota: 5, comentario: 'Ótimo profissional.' },
    ],
    horarios: ['25/06/2024 09:30', '26/06/2024 11:00'],
  },
];

export const AgendamentoDetalhe: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const profissional = mockProfissionais.find(p => p.id === id);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  if (!profissional) {
    return <div style={{ padding: 40 }}>Profissional não encontrado.</div>;
  }

  const isProfissional = user && user.role === 'PROFESSIONAL';

  const handleSelecionarHorario = (h: string) => {
    if (!user) {
      setModalLogin(true);
      return;
    }
    setHorarioSelecionado(h);
  };

  const handleAgendar = () => {
    if (!user) {
      setModalLogin(true);
      return;
    }
    if (horarioSelecionado) {
      setModalAberto(true);
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    navigate('/agendamento');
  };

  const handleIrParaLogin = () => {
    setModalLogin(false);
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', padding: 0 }}>
      <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
        <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Consulta Fácil</span>
      </Link>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 0 0 0' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: 24, background: 'none', border: 'none', color: '#426B1F', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{'< Voltar'}</button>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 24 }}>{profissional.nome}</h2>
          <span style={{ color: '#757575', fontSize: 18 }}>{profissional.especialidade}</span>
          <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {profissional.hospital} - {profissional.local}</span>
          <span style={{ color: '#212121', fontSize: 16 }}>Valor: <b>R$ {profissional.valor}</b></span>
          <span style={{ color: '#212121', fontSize: 16 }}>Experiência: {profissional.experiencia} anos</span>
          <span style={{ color: '#212121', fontSize: 16 }}>Nota: <b>{profissional.rating}</b> ⭐</span>
          <span style={{ color: '#212121', fontSize: 16 }}>Horários disponíveis:</span>
          {isProfissional ? (
            <div style={{ color: '#F44336', fontWeight: 500, margin: '16px 0' }}>
              Apenas clientes podem agendar consultas.
            </div>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {profissional.horarios.map(h => (
                  <li
                    key={h}
                    onClick={() => handleSelecionarHorario(h)}
                    style={{
                      background: horarioSelecionado === h ? '#426B1F' : '#F5F5F5',
                      color: horarioSelecionado === h ? '#fff' : '#426B1F',
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
                onClick={handleAgendar}
                disabled={!horarioSelecionado}
                style={{
                  marginTop: 18,
                  background: horarioSelecionado ? '#426B1F' : '#BDBDBD',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: horarioSelecionado ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s',
                }}
              >
                Agendar
              </button>
            </>
          )}
          <div style={{ marginTop: 18 }}>
            <h3 style={{ color: '#42536B', fontSize: 18, marginBottom: 8 }}>Avaliações</h3>
            {profissional.avaliacoes.length === 0 ? (
              <span style={{ color: '#757575' }}>Nenhuma avaliação ainda.</span>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profissional.avaliacoes.map((a, i) => (
                  <li key={i} style={{ background: '#FAFAF7', borderRadius: 8, padding: '10px 16px' }}>
                    <span style={{ fontWeight: 600, color: '#42536B' }}>{a.nome}</span> - <span style={{ color: '#426B1F', fontWeight: 500 }}>{a.nota} ⭐</span>
                    <div style={{ color: '#212121', marginTop: 4 }}>{a.comentario}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <ModalSuccess open={modalAberto} message="Consulta agendada com sucesso!" onConfirm={handleFecharModal} />
      <ModalSuccess open={modalLogin} message="Você precisa estar logado para agendar uma consulta." onConfirm={handleIrParaLogin} />
    </div>
  );
}; 