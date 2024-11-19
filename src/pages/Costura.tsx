import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCosturaItems } from '../redux/slices/costuraSlice';
import { useEffect } from 'react';

const Costura: React.FC = () => {
  const dispatch = useAppDispatch();
  const costuraItems = useAppSelector((state) => state.costura.items);

  useEffect(() => {
    dispatch(fetchCosturaItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Costura
      </Typography>
      <List>
        {costuraItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Costura;
