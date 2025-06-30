import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '../atoms';

interface ModalSuccessProps {
  message: string;
  onConfirm: () => void;
  open: boolean;
}

const Overlay = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ModalSuccess: React.FC<ModalSuccessProps> = ({ message, onConfirm, open }) => (
  <Overlay open={open}>
    <Modal>
      <SuccessIcon>✔️</SuccessIcon>
      <Message>{message}</Message>
      <ButtonPrimary title="OK" onPress={onConfirm} />
    </Modal>
  </Overlay>
); 