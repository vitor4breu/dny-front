import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductionItems } from '../../redux/slices/productionSlice';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const ProductionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const productionItems = useAppSelector((state) => state.production.items);

  useEffect(() => {
    dispatch(fetchProductionItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Production Control
      </Typography>
      <List>
        {productionItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.status} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductionList;