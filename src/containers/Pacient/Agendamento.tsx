import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  {
    id: '4',
    nome: 'Dra. Beatriz Souza',
    especialidade: 'Pediatria',
    valor: 180,
    hospital: 'Hospital Infantil',
    local: 'Campinas - SP',
    experiencia: 12,
    rating: 4.9,
    avaliacoes: [
      { nome: 'Patrícia', nota: 5, comentario: 'Muito carinhosa com as crianças.' },
    ],
    horarios: ['22/06/2024 15:00', '23/06/2024 09:00'],
  },
  {
    id: '5',
    nome: 'Dr. Eduardo Lima',
    especialidade: 'Ortopedia',
    valor: 220,
    hospital: 'Orto Center',
    local: 'São Paulo - SP',
    experiencia: 8,
    rating: 4.6,
    avaliacoes: [
      { nome: 'Bruno', nota: 4, comentario: 'Resolveu meu problema rápido.' },
    ],
    horarios: ['24/06/2024 13:00', '25/06/2024 16:00'],
  },
  {
    id: '6',
    nome: 'Dra. Camila Torres',
    especialidade: 'Ginecologia',
    valor: 210,
    hospital: 'Clínica Vida',
    local: 'Guarulhos - SP',
    experiencia: 9,
    rating: 4.7,
    avaliacoes: [
      { nome: 'Fernanda', nota: 5, comentario: 'Muito atenciosa e profissional.' },
    ],
    horarios: ['26/06/2024 10:00', '27/06/2024 14:00'],
  },
];

const especialidades = ['Clínico Geral', 'Dermatologia', 'Pediatria', 'Ortopedia', 'Ginecologia'];

const agendamentosIniciais = [
  // Exemplo de dados mockados para o cliente
  {
    id: '1',
    profissional: 'Dra. Ana Paula',
    especialidade: 'Clínico Geral',
    hospital: 'Hospital São Paulo',
    local: 'São Paulo - SP',
    data: '2024-06-20',
    hora: '14:00',
    status: 'futuro',
    avaliado: false,
  },
  {
    id: '2',
    profissional: 'Dr. Carlos Silva',
    especialidade: 'Dermatologia',
    hospital: 'Clínica Dermato',
    local: 'São Paulo - SP',
    data: '2024-06-10',
    hora: '09:30',
    status: 'finalizado',
    avaliado: true,
  },
  {
    id: '3',
    profissional: 'Dra. Beatriz Souza',
    especialidade: 'Pediatria',
    hospital: 'Hospital Infantil',
    local: 'Campinas - SP',
    data: '2024-05-15',
    hora: '15:00',
    status: 'cancelado',
    avaliado: false,
  },
];

