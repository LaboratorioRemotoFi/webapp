import React from "react";
import { Button, Box, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function StudentModalReservationResult(props) {
  const { reservationSuccessful, resetModal, closeModal } = props;

  let component;

  if (reservationSuccessful) {
    component = (
      <Typography id="modal-modal-description" mb={0} mt={1}>
        <CheckBoxIcon fontSize="large" color="secondary" />
      </Typography>
    );
    setTimeout(() => {
      resetModal(0);
      closeModal();
    }, 3000);
  } else {
    component = (
      <>
        <Typography id="modal-modal-description" mt={1} mb={2}>
          No se pudo reservar el horario, inténtelo más tarde.
        </Typography>
        <Box textAlign="center">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              resetModal(0);
              closeModal();
            }}
          >
            Entendido
          </Button>
        </Box>
      </>
    );
  }

  return <>{component}</>;
}

export default StudentModalReservationResult;
