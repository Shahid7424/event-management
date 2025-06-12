import { connectDB } from "@/app/lib/db"
import { RSVP } from "@/app/models/RSVP"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    await connectDB()
    const rsvps = await RSVP.find({ eventId: params.eventId }).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, rsvps })
  } catch (error) {
    console.error("❌ RSVP fetch error:", error) // ✅ Use the error
    return NextResponse.json({ success: false, error: "Failed to fetch RSVP list" }, { status: 500 })
  }
}
