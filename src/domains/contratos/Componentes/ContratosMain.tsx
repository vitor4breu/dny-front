import React from 'react';
import { Container } from '@mui/material';
import './style.css';
import ContratosHeader from './ContratosHeader';
import ContratosLista from './ContractLista';

const ContratosMain: React.FC = () => {
  return (
    <Container>
      <ContratosHeader />
      <ContratosLista />
    </Container>
  );
};

export default ContratosMain;