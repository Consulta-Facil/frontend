import React from 'react';
import styled from 'styled-components';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  secure?: boolean;
  type?: string;
  disabled?: boolean;
  error?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  secure = false,
  type = 'text',
  disabled = false,
  error,
}) => {
  const inputType = secure ? 'password' : type;

  return (
    <InputContainer>
      <StyledInput
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        hasError={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}; 