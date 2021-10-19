import * as React from 'react';
// Accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// Box
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Acordeon=() => {
  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <h1>Habilidades</h1>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="R" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="C#" />
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                 <ListItemText primary="Python" />
               </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Javascript" />
              </ListItem>
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Acordeon;