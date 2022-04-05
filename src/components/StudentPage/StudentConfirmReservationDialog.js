import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function StudentConfirmReservationDialog(
  openAlert,
  handleConfirmScheduleDialog,
  handleCancelScheduleDialog
) {
  return (
    <Dialog
      open={openAlert}
      onClose={handleCancelScheduleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Reservar el horario seleccionado?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Podrás cambiar el horario más adelante, siempre que queden horarios
          libres.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelScheduleDialog}>Cancelar</Button>
        <Button onClick={handleConfirmScheduleDialog} autoFocus>
          Reservar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentConfirmReservationDialog;
