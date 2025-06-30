import React from 'react';
import styled from 'styled-components';

interface Stat {
  value: string;
  label: string;
}

interface StatsPanelProps {
  stats: Stat[];
}

const Panel = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    flex-direction: row;
    gap: 18px;
    padding: 18px 6px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 2px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    min-width: 120px;
    flex: 1 1 45%;
  }
  @media (max-width: 500px) {
    min-width: 0;
    flex: 1 1 100%;
  }
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  @media (max-width: 700px) {
    font-size: 0.95rem;
  }
`;

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => (
  <Panel>
    {stats.map((stat, idx) => (
      <StatItem key={idx}>
        <StatValue>{stat.value}</StatValue>
        <StatLabel>{stat.label}</StatLabel>
      </StatItem>
    ))}
  </Panel>
); 