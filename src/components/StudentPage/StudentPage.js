import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "/src/components/Link";
import Layout from "/src/components/Layout";
import useStoreContext from "/src/hooks/storeContext";
import { getDateString } from "/src/utils/timeUtils";
import { getNearestPractice } from "/src/utils/scheduleUtils";
import StudentGroupsTable from "./StudentGroupsTable";

let currDate = Date.now();

function StudentPage() {
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
                <StudentGroupsTable groups={groups} />
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
                        href={`/practica?ip=${nearestPractice.ip}`}
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

export default StudentPage;
