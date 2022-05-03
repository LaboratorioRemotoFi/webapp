import React from "react";
import { Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function StudentModalConfirmReservation(props) {
  const { reserveSchedule, newDateString } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
        ¿Reservar el horario seleccionado?
      </Typography>
      <Typography id="modal-modal-description" mb={2}>
        Podrás cambiar el horario más adelante, siempre que queden horarios
        libres.
      </Typography>
      <Typography id="modal-modal-description" mb={2} fontStyle="italic">
        Horario seleccionado: {newDateString[0]} a las {newDateString[1]}.
      </Typography>
      <Grid container justifyContent="center">
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={() => {
            setIsLoading(true);
            reserveSchedule();
          }}
        >
          Confirmar
        </LoadingButton>
      </Grid>
    </>
  );
}

export default StudentModalConfirmReservation;
