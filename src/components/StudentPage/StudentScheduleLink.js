import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import StudentScheduleReservationModal from "./StudentScheduleReservationModal.js";

let currDate = Date.now();

function StudentScheduleLink(props) {
  const { practice, groupId, subjectId } = props;
  const startDate = practice.startDate;
  const endDate = practice.endDate;
  const currentStudentScheduleTimestamp =
    practice?.currentStudentSchedule?.timestamp;

  let scheduleStatus = practice?.currentStudentSchedule?.status;

  if (typeof scheduleStatus === "undefined") {
    scheduleStatus = "NOT SCHEDULED";
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const reserveTime = 7 * 24 * 60 * 60 * 1000;

  let state;

  if (scheduleStatus?.localeCompare("FINISHED") === 0) {
    state = "Finished";
  } else if (scheduleStatus?.localeCompare("STARTED") === 0) {
    state = "Started";
  } else if (
    scheduleStatus?.localeCompare("SCHEDULED") === 0 &&
    currDate < currentStudentScheduleTimestamp
  ) {
    state = "Scheduled";
  } else if (
    scheduleStatus?.localeCompare("SCHEDULED") === 0 &&
    currDate > currentStudentScheduleTimestamp &&
    currDate < endDate
  ) {
    state = "Reschedule";
  } else if (
    scheduleStatus?.localeCompare("NOT SCHEDULED") === 0 &&
    currDate < endDate &&
    currDate >= startDate - reserveTime
  ) {
    state = "Available";
  } else if (currDate > endDate) {
    state = "Expired";
  } else if (currDate < startDate - reserveTime) {
    state = "Not available";
  }

  let component;

  switch (state) {
    case "Finished":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              Terminada
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    case "Started":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              Empezada
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    case "Scheduled":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              Agendada
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    case "Reschedule":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" color="red" fontWeight="bold">
              Por agendar
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    case "Available":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              Por agendar
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    case "Expired":
      if (!scheduleStatus?.localeCompare("NOT SCHEDULED")) {
        component = (
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="inherit" color="red" fontWeight="bold">
                Expirada
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="info"
                color="secondary"
                size="small"
                onClick={openModal}
              >
                <InfoIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        );
      } else {
        component = (
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="inherit" color="red" fontWeight="bold">
                Expirada
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="info"
                color="secondary"
                size="small"
                onClick={openModal}
              >
                <InfoIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        );
      }
      break;
    case "Not available":
      component = (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant="inherit" fontWeight="bold">
              No disponible
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="info"
              color="secondary"
              size="small"
              onClick={openModal}
            >
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      );
      break;
    default:
      return (
        <Typography variant="inherit" fontWeight="bold">
          No disponible
        </Typography>
      );
  }

  return (
    <>
      {component}
      <StudentScheduleReservationModal
        practice={practice}
        groupId={groupId}
        subjectId={subjectId}
        open={isModalOpen}
        closeModal={closeModal}
        state={state}
      />
    </>
  );
}

StudentScheduleLink.propTypes = {
  practice: PropTypes.object.isRequired,
};

export default StudentScheduleLink;
