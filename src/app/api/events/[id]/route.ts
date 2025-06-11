// app/api/events/[id]/route.ts
import { connectDB } from "../../../lib/db"
import { Event } from "../../../models/Event"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const event = await Event.findById(params.id)
  return NextResponse.json({ success: true, event })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const updated = await Event.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json({ success: true, updated })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  await Event.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true, message: "Event deleted" })
}
