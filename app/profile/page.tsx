import AuthGuard from '@/components/auth-guard'
import { LogoutButton } from '@/components/logout-button'
import { ProfileSettings } from '@/components/profile/settings'
import { ProfileStats } from '@/components/profile/stats'
import Section from '@/components/section'
import { authOptions } from '@/utils/auth-options'
import { getServerSession } from 'next-auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <AuthGuard>
      <div className="prose max-w-none">
        <Section>
          <div className="flex flex-col gap-10">
            <div className="flex justify-between">
              <h1 className="m-0">{session?.user?.name}</h1>
            </div>

            <ProfileStats />

            <ProfileSettings />

            <div className="flex justify-end">
              <LogoutButton />
            </div>
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
