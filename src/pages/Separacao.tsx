import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchSeparacaoItems } from '../redux/slices/separacaoSlice';
import { useEffect } from 'react';

const Separacao: React.FC = () => {
  const dispatch = useAppDispatch();
  const separacaoItems = useAppSelector((state) => state.separacao.items);

  useEffect(() => {
    dispatch(fetchSeparacaoItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Separação
      </Typography>
      <List>
        {separacaoItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Separacao;
