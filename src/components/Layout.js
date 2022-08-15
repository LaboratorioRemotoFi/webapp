import React from "react";
import Navbar from "./Navbar";
import { Container } from "@mui/material";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Container sx={{ paddingTop: 2 }}>{children}</Container>
  </>
);

export default Layout;
