'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface LogoutButtonProps {
  children?: ReactNode
}

export function LogoutButton({ children, ...props }: LogoutButtonProps) {
  return (
    <Link className="btn btn-ghost" href="/api/auth/signout" {...props}>
      {children || 'Log out'}
    </Link>
  )
}
