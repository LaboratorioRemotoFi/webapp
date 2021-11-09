import * as React from "react";
// Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// Box
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Acordeon = () => (
  <div>
    <Accordion>
      <AccordionSummary>
        <h1>Habilidades</h1>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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

export default Acordeon;
