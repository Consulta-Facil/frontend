import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { theme } from '../../theme';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Header />
        <Main>
          <Title>Quem Somos</Title>
          <Text>
            O <b>ConsultaFácil</b> nasceu com o propósito de simplificar o acesso à saúde, conectando pacientes e profissionais de forma rápida, segura e eficiente. Nossa plataforma foi criada para facilitar o agendamento de consultas, centralizar informações e proporcionar uma experiência digital moderna tanto para quem busca atendimento quanto para quem oferece serviços de saúde.
          </Text>
          <Text>
            Acreditamos que a tecnologia pode aproximar pessoas e tornar o cuidado com a saúde mais acessível, transparente e humanizado. Por isso, investimos em uma solução intuitiva, com design amigável, que permite ao usuário agendar, acompanhar e gerenciar suas consultas em poucos cliques.
          </Text>
          <Text>
            Nosso compromisso é com a qualidade, a segurança dos dados e a satisfação de todos os envolvidos. Seja você paciente, profissional ou administrador, o ConsultaFácil está aqui para transformar a sua experiência com saúde!
          </Text>
        </Main>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}; 