import { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";

export default function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices, students } = currentState
    ? currentState
    : 0;
  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography variant="h7">
              Grupo {groups["2021-2_1500_1"].groupNumber}
            </Typography>
            <Typography variant="h4">Control de prácticas</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Alumno</TableCell>

                    {Object.values(practices).map((cell) => (
                      <TableCell key={cell.name}>
                        <TableCell component="th" scope="row">
                          {cell.name}
                        </TableCell>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!currentState
                    ? "NO DATA"
                    : Object.values(students).map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>Bloqueado</TableCell>
                          <TableCell>Bloqueado</TableCell>
                          <TableCell>Bloqueado</TableCell>
                          <TableCell>Bloqueado</TableCell>
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
