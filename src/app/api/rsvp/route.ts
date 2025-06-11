// app/api/rsvp/route.ts
import { connectDB } from "../../lib/db"
import { RSVP } from "../../models/RSVP"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { name, email, eventId } = body

    if (!name || !email || !eventId) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 })
    }

    const rsvp = await RSVP.create({ name, email, eventId })
    return NextResponse.json({ success: true, rsvp })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
