import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCorteItems } from '../redux/slices/corteSlice';
import { useEffect } from 'react';

const Corte: React.FC = () => {
  const dispatch = useAppDispatch();
  const corteItems = useAppSelector((state) => state.corte.items);

  useEffect(() => {
    dispatch(fetchCorteItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Corte
      </Typography>
      <List>
        {corteItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Corte;
