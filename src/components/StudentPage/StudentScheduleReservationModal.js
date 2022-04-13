import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStoreContext from "../../hooks/storeContext";
import { getFullReservationDate } from "../../utils/reservationUtils.js";
import StudentModalDateReservation from "./StudentModalDateReservation.js";
import StudentModalConfirmReservation from "./StudentModalConfirmReservation.js";
import StudentModalReservationResult from "./StudentModalReservationResult.js";

function StudentScheduleReservationModal(props) {
  const { practice, open, closeModal, groupId, subjectId } = props;

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

  const [currentState, currentDispatch] = useStoreContext();

  const [modalState, setModalState] = React.useState(0);

  const handleModalStateChange = () => {
    modalState < 3 ? setModalState(modalState + 1) : setModalState(0);
  };

  // Final new date selected, obtained after selecting hour
  const [newDate, setNewDate] = React.useState("");

  function handleNewDate(date) {
    setNewDate(date);
    setConvertedNewDate(getFullReservationDate(date, practice.timeFrame));
  }

  // String for final date
  const [convertedNewDate, setConvertedNewDate] = React.useState(null);

  const [reservationSuccessful, setReservationSuccessful] =
    React.useState(false);

  const handleReserveSchedule = () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId: subjectId,
        practiceId: practice.id,
        timestamp: newDate,
      }),
    };
    fetch("/api/schedules/reserve", reqOptions)
      .then((response) => response.json())
      .then((reservedSchedule) => {
        currentDispatch({
          type: "setReservedSchedule",
          payload: {
            groupId,
            reservedSchedule,
          },
        });
        setReservationSuccessful(true);
        setModalState(2);
      })
      .catch((err) => {
        console.log("CATCHED");
        setReservationSuccessful(false);
        console.log(reservationSuccessful);
        setModalState(2);
      });
  };

  if (!currentState) {
    return <Typography variant="h4">NO DATA</Typography>;
  }

  let component;

  switch (modalState) {
    // Reservation
    case 0:
      component = (
        <StudentModalDateReservation
          practice={practice}
          subjectId={subjectId}
          handleNewDate={handleNewDate}
          changeModalState={handleModalStateChange}
        />
      );
      break;
    // Confirmation
    case 1:
      component = (
        <StudentModalConfirmReservation
          reserveSchedule={handleReserveSchedule}
          newDateString={convertedNewDate}
        />
      );
      break;
    // Result
    case 2:
      component = (
        <StudentModalReservationResult
          reservationSuccessful={reservationSuccessful}
        />
      );
      break;
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setModalState(0), closeModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal} width={{ lg: "70%", xs: "95%" }}>
        <IconButton
          sx={styleCloseButton}
          onClick={() => {
            setModalState(0);
            closeModal();
          }}
          color="primary"
        >
          <CloseIcon />
        </IconButton>
        {component}
      </Box>
    </Modal>
  );
}

export default StudentScheduleReservationModal;
