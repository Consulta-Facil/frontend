import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
  fallback?: string;
}

const AvatarContainer = styled.div<{ size: 'sm' | 'md' | 'lg' | 'xl' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '32px';
      case 'md': return '40px';
      case 'lg': return '56px';
      case 'xl': return '80px';
      default: return '40px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '32px';
      case 'md': return '40px';
      case 'lg': return '56px';
      case 'xl': return '80px';
      default: return '40px';
    }
  }};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarFallback = styled.div<{ size: 'sm' | 'md' | 'lg' | 'xl' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ size }) => {
    switch (size) {
      case 'sm': return '12px';
      case 'md': return '14px';
      case 'lg': return '18px';
      case 'xl': return '24px';
      default: return '14px';
    }
  }};
`;

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 'md',
  alt = 'Avatar',
  fallback,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const displayName = fallback || 'U';
  const initials = getInitials(displayName);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AvatarContainer size={size}>
      {src && !imageError ? (
        <AvatarImage
          src={src}
          alt={alt}
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback size={size}>
          {initials}
        </AvatarFallback>
      )}
    </AvatarContainer>
  );
}; 