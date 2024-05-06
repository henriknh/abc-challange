'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function LogoutButton({ ...props }) {
  return (
    <button
      className="btn btn-ghost"
      onClick={() => signOut()}
      // href="/api/auth/signout"
      {...props}
    >
      Sign out
    </button>
  )
}
