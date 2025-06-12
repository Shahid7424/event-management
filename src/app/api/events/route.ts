import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { connectDB } from "../../lib/db"
import { Event } from "../../models/Event"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  console.log("🧠 SESSION in API:", session)

  if (!session) {
    return NextResponse.json({ success: false, message: "Access Denied" }, { status: 401 })
  }

  try {
    await connectDB()
    const body = await req.json()
    console.log("📥 BODY:", body)

    const event = await Event.create({
      ...body,
      createdBy: session.user.id,
    })

    console.log("✅ EVENT CREATED:", event)
    return NextResponse.json({ success: true, event }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ DB ERROR:", err.message)
    } else {
      console.error("❌ Unknown DB error:", err)
    }

    return NextResponse.json({ success: false, message: "Error saving event" }, { status: 500 })
  }
}
