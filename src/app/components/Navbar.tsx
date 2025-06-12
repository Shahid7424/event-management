"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "../components/ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EventManagement
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, {session.user?.name?.split(" ")[0]}
              </span>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button variant="outline">Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
