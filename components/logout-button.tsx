import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function LogoutButton() {
  return (
    <Link className="btn btn-ghost" href="/api/auth/logout">
      Sign out
    </Link>
  )
}
