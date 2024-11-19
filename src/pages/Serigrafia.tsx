import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchSerigrafiaItems } from '../redux/slices/serigrafiaSlice';
import { useEffect } from 'react';

const Serigrafia: React.FC = () => {
  const dispatch = useAppDispatch();
  const serigrafiaItems = useAppSelector((state) => state.serigrafia.items);

  useEffect(() => {
    dispatch(fetchSerigrafiaItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Serigrafia
      </Typography>
      <List>
        {serigrafiaItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Serigrafia;
