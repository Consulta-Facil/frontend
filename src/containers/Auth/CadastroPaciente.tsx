import React, { useState } from 'react';
import { useAuth } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, ButtonPrimary, Checkbox } from '../../components/atoms';

export const CadastroPaciente: React.FC = () => {
  const { registerPatient } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [termos, setTermos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!nome || !email || !cpf || !password || !phone || !street || !number || !city || !cep || !uf) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const addressId = Date.now().toString() + '-addr';
    // Aqui você pode salvar o endereço em algum serviço, se necessário
    const success = await registerPatient({
      id: Date.now().toString(),
      name: nome,
      email,
      cpf,
      birthDate: '',
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
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(66,107,31,0.08)', padding: '32px 110px', minWidth: 320, maxWidth: 520, width: '100%', display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box' }}>
          <h2 style={{ textAlign: 'center', color: '#42536B', fontWeight: 500, fontSize: 24, marginBottom: 8 }}>Cadastro de Paciente</h2>
          <TextInput placeholder="Nome" value={nome} onChange={setNome} />
          <TextInput placeholder="CPF" value={cpf} onChange={setCpf} />
          <TextInput placeholder="Email" value={email} onChange={setEmail} type="email" />
          <TextInput placeholder="Senha" value={password} onChange={setPassword} type="password" />
          <TextInput placeholder="(DDD) 00000-0000" value={phone} onChange={setPhone} />
          <TextInput placeholder="Endereço" value={street} onChange={setStreet} />
          <div style={{ display: 'flex', gap: 8 }}>
            <TextInput placeholder="Número" value={number} onChange={setNumber} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
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