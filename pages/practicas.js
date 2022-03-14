import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "../src/components/Link";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";
import { getDateString } from "../src/utils/timeUtils";
import { getNearestPractice } from "../src/utils/scheduleUtils.js";
import ScheduleLink from "../src/utils/ScheduleLinkUtil.js";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let currDate = Date.now();

function Row(props) {
  const { group, dispatch } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {group.subjectId}
        </TableCell>
        <TableCell align="left">{group.name}</TableCell>
        <TableCell align="right">{group.groupNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">No.</TableCell>
                    <TableCell width="20%">Nombre</TableCell>
                    <TableCell width="70%">Agendar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group?.practices.map((practiceRow) => (
                    <TableRow key={practiceRow.id}>
                      <TableCell component="th" scope="row">
                        {practiceRow.practiceNumber}
                      </TableCell>
                      <TableCell>{practiceRow.name}</TableCell>
                      <TableCell>
                        <ScheduleLink
                          practiceId={practiceRow.id}
                          startDate={practiceRow.startDate}
                          endDate={practiceRow.endDate}
                          timeFrame={practiceRow.timeFrame}
                          currentStudentSchedule={
                            practiceRow.currentStudentSchedule
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subjectId: PropTypes.string.isRequired,
    groupNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    practices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        practiceNumber: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired,
        currentStudentSchedule: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default function Index() {
  const router = useRouter();

  const [currentState, currentDispatch] = useStoreContext();
  const { groups } = currentState;

  const { status, data } = useSession({
    required: true,
  });

  const user = data?.user;

  React.useEffect(() => {
    if (!groups) {
      fetch("/api/groups")
        .then((response) => response.json())
        .then((fetchedGroups) => {
          currentDispatch({ type: "setGroups", groups: fetchedGroups });
        });
    }
  }, [groups, currentDispatch]);

  currDate = Date.now();
  const currDateString = getDateString(currDate);
  const nearestPractice = groups && getNearestPractice(groups);

  if (status !== "authenticated" || !groups) {
    return <Layout></Layout>;
  }

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography>
              Bienvenid@ {user?.name}, hoy es {currDateString[0]} a las{" "}
              {currDateString[1]}.
            </Typography>
            <br />
            <Typography variant="h4" mb={2}>
              Prácticas disponibles
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                <TableContainer component={Paper} sx={{ width: 1 }}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Clave</TableCell>
                        <TableCell>Materia</TableCell>
                        <TableCell align="right">Grupo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groups.map((group) => (
                        <Row
                          key={group.id}
                          group={group}
                          dispatch={currentDispatch}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                <Typography variant="h6">Próxima práctica:</Typography>
                {nearestPractice ? (
                  <>
                    <Typography variant="body1">
                      Práctica no. {nearestPractice.practiceNumber} &quot;
                      {nearestPractice.name}&quot; de{" "}
                      {nearestPractice.subjectId} - {nearestPractice.groupName},
                      el día {nearestPractice.dateString[0]} a las{" "}
                      {nearestPractice.dateString[1]} horas.
                    </Typography>
                    <br />
                    <Button variant="contained">
                      <Link
                        href={`/practica-server?ip=${nearestPractice.ip}`}
                        color="primary.contrastText"
                      >
                        Ir a la práctica
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1">
                    No hay prácticas agendadas disponibles.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Link href="/" color="secondary">
            Ir a la página principal
          </Link>
        </Container>
      </Layout>
    </>
  );
}
