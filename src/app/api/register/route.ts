import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../lib/db"
import { User } from "../../models/User"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  await connectDB()
  const { name, email, password } = await req.json()

  const existing = await User.findOne({ email })
  if (existing) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "event_owner",
  })

  return NextResponse.json({ message: "User created" }, { status: 201 })
}
