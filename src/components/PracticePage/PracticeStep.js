import React from "react";
import PracticeAction from "/src/components/PracticePage/PracticeAction";
import { Stack, Typography } from "@mui/material";

function PracticeStep({
  index,
  instructions,
  sensors,
  actuators,
  actions,
  videos,
  sendCommand,
  logCommand,
}) {
  return (
    <div>
      {videos?.length > 0 && <Typography variant="h4">Cámaras</Typography>}
      {videos &&
        videos.map((video) => {
          const { id, name, url, width, height } = video;
          return (
            <div key={id}>
              <Typography>{name}</Typography>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`Video de ${name}`}
                width={width}
                height={height}
                src={url}
              />
            </div>
          );
        })}
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
      <Typography variant="h4">Actuadores</Typography>
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
        <Stack spacing={2} alignItems="flex-start">
          {actions.map((action, index) => {
            return (
              <PracticeAction
                key={index}
                action={action}
                logCommand={logCommand}
                sendCommand={sendCommand}
              />
            );
          })}
        </Stack>
      )}
    </div>
  );
}

export default PracticeStep;
