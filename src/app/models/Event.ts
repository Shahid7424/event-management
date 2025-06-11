import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true })

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)
