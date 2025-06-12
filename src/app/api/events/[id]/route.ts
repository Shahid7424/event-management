import { connectDB } from "../../../lib/db";
import { Event } from "../../../models/Event";
import { NextRequest, NextResponse } from "next/server";
// import type { NextApiRequest } from "next";

// Correctly define the context type for App Router handlers
interface RouteContext {
  params: {
    id: string;
  };
}

// GET /api/events/[id]
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const event = await Event.findById(params.id);

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

// PUT /api/events/[id]
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Event.findByIdAndUpdate(params.id, body, {
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

// DELETE /api/events/[id]
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(params.id);

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
