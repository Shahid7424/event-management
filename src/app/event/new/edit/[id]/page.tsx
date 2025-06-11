// app/event/edit/[id]/page.tsx
import { Event } from "../../../../models/Event"
import { connectDB } from "../../../../lib/db"
import mongoose from "mongoose"
import { notFound } from "next/navigation"
import EditEventForm from "../../../../components/EditEventForm"
interface Props {
  params: { id: string }
}

export default async function EditEventPage({ params }: Props) {
  await connectDB()

  if (!mongoose.Types.ObjectId.isValid(params.id)) return notFound()

  const event = await Event.findById(params.id).lean()

  if (!event || Array.isArray(event)) return notFound()

  // Ensure event is a plain object with the correct type
  const eventData = {
    _id: event._id?.toString?.() ?? "",
    title: event.title ?? "",
    description: event.description ?? "",
    location: event.location ?? "",
    date: event.date ?? "",
    // add other fields as needed
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Event</h1>
      <EditEventForm event={eventData} />
    </div>
  )
}
