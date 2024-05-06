'use server'

import { auth, authOptions } from '../utils/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export interface AuthGuardProps {
  children: ReactNode
  redirectUrl?: string
}
export default async function AuthGuard({
  children,
  redirectUrl,
}: AuthGuardProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(redirectUrl || '/api/auth/signin')
  }

  return <>{children}</>
}
