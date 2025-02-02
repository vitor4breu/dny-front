import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import ExpandSidebarIcon from '@assets/icons/sidebar-expand-icon.svg';
import { toggleSidebar } from '@redux/slices/layoutSlice';
import { Logout } from '@mui/icons-material';
import { useAuth } from '@utils/auth/authContext';

const Header: React.FC = () => {

  const isCompressed = useSelector((state: RootState) => state.layout.isSidebarCompressed);
  const dispatch = useDispatch();
  const { logout } = useAuth();

  return (
    <AppBar sx={{
      width: isCompressed ? "calc(100% - 67px)" : "calc(100% - 350px)",
      left:"auto",
      right:0,
      padding:0,
      flexDirection:"row",
      alignItems: "center",
      backgroundColor: "#F6F6F6",
      transition: (theme) => theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      }}
      >
        {isCompressed && 
        <>
          <IconButton onClick={() => dispatch(toggleSidebar())} sx={{height:"fit-content", color:"#505050"}}>
            <img src={ExpandSidebarIcon} alt="reduce-sidebar-icon"/>
          </IconButton>
        </>
      }
      <Toolbar sx={{ marginLeft: 'auto' }}>
        <IconButton color="inherit" onClick={logout}>
          <Logout/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;