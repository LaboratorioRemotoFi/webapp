import Users from "../../db/Users";

export default function handler(req, res) {
  const { username } = req.body;
  const user = Users[username];

  if (!user) {
    res.status(400).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
  }
}
