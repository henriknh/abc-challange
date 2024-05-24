import { getCurrentUser } from 'app/api/current-user'
import { updateSystemOfUnits } from 'app/api/update-system-of-units'

export default async function SystemOfUnits() {
  const currentUser = await getCurrentUser()
  const updateSystemOfUnitsWithMetric = updateSystemOfUnits.bind(null, true)
  const updateSystemOfUnitsWithImperial = updateSystemOfUnits.bind(null, false)

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <div>System of units</div>
      <div className="join">
        <form action={updateSystemOfUnitsWithMetric}>
          <button
            className={
              'btn join-item btn-sm' +
              (currentUser?.isMetric ? ' btn-primary' : '')
            }
            type="submit"
          >
            Metric units
          </button>
        </form>
        <form action={updateSystemOfUnitsWithImperial}>
          <button
            className={
              'btn join-item btn-sm' +
              (!currentUser?.isMetric ? ' btn-primary' : '')
            }
            type="submit"
          >
            Imperial units
          </button>
        </form>
      </div>
    </div>
  )
}
