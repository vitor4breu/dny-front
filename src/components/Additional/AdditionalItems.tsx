import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAdditionalItems } from '../../redux/slices/additionalSlice';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AdditionalItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const additionalItems = useAppSelector((state) => state.additional.items);

  useEffect(() => {
    dispatch(fetchAdditionalItems());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Additional Items
      </Typography>
      <List>
        {additionalItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdditionalItems;
