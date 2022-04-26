import { getSession } from "next-auth/react";
import { getStatus } from "/src/lib/database";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session && req.method === "GET") {
    let status;

    if (!req?.query?._id.localeCompare("undefined")) {
      console.log("NOT SCHEDULED");
      status = { status: "NOT SCHEDULED" };
    } else {
      status = await getStatus({
        id: req?.query?._id,
      });
    }

    res.json(status);
  } else {
    res.status(401);
  }
  res.end();
};

export default handler;
