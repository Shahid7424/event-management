import mongoose from "mongoose"

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  createdAt: { type: Date, default: Date.now },
})

export const RSVP = mongoose.models.RSVP || mongoose.model("RSVP", rsvpSchema)
