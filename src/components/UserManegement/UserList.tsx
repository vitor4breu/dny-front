import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/slices/userSlice';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} secondary={user.fullName} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;