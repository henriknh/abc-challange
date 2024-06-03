'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface LinkWithLoginProps {
  children?: ReactNode
  href: string
  className?: string
}

export function LinkWithLogin({
  children,
  href,
  className,
  ...props
}: LinkWithLoginProps) {
  const { data: session } = useSession()

  console.log(session);
  

  if (!session) {
    return (
      <button
        onClick={() => signIn(null, { callbackUrl: href })}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}
