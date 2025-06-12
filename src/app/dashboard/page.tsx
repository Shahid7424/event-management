import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { connectDB } from "../lib/db";
import { Event } from "../models/Event";

interface EventType {
  _id: string;
  title: string;
  location: string;
  date: string | Date;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("👤 Dashboard session:", session);

  if (!session) {
    return <p className="text-red-500 text-center mt-10">Access Denied</p>;
  }

  await connectDB();

  const rawEvents = await Event.find({ createdBy: session.user.id }).lean();
  const events: EventType[] = rawEvents.map((event: Record<string, unknown>) => ({
    _id: String(event._id),
    title: String(event.title),
    location: String(event.location),
    date: event.date as string | Date,
  }));

  console.log("📊 Dashboard events:", events);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-600">No events yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id}>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>
                {event.location} – {new Date(event.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}