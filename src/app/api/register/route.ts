import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../lib/db"
import { User } from "../../models/User"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  await connectDB()

  const { name, email, password } = await req.json()

  // Check if email already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "event_owner", // or "user" / "admin" as needed
  })

  return NextResponse.json({ message: "User created successfully" }, { status: 201 })
}
