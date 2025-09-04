// lib/models.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  passwordHash: String,
  points: { type: Number, default: 0 },
});

const TaskSchema = new mongoose.Schema({
  title: String,
  type: String,
  pointsReward: Number,
  active: { type: Boolean, default: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
