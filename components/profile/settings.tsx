import { getCurrentUser } from 'app/api/current-user'
import { toggleSystemOfUnits } from 'app/api/toggle-system-of-units'

export async function ProfileSettings() {
  const currentUser = await getCurrentUser()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>System of units</div>
        <form action={toggleSystemOfUnits}>
          <div className="join">
            <button
              className={
                'btn join-item btn-sm' +
                (currentUser.isMetric ? ' btn-primary' : '')
              }
              type="submit"
            >
              Metric units
            </button>
            <button
              className={
                'btn join-item btn-sm' +
                (!currentUser.isMetric ? ' btn-primary' : '')
              }
              type="submit"
            >
              Imperial units
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
