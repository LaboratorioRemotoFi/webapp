import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import useSocket from "/src/hooks/useSocket";
import PracticePage from "/src/components/PracticePage/PracticePage";
import useStoreContext from "/src/hooks/storeContext";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [currentState] = useStoreContext();
  const [socket, setSocket] = React.useState();
  const practice = currentState.nearestPractice;

  const {
    connect,
    metadata,
    errorMessage,
    practiceStatus,
    sensorsData,
    actuatorsStatus,
  } = useSocket();

  React.useEffect(() => {
    if (practice == null) {
      router.push("/");
    }
  }, [practice, router]);

  React.useEffect(() => {
    const newSocket = connect(practice?.ip, "admin", "admin");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [practice, connect]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cliente para Laboratorio Remoto
          </Typography>
          <Box mr={1} alignItems="center">
            {socket?.connected ? <CheckIcon /> : <ClearIcon />}
          </Box>
          <Typography variant="h6" component="div">
            {socket?.connected ? "Conectado" : "Desconectado"}
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
      {!socket?.connected && (
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
