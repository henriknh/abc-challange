'use client'

import { SystemOfUnits } from '@/models/user'
import { updateSystemOfUnits } from 'app/api/update-system-of-units'

export interface SystemOfUnitsDropdownProps {
  systemOfUnits: SystemOfUnits
}
export default function SystemOfUnitsDropdown({
  systemOfUnits,
}: SystemOfUnitsDropdownProps) {
  return (
    <select
      value={systemOfUnits}
      className="select select-bordered select-xs mb-2 max-w-xs"
      onChange={(e) => updateSystemOfUnits(e.target.value as SystemOfUnits)}
    >
      <option value="metric_system">Metric</option>
      <option value="imperial_system">Imperial</option>
      <option value="us_imperial_system">US Customary</option>
    </select>
  )
}
