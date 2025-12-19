import { useState } from 'react'
import type { FormEvent } from 'react'
import { ShieldCheck, LogIn } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(
      'Demo only: authenticate against your admin or member account. No backend is connected yet.',
    )
  }

  return (
 
      <div className="mx-auto max-w-3xl">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Secure Access</p>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-text-primary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                placeholder="you@rca.rw"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-text-primary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className={buttonClasses({
                variant: 'primary',
                className: 'inline-flex items-center gap-2',
              })}
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
            <p className="text-xs text-text-muted">
             Haven't account? <Link
              to="/register" className="font-semibold text-primary hover:underline"
            >
              Request Access
            </Link>
            </p>
            {message && (
              <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-primary">
                {message}
              </p>
            )}
          </form>
        </Card>
      </div>
  )
}

