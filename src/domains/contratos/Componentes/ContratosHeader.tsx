import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchContracts } from '../../../redux/slices/contractSlice';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Icon, Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import './style.css';
import SearchBar from '../../../components/SearchBar/SearchBar';

const ContratosHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContracts(null));
  }, [dispatch]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button variant="contained" size="small" className="novo-item-button" >< Add />NOVO PEDIDO</Button>
      <SearchBar onSearch={(filters) => dispatch(fetchContracts(filters))}/>
    </Box>
  );
};

export default ContratosHeader;