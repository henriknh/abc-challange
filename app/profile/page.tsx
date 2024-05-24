import AuthGuard from '@/components/auth-guard'
import { ProfileSettings } from '@/components/profile/settings'
import { ProfileStats } from '@/components/profile/stats'
import Section from '@/components/section'
import { LogoutButton } from '@/components/session/logout-button'
import { authOptions } from '@/utils/auth-options'
import { getServerSession } from 'next-auth'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <AuthGuard>
      <div className="prose max-w-none">
        <Section>
          <div className="flex flex-col">
            <h1>Welcome {session?.user?.name}</h1>

            <h2 className='mt-0'>Overview</h2>
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
