import React, { useEffect, useState } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactElement;
  text: string;
  open: boolean;
  route: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, open, route }) => {

  const [showText, setShowText] = useState(open); // Estado local para controlar a visibilidade do texto

  useEffect(() => {
    // Usar um temporizador para alterar a visibilidade do texto
    
    const timer = setTimeout(() => {
      setShowText(open);
    }, open ? 150 : 0); // 10 ms de atraso

    // Limpar o temporizador se o componente for desmontado ou `open` mudar
    return () => clearTimeout(timer);
  }, [open]); // Dependência de `open`

  return (
    <ListItem component={Link} to={route} >
      <ListItemIcon style={{minWidth: open ? "40px" : "fit-content"}}>{icon}</ListItemIcon>
      {showText  && <ListItemText primary={text} style={{marginTop:"0px", marginBottom:"0px", fontWeight:"bold"}} />}
    </ListItem>
  );
};

export default SidebarItem;
