import { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";

export default function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices } = currentState ? currentState : 0;

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography variant="h4">Grupos disponibles</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Clave</TableCell>
                    <TableCell align="left">Asignatura</TableCell>
                    <TableCell align="right">Grupo</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!currentState
                    ? "NO DATA"
                    : Object.values(groups).map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.subjectId}
                          </TableCell>
                          <TableCell align="left">
                            {subjects[row.subjectId].name}
                          </TableCell>
                          <TableCell align="right">{row.groupNumber}</TableCell>
                          <TableCell align="right">
                            <Link href="" color="secondary">
                              Detalles
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Link href="/" color="secondary">
            Ir a la página principal
          </Link>
        </Container>
      </Layout>
    </>
  );
}
