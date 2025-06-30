import React, { useState } from 'react';
import { useAuth } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, ButtonPrimary, Checkbox } from '../../components/atoms';

export const CadastroProfissional: React.FC = () => {
  const { registerProfessional } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCrm] = useState('');
  const [password, setPassword] = useState('');
  const [termos, setTermos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!termos) {
      setError('Você deve aceitar os termos.');
      return;
    }
    if (!nome || !cpf || !crm || !email || !password || !phone || !street || !number || !city || !cep || !uf) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const addressId = Date.now().toString() + '-addr';
    const success = await registerProfessional({
      id: Date.now().toString(),
      name: nome,
      email,
      cpf,
      crm,
      specialty: '',
      specialties: [],
      experience: 0,
      rating: 0,
      availableHours: [],
      phone,
      addressId,
      address: {
        id: addressId,
        street,
        number,
        city,
        cep,
        uf,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('Erro ao cadastrar.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', position: 'relative' }}>
      <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
        <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Consulta Fácil</span>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(66,107,31,0.10)', padding: '40px 48px', minWidth: 320, maxWidth: 480, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box', transition: 'box-shadow 0.2s' }}>
          <h2 style={{ textAlign: 'center', color: '#42536B', fontWeight: 600, fontSize: 26, marginBottom: 12, letterSpacing: 0.5 }}>Cadastro de Profissional</h2>
          <TextInput placeholder="Nome" value={nome} onChange={setNome} />
          <div style={{ display: 'flex', gap: 14 }}>
            <TextInput placeholder="CPF" value={cpf} onChange={setCpf} />
            <TextInput placeholder="Registro Profissional" value={crm} onChange={setCrm} />
          </div>
          <TextInput placeholder="Email" value={email} onChange={setEmail} type="email" />
          <TextInput placeholder="Senha" value={password} onChange={setPassword} type="password" />
          <TextInput placeholder="(DDD) 00000-0000" value={phone} onChange={setPhone} />
          <TextInput placeholder="Endereço" value={street} onChange={setStreet} />
          <div style={{ display: 'flex', gap: 14 }}>
            <TextInput placeholder="Número" value={number} onChange={setNumber} />
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <TextInput placeholder="Cidade" value={city} onChange={setCity} />
            <TextInput placeholder="CEP" value={cep} onChange={setCep} />
            <TextInput placeholder="UF" value={uf} onChange={setUf} />
          </div>
          <Checkbox checked={termos} onToggle={() => setTermos(v => !v)} label="Aceito os termos de uso" />
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <ButtonPrimary title="Cadastrar" onPress={() => {}} disabled={loading} />
        </form>
      </div>
    </div>
  );
}; 