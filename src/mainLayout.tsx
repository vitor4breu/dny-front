import React from 'react';
import { Box } from '@mui/material';
import RoutesManagement from './routes';

const MainLayout: React.FC = () => {
  return (
    <Box component="main" padding="16px">
        <RoutesManagement />
    </Box>
  );
};

export default MainLayout;