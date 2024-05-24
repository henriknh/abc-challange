import SystemOfUnits from './settings/system-of-units'
import ThemeController from './settings/theme-controller'
import { getCurrentUser } from 'app/api/current-user'

export async function ProfileSettings() {
  const currentUser = JSON.parse(JSON.stringify(await getCurrentUser()))

  return (
    <div className="flex flex-col gap-4">
      <ThemeController currentUser={currentUser} />
      <SystemOfUnits />
    </div>
  )
}
