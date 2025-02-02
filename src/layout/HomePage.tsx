import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

type Props = {
  children?: React.ReactNode
};

const HomePage: React.FC<Props> = ({children}) => {
  const theme = useTheme();
  const isSidebarCompressed = useSelector((state: RootState) => state.layout.isSidebarCompressed);

  return (
    <Box display="flex">
      <Sidebar />
      <div style={{
        width: "100%",
        paddingTop: "64px",
        paddingLeft: isSidebarCompressed ? '67px' : '350px', // Ajuste a margem esquerda com base no estado da barra lateral
        transition: theme.transitions.create(['padding-left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <Box padding={2}>
          {children}
        </Box>
      </div>
      <Header />
    </Box>
  );
};

export default HomePage;