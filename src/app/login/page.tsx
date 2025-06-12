"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "../components/ui/button"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    if (res?.error) setError(res.error)
    else router.push("/dashboard")
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <Button className="w-full" type="submit">Login</Button>
      </form>
    </div>
  )
}
