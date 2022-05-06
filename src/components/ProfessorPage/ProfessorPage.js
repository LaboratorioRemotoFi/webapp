import React from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import ProfessorPageTable from "/src/components/ProfessorPage/ProfessorPageTable";
import Layout from "/src/components/Layout";
import useStoreContext from "/src/hooks/storeContext";

function ProfessorPage() {
  const [selectedGroupId, setSelectedGroupId] = React.useState("");
  const [selectedPracticeId, setSelectedPracticeId] = React.useState("");
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

  if (status !== "authenticated" || !groups) {
    return <Layout></Layout>;
  }

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography>Bienvenid@ profesor {user?.name}.</Typography>
            <br />
            <Typography variant="h4" mb={2}>
              Grupos
            </Typography>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="select-group-label">
                Selecciona un grupo
              </InputLabel>
              <Select
                labelId="select-group-label"
                id="select-group"
                value={selectedGroupId}
                label="Selecciona un grupo"
                onChange={(event) => {
                  setSelectedGroupId(event.target.value);
                }}
              >
                {groups.map((group) => {
                  return (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name} {group.groupNumber}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="select-practice-label">
                Selecciona una práctica
              </InputLabel>
              <Select
                labelId="select-practice-label"
                id="select-practice"
                value={selectedPracticeId}
                label="Selecciona una práctica"
                onChange={(event) => {
                  setSelectedPracticeId(event.target.value);
                }}
              >
                {groups
                  .find((group) => group.id === selectedGroupId)
                  ?.practices.map((practice) => {
                    return (
                      <MenuItem key={practice.id} value={practice.id}>
                        {practice.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                <ProfessorPageTable />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export default ProfessorPage;
