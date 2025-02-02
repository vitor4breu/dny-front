import React from 'react';
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { ContractDetailsDrawerProps } from './types';
import { DrawerContent } from './styles';

const ContractDetailsDrawer: React.FC<ContractDetailsDrawerProps> = ({
  contratoInfo,
  onClose
}) => {
  if (!contratoInfo) return null;

  return (
    <Drawer
      anchor="right"
      open={!!contratoInfo}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 400 } }}
    >
      <DrawerContent>
        <Typography variant="h6" gutterBottom>
          Detalhes do Pedido #{contratoInfo.id}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText 
              primary="Escola"
              secondary={contratoInfo.escola}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Responsável"
              secondary={contratoInfo.nomeResponsavel}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Produtos"
              secondary={
                Object.entries(contratoInfo.detalhesPedido)
                  .filter(([_, value]) => value)
                  .map(([key]) => key.replace('has', ''))
                  .join('\n')
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Alunos"
              secondary={contratoInfo.alunos.length}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Entrega"
              secondary={`${contratoInfo.detalhesEnvio.tipo === 'entrega' ? 'Entrega' : 'Retirada'}`}
            />
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
};

export default ContractDetailsDrawer;