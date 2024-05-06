import AuthGuard from '../../components/auth-guard'
import { ProfileHeader } from '../../components/profile-header'

export default function Profile() {
  return (
    <AuthGuard>
      <div className="container flex flex-col">
        <ProfileHeader />
      </div>
    </AuthGuard>
  )
}
