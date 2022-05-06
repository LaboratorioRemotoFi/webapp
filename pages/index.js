import React from "react";
import Layout from "/src/components/Layout";
import StudentPage from "/src/components/StudentPage/StudentPage";
import ProfessorPage from "/src/components/ProfessorPage/ProfessorPage";
import { useSession } from "next-auth/react";

export default function Index() {
  const { status, data: session } = useSession({
    required: true,
  });

  if (status !== "authenticated") {
    return <Layout></Layout>;
  }

  return session.user.type === "student" ? <StudentPage /> : <ProfessorPage />;
}
