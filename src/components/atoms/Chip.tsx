import React from 'react';
import styled from 'styled-components';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  onDelete?: () => void;
  clickable?: boolean;
  onClick?: () => void;
}

const StyledChip = styled.div<{
  variant: 'default' | 'outlined' | 'filled';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
  clickable: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => {
    switch (size) {
      case 'sm': return '4px 8px';
      case 'md': return '6px 12px';
      case 'lg': return '8px 16px';
      default: return '6px 12px';
    }
  }};
  background-color: ${({ theme, variant, color }) => {
    if (variant === 'filled') {
      switch (color) {
        case 'primary': return theme.colors.primary;
        case 'secondary': return theme.colors.secondary;
        case 'success': return theme.colors.success;
        case 'warning': return theme.colors.warning;
        case 'error': return theme.colors.error;
        default: return theme.colors.gray[200];
      }
    }
    return 'transparent';
  }};
  color: ${({ theme, variant, color }) => {
    if (variant === 'filled') {
      return theme.colors.white;
    }
    switch (color) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.text.primary;
    }
  }};
  border: 1px solid ${({ theme, variant, color }) => {
    if (variant === 'default') return theme.colors.gray[300];
    switch (color) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.gray[300];
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'sm': return theme.typography.fontSize.xs;
      case 'md': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.base;
      default: return theme.typography.fontSize.sm;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background-color: ${({ theme, variant, color, clickable }) => {
      if (!clickable) return 'inherit';
      if (variant === 'filled') {
        switch (color) {
          case 'primary': return theme.colors.primaryDark;
          case 'secondary': return theme.colors.secondaryDark;
          case 'success': return theme.colors.success;
          case 'warning': return theme.colors.warning;
          case 'error': return theme.colors.error;
          default: return theme.colors.gray[300];
        }
      }
      return theme.colors.gray[100];
    }};
    transform: ${({ clickable }) => clickable ? 'translateY(-1px)' : 'none'};
    box-shadow: ${({ theme, clickable }) => 
      clickable ? theme.shadows.sm : 'none'};
  }

  &:active {
    transform: ${({ clickable }) => clickable ? 'translateY(0)' : 'none'};
  }
`;

const ChipIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.xs};
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ChipLabel = styled.span`
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const DeleteIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  variant = 'default',
  color = 'primary',
  size = 'md',
  onDelete,
  clickable = false,
  onClick,
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <StyledChip
      variant={variant}
      color={color}
      size={size}
      clickable={clickable}
      onClick={handleClick}
    >
      {icon && <ChipIcon>{icon}</ChipIcon>}
      <ChipLabel>{label}</ChipLabel>
      {onDelete && (
        <DeleteIcon onClick={handleDelete}>
          <DeleteIconSvg />
        </DeleteIcon>
      )}
    </StyledChip>
  );
}; 