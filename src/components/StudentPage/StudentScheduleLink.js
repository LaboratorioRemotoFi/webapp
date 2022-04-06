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
  const timeFrame = practice.timeFrame;
  const currentStudentScheduleTimestamp =
    practice?.currentStudentSchedule?.timestamp;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const reserveTime = 7 * 24 * 60 * 60 * 1000;

  let state;

  const hasSchedule = currentStudentScheduleTimestamp > 0;
  const scheduleString = convertDateToSpanishString(
    currentStudentScheduleTimestamp
  );
  const schedulingDate = convertDateToSpanishString(startDate - reserveTime);
  const availableDateStart = convertDateToSpanishString(startDate);
  const availableDateEnd = convertDateToSpanishString(endDate);

  if (currDate > endDate) {
    state = "Expired";
  } else if (
    hasSchedule &&
    currDate > currentStudentScheduleTimestamp &&
    currDate < endDate
  ) {
    state = "Late reschedule";
  } else if (
    hasSchedule &&
    currDate < currentStudentScheduleTimestamp &&
    currDate < endDate
  ) {
    state = "Reschedule";
  } else if (
    !hasSchedule &&
    currDate < endDate &&
    currDate >= startDate - reserveTime
  ) {
    state = "Available";
  } else if (currDate < startDate - reserveTime) {
    state = "Not available";
  }

  let component;

  switch (state) {
    case "Expired":
      // Change for !done
      if (!hasSchedule) {
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
                  <Typography variant="inherit" fontStyle="italic">
                    Estuvo disponible para realizar del {availableDateStart[0]}{" "}
                    a las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                    {availableDateEnd[1]}.
                  </Typography>
                  <Typography variant="inherit">
                    Duración: {timeFrame} minutos.
                  </Typography>
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
                <Typography variant="inherit" fontWeight="bold">
                  Terminada
                </Typography>
              }
              details={
                <>
                  <Typography variant="inherit">
                    Fue agendada para el {scheduleString[0]} a las{" "}
                    {scheduleString[1]} y se realizó ([detalles])/no se realizó.
                  </Typography>
                  <Typography variant="inherit" fontStyle="italic">
                    Estuvo disponible para realizar del {availableDateStart[0]}{" "}
                    a las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                    {availableDateEnd[1]}.
                  </Typography>
                  <Typography variant="inherit">
                    Duración: {timeFrame} minutos.
                  </Typography>
                </>
              }
            />
          </>
        );
      }
      break;
    // ADD CHECK FOR DONE/NOT DONE
    case "Late reschedule":
      component = (
        <>
          <StudentScheduleDetails
            header={
              <Typography variant="inherit" color="red" fontWeight="bold">
                Expirada (
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
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
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
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
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
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
                </Typography>
              </>
            }
          />
        </>
      );
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
                <Typography variant="inherit" fontStyle="italic">
                  Estará disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
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
      break;
  }

  return (
    <>
      {component}
      {isModalOpen && (
        <StudentScheduleReservationModal
          practice={practice}
          groupId={groupId}
          subjectId={subjectId}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

StudentScheduleLink.propTypes = {
  practice: PropTypes.object.isRequired,
};

export default StudentScheduleLink;
