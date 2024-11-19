import React, { useState } from 'react';
import { Drawer, List, IconButton, Box, Typography, SvgIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PaletteIcon from '@mui/icons-material/Palette';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LayersIcon from '@mui/icons-material/Layers';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { styled } from '@mui/system';
import SidebarItem from './SidebarItem';
import LogoExtended from '../../assets/dny-logo-extended.svg';
import LogoIcon from '../../assets/dny-logo-icon.svg';
import ReduceSidebarIcon from '../../assets/icons/sidebar-reduce-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSidebar } from '../../redux/slices/layoutSlice';

import logoSetorContratosIcon from '../../assets/icons/setor-contrato-icon.svg';
import logoSetorCorteIcon from '../../assets/icons/setor-corte-icon.svg';
import logoSetorSerigrafiaIcon from '../../assets/icons/setor-serigrafia-icon.svg';
import logoSetorFinalizacaoArteIcon from '../../assets/icons/setor-finalizacao-arte-icon.svg';
import logoSetorSeparacaoIcon from '../../assets/icons/setor-separacao-icon.svg';
import logoSetorCanecasIcon from '../../assets/icons/setor-canecas-icon.svg';
import logoSetorTirantesBandeirasIcon from '../../assets/icons/setor-tirantes-e-bandeiras-icon.svg';
import logoSetorBordadoIcon from '../../assets/icons/setor-bordado-icon.svg';
import logoSetorRevisaoIcon from '../../assets/icons/setor-revisao-icon.svg';
import logoSetorCosturaIcon from '../../assets/icons/setor-costura-icon.svg';
import logoSetorControleProducaoIcon from '../../assets/icons/setor-controle-producao.svg';
import logoSetorFinalizacaoIcon from '../../assets/icons/setor-finalizacao-icon.svg';




const drawerWidth = 350;
const collapsedDrawerWidth = 67;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between'
}));

const Sidebar: React.FC = () => {

  const isCompressed = useSelector((state: RootState) => state.layout.isSidebarCompressed);

  const dispatch = useDispatch();


  return (
    <Drawer
      variant="permanent"
      open={!isCompressed}
      sx={{
        width: isCompressed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCompressed ? collapsedDrawerWidth : drawerWidth,
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          padding: "5px"
        },
      }}
    >
      <DrawerHeader sx={{height:"60px", borderBottom:"2px solid lightgrey"}}>
        <Box component="img" src={isCompressed ? LogoIcon : LogoExtended} alt="Logo" sx={{ height: "35px", marginLeft: "2.5px"}} />
        {!isCompressed && 
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          <img src={ReduceSidebarIcon} alt="reduce-sidebar-icon"/>
        </IconButton>}
      </DrawerHeader>

      <List>
          { !isCompressed && <Typography sx={{paddingLeft:"16px", fontSize:"18px"}}>
             SETORES
          </Typography>}
          <SidebarItem icon={<img src={logoSetorContratosIcon} alt="Logo Setor Contratos"/>} text="Contratos" open={!isCompressed} route="/contratos" />
          <SidebarItem icon={<img src={logoSetorControleProducaoIcon} alt="Logo Setor Controle de Produção"/>} text="Controle de produção" open={!isCompressed} route="/controle-producao" />
          <SidebarItem icon={<img src={logoSetorCorteIcon} alt="Logo Setor Corte"/>} text="Corte" open={!isCompressed} route="/corte" />
          <SidebarItem icon={<img src={logoSetorSerigrafiaIcon} alt="Logo Setor Serigrafia"/>} text="Serigrafia" open={!isCompressed} route="/serigrafia" />
          <SidebarItem icon={<img src={logoSetorFinalizacaoArteIcon} alt="Logo Setor Finalização de Arte"/>} text="Finalização de arte" open={!isCompressed} route="/finalizacao-arte" />
          <SidebarItem icon={<img src={logoSetorSeparacaoIcon} alt="Logo Setor Separação"/>} text="Separação" open={!isCompressed} route="/separacao" />
          <SidebarItem icon={<img src={logoSetorCanecasIcon} alt="Logo Setor Canecas"/>} text="Canecas" open={!isCompressed} route="/canecas" />
          <SidebarItem icon={<img src={logoSetorTirantesBandeirasIcon} alt="Logo Setor Tirantes e Bandeiras"/>} text="Tirantes e Bandeiras" open={!isCompressed} route="/tirantes-bandeiras" />
          <SidebarItem icon={<img src={logoSetorBordadoIcon} alt="Logo Setor Bordado"/>} text="Bordado" open={!isCompressed} route="/bordado" />
          <SidebarItem icon={<img src={logoSetorRevisaoIcon} alt="Logo Setor Revisão"/>} text="Revisão" open={!isCompressed} route="/revisao" />
          <SidebarItem icon={<img src={logoSetorCosturaIcon} alt="Logo Setor Costura"/>} text="Costura" open={!isCompressed} route="/costura" />
          <SidebarItem icon={<img src={logoSetorFinalizacaoIcon} alt="Logo Setor Finalização"/>} text="Finalização" open={!isCompressed} route="/finalizacao" />

      </List>
    </Drawer>
  );
};

export default Sidebar;
