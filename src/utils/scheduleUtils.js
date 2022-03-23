import React from "react";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScheduleReservation from "../utils/reservationUtils.js";
import { getDateString } from "../utils/timeUtils";

let currDate = Date.now();

export function getDaySchedules(day, noAvailSchedPerDay, timeFrame) {
  let scheduleList = [];

  let temp = new Date(day).getTime();

  for (let j = 1; j < noAvailSchedPerDay; j++) {
    scheduleList.push(temp);
    temp = temp + timeFrame * (1000 * 60);
  }
  scheduleList.push(temp);

  return scheduleList;
}

export function isNotAvailable(scheduleToValidate, scheduleList, currPractice) {
  let disable = !scheduleList
    .filter(
      (schedule) =>
        // Only enable schedule if its end time has not yet come
        schedule + (currPractice.timeFrame - 1) * 60 * 1000 > currDate &&
        // If the schedule isn't on the reserved schedules array
        // or is the schedule the current student reserved,
        // then enable it
        !currPractice.reservedSchedules.find(function (
          scheduleReserved,
          index
        ) {
          if (scheduleReserved == currPractice.currentStudentSchedule)
            return false;
          if (scheduleReserved == schedule) return true;
        })
    )
    .includes(scheduleToValidate);
  return disable;
}

export function ScheduleModal(
  practice,
  openModal,
  setOpenModal,
  handleCloseModal
) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={{ lg: "70%", xs: "95%" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Selecciona una fecha y hora
        </Typography>
        {ScheduleReservation(practice, handleCloseModal)}
      </Box>
    </Modal>
  );
}

export function ScheduleDetails(props) {
  const { header, details } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid container spacing={2} alignItems="center" mt={0} pt={0}>
        <Grid item sm={1} xs={2} style={{ paddingTop: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
        <Grid item sm={11} xs={10} style={{ paddingTop: 0 }}>
          {header}
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {details}
      </Collapse>
    </>
  );
}

ScheduleDetails.propTypes = {
  header: PropTypes.object.isRequired,
  details: PropTypes.element.isRequired,
};

export function getNearestPractice(groups) {
  return groups
    .map((group) =>
      group.practices.map((practice) =>
        practice.currentStudentSchedule
          ? {
              name: practice.name,
              practiceNumber: practice.practiceNumber,
              ip: practice.raspIp,
              subjectId: group.subjectId,
              groupName: group.name,
              dateString: getDateString(practice.currentStudentSchedule),
              startTime: practice.currentStudentSchedule,
              endTime:
                practice.currentStudentSchedule +
                practice.timeFrame * 60 * 1000,
            }
          : null
      )
    )
    .flat()
    .filter((s) => s)
    .find(
      (schedule) =>
        Date.now() > schedule.startTime && Date.now() < schedule.endTime
    );
}
