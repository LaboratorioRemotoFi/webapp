import React from "react";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import convertDateToSpanishString from "../../utils/timeUtils";
import StudentScheduleReservationModal from "./StudentScheduleReservationModal.js";
import StudentScheduleDetails from "./StudentScheduleDetails.js";

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
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                Terminada
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}. Ver [detalles].
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Started":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                Empezada
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}. No ha sido terminada.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Scheduled":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                Agendada (
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={openModal}
                >
                  Reagendar
                </Button>
                )
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Reschedule":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" color="red" fontWeight="bold">
                Por agendar (
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={openModal}
                >
                  Reagendar
                </Button>
                )
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Available":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <>
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={openModal}
                >
                  Agendar
                </Button>
              </>
            }
            details={
              <>
                <Typography variant="inherit">
                  Aún no ha sido agendada.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Expired":
      if (!scheduleStatus?.localeCompare("NOT SCHEDULED")) {
        component = (
          <>
            <StudentScheduleDetails
              header={
                <Typography variant="inherit" color="red" fontWeight="bold">
                  Expirada
                </Typography>
              }
              details={
                <>
                  <Typography variant="inherit">No fue agendada.</Typography>
                </>
              }
            />
          </>
        );
      } else {
        component = (
          <>
            <StudentScheduleDetails
              header={
                <Typography variant="inherit" color="red" fontWeight="bold">
                  Expirada
                </Typography>
              }
              details={
                <>
                  <Typography variant="inherit">
                    Fue agendada para el {scheduleString[0]} a las{" "}
                    {scheduleString[1]} y no se realizó.
                  </Typography>
                </>
              }
            />
          </>
        );
      }
      break;
    case "Not available":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                No disponible
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Estará disponible para agendar a partir del{" "}
                  {schedulingDate[0]} a las {schedulingDate[1]}.
                </Typography>
              </>
            }
          />
        </>
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
      />
    </>
  );
}

StudentScheduleLink.propTypes = {
  practice: PropTypes.object.isRequired,
};

export default StudentScheduleLink;
