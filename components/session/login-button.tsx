import Link from 'next/link'
import { ReactNode } from 'react'

export interface LoginButtonProps {
  children?: ReactNode
}

export function LoginButton({ children, ...props }: LoginButtonProps) {
  return (
    <Link className="btn btn-primary" href="/api/auth/signin" {...props}>
      {children ?? 'Log in'}
    </Link>
  )
}
