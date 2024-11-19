import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTirantes } from '../redux/slices/tirantesSlice';
import { useEffect } from 'react';

const Tirantes: React.FC = () => {
  const dispatch = useAppDispatch();
  const tirantes = useAppSelector((state) => state.tirantes.items);

  useEffect(() => {
    dispatch(fetchTirantes());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tirantes e Bandeiras
      </Typography>
      <List>
        {tirantes.map((tirante) => (
          <ListItem key={tirante.id}>
            <ListItemText primary={tirante.name} secondary={tirante.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Tirantes;
