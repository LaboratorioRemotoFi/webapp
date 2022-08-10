import React from "react";
import { io } from "socket.io-client";

function useSocket() {
  const [errorMessage, setErrorMessage] = React.useState("");

  const [metadata, setMetadata] = React.useState(null);
  const [practiceStatus, setPracticeStatus] = React.useState("");
  const [sensorsData, setSensorsData] = React.useState({});
  const [actuatorsStatus, setActuatorsStatus] = React.useState({});

  const connect = React.useCallback((serverIp, user, password) => {
    const newSocket = io(serverIp);
    setErrorMessage("");

    newSocket.on("connect", () => {
      console.log("socket on connect");
      newSocket.emit("setup", { user, password });
    });

    newSocket.io.on("reconnect", () => {
      console.log("socket on reconnect");
    });

    newSocket.on("disconnect", () => {
      console.log("socket on disconnect");
    });

    newSocket.on("setup", (data) => {
      if (data.status === "success") {
        setMetadata(data.data);
      } else if (data.status === "error") {
        setErrorMessage(data.message);
      }
    });

    newSocket.on("updatePracticeData", (practiceData) => {
      setPracticeStatus(practiceData.status);
      setSensorsData(practiceData.sensors);
      setActuatorsStatus(practiceData.actuators);
    });

    newSocket.on("message", ({ status, message }) => {
      if (status === "error") {
        console.log("error: ", message);
        setErrorMessage(message);
      } else if (status === "success") {
        setErrorMessage("");
      }
    });

    return newSocket;
  }, []);

  return {
    connect,
    metadata,
    errorMessage,
    practiceStatus,
    sensorsData,
    actuatorsStatus,
  };
}

export default useSocket;
