import React from 'react';
import styled from 'styled-components';

interface AccordionItemProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background: ${({ theme }) => theme.colors.background.paper};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.button<{ open: boolean }>`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme, open }) => open ? theme.colors.primary : theme.colors.gray[200]};
  transition: border-color 0.2s;
`;

const Content = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => open ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${({ open, theme }) => open ? theme.spacing.md : '0'};
`;

const Icon = styled.span<{ open: boolean }>`
  display: inline-block;
  transition: transform 0.2s;
  transform: rotate(${({ open }) => open ? 90 : 0}deg);
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, open, onToggle, children }) => (
  <Container>
    <Header onClick={onToggle} open={open}>
      {title}
      <Icon open={open}>▶</Icon>
    </Header>
    <Content open={open}>{children}</Content>
  </Container>
); 