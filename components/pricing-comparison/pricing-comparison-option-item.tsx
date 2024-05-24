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
  const hasIcon = isIncluded || isExcluded

  return (
    <tr className={'not-prose' + (isExcluded ? ' opacity-40' : '')}>
      {hasIcon && (
        <td>
          <span className="flex h-0 items-center pr-2">
            <Icon path={isIncluded ? mdiCheck : mdiClose} size={1} />
          </span>
        </td>
      )}
      <td
        colSpan={hasIcon ? 1 : 2}
        className={'py-1' + (!hasIcon ? ' text-center' : '')}
      >
        {children}
      </td>
    </tr>
  )
}
