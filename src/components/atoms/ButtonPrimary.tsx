import React from 'react';
import styled from 'styled-components';

interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ 
  disabled: boolean; 
  loading: boolean; 
  fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  min-width: 120px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.gray[300] : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  cursor: ${({ disabled, loading }) => 
    disabled || loading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.gray[300] : theme.colors.primaryDark};
    transform: ${({ disabled, loading }) => 
      disabled || loading ? 'none' : 'translateY(-1px)'};
    box-shadow: ${({ theme, disabled, loading }) => 
      disabled || loading ? 'none' : theme.shadows.md};
  }

  &:active {
    transform: ${({ disabled, loading }) => 
      disabled || loading ? 'none' : 'translateY(0)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme, disabled }) => 
      disabled ? 'transparent' : `${theme.colors.primary}20`};
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ButtonText = styled.span<{ loading: boolean }>`
  opacity: ${({ loading }) => loading ? 0.7 : 1};
`;

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const handleClick = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
    >
      {loading && <LoadingSpinner />}
      <ButtonText loading={loading}>
        {loading ? 'Carregando...' : title}
      </ButtonText>
    </StyledButton>
  );
}; 