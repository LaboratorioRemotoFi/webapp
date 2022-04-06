import { getSession } from "next-auth/react";
import { updateSchedule } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session && req.method === "POST") {
    const scheduleId = req?.query?.id;
    const body = req?.body;

    const result = await updateSchedule(scheduleId, body);
    res.json(result.value);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
