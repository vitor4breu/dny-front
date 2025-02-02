import React, { useEffect, useState } from 'react';
import { Drawer, List, IconButton, Box, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { ReactComponent as LogoExtended } from '@assets/dny-logo-extended.svg';
import { ReactComponent as LogoIcon } from '@assets/dny-logo-icon.svg';
import { ReactComponent as ReduceSidebarIcon } from '@assets/icons/sidebar-reduce-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { toggleSidebar } from '@redux/slices/layoutSlice';
import { 
    LogoSetorBordadoIcon, 
    LogoSetorCanecasIcon,
    LogoSetorContratosIcon, 
    LogoSetorControleProducaoIcon, 
    LogoSetorCorteIcon, 
    LogoSetorCosturaIcon, 
    LogoSetorFinalizacaoArteIcon, 
    LogoSetorFinalizacaoIcon, 
    LogoSetorRevisaoIcon, 
    LogoSetorSeparacaoIcon, 
    LogoSetorSerigrafiaIcon, 
    LogoSetorTirantesBandeirasIcon } 
from '@utils/Icons';
import { Link, useLocation} from 'react-router-dom';


const drawerWidth = 350;
const collapsedDrawerWidth = 67;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between'
}));

type SidebarItemData = {
  logo: React.ReactElement,
  text: string,
  route: string
}

const SidebarItems: SidebarItemData[] = [
  { logo: <LogoSetorContratosIcon />, text: 'Contratos', route: '/contratos' },
  { logo: <LogoSetorControleProducaoIcon />, text: 'Controle de produção', route: '/controle-producao' },
  { logo: <LogoSetorCorteIcon />, text: 'Corte', route: '/corte' },
  { logo: <LogoSetorSerigrafiaIcon />, text: 'Serigrafia', route: '/serigrafia' },
  { logo: <LogoSetorFinalizacaoArteIcon />, text: 'Finalização de arte', route: '/finalizacao-arte' },
  { logo: <LogoSetorSeparacaoIcon />, text: 'Separação', route: '/separacao' },
  { logo: <LogoSetorCanecasIcon />, text: 'Canecas', route: '/canecas' },
  { logo: <LogoSetorTirantesBandeirasIcon />, text: 'Tirantes e Bandeiras', route: '/tirantes-bandeiras' },
  { logo: <LogoSetorBordadoIcon />, text: 'Bordado', route: '/bordado' },
  { logo: <LogoSetorRevisaoIcon />, text: 'Revisão', route: '/revisao' },
  { logo: <LogoSetorCosturaIcon />, text: 'Costura', route: '/costura' },
  { logo: <LogoSetorFinalizacaoIcon />, text: 'Finalização', route: '/finalizacao' },
];

const Sidebar: React.FC = () => {
  const isCompressed = useSelector((state: RootState) => state.layout.isSidebarCompressed);
  const dispatch = useDispatch();
  const location = useLocation();

  const [compressItems, setCompressItems] = useState<boolean>(isCompressed);

  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompressItems(isCompressed);
    }, !isCompressed ? 150 : 0); 

    return () => clearTimeout(timer);
  }, [isCompressed]);


  return (
    <Drawer
      variant="permanent"
      open={!isCompressed}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCompressed ? collapsedDrawerWidth : drawerWidth,
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          padding: "5px",
          backgroundColor: "#fffdf5"
        },
      }}
    >
      <DrawerHeader sx={{ height: "60px", borderBottom: "2px solid lightgrey" }}>
        <Box component={isCompressed ? LogoIcon : LogoExtended} sx={{ height: "35px" }} />
        {!isCompressed &&
          <IconButton onClick={() => dispatch(toggleSidebar())}>
            <ReduceSidebarIcon />
          </IconButton>}
      </DrawerHeader>

      <List>
        {!isCompressed && (
          <Typography sx={{ paddingLeft: "16px", fontSize: "18px" }}>
            SETORES
          </Typography>
        )}
        {SidebarItems.map((item, i) => (
          <ListItem
            key={i}
            component={Link}
            to={item.route}
            sx={{
              borderRadius: '8px',
              margin: '4px 0px',
              padding: '8px 16px',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              justifyContent: isCompressed ? 'center' : 'flex-start',
              backgroundColor: location.pathname === item.route ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
              '& .MuiListItemIcon-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiTypography-root': {
                color: theme.palette.text.primary,
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiTypography-root': {
                  color: theme.palette.primary.main,
                }
              }
            }}
          >
            <ListItemIcon 
              sx={{
                minWidth: isCompressed ? 'auto' : '40px',
                transition: 'color 0.2s ease-in-out',
                marginRight: isCompressed ? 0 : 2
              }}
            >
              {item.logo}
            </ListItemIcon>
            {!isCompressed && (
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: "bold",
                  sx: { transition: 'color 0.2s ease-in-out' }
                }}
                primary={item.text}
                sx={{
                  margin: 0,
                  flex: 'none'
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;