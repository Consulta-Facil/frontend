import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../atoms';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { useState } from 'react';

interface HeaderProps {
  onLogin?: () => void;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
}

const HeaderContainer = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: 700px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  color: #426B1F;
  cursor: pointer;
  @media (max-width: 700px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled.div<MobileMenuOverlayProps>`
  display: none;
  @media (max-width: 700px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 100;
    align-items: flex-start;
    justify-content: flex-end;
  }
`;

const MobileMenu = styled.nav`
  background: #fff;
  width: 220px;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(66,83,107,0.08);
  display: flex;
  flex-direction: column;
  padding: 32px 18px;
  gap: 24px;
`;

export const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const agendamentoPath = user && user.role === 'PROFESSIONAL' ? '/agendamento-profissional' : '/agendamento';
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">ConsultaFácil</Logo>
        <NavLinks style={{ display: 'flex' }}>
          <NavLink to="/quem-somos">Quem somos?</NavLink>
          <NavLink to={agendamentoPath}>{user && user.role === 'PROFESSIONAL' ? 'Minhas Consultas' : 'Agendamentos'}</NavLink>
          {user ? (
            <NavLink to="/perfil" style={{ fontWeight: 600, color: '#426B1F' }}>
              {user.user?.name || 'Perfil'}
            </NavLink>
          ) : (
            <ButtonPrimary title="Login" onPress={onLogin || (() => navigate('/login'))} />
          )}
        </NavLinks>
        <MobileMenuButton onClick={() => setMenuOpen(o => !o)}>
          ☰
        </MobileMenuButton>
        <MobileMenuOverlay isOpen={menuOpen} onClick={() => setMenuOpen(false)}>
          <MobileMenu onClick={e => e.stopPropagation()}>
            <NavLink to="/quem-somos" onClick={() => setMenuOpen(false)}>Quem somos?</NavLink>
            <NavLink to={agendamentoPath} onClick={() => setMenuOpen(false)}>{user && user.role === 'PROFESSIONAL' ? 'Minhas Consultas' : 'Agendamentos'}</NavLink>
            {user ? (
              <NavLink to="/perfil" style={{ fontWeight: 600, color: '#426B1F' }} onClick={() => setMenuOpen(false)}>
                {user.user?.name || 'Perfil'}
              </NavLink>
            ) : (
              <ButtonPrimary title="Login" onPress={() => { setMenuOpen(false); (onLogin || (() => navigate('/login')))(); }} />
            )}
            {user && (
              <button onClick={handleLogout} style={{ marginTop: 18, background: 'none', border: 'none', color: '#F44336', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Sair</button>
            )}
          </MobileMenu>
        </MobileMenuOverlay>
      </HeaderContent>
    </HeaderContainer>
  );
}; 