function formatStatus(status: string): string {
  if (!status) return '';
  const s = status.toLowerCase();
  if (s === 'finalizado') return 'Finalizado';
  if (s === 'futuro' || s === 'pendente') return 'Futuro';
  if (s === 'cancelado' || s === 'CANCELADO') return 'Cancelado';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export const AgendamentoPaciente: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [aba, setAba] = useState<'agendar' | 'meus'>('agendar');
  const [filtroEsp, setFiltroEsp] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais);
  const [modalReagendar, setModalReagendar] = useState<{ aberto: boolean, agendamento?: any, horarios?: string[] }>({ aberto: false });
  const [novoHorario, setNovoHorario] = useState('');
  const [modalAgendar, setModalAgendar] = useState<{ aberto: boolean, profissional?: any }>({ aberto: false });
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [modalAvaliar, setModalAvaliar] = useState<{ aberto: boolean, agendamento?: any }>({ aberto: false });
  const [notaAvaliacao, setNotaAvaliacao] = useState(0);
  const [comentarioAvaliacao, setComentarioAvaliacao] = useState('');
  const [modalLogin, setModalLogin] = useState(false);

  useEffect(() => {
    if (user && user.role === 'PROFESSIONAL') {
      navigate('/agendamento-profissional', { replace: true });
    }
  }, [user, navigate]);

  const profissionaisFiltrados = mockProfissionais.filter(p =>
    (!filtroEsp || p.especialidade === filtroEsp) &&
    (!filtroValor || p.valor <= Number(filtroValor)) &&
    (!filtroData || p.horarios.some(h => h.startsWith(filtroData)))
  );

  // Separar agendamentos ativos/futuros e histórico
  const agendamentosAtivos = agendamentos.filter(a => a.status === 'futuro' || a.status === 'pendente');
  const historico = agendamentos.filter(a => formatStatus(a.status) === 'Finalizado' || formatStatus(a.status) === 'Cancelado');

  // Abrir modal de detalhes para agendar
  const handleAbrirModalAgendar = (profissional: any) => {
    if (!user) {
      setModalLogin(true);
      return;
    }
    setModalAgendar({ aberto: true, profissional });
    setHorarioSelecionado('');
  };

  // Confirmar agendamento
  const handleConfirmarAgendar = () => {
    if (modalAgendar.profissional && horarioSelecionado) {
      const [data, hora] = horarioSelecionado.split(' ');
      setAgendamentos(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          profissional: modalAgendar.profissional.nome,
          especialidade: modalAgendar.profissional.especialidade,
          hospital: modalAgendar.profissional.hospital,
          local: modalAgendar.profissional.local,
          data,
          hora,
          status: 'futuro',
          avaliado: false,
        },
      ]);
      setModalAgendar({ aberto: false });
      setAba('meus');
    }
  };

  // Abrir modal de reagendamento com horários disponíveis do mesmo profissional
  const handleAbrirReagendar = (agendamento: any) => {
    const profissional = mockProfissionais.find(p => p.nome === agendamento.profissional);
    setModalReagendar({ aberto: true, agendamento, horarios: profissional ? profissional.horarios : [] });
    setNovoHorario('');
  };

  // Confirmar reagendamento
  const handleConfirmarReagendar = () => {
    if (modalReagendar.agendamento && novoHorario) {
      const ag = modalReagendar.agendamento;
      const [data, hora] = novoHorario.split(' ');
      setAgendamentos(prev => [
        ...prev,
        {
          ...ag,
          id: Date.now().toString(),
          data,
          hora,
          status: 'futuro',
        },
      ]);
      setModalReagendar({ aberto: false });
      setAba('meus');
    }
  };

  // Cancelar agendamento
  const handleCancelar = (id: string) => {
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelado' } : a));
  };

  // Gerar lista dinâmica de profissionais consultados para o perfil
  const profissionaisConsultados = Array.from(
    agendamentos.reduce((map, ag) => {
      if (!map.has(ag.profissional)) {
        map.set(ag.profissional, {
          nome: ag.profissional,
          especialidade: ag.especialidade,
          consultas: 1,
        });
      } else {
        map.get(ag.profissional).consultas++;
      }
      return map;
    }, new Map()).values()
  );

  // Abrir modal de avaliação
  const handleAbrirAvaliar = (agendamento: any) => {
    setModalAvaliar({ aberto: true, agendamento });
    setNotaAvaliacao(0);
    setComentarioAvaliacao('');
  };

  // Confirmar avaliação
  const handleConfirmarAvaliar = () => {
    if (modalAvaliar.agendamento && notaAvaliacao > 0) {
      setAgendamentos(prev => prev.map(a => a.id === modalAvaliar.agendamento.id ? { ...a, avaliado: true, nota: notaAvaliacao, comentario: comentarioAvaliacao } : a));
      setModalAvaliar({ aberto: false });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', padding: 0 }}>
      <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
        <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Consulta Fácil</span>
      </Link>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 0 0 0' }}>
        <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 28, marginBottom: 24 }}>Agendamentos</h2>
        <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
          <button onClick={() => setAba('agendar')} style={{ flex: 1, padding: 12, background: aba === 'agendar' ? '#426B1F' : '#E8F5E9', color: aba === 'agendar' ? '#fff' : '#426B1F', border: 'none', borderRadius: user ? '12px 0 0 12px' : '12px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Agendar Consulta</button>
          {user && (
            <button onClick={() => setAba('meus')} style={{ flex: 1, padding: 12, background: aba === 'meus' ? '#426B1F' : '#E8F5E9', color: aba === 'meus' ? '#fff' : '#426B1F', border: 'none', borderRadius: '0 12px 12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Meus Agendamentos</button>
          )}
        </div>
        {aba === 'agendar' && (
          <>
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
              <select value={filtroEsp} onChange={e => setFiltroEsp(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #BDBDBD' }}>
                <option value="">Especialidade</option>
                {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <input type="number" placeholder="Valor máximo" value={filtroValor} onChange={e => setFiltroValor(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #BDBDBD', width: 120 }} />
              <input type="date" value={filtroData} onChange={e => setFiltroData(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #BDBDBD' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {profissionaisFiltrados.length === 0 ? (
                <div style={{ color: '#757575', fontSize: 18 }}>Nenhum profissional encontrado.</div>
              ) : (
                profissionaisFiltrados.map(p => (
                  <div key={p.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 20, color: '#42536B' }}>{p.nome} <span style={{ fontWeight: 400, color: '#757575', fontSize: 16 }}>({p.especialidade})</span></span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {p.hospital} - {p.local}</span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Valor: <b>R$ {p.valor}</b></span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Experiência: {p.experiencia} anos</span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Nota: <b>{p.rating}</b> ⭐</span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Horários disponíveis: {p.horarios.join(', ')}</span>
                    <button onClick={() => handleAbrirModalAgendar(p)} style={{ marginTop: 10, background: '#426B1F', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer', alignSelf: 'flex-end' }}>Agendar</button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
        {aba === 'meus' && user && (
          <>
            <h3 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 18 }}>Meus Agendamentos Ativos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
              {agendamentosAtivos.length === 0 ? (
                <div style={{ color: '#757575', fontSize: 18 }}>Nenhum agendamento ativo.</div>
              ) : (
                agendamentosAtivos.map(a => (
                  <div key={a.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 20, color: '#42536B' }}>{a.profissional} <span style={{ fontWeight: 400, color: '#757575', fontSize: 16 }}>({a.especialidade})</span></span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {a.hospital} - {a.local}</span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Data: <b>{a.data}</b> às <b>{a.hora}</b></span>
                    <span style={{ color: '#426B1F', fontWeight: 500, fontSize: 15 }}>Status: {formatStatus(a.status)}</span>
                    <button onClick={() => handleCancelar(a.id)} style={{ marginTop: 10, background: '#426B1F', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer', alignSelf: 'flex-end' }}>Cancelar</button>
                  </div>
                ))
              )}
            </div>
            <h3 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 18 }}>Histórico</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {historico.length === 0 ? (
                <div style={{ color: '#757575', fontSize: 18 }}>Nenhum histórico encontrado.</div>
              ) : (
                historico.map(a => (
                  <div key={a.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(66,83,107,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 20, color: '#42536B' }}>{a.profissional} <span style={{ fontWeight: 400, color: '#757575', fontSize: 16 }}>({a.especialidade})</span></span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Hospital: {a.hospital} - {a.local}</span>
                    <span style={{ color: '#212121', fontSize: 16 }}>Data: <b>{a.data}</b> às <b>{a.hora}</b></span>
                    <span style={{ color: a.status === 'cancelado' ? '#F44336' : '#426B1F', fontWeight: 500, fontSize: 15 }}>Status: {formatStatus(a.status)}</span>
                    <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                      {!a.avaliado && <button onClick={() => handleAbrirAvaliar(a)} style={{ background: '#BFD8B8', color: '#426B1F', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Avaliar</button>}
                      <button onClick={() => handleAbrirReagendar(a)} style={{ background: '#E8F5E9', color: '#426B1F', border: '1px solid #BFD8B8', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Reagendar</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      {modalAgendar.aberto && modalAgendar.profissional && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,83,107,0.12)', padding: 32, minWidth: 340, maxWidth: 400, width: '100%', position: 'relative' }}>
            <button onClick={() => setModalAgendar({ aberto: false })} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#757575', cursor: 'pointer' }}>×</button>
            <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>{modalAgendar.profissional.nome}</h2>
            <span style={{ color: '#757575', fontSize: 17 }}>{modalAgendar.profissional.especialidade}</span>
            <div style={{ color: '#212121', fontSize: 16, margin: '10px 0' }}>Hospital: {modalAgendar.profissional.hospital} - {modalAgendar.profissional.local}</div>
            <div style={{ color: '#212121', fontSize: 16 }}>Valor: <b>R$ {modalAgendar.profissional.valor}</b></div>
            <div style={{ color: '#212121', fontSize: 16 }}>Experiência: {modalAgendar.profissional.experiencia} anos</div>
            <div style={{ color: '#212121', fontSize: 16 }}>Nota: <b>{modalAgendar.profissional.rating}</b> ⭐</div>
            <div style={{ margin: '18px 0 8px 0', color: '#42536B', fontWeight: 500 }}>Escolha um horário:</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {modalAgendar.profissional.horarios.map((h: string) => (
                <li
                  key={h}
                  onClick={() => setHorarioSelecionado(h)}
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
              onClick={handleConfirmarAgendar}
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
                width: '100%',
                transition: 'background 0.2s',
              }}
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      )}
      {modalAvaliar.aberto && modalAvaliar.agendamento && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,83,107,0.12)', padding: 32, minWidth: 320, maxWidth: 400, width: '100%', position: 'relative' }}>
            <button onClick={() => setModalAvaliar({ aberto: false })} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#757575', cursor: 'pointer' }}>×</button>
            <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Avaliar Consulta</h2>
            <div style={{ margin: '18px 0 8px 0', color: '#42536B', fontWeight: 500 }}>Nota:</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} onClick={() => setNotaAvaliacao(n)} style={{ fontSize: 28, cursor: 'pointer', color: n <= notaAvaliacao ? '#FFD600' : '#BDBDBD' }}>★</span>
              ))}
            </div>
            <textarea value={comentarioAvaliacao} onChange={e => setComentarioAvaliacao(e.target.value)} placeholder="Comentário (opcional)" style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #BFD8B8', padding: 8, marginBottom: 18, fontSize: 15 }} />
            <button
              onClick={handleConfirmarAvaliar}
              disabled={notaAvaliacao === 0}
              style={{
                background: notaAvaliacao > 0 ? '#426B1F' : '#BDBDBD',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: notaAvaliacao > 0 ? 'pointer' : 'not-allowed',
                width: '100%',
                transition: 'background 0.2s',
              }}
            >
              Confirmar Avaliação
            </button>
          </div>
        </div>
      )}
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
      {modalLogin && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,83,107,0.12)', padding: 32, minWidth: 320, maxWidth: 400, width: '100%', position: 'relative' }}>
            <h2 style={{ color: '#42536B', fontWeight: 600, fontSize: 22, marginBottom: 18 }}>Você precisa estar logado para agendar uma consulta.</h2>
            <button
              onClick={() => { setModalLogin(false); navigate('/login'); }}
              style={{
                background: '#426B1F',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                width: '100%',
                transition: 'background 0.2s',
              }}
            >
              Fazer Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 