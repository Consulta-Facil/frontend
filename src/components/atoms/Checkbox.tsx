import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

const CheckboxContainer = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: ${({ theme, checked, disabled }) => {
    if (disabled) return theme.colors.gray[200];
    return checked ? theme.colors.primary : theme.colors.background.paper;
  }};
  border: 2px solid ${({ theme, checked, disabled }) => {
    if (disabled) return theme.colors.gray[300];
    return checked ? theme.colors.primary : theme.colors.gray[400];
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme, checked, disabled }) => {
      if (disabled) return theme.colors.gray[300];
      return checked ? theme.colors.primaryDark : theme.colors.primary;
    }};
  }

  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.colors.white};
    opacity: ${({ checked }) => checked ? 1 : 0};
    transition: opacity 0.2s ease;
  }
`;

const Label = styled.span<{ disabled: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.text.disabled : theme.colors.text.primary};
`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onToggle();
    }
  };

  return (
    <CheckboxContainer disabled={disabled}>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={handleClick}
        disabled={disabled}
      />
      <StyledCheckbox checked={checked} disabled={disabled}>
        <CheckIcon />
      </StyledCheckbox>
      {label && <Label disabled={disabled}>{label}</Label>}
    </CheckboxContainer>
  );
}; 