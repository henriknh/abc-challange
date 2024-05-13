'use client'

import Link from 'next/link'

export function LogoutButton({ ...props }) {
  return (
    <Link
      className="btn btn-ghost"
      href="/api/auth/signout"
      {...props}
    >
      Log out
    </Link>
  )
}
