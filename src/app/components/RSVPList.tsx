"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"

export function RSVPList({ eventId }: { eventId: string }) {
  const [rsvps, setRsvps] = useState<any[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const res = await fetch(`/api/rsvp/${eventId}`)
        if (!res.ok) throw new Error("Failed to load RSVPs")
        const data = await res.json()
        if (data.success) setRsvps(data.rsvps)
        else throw new Error(data.error || "Unknown error")
      } catch (err: any) {
        setError(err.message)
      }
    }

    if (eventId) fetchRSVPs()
  }, [eventId])

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Date"]
        .concat(rsvps.map(r => `${r.name},${r.email},${new Date(r.createdAt).toLocaleString()}`))
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "event_rsvps.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">RSVPs ({rsvps.length})</h2>
        <Button onClick={exportToCSV}>Export CSV</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="border border-gray-200 rounded-md divide-y">
        {rsvps.map((rsvp) => (
          <li key={rsvp._id} className="p-4">
            <p><strong>{rsvp.name}</strong> — {rsvp.email}</p>
            <p className="text-sm text-gray-500">{new Date(rsvp.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
