import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "staff", "event_owner"], default: "event_owner" }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
