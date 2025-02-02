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
  const [showText, setShowText] = useState(open);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(open);
    }, open ? 150 : 0);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <ListItem
      component={Link}
      to={route}


    >
      <ListItemIcon 
        sx={{
          minWidth: open ? "40px" : "fit-content", 
          color: "#424242",
          transition: 'color 0.2s ease-in-out'
        }}
      >
        {icon}
      </ListItemIcon>
      {showText && (
        <ListItemText
          primaryTypographyProps={{
            fontWeight: "bold",
            color: "#424242",
            sx: { transition: 'color 0.2s ease-in-out' }
          }}
          primary={text}
          sx={{ 
            marginTop: "0px", 
            marginBottom: "0px"
          }}
        />
      )}
    </ListItem>
  );
};

export default SidebarItem;