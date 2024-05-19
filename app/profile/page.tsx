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
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="m-0">Welcome {session?.user?.name}</h1>
            </div>

            <h2>Overview</h2>
            <ProfileStats />

            <h2>Settings</h2>
            <ProfileSettings />

            <div className="flex justify-end pt-10">
              <LogoutButton />
            </div>
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
