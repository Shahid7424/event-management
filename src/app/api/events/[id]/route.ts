import { connectDB } from "@/app/lib/db";
import { Event } from "@/app/models/Event";
import { NextRequest, NextResponse } from "next/server";

// Correct structure for context param in App Router handlers
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const event = await Event.findById(context.params.id);

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Event.findByIdAndUpdate(context.params.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(context.params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete event" },
      { status: 500 }
    );
  }
}
