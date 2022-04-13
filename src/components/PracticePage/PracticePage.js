import React from "react";
import PracticeStep from "./PracticeStep";
import useStoreContext from "/src/hooks/storeContext";
import { useRouter } from "next/router";
import { logScheduleAction, updateSchedule } from "/src/utils/practiceUtils.js";
import { Box, Button, CircularProgress, Link, Typography } from "@mui/material";

function PracticePage({
  socket,
  metadata,
  practiceStatus,
  sensorsData,
  actuatorsStatus,
  errorMessage,
}) {
  const router = useRouter();

  const [currentState, currentDispatch] = useStoreContext();
  const practice = currentState.nearestPractice;
  const schedule = practice && practice.schedule;

  const [hideMessage, setHideMessage] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(-1);

  React.useEffect(() => {
    if (schedule.status === "SCHEDULED") {
      updateSchedule(schedule._id, { status: "STARTED" });
      logScheduleAction(schedule._id, "Se inició la práctica");
    }
  }, [schedule]);

  const sendCommand = (command) => {
    socket.emit("command", command);
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
              sendCommand={sendCommand}
              logCommand={logCommand}
              setPageIndex={setPageIndex}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            {pageIndex !== metadata.pages.length - 1 && (
              <Button
                size="sm"
                variant="outlined"
                onClick={onNextStepClick}
                sx={{ ml: 0, mr: 2 }}
              >
                Siguiente paso
              </Button>
            )}
            {pageIndex === metadata.pages.length - 1 && (
              <Button
                size="sm"
                variant="outlined"
                onClick={onFinishPractice}
                sx={{ ml: 0, mr: 2 }}
              >
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
          </Box>
        </>
      )}
    </div>
  );
}

export default PracticePage;
