import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchFinalizacaoArteItems } from '../redux/slices/finalizacaoArteSlice';
import { useEffect } from 'react';

const FinalizacaoArte: React.FC = () => {
  const dispatch = useAppDispatch();
  const finalizacaoArteItems = useAppSelector((state) => state.finalizacaoArte.items);

  useEffect(() => {
    dispatch(fetchFinalizacaoArteItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Finalização de Arte
      </Typography>
      <List>
        {finalizacaoArteItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FinalizacaoArte;
