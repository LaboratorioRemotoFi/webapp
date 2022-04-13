import React from "react";
import { Typography } from "@mui/material";

function StudentModalReservationResult(props) {
  const { reservationSuccessful } = props;

  return (
    <Typography id="modal-modal-description" mb={0}>
      {reservationSuccessful
        ? "Horario reservado correctamente."
        : "No se pudo reservar el horario, inténtelo más tarde."}
    </Typography>
  );
}

export default StudentModalReservationResult;
