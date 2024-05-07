'use server'

import { authOptions } from '../utils/auth'
import { UserPortait } from './user-portrait'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export interface UserCardProps {
  linkUrl?: string
  extraLabel?: string
}

export async function UserCard({ linkUrl, extraLabel }: UserCardProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <></>
  }
  return (
    <div className="flex items-center gap-2">
      <UserPortait />

      <div className="flex flex-1 flex-col items-start gap-1">
        <div>{session.user.name}</div>
        {extraLabel && <div className="text-black/50">{extraLabel}</div>}
      </div>
    </div>
  )

  return session?.user ? (
    <div tabIndex={0} role="button" className="btn btn-ghost">
      <UserPortait />

      <div className="flex flex-1 flex-col items-start gap-1">
        <div>{session.user.name}</div>
        {extraLabel && <div className="text-black/50">{extraLabel}</div>}
      </div>
    </div>
  ) : (
    <Link href="/api/auth/signin" className="btn btn-primary">
      Sign in
    </Link>
  )
}
