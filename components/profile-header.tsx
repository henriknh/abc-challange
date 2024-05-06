import { LogoutButton } from './logout-button'
import { getServerSession } from 'next-auth'

export async function ProfileHeader() {
  const session = await getServerSession()
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl">Welcome {session?.user?.name}</div>
      <LogoutButton />
    </div>
  )
}
