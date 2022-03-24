import React from "react";
import Layout from "/src/components/Layout";
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
