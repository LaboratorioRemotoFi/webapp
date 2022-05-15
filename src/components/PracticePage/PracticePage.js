import React from "react";
import PracticeStep from "./PracticeStep";
import useStoreContext from "/src/hooks/storeContext";
import { useRouter } from "next/router";
import { logScheduleAction, updateSchedule } from "/src/utils/practiceUtils.js";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Typography,
  Stack,
} from "@mui/material";

function PracticePage({
  socket,
  metadata,
  practiceStatus,
  sensorsData,
  actuatorsStatus,
}) {
  const router = useRouter();

  const [currentState, currentDispatch] = useStoreContext();
  const practice = currentState.nearestPractice;
  const schedule = practice && practice.schedule;

  const [pageIndex, setPageIndex] = React.useState(-1);

  React.useEffect(() => {
    if (schedule.status === "SCHEDULED") {
      updateSchedule(schedule._id, { status: "STARTED" });
      logScheduleAction(schedule._id, "Se inició la práctica");
    }
  }, [schedule]);

  const sendCommand = (command, value) => {
    socket.emit("command", command, value);
  };

  const logCommand = (name) => {
    logScheduleAction(schedule._id, `Se mandó comando: ${name}`);
  };

  const onNextStepClick = () => {
    logScheduleAction(schedule._id, `Se empezó el paso ${pageIndex + 2}`);
    setPageIndex(pageIndex + 1);
  };

  const onFinishPractice = () => {
    fetch(`/api/schedules/${schedule._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ status: "FINISHED" }),
    });
    logScheduleAction(schedule._id, "Se terminó la práctica");
    currentDispatch({ type: "clearData" });
    socket.close();
    router.push("/");
  };

  const page = pageIndex >= 0 ? metadata.pages[pageIndex] : undefined;

  const sensors =
    page &&
    page.sensors &&
    page.sensors.map((sensorId) => ({
      ...metadata.sensors[sensorId],
      value: sensorsData[sensorId],
      id: sensorId,
    }));
  const actuators =
    page &&
    page.actuators &&
    page.actuators.map((actuatorId) => ({
      ...metadata.actuators[actuatorId],
      value: actuatorsStatus[actuatorId],
      id: actuatorId,
    }));
  const actions =
    page &&
    page.actions &&
    page.actions.map((actionId) => ({
      ...metadata.actions[actionId],
      id: actionId,
    }));
  const videos =
    page &&
    page.videos &&
    page.videos.map((videoId) => ({
      ...metadata.videos[videoId],
    }));

  return (
    <div>
      {pageIndex === -1 ? (
        <>
          <Typography variant="h2">{metadata.name}</Typography>
          <Typography paragraph>{metadata.objective}</Typography>
          {practiceStatus !== "ready" && (
            <Typography paragraph>
              La práctica se está configurando, espera un poco por favor.
            </Typography>
          )}
          {practiceStatus !== "ready" ? (
            <CircularProgress />
          ) : (
            <Button
              size="small"
              variant="contained"
              disabled={practiceStatus !== "ready"}
              onClick={onNextStepClick}
              sx={{ ml: 0, mr: 2 }}
            >
              Empezar práctica
            </Button>
          )}
        </>
      ) : (
        <>
          <Box sx={{ my: 4 }}>
            <PracticeStep
              index={pageIndex}
              instructions={page.instructions}
              sensors={sensors}
              actuators={actuators}
              actions={actions}
              videos={videos}
              sendCommand={sendCommand}
              logCommand={logCommand}
              setPageIndex={setPageIndex}
            />
          </Box>
          <Stack sx={{ my: 2 }} alignItems="flex-end">
            {pageIndex !== metadata.pages.length - 1 && (
              <Button size="sm" variant="outlined" onClick={onNextStepClick}>
                Siguiente paso
              </Button>
            )}
            {pageIndex === metadata.pages.length - 1 && (
              <Button size="sm" variant="outlined" onClick={onFinishPractice}>
                Terminar práctica
              </Button>
            )}
            {pageIndex !== 0 && (
              <div>
                <Link
                  sx={{ my: 1 }}
                  component="button"
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Paso anterior
                </Link>
              </div>
            )}
          </Stack>
        </>
      )}
    </div>
  );
}

export default PracticePage;
