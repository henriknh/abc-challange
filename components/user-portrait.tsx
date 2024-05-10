import { authOptions } from '@/utils/auth-options'
import { getServerSession } from 'next-auth'

export async function UserPortait() {
  const session = await getServerSession(authOptions)

  return (
    <img
      className="h-8 rounded-full"
      src={session.user.image}
      alt={session.user.name}
    />
  )
}
