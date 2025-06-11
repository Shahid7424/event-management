// lib/db.ts
import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return

    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "eventease", // ✅ Important if not set in URI
    })

    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    throw err
  }
}
