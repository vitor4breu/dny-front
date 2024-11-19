import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Box } from '@mui/material';

type Props = {
  children?: React.ReactNode
};

const HomePage: React.FC<Props> = ({children}) => {



  return (
    <Box display="flex">
        <Sidebar />
          <div style={{marginTop:"64px"}}>
            {children}
          </div>
        <Header />
    </Box>
  );
};

export default HomePage;