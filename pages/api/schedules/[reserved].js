import { getSession } from "next-auth/react";
import { getReservedSchedules } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session && req.method === "GET") {
    const result = await getReservedSchedules(
      req?.query?.practiceId,
      req?.query?.subjectId,
      req?.query?.status
    );
    res.json(result);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
