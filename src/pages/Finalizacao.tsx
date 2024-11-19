import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchFinalizacaoItems } from '../redux/slices/finalizacaoSlice';
import { useEffect } from 'react';

const Finalizacao: React.FC = () => {
  const dispatch = useAppDispatch();
  const finalizacaoItems = useAppSelector((state) => state.finalizacao.items);

  useEffect(() => {
    dispatch(fetchFinalizacaoItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Finalização
      </Typography>
      <List>
        {finalizacaoItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Finalizacao;
