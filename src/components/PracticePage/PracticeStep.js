import React from "react";
import { Box, Button, Typography } from "@mui/material";

function PracticeStep({
  index,
  instructions,
  sensors,
  actuators,
  actions,
  sendCommand,
  logCommand,
}) {
  return (
    <div>
      <Typography variant="h4">Componentes</Typography>
      {sensors && (
        <ul>
          {sensors.map((sensor) => {
            const { id, labels, name, value } = sensor;
            return (
              <li key={id}>
                <Typography>
                  {name + ": "}
                  {labels ? labels[value] : value}
                </Typography>
              </li>
            );
          })}
        </ul>
      )}
      {actuators && (
        <ul>
          {actuators.map((actuator) => {
            const { id, name, labels, value } = actuator;
            return (
              <li key={id}>
                <Typography>
                  {name + ": "}
                  {labels ? labels[value] : value}
                </Typography>
              </li>
            );
          })}
        </ul>
      )}
      <Typography variant="h4">{`Paso ${index + 1}`}</Typography>
      <ul>
        {instructions.map((text, index) => {
          return (
            <li key={index}>
              <Typography>{text}</Typography>
            </li>
          );
        })}
      </ul>
      {actions && (
        <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1, ml: 3 }}>
          {actions.map((action, index) => {
            const { name, command } = action;
            return (
              <Button
                key={index}
                size="small"
                variant="text"
                onClick={() => {
                  logCommand(name);
                  sendCommand(command);
                }}
                sx={{ ml: 0, mr: 2 }}
              >
                {name}
              </Button>
            );
          })}
        </Box>
      )}
    </div>
  );
}

export default PracticeStep;
