import React from "react";
import { Collapse, Grid, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import convertDateToSpanishString from "../utils/timeUtils";

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

export function scheduleIsNotAvailable(
  scheduleToValidate,
  scheduleList,
  currPractice
) {
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
              dateString: convertDateToSpanishString(
                practice.currentStudentSchedule
              ),
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
