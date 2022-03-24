import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Layout from "/src/components/Layout";
import Link from "/src/components/Link";
import StudentPage from "/src/components/StudentPage/StudentPage";
import { useSession } from "next-auth/react";

export default function Index() {
  const { status, data } = useSession({
    required: true,
  });

  console.log(status);

  if (status !== "authenticated") {
    return <Layout></Layout>;
  }

  return <StudentPage />;
}
