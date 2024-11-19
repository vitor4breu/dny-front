import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBordadoItems } from '../redux/slices/bordadoSlice';
import { useEffect } from 'react';

const Bordado: React.FC = () => {
  const dispatch = useAppDispatch();
  const bordadoItems = useAppSelector((state) => state.bordado.items);

  useEffect(() => {
    dispatch(fetchBordadoItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bordado
      </Typography>
      <List>
        {bordadoItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Bordado;
