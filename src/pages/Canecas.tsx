import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCanecas } from '../redux/slices/canecasSlice';
import { useEffect } from 'react';

const Canecas: React.FC = () => {
  const dispatch = useAppDispatch();
  const canecas = useAppSelector((state) => state.canecas.items);

  useEffect(() => {
    dispatch(fetchCanecas());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Canecas Personalizadas
      </Typography>
      <List>
        {canecas.map((caneca) => (
          <ListItem key={caneca.id}>
            <ListItemText primary={caneca.name} secondary={caneca.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Canecas;
