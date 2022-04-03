import { getSession } from "next-auth/react";
import { reserveSchedule } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session && req.method === "POST") {
    // CHANGE TO USE SCHEDULE _ID INSTEAD OF USER ID, SUBJECT ID AND PRACTICE ID
    const result = await reserveSchedule(
      session.user.id,
      req.body.subjectId,
      req.body.practiceId,
      req.body.timestamp
    );
    console.log(result);
    res.json(result);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
