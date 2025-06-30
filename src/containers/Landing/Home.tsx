import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { StatsPanel } from '../../components/layout/StatsPanel';
import { ButtonPrimary } from '../../components/atoms';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StepsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const StepsList = styled.div`
  flex: 1 1 350px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StepDesc = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StepsImage = styled.div`
  flex: 1 1 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
`;

const Illustration = styled.img`
  width: 90%;
  max-width: 320px;
`;

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Header />
        <Main>
          <HeroSection>
            <HeroTitle>
              Sua saúde, nosso compromisso: <br />
              agende facilmente com profissionais de confiança.
            </HeroTitle>
            {(!user || user.role === 'PATIENT') && (
              <ButtonPrimary title="Agende Agora" onPress={() => navigate('/agendamento')} />
            )}
          </HeroSection>

          <StepsSection>
            <StepsList>
              <Step>
                <StepIcon>🏥</StepIcon>
                <StepContent>
                  <StepTitle>Escolha a Clínica e o Profissional</StepTitle>
                  <StepDesc>Explore clínicas, escolha o prestador e procure o serviço desejado.</StepDesc>
                </StepContent>
              </Step>
              <Step>
                <StepIcon>📅</StepIcon>
                <StepContent>
                  <StepTitle>Escolha o Profissional e o melhor horário</StepTitle>
                  <StepDesc>Encontre horários disponíveis e faça o agendamento.</StepDesc>
                </StepContent>
              </Step>
              <Step>
                <StepIcon>💳</StepIcon>
                <StepContent>
                  <StepTitle>Faça o pagamento</StepTitle>
                  <StepDesc>Pagamento 100% online. Fácil. Sua consulta confirmada na hora!</StepDesc>
                </StepContent>
              </Step>
              <Step>
                <StepIcon>✅</StepIcon>
                <StepContent>
                  <StepTitle>Apoio até o atendimento!</StepTitle>
                  <StepDesc>Receba lembretes, tire dúvidas e utilize os nossos canais para suporte e saúde!</StepDesc>
                </StepContent>
              </Step>
            </StepsList>
            <StepsImage>
              <Illustration src={require('../../assets/consulta.png')} alt="Ilustração Consulta" />
            </StepsImage>
          </StepsSection>

          <StatsPanel
            stats={[
              { value: '+3.500', label: 'Pacientes atendidos' },
              { value: '+50', label: 'Especialidades disponíveis' },
              { value: '+10', label: 'Anos no mercado' },
            ]}
          />
        </Main>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}; 