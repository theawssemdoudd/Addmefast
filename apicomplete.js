// api/complete.js
import { connectDB } from "../lib/db.js";
import { Task } from "../lib/models.js";
import { authMiddleware } from "../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const user = await authMiddleware(req);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const { taskId } = req.body;
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ error: "no task" });

  user.points += task.pointsReward;
  await user.save();
  res.json({ points: user.points });
}
