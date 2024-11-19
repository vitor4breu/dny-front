import React from 'react';
import { Container, Typography } from '@mui/material';

const DashboardOverview: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body1">
        Bem-vindo ao painel de controle. Aqui você pode ver um resumo das atividades e estatísticas principais.
      </Typography>
    </Container>
  );
};

export default DashboardOverview;