import React from 'react';
import styled from 'styled-components';
import { TextInput } from '../atoms';

interface AddressGroupProps {
  address: string;
  number: string;
  city: string;
  cep: string;
  uf: string;
  onChange: (field: string, value: string) => void;
  errors?: {
    address?: string;
    number?: string;
    city?: string;
    cep?: string;
    uf?: string;
  };
}

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CityUfRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressGroup: React.FC<AddressGroupProps> = ({
  address,
  number,
  city,
  cep,
  uf,
  onChange,
  errors = {},
}) => {
  const handleChange = (field: string) => (value: string) => {
    onChange(field, value);
  };

  return (
    <AddressContainer>
      <FieldContainer>
        <Label>Endereço</Label>
        <TextInput
          placeholder="Rua, Avenida, etc."
          value={address}
          onChange={handleChange('address')}
          error={errors.address}
        />
      </FieldContainer>

      <Row>
        <FieldContainer>
          <Label>Número</Label>
          <TextInput
            placeholder="123"
            value={number}
            onChange={handleChange('number')}
            error={errors.number}
          />
        </FieldContainer>

        <FieldContainer>
          <Label>CEP</Label>
          <TextInput
            placeholder="00000-000"
            value={cep}
            onChange={handleChange('cep')}
            error={errors.cep}
          />
        </FieldContainer>
      </Row>

      <CityUfRow>
        <FieldContainer>
          <Label>Cidade</Label>
          <TextInput
            placeholder="Nome da cidade"
            value={city}
            onChange={handleChange('city')}
            error={errors.city}
          />
        </FieldContainer>

        <FieldContainer>
          <Label>UF</Label>
          <TextInput
            placeholder="SP"
            value={uf}
            onChange={handleChange('uf')}
            error={errors.uf}
          />
        </FieldContainer>
      </CityUfRow>
    </AddressContainer>
  );
}; 