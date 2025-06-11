// app/page.tsx
import Link from "next/link"
import { Button } from "./components/ui/button"

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to EventEase</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Your all-in-one event planning and RSVP management tool. Host professional events, track attendees, and export RSVP data effortlessly.
      </p>

      <div className="mt-6 space-x-4">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <Link href="/event/new">
          <Button variant="outline">Create Event</Button>
        </Link>
      </div>
    </section>
  )
}
