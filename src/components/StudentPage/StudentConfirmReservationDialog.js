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
  setOpenAlert,
  handleCloseAlert
) {
  return (
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
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
        <Button onClick={handleCloseAlert}>Cancelar</Button>
        <Button onClick={handleCloseAlert} autoFocus>
          Reservar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentConfirmReservationDialog;
