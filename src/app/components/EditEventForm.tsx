"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"

type EventData = {
  _id: string
  title: string
  description: string
  location: string
  date: string
}

export default function EditEventForm({ event }: { event: EventData }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: new Date(event.date).toISOString().slice(0, 16), // for datetime-local input
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/events/${event._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date & Time</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <Button type="submit">Update Event</Button>
    </form>
  )
}
