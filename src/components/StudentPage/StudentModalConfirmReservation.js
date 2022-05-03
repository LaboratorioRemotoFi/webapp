import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from '@mui/icons-material/Check';

function StudentModalConfirmReservation(props) {
  const { reserveSchedule, newDateString, reservationSuccess, resetModal, closeModal } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [reservationState, changeReservationState] = React.useState("init");

  let action;

  React.useEffect(() => {
    console.log("USE EFFECT");
    console.log(reservationSuccess);

    if (reservationSuccess) {
      changeReservationState("success");

      const timer = setTimeout(() => {
        resetModal(0);
        closeModal();
      }, 3000);
    
      return () => clearTimeout(timer);
    };
  }, [closeModal, reservationSuccess, resetModal]);

  if (reservationState === "init") {
    action = (
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
    );
  } else if (reservationState === "success") {
    action = (
      <Button
        variant="contained"
        color="success"
        startIcon={<CheckIcon />}
        onClick={() => {
          resetModal(0);
          closeModal();
        }}
      >
        ¡Éxito!
      </Button>
    );
  }

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
        {action}
      </Grid>
    </>
  );
}

export default StudentModalConfirmReservation;
