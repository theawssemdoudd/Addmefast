// api/me.js
import { connectDB } from "../lib/db.js";
import { authMiddleware } from "../lib/auth.js";

export default async function handler(req, res) {
  await connectDB();
  const user = await authMiddleware(req);
  if (!user) return res.status(401).json({ error: "unauthorized" });
  res.json({ email: user.email, username: user.username, points: user.points });
}
