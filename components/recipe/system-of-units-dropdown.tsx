'use client'

import { updateSystemOfUnits } from 'app/api/update-system-of-units'

export interface SystemOfUnitsDropdownProps {
  isMetric: boolean
}
export default function SystemOfUnitsDropdown({
  isMetric,
}: SystemOfUnitsDropdownProps) {
  return (
    <select
      value={isMetric ? 'metric' : 'imperial'}
      className="select select-bordered select-xs mb-2 max-w-xs"
      onChange={(e) => updateSystemOfUnits(e.target.value === 'metric')}
    >
      <option value="metric">Metric</option>
      <option value="imperial">Imperial</option>
    </select>
  )
}
