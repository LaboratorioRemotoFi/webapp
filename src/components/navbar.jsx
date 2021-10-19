import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
  offset: {
    ...theme.mixins.toolbar, 
    marginBottom: "1rem", 
  },
}));

const Navbar = () => {
  const classes = useStyle();

  return (
    <Box sx={{ width: 'auto' }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Página
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  );
}

export default Navbar;