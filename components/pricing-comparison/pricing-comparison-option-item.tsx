import { mdiCheck, mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { ReactNode } from 'react'

export interface PricingComparisonOptionItemProps {
  children: ReactNode
  isIncluded?: boolean
  isExcluded?: boolean
}

export default function PricingComparisonOptionItem({
  children,
  isIncluded,
  isExcluded,
}: PricingComparisonOptionItemProps) {
  return (
    <tr className={'not-prose' + (isExcluded ? ' opacity-40' : '')}>
      <td>
        {(isIncluded || isExcluded) && (
          <span className="flex h-0 items-center pr-2">
            <Icon path={isIncluded ? mdiCheck : mdiClose} size={1} />
          </span>
        )}
      </td>
      <td className="py-1">{children}</td>
    </tr>
  )
  return (
    <div
      className={
        'flex items-center justify-center gap-2' +
        (isExcluded ? ' opacity-40' : '')
      }
    >
      <span className="flex-1 text-center">{children}</span>
    </div>
  )
}
