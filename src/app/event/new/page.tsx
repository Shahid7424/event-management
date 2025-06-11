'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ VERY IMPORTANT
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (res.ok && data.success) {
      router.push("/dashboard")
    } else {
      console.error("❌ Error creating event:", data.message)
      alert("Failed to create event.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Create Event</h1>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <input
        name="date"
        type="datetime-local"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <Button type="submit" className="w-full">Create Event</Button>
    </form>
  )
}
