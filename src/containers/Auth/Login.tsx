import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ButtonPrimary, TextInput } from '../../components/atoms';
import { theme } from '../../theme';
import { useAuth } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RegisterLinks = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const RegisterLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  margin: 0 0.5rem;
`;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Link to="/" style={{ position: 'absolute', top: 32, left: 32, textDecoration: 'none', zIndex: 2 }}>
          <span style={{ color: '#426B1F', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Consulta Fácil</span>
        </Link>
        <Main>
          <Title>Entrar</Title>
          <Form onSubmit={handleSubmit}>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChange={setEmail}
              type="email"
            />
            <div style={{ position: 'relative', width: '100%' }}>
              <TextInput
                placeholder="Senha"
                value={password}
                onChange={setPassword}
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: '#426B1F',
                  padding: 0,
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <Link to="/esqueci-senha" style={{ color: '#426B1F', fontSize: 14, textAlign: 'right', marginBottom: -8, marginTop: -8, alignSelf: 'flex-end', textDecoration: 'underline', fontWeight: 500 }}>Esqueceu sua senha?</Link>
            {error && <span style={{ color: theme.colors.error }}>{error}</span>}
            <ButtonPrimary title="Entrar" onPress={() => {}} disabled={loading} />
          </Form>
          <RegisterLinks>
            Não tem conta?
            <RegisterLink onClick={() => navigate('/cadastro-paciente')}>Cadastrar como Paciente</RegisterLink>
            ou
            <RegisterLink onClick={() => navigate('/cadastro-profissional')}>Cadastrar como Profissional</RegisterLink>
          </RegisterLinks>
        </Main>
      </PageWrapper>
    </ThemeProvider>
  );
}; 