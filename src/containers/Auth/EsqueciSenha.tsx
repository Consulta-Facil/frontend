import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EsqueciSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (!email) {
      setErro('Preencha o e-mail.');
      return;
    }
    // Aqui você pode chamar a API de recuperação de senha
    setEnviado(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(66,107,31,0.10)', padding: '40px 48px', minWidth: 320, maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', color: '#42536B', fontWeight: 600, fontSize: 24, marginBottom: 8 }}>Redefinir Senha</h2>
        {enviado ? (
          <>
            <span style={{ color: '#426B1F', textAlign: 'center', fontWeight: 500 }}>Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.</span>
            <Link to="/login" style={{ color: '#426B1F', textAlign: 'center', marginTop: 16, textDecoration: 'underline' }}>Voltar para o login</Link>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: 12, borderRadius: 8, border: '1px solid #BDBDBD', fontSize: 16 }}
            />
            {erro && <span style={{ color: 'red', fontSize: 14 }}>{erro}</span>}
            <button type="submit" style={{ background: '#426B1F', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Enviar instruções</button>
            <Link to="/login" style={{ color: '#426B1F', textAlign: 'center', marginTop: 8, textDecoration: 'underline', fontSize: 15 }}>Voltar para o login</Link>
          </>
        )}
      </form>
    </div>
  );
};

export { EsqueciSenha }; 