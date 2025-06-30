import React from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  title?: string;
}

const StyledIconButton = styled.button<{
  size: 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary' | 'ghost';
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '32px';
      case 'md': return '40px';
      case 'lg': return '48px';
      default: return '40px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '32px';
      case 'md': return '40px';
      case 'lg': return '48px';
      default: return '40px';
    }
  }};
  background-color: ${({ theme, variant, disabled }) => {
    if (disabled) return theme.colors.gray[200];
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'ghost': return 'transparent';
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme, variant, disabled }) => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'primary': return theme.colors.white;
      case 'secondary': return theme.colors.white;
      case 'ghost': return theme.colors.text.primary;
      default: return theme.colors.white;
    }
  }};
  border: ${({ theme, variant }) => 
    variant === 'ghost' ? `1px solid ${theme.colors.gray[300]}` : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${({ theme, variant, disabled }) => {
      if (disabled) return theme.colors.gray[200];
      switch (variant) {
        case 'primary': return theme.colors.primaryDark;
        case 'secondary': return theme.colors.secondaryDark;
        case 'ghost': return theme.colors.gray[100];
        default: return theme.colors.primaryDark;
      }
    }};
    transform: ${({ disabled }) => disabled ? 'none' : 'scale(1.05)'};
  }

  &:active {
    transform: ${({ disabled }) => disabled ? 'none' : 'scale(0.95)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme, variant, disabled }) => {
      if (disabled) return 'transparent';
      switch (variant) {
        case 'primary': return `${theme.colors.primary}20`;
        case 'secondary': return `${theme.colors.secondary}20`;
        case 'ghost': return `${theme.colors.gray[300]}20`;
        default: return `${theme.colors.primary}20`;
      }
    }};
  }

  svg {
    width: ${({ size }) => {
      switch (size) {
        case 'sm': return '16px';
        case 'md': return '20px';
        case 'lg': return '24px';
        default: return '20px';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'sm': return '16px';
        case 'md': return '20px';
        case 'lg': return '24px';
        default: return '20px';
      }
    }};
  }
`;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'md',
  variant = 'primary',
  disabled = false,
  title,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <StyledIconButton
      onClick={handleClick}
      size={size}
      variant={variant}
      disabled={disabled}
      title={title}
    >
      {icon}
    </StyledIconButton>
  );
}; 