import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import useSocket from "/src/hooks/useSocket";
import PracticePage from "/src/components/PracticePage/PracticePage";
// import { useRouter } from "next/router";
import useStoreContext from "/src/hooks/storeContext";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";

function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const practice = currentState.nearestPractice;
  const schedule = practice && practice.schedule;

  const {
    socket,
    isConnected,
    connect,
    metadata,
    errorMessage,
    practiceStatus,
    sensorsData,
    actuatorsStatus,
  } = useSocket();

  const [showDisconnectedDialog, setShowDiconnectedDialog] =
    React.useState(false);

  React.useEffect(() => {
    connect(practice.ip, "admin", "admin");
  }, [practice, connect]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cliente para Laboratorio Remoto
          </Typography>
          <Box mr={1} alignItems="center">
            {isConnected ? <CheckIcon /> : <ClearIcon />}
          </Box>
          <Typography variant="h6" component="div">
            {isConnected ? "Conectado" : "Desconectado"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 2 }}>
        {metadata && (
          <PracticePage
            socket={socket}
            metadata={metadata}
            practiceStatus={practiceStatus}
            sensorsData={sensorsData}
            actuatorsStatus={actuatorsStatus}
            errorMessage={errorMessage}
          />
        )}
      </Container>
      {!isConnected && (
        <Dialog onClose={() => {}} open={true}>
          <DialogTitle>Desconectado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hay un problema con la conexión, intentado conectar nuevamente.
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Index;
