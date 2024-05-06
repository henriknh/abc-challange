'use server'

import { authOptions } from '../utils/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export interface ProfileButtonProps {
  linkUrl?: string
  extraLabel?: string
}

export async function ProfileButton({
  linkUrl,
  extraLabel,
}: ProfileButtonProps) {
  const session = await getServerSession(authOptions)

  return session?.user ? (
    <Link href={linkUrl} tabIndex={0} className="btn btn-ghost">
      <img
        className="h-8 rounded-full"
        src={session.user.image}
        alt={session.user.name}
      />

      <div className="flex flex-1 flex-col items-start gap-1">
        <div>{session.user.name}</div>
        {extraLabel && <div className="text-black/50">{extraLabel}</div>}
      </div>
    </Link>
  ) : (
    <Link href="/api/auth/login" className="btn btn-primary">
      Sign in
    </Link>
  )
}
