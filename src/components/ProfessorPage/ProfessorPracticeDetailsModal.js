import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getFullReservationDate } from "../../utils/reservationUtils.js";

function ProfessorPracticeDetailsModal(props) {
  const { timestamp, timeFrame, log, open, closeModal } = props;

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const styleCloseButton = {
    position: "absolute",
    top: "0%",
    right: "0%",
  };

  console.log("Modal");
  console.log(timestamp);
  console.log(timeFrame);

  let scheduleDateString;

  if (timestamp) {
    const fullReservationString = getFullReservationDate(timestamp, timeFrame);
    scheduleDateString = `Horario reservado: ${fullReservationString[0]} de las ${fullReservationString[1]} a las ${fullReservationString[2]}.`
  } else {
    scheduleDateString = "El alumno no ha reservado ningún horario."
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal} width={{ md: "auto", sm: "70%", xs: "95%" }}>
        <IconButton
          sx={styleCloseButton}
          onClick={closeModal}
          color="primary"
        >
          <CloseIcon />
        </IconButton>
        <Typography>{scheduleDateString}</Typography>
        <Typography>Su registro de actividades es el siguiente:</Typography>
        <Typography>{log}</Typography>
      </Box>
    </Modal>
  );
}

export default ProfessorPracticeDetailsModal;
