import Users from "../../db/Users";

export default function handler(req, res) {
  const { password, user } = req.body;

  if (!Users[user]) {
    res.status(400).json({ message: "User not found" });
  } else if (Users[user].password !== password) {
    res.status(400).json({ message: "Incorrect password" });
  } else {
    res.status(200).json(Users[user]);
  }
}
