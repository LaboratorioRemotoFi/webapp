import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import StudentScheduleReservationModal from "./StudentScheduleReservationModal.js";
import { getScheduleImprovedStatus } from "/src/utils/scheduleUtils";

const labelData = {
  FINISHED: {
    labelText: "Terminada",
    labelColor: "green",
  },
  STARTED: {
    labelText: "Empezada",
    labelColor: "orange",
  },
  STARTED_EXPIRED: {
    labelText: "Empezada",
    labelColor: "red",
  },
  READY_TO_START: {
    labelText: "Agendada",
  },
  SCHEDULE_EXPIRED: {
    labelText: "Reagendar",
    labelColor: "red",
  },
  READY_TO_SCHEDULE: {
    labelText: "Agendar",
  },
  NO_LONGER_AVAILABLE: {
    labelText: "Expirada",
    labelColor: "red",
  },
  NOT_YET_AVAILABLE: {
    labelText: "No disponible",
  },
};

function StudentScheduleLink(props) {
  const { practice, groupId, subjectId } = props;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const improvedStatus = getScheduleImprovedStatus({
    practiceStartDate: practice?.startDate,
    practiceEndDate: practice?.endDate,
    practiceTimeframe: practice?.timeFrame && practice?.timeFrame * 60 * 1000,
    scheduleTimestamp: practice?.currentStudentSchedule?.timestamp,
    scheduleStatus: practice?.currentStudentSchedule?.status,
  });

  const { labelText, labelColor } = labelData[improvedStatus];

  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Typography variant="inherit" color={labelColor} fontWeight="bold">
            {labelText}
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
      <StudentScheduleReservationModal
        practice={practice}
        groupId={groupId}
        subjectId={subjectId}
        open={isModalOpen}
        closeModal={closeModal}
        state={improvedStatus}
      />
    </>
  );
}

StudentScheduleLink.propTypes = {
  practice: PropTypes.object.isRequired,
};

export default StudentScheduleLink;
