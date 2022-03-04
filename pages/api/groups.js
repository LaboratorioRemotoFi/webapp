import { getSession } from "next-auth/react";
import { getStudentGroups } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const result = await getStudentGroups(
      session.user.id,
      session.user.groupsIds
    );
    res.json(result);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
