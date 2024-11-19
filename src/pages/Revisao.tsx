import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchRevisaoItems } from '../redux/slices/revisaoSlice';
import { useEffect } from 'react';

const Revisao: React.FC = () => {
  const dispatch = useAppDispatch();
  const revisaoItems = useAppSelector((state) => state.revisao.items);

  useEffect(() => {
    dispatch(fetchRevisaoItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Revisão
      </Typography>
      <List>
        {revisaoItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Revisao;
