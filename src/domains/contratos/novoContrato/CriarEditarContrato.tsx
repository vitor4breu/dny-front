// CriarEditarContrato.tsx
import React from 'react';
import { Grid } from '@mui/material';
import RepresentanteForm from './form/Representantes/RepresentantesForm';
import DetalhesPedidoForm from './form/Pedido/PedidoForm';
import DeliveryForm from './form/Envio/EnvioForm';
import AlunosForm from './form/Alunos/AlunosForm';
import SubmitForm from './form/Submit';
import { ToastContainer } from 'react-toastify';

const CriarEditarContrato: React.FC = () => {
  return (
      <Grid container spacing={3} width="100%">
        
      <ToastContainer />
       <Grid item xs={5}>
          <RepresentanteForm/>
           
          <DetalhesPedidoForm/>
           
          <DeliveryForm/>
        </Grid>
        <Grid item xs={7}>
          <AlunosForm/>
        </Grid>
        <Grid item xs={12}>
          <SubmitForm />
        </Grid>
      </Grid>
  );
};

export default CriarEditarContrato;