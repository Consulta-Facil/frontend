import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  label: string | number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const StyledBadge = styled.span<{
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => {
    switch (size) {
      case 'sm': return '2px 6px';
      case 'md': return '4px 8px';
      case 'lg': return '6px 12px';
      default: return '4px 8px';
    }
  }};
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme, size }) => {
    switch (size) {
      case 'sm': return theme.borderRadius.full;
      case 'md': return theme.borderRadius.full;
      case 'lg': return theme.borderRadius.full;
      default: return theme.borderRadius.full;
    }
  }};
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
  line-height: 1;
  white-space: nowrap;
  min-width: ${({ size }) => {
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
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <StyledBadge variant={variant} size={size}>
      {label}
    </StyledBadge>
  );
}; 