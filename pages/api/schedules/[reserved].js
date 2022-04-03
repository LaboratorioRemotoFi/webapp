import { getSession } from "next-auth/react";
import { getReservedSchedules } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log("RESERVATION");
  if (session && req.method === "GET") {
    console.log(req.method, req?.query);
    const result = await getReservedSchedules(
      req?.query?.practiceId,
      req?.query?.subjectId,
      req?.query?.status
    );
    console.log(result);
    res.json(result);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
