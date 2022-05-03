import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import convertDateToSpanishString from "../../utils/timeUtils";
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

  const scheduleString = convertDateToSpanishString(
    currentStudentScheduleTimestamp
  );
  const schedulingDate = convertDateToSpanishString(startDate - reserveTime);

  let label;
  let color;

  if (scheduleStatus?.localeCompare("FINISHED") === 0) {
    label = "Terminada";
  } else if (scheduleStatus?.localeCompare("STARTED") === 0) {
    label = "Empezada";
  } else if (
    scheduleStatus?.localeCompare("SCHEDULED") === 0 &&
    currDate < currentStudentScheduleTimestamp
  ) {
    label = "Agendada";
  } else if (
    scheduleStatus?.localeCompare("SCHEDULED") === 0 &&
    currDate > currentStudentScheduleTimestamp &&
    currDate < endDate
  ) {
    color = "red";
    label = "Por agendar";
  } else if (
    scheduleStatus?.localeCompare("NOT SCHEDULED") === 0 &&
    currDate < endDate &&
    currDate >= startDate - reserveTime
  ) {
    label = "Por agendar";
  } else if (currDate > endDate) {
    color = "red";
    label = "Expirada";
  } else if (currDate < startDate - reserveTime) {
    label = "No disponible";
  }

  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Typography variant="inherit" color={color} fontWeight="bold">
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="info" color="secondary" size="small">
            <InfoIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <StudentScheduleReservationModal
        practice={practice}
        groupId={groupId}
        subjectId={subjectId}
        open={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}

StudentScheduleLink.propTypes = {
  practice: PropTypes.object.isRequired,
};

export default StudentScheduleLink;
